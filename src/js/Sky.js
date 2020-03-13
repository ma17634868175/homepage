let skyDom = document.getElementsByClassName('sky')[0]


class Sky extends Object {
    constructor(xSpeed) {
        super(skyDom.offsetWidth, skyDom.offsetHeight, skyDom.offsetLeft, skyDom.offsetTop, xSpeed, 0, skyDom)
    }
    runing(time){
        super.runing(time);
        if (Math.abs(this.xAxis) >= skyDom.offsetWidth / 2) {
            this.xAxis = 0
        }
    }
}

let sky = new Sky(-10)
setInterval(() => {
    sky.runing(0.5)
}, 50)