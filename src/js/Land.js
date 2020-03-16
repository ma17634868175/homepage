import Object from "./Object"
let landDom = document.getElementsByClassName('land')[0]

export default class Land extends Object {
    constructor(xSpeed) {
        super(landDom.offsetWidth, landDom.offsetHeight, landDom.offsetLeft, landDom.offsetTop, xSpeed, 0, landDom)
    }
    runing(time) {
        super.runing(time);
        if (Math.abs(this.xAxis) >= landDom.offsetWidth / 2) {
            this.xAxis = 0
        }
    }
}
