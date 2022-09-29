import '../../Static/algorithms.css';
import { useState } from 'react';
import { text, button, color, setColor, domSelector, timer, disableBtn, genArray, disableRunStartBtn } from '../../Static/functions';

const LinearSearch = () => {
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
        const arr = arrDisplay;
        setIndex(-1);

        for (let i = 0; i < arr.length; i++) {
            const [currentBlock] = domSelector([i]);
            setColor(color.blue, currentBlock);
            await timer(travelSpeed);
            setColor(color.lightblue, currentBlock);

            if (arr[i] === searchVal) {
                setColor(color.coral, currentBlock);
                await timer(locateSpeed);
                setColor(color.lightblue, currentBlock);

                setIndex(i);
                break
            }
        };

        disableBtn(false);
        setSearched(true);
    };

    return (
        <center>
            <h1><a href='https://en.wikipedia.org/wiki/Linear_search'>Linear Search</a></h1>
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
                    const newArray = genArray();
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

export default LinearSearch;
