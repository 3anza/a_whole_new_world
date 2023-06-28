window.addEventListener('load', () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;
  
  function startGame() {
    // Show game screen and hide the intro screen
    console.log("start game")
    game = new Game()
    game.start()
  }

  function keyDown(event) {
    const key = event.key;
      const possibleKeyStrokes =[
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];

      if (possibleKeyStrokes.includes(key)) {
        event.preventDefault();
        // Update player's directionX and directionY based on the key passed
        switch(key) {
          case "ArrowLeft":
            game.player.directionX = -1
            break;
          case "ArrowUp":
          game.player.directionY = -1;
            break;
          case "ArrowRight":
          game.player.directionX = 1;
            break;
          case "ArrowDown":
          game.player.directionY = 1;
            break;
        }
      }
    }
  
  // Start the game when the user clicks the start button
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", () => {
    game.restart();
  });

  document.addEventListener("keydown", keyDown);
    game.player.directionX = 0
    game.player.directionY = 0

});

