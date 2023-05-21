import { Link } from 'react-router-dom';
import '../styles.css';
import './NavBar.css';

const NavBar = () => {
    return (
        <header>
            <div className="navbar">
                <span class="material-symbols-outlined">chat</span>
                <Link to="/">Home</Link>
            </div>
        </header>
    );
}

export default NavBar;