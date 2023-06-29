class Game {
    constructor() {
        this.startScreen = document.getElementById('game-intro')
        this.gameScreen = document.getElementById('game-screen')
        this.gameEndScreen = document.getElementById('game-end')
        this.height = 700
        this.width = 900
        this.player = new Player(this.gameScreen)
        this.obstacles = []
        this.obstacleInterval = null
        this.rewards = []
        this.isGameOver = false
        this.score = 0
        this.lives = 3
        this.animateId = 0
    }

    
    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        this.obstacleInterval = setInterval(() => this.generateObstacle(), 2000) 

        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"

        this.gameLoop(); 
    }
        generateObstacle() {
            const obstacle = new Obstacle(this.gameScreen)
            this.obstacles.push(obstacle) 
        }
        updateObstacles() {
            for (let i = 0; i < this.obstacles.length; i++) {
              const obstacle = this.obstacles[i]
              obstacle.move()
        
              if (this.player.didCollide(obstacle)) {
                // Handle collision with obstacle
              }
        
              if (obstacle.left + obstacle.width < 0) {
                obstacle.remove();
                this.obstacles.splice(i, 1);
                i--;
              }
            }
          }

    gameLoop() {
      this.animateId = requestAnimationFrame(() => {
        this.gameLoop();
        });

      if (Math.random() > 0.5) {
        this.rewards.push(new Reward(this.gameScreen));
      }

      this.updateObstacles()
      this.update();
      this.checkCollisions()

      if (this.isGameOver) {
        this.endGame()
        }
    }


    update() {
        console.log("Update")
            this.player.move()
            this.player.score += 1
            const obstaclesToKeep = [];
            this.obstacles.forEach(obstacle => {
            obstacle.move()
            if (this.player.didCollide(obstacle)) {
              obstacle.element.remove()
              this.player.score += 10
              this.lives -= 1
            } else if (obstacle.top > this.gameScreen.offsetHeight) {
              this.score += 1
            } else {
              obstaclesToKeep.push(obstacle)
            }
            })
            this.obstacles = obstaclesToKeep
      
            if (this.lives <= 0) {
            this.isGameOver = true
            }
            this.updateInterface()
        }

        checkCollisions() {
            this.rewards.forEach(reward => {
                if (this.player.didCollide(reward)) {
                    reward.remove();
                    this.rewards = this.rewards.filter(item => item !== reward);
                    this.score += 10;

                    console.log("Got lamp!");
                }
            });
        }
      
        endGame() {
          this.player.element.remove()
          this.obstacles.forEach(obstacle => obstacle.element.remove())
      
          // Hide game screen
          this.gameScreen.style.display = 'none'
          // Show end game screen
          this.gameEndScreen.style.display = 'block'
        }
        updateInterface() {
            const livesElement = document.getElementById('lives');
            const scoreElement = document.getElementById('score');
        
            livesElement.textContent = `Lives: ${this.lives}`;
            scoreElement.textContent = `Score: ${this.score}`;
          }
        
    }
    