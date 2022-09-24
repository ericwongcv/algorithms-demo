import '../sort.css';
import { useState } from 'react';
import { text, button, color, setColor, domSelector, timer, disableBtn, genArray } from '../../Static/functions';

const QuickSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.3;

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
        await timer(switchSpeed);
        setColor(color.coral, endBlock, startBlock);
        await timer(switchSpeed);

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

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Quicksort'>Quick Sort</a></h1>
            <div className='alert-box'>
                {arrDisplay.length === 0 &&
                    <p className="note">{text.start}</p>
                }
                {arrDisplay.length === 18 &&
                    <p className="note">{text.capacity}</p>
                }
            </div>
            <div className='buttons-grid'>
                {btnArr.map(num => (
                    <div className='buttons-grid-item' key={num}>
                        <button className='num-button' onClick={() => {
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
                }}>{button.reset}</button>
                <button id='gen-array-btn' onClick={() => {
                    const newArray = genArray();
                    setArrDisplay(newArray);
                    setSorted(false);
                }}>{button.genArray}</button>
                <button id='run-btn' onClick={() => sort()}>{button.run}</button>
                <div className="slidecontainer">
                    <p className='note'>{text.speed}</p>
                    <input id='speed-slider' type="range" min="5" max="205" defaultValue={100} onChange={e => {
                        setTravelSpeed(205 - e.target.value);
                    }}></input>
                </div>
            </div>
            <div className='alert-box'>
                {sorted && arrDisplay.length > 0 &&
                    <div>
                        <p className="note">{text.sorted}</p>
                    </div>
                }
            </div>
            <div className='array'>
                {arrDisplay.map((numNode, i) => (
                    <div className={'array-item'} id={`${i}`} key={i}>{numNode}</div>
                ))}
            </div>
        </center>
    );
}

export default QuickSort;
