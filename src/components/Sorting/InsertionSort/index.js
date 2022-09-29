import '../../Static/algorithms.css';
import { useState } from 'react';
import { text, button, color, setColor, domSelector, timer, disableBtn, genArray } from '../../Static/functions';

const InsertionSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.3;

    const sort = async () => {
        disableBtn(true);
        const arr = arrDisplay;

        for (let i = 0; i < arr.length; i++) {
            const currentBlock = document.getElementById(`${i}`);
            setColor(color.blue, currentBlock);
            await timer(switchSpeed);

            let curIdx = i;

            while (curIdx > 0 && arr[curIdx] < arr[curIdx - 1]) {
                const [holdingBlock, nextBlock] = domSelector([curIdx, curIdx - 1]);
                setColor(color.blue, holdingBlock);
                await timer(travelSpeed);

                [arr[curIdx], arr[curIdx - 1]] = [arr[curIdx - 1], arr[curIdx]];

                holdingBlock.innerHTML = arr[curIdx];
                nextBlock.innerHTML = arr[curIdx - 1];

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

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Insertion_sort'>Insertion Sort</a></h1>
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
                <button id='gen-array-btn' onClick={async () => {
                    setArrDisplay([]);
                    await timer(1);
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
                    <div className={'array-item'} id={`${i}`} style={{ backgroundColor: color.lightcoral }} key={i}>{num}</div>
                ))}
            </div>
        </center>
    );
}

export default InsertionSort;
