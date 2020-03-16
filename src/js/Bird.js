import Object from "./Object"
let skyDom = document.getElementsByClassName('sky')[0]
let landDom = document.getElementsByClassName('land')[0]
let birdDom = document.getElementsByClassName('bird')[0]

export default class Bird extends Object {
    constructor(ySpeed) {
        super(birdDom.offsetWidth, birdDom.offsetHeight, birdDom.offsetLeft, birdDom.offsetTop, 0, ySpeed, birdDom)
        this.addSpeed = 2000
        this.num = 1
        this.wavingTimer = null
    }

    // 加速度
    newSpeed(time) {
        this.ySpeed += this.addSpeed * time
    }

    // 位置限制
    onRuning() {
        let contant = skyDom.offsetHeight - landDom.offsetHeight - birdDom.offsetHeight
        if (this.yAxis < 0) {
            this.yAxis = 0
        } else if (this.yAxis > contant) {
            this.yAxis = contant
        }
    }

    // 小鸟跳
    jump(power) {
        this.ySpeed = power
    }

    // 开始挥动翅膀
    startWavingWing() {
        if (!this.wavingTimer) {
            this.wavingTimer = setInterval(() => {
                this.num++
                let newNum = this.num % 3 + 1
                this.dom.className = `bird bird_fly${newNum}`
            }, 100)
        }
    }

    // 停止挥动翅膀
    stopWavingWing() {
        clearInterval(this.wavingTimer)
        this.wavingTimer = null
    }

    runing(time) {
        this.newSpeed(time);
        super.runing(time);
    }
}


