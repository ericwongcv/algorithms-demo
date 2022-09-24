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
                        <NavLink to="/insertion-sort">Insertion Sort</NavLink>
                        <NavLink to="/merge-sort">Merge Sort</NavLink>
                        <NavLink to="/quick-sort">Quick Sort</NavLink>
                        <NavLink to="/selection-sort">Selection Sort</NavLink>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Search Algorithms
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <NavLink to='/binary-search'>Binary Search</NavLink>
                        <NavLink to="/insertion-sort">Insertion Sort</NavLink>
                        <NavLink to="/quick-sort">Quick Sort</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
