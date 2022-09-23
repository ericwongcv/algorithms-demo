import '../sort.css';
import { useState } from 'react';

const QuickSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.3;

    const color = {
        'blue': '#2697d8',
        'lightblue': 'lightblue',
        'coral': 'coral',
        'lightcoral': 'lightcoral'
    }

    const sort = async () => {
        disableBtn(true);
        const arr = arrDisplay;

        let end = arr.length - 1;
        let start = 0;

        const stack = [[start, end]];

        while (stack.length > 0) {
            const [start, end] = stack.pop();
            const pivot = await partition(arr, start, end);

            if (pivot - 1 > start)
                stack.push([start, pivot - 1]);
            if (pivot + 1 < end)
                stack.push([pivot + 1, end]);

        }

        await timer(travelSpeed);

        setArrDisplay(arr);
        disableBtn(false);
        setSorted(true);
    };

    // Partition Function
    const partition = async (arr, start, end) => {
        const [startBlock, endBlock] = domSelector([start, end]);
        setColor(color.lightblue, endBlock, startBlock);
        await timer(travelSpeed * 3);
        setColor(color.coral, endBlock, startBlock);
        await timer(travelSpeed * 3);

        let pivot = arr[end];
        let i = start - 1;

        for (let j = start; j < end; j++) {
            const [currentBlock] = domSelector([j]);
            setColor(color.blue, currentBlock);
            await timer(travelSpeed);
            currentBlock === startBlock ? setColor(color.coral, currentBlock) : setColor(color.lightblue, currentBlock);

            if (arr[j] < pivot) {
                const [prevIdxBlock, switchBlock] = domSelector([i, i + 1]);
                if (prevIdxBlock && prevIdxBlock !== startBlock) setColor(color.lightblue, prevIdxBlock);

                i += 1;

                setColor(color.lightcoral, currentBlock, switchBlock);
                await timer(switchSpeed);

                [arr[i], arr[j]] = [arr[j], arr[i]];

                [currentBlock.innerHTML, switchBlock.innerHTML] = [arr[j], arr[i]];
                await timer(switchSpeed);
                setColor(color.lightblue, currentBlock);
                if (switchBlock === startBlock) setColor(color.coral, switchBlock);
            }
        }

        if (i >= 0) {
            const [lastIdxBlock] = domSelector([i]);
            setColor(color.lightblue, lastIdxBlock);
        }
        
        const [pivotBlock] = domSelector([i + 1]);
        setColor(color.lightcoral, endBlock, pivotBlock);
        await timer(switchSpeed);

        [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];

        [endBlock.innerHTML, pivotBlock.innerHTML] = [arr[end], arr[i + 1]];
        await timer(switchSpeed);
        setColor(color.lightblue, endBlock, pivotBlock, startBlock);

        return i + 1;
    }

    const setColor = (color, ...doms) => {
        doms.forEach(dom => dom.style.backgroundColor = color);
    }

    const domSelector = (arr) => {
        return arr.map(id => document.getElementById(`${id}`));
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
                    <input id='speed-slider' type="range" min="5" max="205" defaultValue={100} onChange={e => {
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
