class Node {
    constructor(val) {
        this.val = val
        this.color = 'lightblue';
    }

    colorSwitch() {
        this.color = this.color === 'lightblue' ? '#2697d8' : 'lightblue';
    }
}

export default Node;
