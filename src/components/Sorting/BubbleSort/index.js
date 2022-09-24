import '../sort.css';
import { useState } from 'react';
import { text, button, color, setColor, domSelector, timer, disableBtn, genArray } from '../../Static/functions';

const BubbleSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 0.8;

    const sort = async () => {
        let sorted = false;
        const arr = arrDisplay;

        while (!sorted) {
            disableBtn(true);
            sorted = true;

            for (let i = 0; i < arr.length - 1; i++) {
                const [currentBlock, nextBlock] = domSelector([i, i + 1]);
                setColor(color.blue, currentBlock, nextBlock);

                await timer(travelSpeed);

                if (arr[i] > arr[i + 1]) {

                    setColor(color.lightcoral, currentBlock, nextBlock);

                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

                    await timer(switchSpeed);

                    currentBlock.innerHTML = arr[i];
                    nextBlock.innerHTML = arr[i + 1];

                    await timer(switchSpeed);

                    sorted = false;
                }
                setColor(color.lightblue, currentBlock, nextBlock);
            }
            disableBtn(false)
        }

        setArrDisplay(arr);
        setSorted(true);
    };

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Bubble_sort'>Bubble Sort</a></h1>
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
                }}>{button.reset}</button>
                <button id='gen-array-btn' onClick={() => {
                    const newArray = genArray();
                    setArrDisplay(newArray);
                    setSorted(false);
                }}>{button.genArray}</button>
                <button id='run-btn' onClick={() => sort()}>{button.run}</button>
                <div className="slidecontainer">
                    <p className='note'>{text.speed}</p>
                    <input id='speed-slider' type="range" min="5" max="200" defaultValue={100} onChange={e => {
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
                {arrDisplay.map((num, i) => (
                    <div className={'array-item'} id={`${i}`} key={i}>{num}</div>
                ))}
            </div>
        </center>
    );
}

export default BubbleSort;
