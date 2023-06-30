
class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.width = 70;
        this.height = 110;
        this.top = 400;
        this.left = 0;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');

        this.element.src = './images/Abu.png';
        this.element.style.position = 'absolute';

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.lives = 3;
        this.score = 0;
        this.scoreElement = document.getElementById('score');

        this.gameScreen.appendChild(this.element);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                this.setDirection(-1); // moving up up
            } else if (event.key === 'ArrowDown') {
                this.setDirection(1); // moving down down
            }
        });

        document.addEventListener('keyup', () => {
            this.setDirection(0); // to stop vertical movement
        });
    }
    
    setDirection(directionY) {
        this.directionY = directionY;
    }

    move() {
        const verticalSpeed = 10;
        const horizontalSpeed = 0;
    
        const nextTop = this.top + this.directionY * verticalSpeed;
        
        if (nextTop < 0) {
            this.top = 0;
        } else if (nextTop > this.gameScreen.offsetHeight - this.height) {
            this.top = this.gameScreen.offsetHeight - this.height;
        } else {
            this.top = nextTop;
        }
    
        this.left += this.directionX * horizontalSpeed;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            this.lives--;
            return true;
        } else {
            return false;
        }
    }

    isCollidingWithReward(rewards) {
        const playerRect = this.element.getBoundingClientRect();

        for (let i = 0; i < rewards.length; i++) {
            const reward = rewards[i];
            const rewardRect = reward.element.getBoundingClientRect();

            if (
                playerRect.left < rewardRect.right &&
                playerRect.right > rewardRect.left &&
                playerRect.top < rewardRect.bottom &&
                playerRect.bottom > rewardRect.top
            ) {
                return true;
            }
        }
        return false;
    }

    removeLife() {
        this.lives--;
    }

    increaseScore() {
        this.score += 10;
    }

    getScore() {
        return this.score;
    }

    remove() {
        this.element.remove();
    }

    playCollisionSound() {
        const collisionSound = new Audio('./sounds/jeez-whered-you-dig-this-bozo-up.mp3');
        collisionSound.play();
      }
}
