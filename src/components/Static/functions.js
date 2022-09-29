export const text = {
    'start': 'Click a few numbers below to get started!',
    'capacity': 'Max array capacity reached. Click "Run" to sort.',
    'capacitySearch': 'Max array capacity reached. Click "Run" to search.',
    'speed': 'Speed Control:',
    'sorted': 'Array is sorted!',
    'found': 'Value found on index: ',
    'notFound': 'Value not found.',
    'selectNum': 'Select a digit to search for.'
}

export const button = {
    'reset': 'Reset',
    'genArray': 'Generate Array',
    'run': 'Run'
}

export const color = {
    'blue': '#2697d8',
    'lightblue': 'lightblue',
    'coral': 'coral',
    'lightcoral': 'lightcoral',
    'white': 'rgba(255, 255, 255, 0.8)'
}

export const setColor = (color, ...doms) => {
    doms.forEach(dom => dom.style.backgroundColor = color);
}

// Used for merge sort
export const arrColorSwitch = function(start, end, color) {
    let i = start;
    while (i <= end) {
        const [dom] = domSelector([i]);
        setColor(color, dom);
        i++;
    };
};

export const domSelector = (arr) => {
    return arr.map(id => document.getElementById(`${id}`));
}

// Returns a Promise that resolves after "ms" Milliseconds
export const timer = ms => new Promise(res => setTimeout(res, ms))


export const disableBtn = (bool) => {
    const elements = domSelector(['gen-array-btn', 'run-btn', 'speed-slider']);
    const digits = document.getElementsByClassName('num-button');
    
    for (let i = 0; i < digits.length; i++)
        digits[i].disabled = bool ? true : false;
        
    elements.forEach(btn => btn.disabled = bool ? true : false);
};

export const disableRunStartBtn = (bool) => {
    const elements = domSelector(['gen-array-btn', 'run-btn', 'speed-slider']);
        
    elements.forEach(btn => btn.disabled = bool ? true : false);
};

export const genArray = () => {
    const newArray = [];

    for (let i = 0; i < 18; i++) {
        const random = Math.floor(Math.random() * 10);
        newArray.push(random);
    }
    return newArray;
}
