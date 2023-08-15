import { useState, useEffect } from 'react';
import '../styles.css';
import './Form.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inf, setInf] = useState(null);
  const [msg, setMsg] = useState("");
  const [times, setTimes] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState(null)

  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':8080';
  console.log(serverUrl);

  useEffect(() => {

    async function fetchGroups() {
      const response = await fetch(`${serverUrl}/groups`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"}
      })

      const json = await response.json();

      console.log(json)

      setGroups(json.groups);
    }

    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch(`${serverUrl}/send`, {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({ msg, groupName, times })
    })

    const json = await response.json();

    if (!response.ok) {
      setInf(null);
      setError(json.err);
      setTimeout(function() {
        setIsLoading(false);
      }, 500);
    }
    if (response.ok) {
      setError(null);
      setInf(json.msg);
      setTimeout(function() {
        setIsLoading(false);
      }, 6000);
    }
  }

  if (!groups) return <h3>Loading...</h3>;

  return (
    <div className="Home margin">
      <h1>WAM Bot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="msg"
          id="msg"
          placeholder="message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <select
          name="groupName"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        >
          <option disabled={true} value="">select a group</option>
          {groups.map((group) => (
            <option value={group.name}>{group.display}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          max={5}
          name="times"
          id="times"
          placeholder="times"
          value={times}
          disabled={true}
          onChange={(e) => setTimes(e.target.value)}
        />
        <button disabled={isLoading} className="cooldown">ok</button>

        {error && <div className="error">{error}</div>}
        {inf && <div className="inf">{inf}</div>}
      </form>
    </div>
  );
}

export default App;
