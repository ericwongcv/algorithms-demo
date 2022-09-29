import '../../Static/algorithms.css';
import { useState } from 'react';
import { text, button, color, setColor, arrColorSwitch, domSelector, timer, disableBtn, genArray, disableRunStartBtn } from '../../Static/functions';

const BinarySearch = () => {
    const btnArr = Array.from(Array(10).keys());

    const [arrDisplay, setArrDisplay] = useState([]);
    const [searched, setSearched] = useState(false);
    const [travelSpeed, setTravelSpeed] = useState(130);
    const [index, setIndex] = useState(-1);
    const [select, setSelect] = useState(false);

    const locateSpeed = travelSpeed * 3;
    let searchVal;

    const search = async () => {
        disableBtn(true);
        const arr = arrDisplay.sort();
        setArrDisplay(arr);
        await timer(locateSpeed);

        const sol = await binary(arr);

        setIndex(sol);
        disableBtn(false);
        setSearched(true);
    };

    const binary = async (arr) => {
        let start = 0;
        let end = arr.length - 1;
        let i = Math.floor((start + end) / 2);

        while (start <= end) {
            arrColorSwitch(start, end, color.blue);
            const [dom] = domSelector([i])
            setColor(color.coral, dom);
            await timer(locateSpeed);
            arrColorSwitch(start, end, color.lightblue);

            if (searchVal === arr[i]) {
                setColor(color.lightcoral, dom);
                await timer(locateSpeed);
                setColor(color.lightblue, dom);
                return i;
            }
            if (searchVal > arr[i]) {
                start = i + 1;
            } else if (searchVal < arr[i]) {
                end = i - 1;
            }
            i = Math.floor((start + end) / 2);
        };

        return -1;
    };

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Binary_search_algorithm'>Binary Search</a></h1>
            <div className='alert-box'>
                {arrDisplay.length === 0 &&
                    <p className="note">{text.start}</p>
                }
                {arrDisplay.length === 18 &&
                    <p className="note">{text.capacitySearch}</p>
                }
            </div>
            <div className='buttons-grid'>
                {btnArr.map(num => (
                    <div className='buttons-grid-item' key={num}>
                        <button className='num-button' id={`button-${num}`} onClick={async () => {
                            if (select) {
                                searchVal = num;
                                setSelect(false);
                                search();
                            } else {
                                if (searched) setSearched(false);
                                if (arrDisplay.length < 18) {
                                    setArrDisplay([...arrDisplay, num]);
                                }
                            }
                        }}>{num}</button>
                    </div>
                ))}
            </div>
            <div className='run-reset'>
                <button onClick={() => {
                    setArrDisplay([]);
                    setSearched(false);
                    disableBtn(false);
                }}>{button.reset}</button>
                <button id='gen-array-btn' onClick={async () => {
                    let newArray = genArray();
                    newArray = newArray.sort()
                    setArrDisplay(newArray);
                    setSearched(false);
                }}>{button.genArray}</button>
                <button id='run-btn' onClick={() => {
                    setSelect(true);
                    setSearched(false);
                    if (arrDisplay.length > 0) {
                        disableRunStartBtn(true);
                    }
                }}>{button.run}</button>
                <div className="slidecontainer">
                    <p className='note'>{text.speed}</p>
                    <input id='speed-slider' type="range" min="5" max="150" defaultValue={75} onChange={e => {
                        setTravelSpeed(205 - e.target.value);
                    }}></input>
                </div>
            </div>
            <div className='alert-box'>
                {select && arrDisplay.length > 0 &&
                    <div>
                        <p className="note">{text.selectNum}</p>
                    </div>
                }
                {searched && arrDisplay.length > 0 &&
                    <div>
                        <p className="note">{
                            index === -1 ? text.notFound : text.found + `${index}`
                        }</p>
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

export default BinarySearch;
