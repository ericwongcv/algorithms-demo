import { NavLink } from 'react-router-dom';
import '../../App.css';

const HomePage = () => {
    return (
        <div className='homepage-wrapper'>
            <div className='intro-block'>
                <h1>Welcome to Algorithms Demo</h1>
                <div className='intro-note'>
                    <p>
                        Visualize various sorting and searching algorithms.
                        Get started by clicking one of the algorithms below.
                    </p>
                </div>
            </div>
            <div className='button-links'>
                <div className='button-links-column'>
                    <h2>Sorting</h2>
                    <NavLink to='/bubble-sort'><button>Bubble Sort</button></NavLink>
                    <NavLink to="/insertion-sort"><button>Insertion Sort</button></NavLink>
                    <NavLink to="/merge-sort"><button>Merge Sort</button></NavLink>
                    <NavLink to="/quick-sort"><button>Quick Sort</button></NavLink>
                    <NavLink to="/selection-sort"><button>Selection Sort</button></NavLink>
                </div>

                <div className='button-links-column'>
                    <h2>Searching</h2>
                    <NavLink to='/binary-search'><button>Binary Search</button></NavLink>
                    <NavLink to="/linear-search"><button>Linear Search</button></NavLink>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
