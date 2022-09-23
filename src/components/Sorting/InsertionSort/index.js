import '../sort.css';
import { useState } from 'react';
import Node from '../../node';

const InsertionSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.5;

    const color = {
        'blue' : '#2697d8',
        'lightblue' : 'lightblue',
        'lightcoral' : 'lightcoral'
    }

    const sort = async () => {
        disableBtn(true);
        const arr = arrDisplay;

        for (let i = 0; i < arr.length; i++) {
            const currentBlock = document.getElementById(`${i}`);
            setColor(color.blue, currentBlock);

            await timer(switchSpeed);

            let curIdx = i;

            while (curIdx > 0 && arr[curIdx].val < arr[curIdx - 1].val) {
                const holdingBlock = document.getElementById(`${curIdx}`);
                const nextBlock = document.getElementById(`${curIdx-1}`);
                setColor(color.blue, holdingBlock);
                await timer(travelSpeed);

                [arr[curIdx].val, arr[curIdx - 1].val] = [arr[curIdx - 1].val, arr[curIdx].val];

                holdingBlock.innerHTML = arr[curIdx].val;
                nextBlock.innerHTML = arr[curIdx - 1].val;

                setColor(color.lightblue, holdingBlock);
                setColor(color.blue, nextBlock);
                await timer(travelSpeed);
                setColor(color.lightblue, nextBlock);
                curIdx--;
            }
            setColor(color.lightblue, currentBlock);
        }

        disableBtn(false);
        setSorted(true);
    };

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
            const node = new Node(random);
            newArray.push(node);
        }

        setArrDisplay([]);
        await timer(5);
        setArrDisplay(newArray);
        setSorted(false);
        return newArray;
    }

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Insertion_sort'>Insertion Sort</a></h1>
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
                                const newNode = new Node(num);
                                setArrDisplay([...arrDisplay, newNode]);
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
                    <input id='speed-slider' type="range" min="5" max="200" defaultValue={100} onChange={ e => {
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
                    <div className={'array-item'} id={`${i}`} style={{ backgroundColor: color.lightcoral }} key={i}>{numNode.val}</div>
                ))}
            </div>
        </center>
    );
}

export default InsertionSort;
