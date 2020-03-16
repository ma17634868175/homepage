import Sky from "./Sky"
import Land from "./Land"
import Bird from "./Bird"
import ProductionPipeDouble from "./Pipe"
let gameOverCover = document.getElementsByClassName('gameOver')[0]

export default class Game {
    constructor(frame) {
        this.frame = frame //帧数
        this.gameTimer = null
        this.sky = new Sky(-40)
        this.land = new Land(-180)
        this.bird = new Bird(1)
        this.productionPipeDouble = new ProductionPipeDouble(2000, -180)
        this.isGameOver = false
        this.keyEvent()
    }

    // 开始游戏
    startGame() {
        if (this.isGameOver) {
            this.restartGame()
        }
        if (!this.gameTimer) {
            this.isGameOver = false

            this.bird.startWavingWing()
            this.productionPipeDouble.stratProduction()
            this.gameTimer = setInterval(() => {
                this.sky.runing(1 / this.frame)
                this.land.runing(1 / this.frame)
                this.bird.runing(1 / this.frame)

                this.productionPipeDouble.allPipe.forEach(pipe => {
                    pipe.runing(1 / this.frame)
                })

                this.determineGame()
            }, 1000 / this.frame)
        }
    }

    // 停止游戏
    stopGame() {
        this.bird.stopWavingWing()
        this.productionPipeDouble.stopProduction()
        clearInterval(this.gameTimer)
        this.gameTimer = null
    }

    // 重启游戏
    restartGame() {
        gameOverCover.style.opacity = 0
        location.reload();
    }

    // 注册键盘事件
    keyEvent() {
        document.onkeydown = e => {
            if (e.key == ' ') {
                this.bird.jump(-750)
            } else if (e.key === 'Enter') {
                this.gameTimer ? this.stopGame() : this.startGame()
            }
        }
    }

    // 游戏结束判定
    determineGame() {
        if (this.bird.yAxis <= 0) {
            // 鸟碰天
            this.stopGame()
            this.isGameOver = true
            gameOverCover.style.opacity = 1
        } else if (this.bird.yAxis + this.bird.height >= this.land.yAxis) {
            // 鸟碰地
            this.stopGame()
            this.isGameOver = true
            gameOverCover.style.opacity = 1
        } else if (this.pipeDetermine()) {
            // 鸟碰水管
            this.stopGame()
            this.isGameOver = true
            gameOverCover.style.opacity = 1
        }
    }

    // 水管判定
    pipeDetermine() {
        let allPipe = this.productionPipeDouble.allPipe
        let length = allPipe.length
        for (let i = 0; i < length; i++) {
            if (collision(this.bird, allPipe[i].pipeDown) || collision(this.bird, allPipe[i].pipeUp)) {
                return true
            }
        }
        return false

        // 矩形重叠判定
        function collision(bird, pipe) {
            let birdX = bird.xAxis + bird.width / 2
            let birdY = bird.yAxis + bird.height / 2
            let pipeX = pipe.xAxis + pipe.width / 2
            let pipeY = pipe.yAxis + pipe.height / 2
            let x = Math.abs(birdX - pipeX);
            let y = Math.abs(birdY - pipeY);

            if (x < (bird.width + pipe.width) / 2 &&
                y < (bird.height + pipe.height) / 2) {
                return true
            }
            return false
        }
    }

}

