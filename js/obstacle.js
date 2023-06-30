class Obstacle {
    constructor(gameScreen, width, height) {
        this.gameScreen = gameScreen
        this.left = Math.floor(Math.random() * 900 + 900)
        this.top = Math.floor(Math.random() * 500 + 100)
        this.width = 140
        this.height = 110
        this.element = document.createElement('img')

        this.element.src = './images/Iago1.png';
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`

        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`

        this.gameScreen.appendChild(this.element)
    }
    
    
    move() {
        this.left -= 5
        this.updatePosition()

        if (this.left + this.width < 0) {
            this.remove()
        }
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`
    }

    remove() {
        this.element.remove()
    }
}
