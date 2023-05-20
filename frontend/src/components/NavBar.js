import { Link } from 'react-router-dom';
import '../styles.css';
import './NavBar.css';

const NavBar = () => {
    return (
        <header>
            <div className="navbar">
                <Link to="/">Home</Link>
            </div>
        </header>
    );
}

export default NavBar;