import '../sort.css';
import { useState } from 'react';
import { text, button, color, setColor, arrColorSwitch, domSelector, timer, disableBtn, genArray } from '../../Static/functions';

const MergeSort = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(50);

    const switchSpeed = travelSpeed * 1.3;

    const sort = async () => {
        disableBtn(true);
        const arr = arrDisplay;

        let width = 1;
        let n = arr.length;

        while (width < n) {
            let l = 0;
            while (l < n) {
                const r = Math.min(l + (width * 2 - 1), n - 1);
                const m = Math.min(l + width - 1, n - 1);

                arrColorSwitch(l, r, color.blue);
                await timer(travelSpeed);
                arrTextClear(l, r)
                
                await merge(arr, l, m, r);
                l += width * 2;
            }
            width *= 2;
        }
        
        setArrDisplay(arr);
        disableBtn(false);
        setSorted(true);
    };

    // Merge Function
    const merge = async (arr, l, m, r) => {
        const n1 = m - l + 1;
        const n2 = r - m;

        const leftArr = [];
        const rightArr = [];

        for (let i = 0; i < n1; i++)
            leftArr.push(arr[l + i]);
        for (let i = 0; i < n2; i++)
            rightArr.push(arr[m + i + 1]);

        let [i, j, k] = [0, 0, l];
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            await setTargetValue(arr, k);

            k++;
        };

        while (i < n1) {
            arr[k] = leftArr[i];
            await setTargetValue(arr, k);
            i++;
            k++;
        };

        while (j < n2) {
            arr[k] = rightArr[j];
            await setTargetValue(arr, k);
            j++;
            k++;
        };
    };

    // Clears text from start to end
    const arrTextClear = function(start, end) {
        let i = start;
        while (i <= end) {
            const [dom] = domSelector([i]);
            dom.innerHTML = '';
            i++;
        };
    };

    // Changes color and value of selected block in array
    const setTargetValue = async function(arr, k) {
        const [targetBlock] = domSelector([k]);
        await timer(switchSpeed / 3);
        setColor(color.lightcoral, targetBlock);
        targetBlock.innerHTML = arr[k];
        await timer(switchSpeed);
        setColor(color.lightblue, targetBlock);
    };

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Merge_sort'>Merge Sort</a></h1>
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

export default MergeSort;
