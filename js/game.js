class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro');
    this.gameScreen = document.getElementById('game-screen');
    this.gameEndScreen = document.getElementById('game-end');
    this.height = 670;
    this.width = 1280;
    this.player = new Player(this.gameScreen);
    this.obstacles = [];
    this.obstacleInterval = null;
    this.rewards = [];
    this.rewardInterval = null;
    this.isGameOver = false;
    this.score = 0;
    this.lives = 3;
    this.animateId = 0;
  }

  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.obstacleInterval = setInterval(() => this.generateObstacle(), 1000);
    this.rewardInterval = setInterval(() => this.generateReward(), 2000); 


    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.playBackgroundMusic();

    this.gameLoop();
  }

  playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.5; // Adjust the volume as desired
    backgroundMusic.play();
  }

  generateObstacle() {
    const obstacle = new Obstacle(this.gameScreen);
    this.obstacles.push(obstacle);
  }

  generateReward() {
    const reward = new Reward(this.gameScreen);
    this.rewards.push(reward);
  }

  updateObstacles() {
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.remove();
        this.obstacles.splice(i, 1);
        i--;
        this.lives -= 1;

        this.player.playCollisionSound();
      }
      
      if (obstacle.left + obstacle.width < 0) {
        obstacle.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }
  }

  gameLoop() {
    if (Math.random() > 2000) {
      this.generateObstacle();
    }
    if (Math.random() > 2000) {
      this.generateReward();
    }
    this.updateObstacles();
    this.update();
    this.checkCollisions();

    if (this.isGameOver) {
      this.endGame();
      return;
    }
    
    this.animateId = requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  update() {
    this.player.move();
    this.player.score += 1;
    const obstaclesToKeep = [];
    const rewardsToKeep = [];

    this.obstacles.forEach(obstacle => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.lives -= 1;
      } else if (obstacle.top > this.gameScreen.offsetHeight) {
        this.score += 1;
      } else {
        obstaclesToKeep.push(obstacle);
      }
    });

    this.rewards.forEach(reward => {
      reward.move();
      
      if (this.player.didCollide(reward)) {
        reward.remove();
        this.score += 10;
      } else if (reward.left + reward.width < 0) {
        reward.remove();
      } else {
        rewardsToKeep.push(reward);
      }
    });

    this.obstacles = obstaclesToKeep;
    this.rewards = rewardsToKeep;

    if (this.lives <= 0) {
      this.isGameOver = true;
    }

    this.updateInterface();
  }

  checkCollisions() {
    this.rewards.forEach(reward => {
      if (this.player.didCollide(reward)) {
        reward.remove();
        this.score += 10;
        this.lives -= 1;
      }
    });
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());
    
    this.gameScreen.style.display = 'none';
    this.gameEndScreen.style.display = 'block';
  }

  updateInterface() {
    const livesElement = document.getElementById('lives');
    const scoreElement = document.getElementById('score');
      
    livesElement.textContent = `Lives: ${this.lives}`;
    scoreElement.textContent = `Score: ${this.score}`;
  }
}