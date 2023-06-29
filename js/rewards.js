class Reward {
        constructor(gameScreen, width, height) {
            this.gameScreen = gameScreen
            this.left = 900
            this.top = Math.floor(Math.random() * 300 + 100)
            this.width = 100
            this.height = 70
            this.element = document.createElement('img')
    
            this.element.src = '../images/lamp2.png'
            this.element.style.position = 'absolute'
            this.element.style.width = `${this.width}px`
            this.element.style.height = `${this.height}px`
    
            this.element.style.top = `${this.top}px`
            this.element.style.left = `${this.left}px`
    
            this.gameScreen.appendChild(this.element)
            console.log("Reward created!")
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