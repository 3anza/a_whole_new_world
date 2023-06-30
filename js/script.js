window.addEventListener('load', () => {
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  let game;

  startButton.addEventListener('click', () => {
    console.log('Start button clicked')
    game = new Game();
    game.start();
  });

  restartButton.addEventListener('click', () => {
    location.reload();
  });

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeystrokes = ['ArrowUp', 'ArrowDown'];

    if (possibleKeystrokes.includes(key)) {
      game.player.setDirection(key, 1);
    }
  }

  function handleKeyUp(event) {
    const key = event.key;
    const possibleKeystrokes = ['ArrowUp', 'ArrowDown'];

    if (possibleKeystrokes.includes(key)) {
      game.player.setDirection(key, 0);
    }
  }

  function setPlayerDirection(key, value) {
    switch (key) {
      case 'ArrowUp':
        game.player.directionY = -value;
        break;
      case 'ArrowDown':
        game.player.directionY = value;
        break;
    }
  }
});