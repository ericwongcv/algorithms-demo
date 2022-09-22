import '../sort.css';
import { useState } from 'react';
import Node from '../../node';

const BubbleSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(5);

    // const travelSpeed = 5;
    const switchSpeed = 5;

    const sort = async () => {
        let sorted = false;
        const arr = arrDisplay.slice(0);

        while (!sorted) {
            disableBtn(true);
            sorted = true;

            for (let i = 0; i < arr.length - 1; i++) {
                const currentBlock = document.getElementById(`${i}`);
                const nextBlock = document.getElementById(`${i + 1}`);
                setColor(currentBlock, nextBlock, '#2697d8');

                await timer(travelSpeed);

                if (arr[i].val > arr[i + 1].val) {

                    setColor(currentBlock, nextBlock, 'lightcoral');

                    [arr[i].val, arr[i + 1].val] = [arr[i + 1].val, arr[i].val];

                    await timer(switchSpeed);

                    currentBlock.innerHTML = arr[i].val;
                    nextBlock.innerHTML = arr[i + 1].val;

                    await timer(switchSpeed);

                    sorted = false;
                }
                setColor(currentBlock, nextBlock, 'lightblue');
            }
            disableBtn(false)
        }
        setSorted(true);
    };

    const setColor = (el1, el2, color) => {
        el1.style.backgroundColor = color;
        el2.style.backgroundColor = color;
    }

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

    const disableBtn = (bool) => {
        const genArrayButton = document.getElementById('gen-array-btn');
        const runButton = document.getElementById('run-btn');

        genArrayButton.disabled = bool ? true : false;
        runButton.disabled = bool ? true : false;
    };

    const genArray = () => {
        const newArray = [];

        for (let i = 0; i < 18; i++) {
            const random = Math.floor(Math.random() * 10);
            const node = new Node(random);
            newArray.push(node);
        }
        setArrDisplay(newArray);
        setSorted(false);
        return newArray;
    }

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Bubble_sort'>Bubble Sort</a></h1>
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
                {/* <div class="slidecontainer">
                    <p className='note'>Speed Control:</p>
                    <input type="range" min="1" max="100" value="50" onChange={ e => {
                        setTravelSpeed(e.value);
                    }}></input>
                </div> */}
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
                    <div className={'array-item'} id={`${i}`} style={{ backgroundColor: numNode.color }} key={i}>{numNode.val}</div>
                ))}
            </div>
        </center>
    );
}

export default BubbleSort;
