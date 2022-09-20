import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = (prop) => {
    return (
        <nav>
            <div class="navbar">
                <NavLink to='/home'>Home</NavLink>
                <div class="dropdown">
                    <button class="dropbtn">Sorting Algorithms
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <NavLink to='/bubble-sort'>Bubble Sort</NavLink>
                        <a href="#">Insertion Sort</a>
                        <a href="#">Quick Sort</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Search Algorithms
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
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
