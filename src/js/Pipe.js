class Pipe extends Object {
    constructor(height, xAxis, yAxis, xSpeed, dom) {
        super(pipeUpDom.offsetWidth, height, xAxis, yAxis, xSpeed, 0, dom)
        this.PipeArr = []
        this.pipeTimer = null
    }



}

class PipeDouble {
    constructor() {
        this.pipeUp = null
        this.pipeDown = null
        this.content = skyDom.offsetHeight - landDom.offsetHeight
        this.clearance = this.content * 0.3
        this.maxHeight = this.content * 0.6
        this.minHeight = this.content * 0.1
    }
    // 造水管
    createPipe(xSpeed) {
        let newPipeUp = this.createDiv('pipeUp')
        let newPipeDown = this.createDiv('pipeDown')
        background.appendChild(newPipeUp)
        background.appendChild(newPipeDown)
        let newHeight = this.randomHeight()
        this.pipeUp = new Pipe(newHeight.up, skyDom.offsetWidth / 2, this.content - newHeight.up, xSpeed, newPipeUp)
        this.pipeDown = new Pipe(newHeight.down, skyDom.offsetWidth / 2, 0, xSpeed, newPipeDown)
    }

    // 制造dom
    createDiv(className) {
        let div = document.createElement('div')
        div.className = className;
        return div
    }

    // 随机生成水管高度
    randomHeight() {
        let up = null
        let down = null
        down = Math.floor(Math.random() * (this.maxHeight - this.minHeight) + this.minHeight)
        up = skyDom.offsetHeight - landDom.offsetHeight - down - this.clearance
        return {
            up,
            down
        }
    }

    // 判断是否移出可视区(防止dom元素过多网页卡顿)
    isOver() {
        return this.pipeUp.xAxis < -this.pipeUp.width
    }

    // 移动水管
    runing(time) {
        this.pipeUp.runing(time)
        this.pipeDown.runing(time)
    }
}

class ProductionPipeDouble {
    constructor(interval, xSpeed) {
        this.xSpeed = xSpeed
        this.interval = interval
        this.productionTimer = null
        this.allPipe = []
    }

    // 开始生产
    stratProduction() {
        if (!this.productionTimer) {
            this.productionTimer = setInterval(() => {
                let pipeDouble = new PipeDouble()
                pipeDouble.createPipe(this.xSpeed)
                this.allPipe.push(pipeDouble)

                this.removePipe()
            }, this.interval)
        }
    }

    // 停止生产
    stopProduction() {
        clearInterval(this.productionTimer)
        this.productionTimer = null
    }

    // 移除水管
    removePipe() {
        this.allPipe.forEach((pipe, index, arr) => {
            if (pipe.isOver()) {
                arr.splice(index, 1)
                background.removeChild(pipe.pipeUp.dom)
                background.removeChild(pipe.pipeDown.dom)
            }
        })

    }
}