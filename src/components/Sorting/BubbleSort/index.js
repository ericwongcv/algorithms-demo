import '../sort.css';
import { useState, useEffect } from 'react';
import Node from '../../node';

const BubbleSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);

    const sort = async () => {
        let sorted = false;
        const arr = arrDisplay.slice(0);

        while (!sorted) {
            sorted = true;

            for (let i = 0; i < arr.length - 1; i++) {
                const currentBlock = document.getElementById(`${i}`);
                currentBlock.style.backgroundColor = '#2697d8'; 
                // currentBlock.innerHTML = ;
                await timer(200);

                if (arr[i].val > arr[i + 1].val) {
                    const nextBlock = document.getElementById(`${i + 1}`);
                    currentBlock.style.backgroundColor = 'lightcoral';
                    nextBlock.style.backgroundColor = 'lightcoral';

                    [arr[i].val, arr[i + 1].val] = [arr[i + 1].val, arr[i].val];

                    await timer(200);

                    // currentBlock.style.backgroundColor = arr[i].backgroundColor;
                    currentBlock.innerHTML = arr[i].val;
                    nextBlock.innerHTML = arr[i+1].val;

                    nextBlock.style.backgroundColor = 'lightblue'; 

                    sorted = false;
                }

                currentBlock.style.backgroundColor = 'lightblue'; 
            }
        }
        setSorted(true);
        // setArrDisplay(arr);
    };

    // Returns a Promise that resolves after "ms" Milliseconds
    const timer = ms => new Promise(res => setTimeout(res, ms))

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

    useEffect(() => {
        // console.log(arrDisplay)
    }, [arrDisplay]);

    return (
        <center>
            <h1>Bubble Sort</h1>
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
                }}>Reset</button>
                <button onClick={() => genArray()}>Generate Array</button>
                <button onClick={() => sort()}>Run</button>
            </div>
            <div className='alert-box'>
                {sorted && arrDisplay.length > 0 &&
                    <p className="note">Array is sorted!</p>
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
