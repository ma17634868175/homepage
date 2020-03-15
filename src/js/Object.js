class Object {
    constructor(width, height, xAxis, yAxis, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
    }

    render() {
        this.dom.style.width = `${this.width}px`;
        this.dom.style.height = `${this.height}px`;
        this.dom.style.top = `${this.yAxis}px`;
        this.dom.style.left = `${this.xAxis}px`;
    }

    runing(time) {
        //time秒
        this.xAxis += this.xSpeed * time
        this.yAxis += this.ySpeed * time

        if (this.onRuning) {
            this.onRuning()
        }
        this.render()
    }
}