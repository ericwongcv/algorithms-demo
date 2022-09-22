import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = (prop) => {
    return (
        <nav>
            <div className="navbar">
                <NavLink to='/home'>Home</NavLink>
                <div className="dropdown">
                    <button className="dropbtn">Sorting Algorithms
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <NavLink to='/bubble-sort'>Bubble Sort</NavLink>
                        <a href="#">Insertion Sort</a>
                        <a href="#">Quick Sort</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Search Algorithms
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Binary Search</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
