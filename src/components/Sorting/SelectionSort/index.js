import '../sort.css';
import { useState } from 'react';
import { text, button, color, setColor, domSelector, timer, disableBtn, genArray } from '../../Static/functions';

const SelectionSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.3;


    const sort = async () => {
        disableBtn(true);
        const arr = arrDisplay;

        let [min, minIdx] = [arr[0], 0];
        let i = 0;

        while (i < arr.length) {
            const [selectBlock] = domSelector([i]);
            setColor(color.coral, selectBlock);
            await timer(travelSpeed)

            for (let j = i + 1; j < arr.length; j++) {
                const [currentBlock] = domSelector([j]);
                setColor(color.blue, currentBlock);
                await timer(travelSpeed)
                setColor(color.lightblue, currentBlock);

                if (arr[j] < min) {
                    const [prevMinBlock] = domSelector([minIdx]);
                    if (minIdx > i) setColor(color.lightblue, prevMinBlock);

                    [min, minIdx] = [arr[j], j];

                    const [minBlock] = domSelector([minIdx])
                    setColor(color.coral, minBlock);
                    await timer(switchSpeed)
                }
            };

            const [minBlock] = domSelector([minIdx]);
            setColor(color.lightcoral, selectBlock, minBlock);
            await timer(switchSpeed);

            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            
            minBlock.innerHTML = arr[minIdx];
            selectBlock.innerHTML = arr[i];

            await timer(switchSpeed);
            setColor(color.lightblue, selectBlock);
            if (i !== minIdx) setColor(color.lightblue, minBlock);

            i++;

            [min, minIdx] = [arr[i], i];
        }

        setArrDisplay(arr);
        disableBtn(false);
        setSorted(true);
    };

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Selection_sort'>Selection Sort</a></h1>
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

export default SelectionSort;
