import '../sort.css';
import { useState } from 'react';

const QuickSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.5;

    const color = {
        'blue': '#2697d8',
        'lightblue': 'lightblue',
        'coral' : 'coral',
        'lightcoral': 'lightcoral'
    }

    const sort = async () => {
        disableBtn(true);
        const arr = arrDisplay;

        const sol = await partition(arr, 0, arr.length - 1);
        
        setArrDisplay(sol)
        disableBtn(false);
        setSorted(true);
    };

    // Quick Sort Recursive
    const partition = async (arr, start, end) => {
        if (arr.length <= 1) return arr;
        let pivot = arr[end];
        let i = start - 1;

        for (let j = 0; j < end; j++) {

            if (arr[j] < pivot) {
                i += 1;

                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        const finalBlock = document.getElementById(`${i + 1}`);
        [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];

        const left = arr.slice(0, i + 1);
        const right = arr.slice(i + 2);

        return [... await partition(left, 0, left.length - 1), arr[i + 1], ... await partition(right, 0, right.length - 1)];
    }

    const setColor = (color, el1, el2 = undefined) => {
        el1.style.backgroundColor = color;
        if (el2) el2.style.backgroundColor = color;
    }

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

    const disableBtn = (bool) => {
        const genArrayButton = document.getElementById('gen-array-btn');
        const runButton = document.getElementById('run-btn');
        const slider = document.getElementById('speed-slider');

        slider.disabled = bool ? true : false;
        genArrayButton.disabled = bool ? true : false;
        runButton.disabled = bool ? true : false;
    };

    const genArray = async () => {
        const newArray = [];

        for (let i = 0; i < 18; i++) {
            const random = Math.floor(Math.random() * 10);
            newArray.push(random);
        }

        setArrDisplay([]);
        await timer(5);
        setArrDisplay(newArray);
        setSorted(false);
        return newArray;
    }

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Quicksort'>Quick Sort</a></h1>
            <div className='alert-box'>
                {arrDisplay.length === 0 &&
                    <p className="note">Click a few numbers below to get started!</p>
                }
                {arrDisplay.length === 18 &&
                    <p className="note">Max array capacity reached. Click "Run" to sort.</p>
                }
            </div>
            <div className='buttons-grid'>
                {btnArr.map(num => (
                    <div className='buttons-grid-item' key={num}>
                        <button onClick={() => {
                            if (sorted) setSorted(false);
                            if (arrDisplay.length < 18) {
                                setArrDisplay([...arrDisplay, num]);
                            }
                        }}>{num}</button>
                    </div>
                ))}
            </div>
            <div className='run-reset'>
                <button onClick={() => {
                    setArrDisplay([]);
                    setSorted(false);
                    disableBtn(false);
                }}>Reset</button>
                <button id='gen-array-btn' onClick={() => genArray()}>Generate Array</button>
                <button id='run-btn' onClick={() => sort()}>Run</button>
                <div className="slidecontainer">
                    <p className='note'>Speed Control:</p>
                    <input id='speed-slider' type="range" min="5" max="1000" defaultValue={100} onChange={e => {
                        setTravelSpeed(205 - e.target.value);
                    }}></input>
                </div>
            </div>
            <div className='alert-box'>
                {sorted && arrDisplay.length > 0 &&
                    <div>
                        <p className="note">Array is sorted!</p>
                    </div>
                }
            </div>
            <div className='array'>
                {arrDisplay.map((numNode, i) => (
                    <div className={'array-item'} id={`${i}`} style={{ backgroundColor: color.lightblue }} key={i}>{numNode}</div>
                ))}
            </div>
        </center>
    );
}

export default QuickSort;
