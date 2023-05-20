import { useState } from 'react';
import '../styles.css';
import './Form.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inf, setInf] = useState(null);
  const [msg, setMsg] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    console.log(groupName);

    const response = await fetch('http://localhost:8080/send', {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({ msg, groupName })
    })

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setInf(null);
      setError(json.err);
    }
    if (response.ok) {
      setIsLoading(false);
      setError(null);
      setInf(json.msg)
    }
  }

  return (
    <div className="Home">
      <h1>Caca</h1>
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
          <option value="Jijijija">Jijijija</option>
          <option value="Classe 6èB|❤💙|🤍💜">Classe 6èB|❤💙|🤍💜</option>
          <option value="Classe 6èB😎">Classe 6èB😎</option>
        </select>
        <button disabled={isLoading}>ok</button>

        {error && <div className="error">{error}</div>}
        {inf && <div className="inf">{inf}</div>}
      </form>
    </div>
  );
}

export default App;
