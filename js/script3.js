document.addEventListener("DOMContentLoaded", game);

function game() {
  var parentX = document.querySelector(".sliding-puzzle").clientHeight;
  var baseDistance = 30.8;

  var tileMap = {
    1: {
      tileNumber: 1,
      position: 1,
      top: 0,
      left: 0,
    },
    2: {
      tileNumber: 2,
      position: 2,
      top: 0,
      left: baseDistance * 1,
    },
    3: {
      tileNumber: 3,
      position: 3,
      top: 0,
      left: baseDistance * 2,
    },
    4: {
      tileNumber: 4,
      position: 4,
      top: baseDistance,
      left: 0,
    },
    5: {
      tileNumber: 5,
      position: 5,
      top: baseDistance,
      left: baseDistance,
    },
    6: {
      tileNumber: 6,
      position: 6,
      top: baseDistance,
      left: baseDistance * 2,
    },
    7: {
      tileNumber: 7,
      position: 7,
      top: baseDistance * 2,
      left: 0,
    },
    8: {
      tileNumber: 8,
      position: 8,
      top: baseDistance * 2,
      left: baseDistance,
    },
    empty: {
      position: 9,
      top: baseDistance * 2,
      left: baseDistance * 2,
    },
  };

  var history = [];

  function movementMap(position) {
    if (position == 9) return [6, 8];
    if (position == 8) return [5, 7, 9];
    if (position == 7) return [4, 8];
    if (position == 6) return [3, 5, 9];
    if (position == 5) return [2, 4, 6, 8];
    if (position == 4) return [1, 5, 7];
    if (position == 3) return [2, 6];
    if (position == 2) return [1, 3, 5];
    if (position == 1) return [2, 4];
  }

  let shuffleBtn = document.querySelector("#shuffle-book");
  shuffleBtn.addEventListener("click", shuffle, true);

  // document.querySelector("#solve").addEventListener("click", solve, true);
  var tiles = document.querySelectorAll(".surat-book");
  var delay = -50;
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", tileClicked, true);

    delay += 50;
    setTimeout(setup, delay, tiles[i]);
  }

  function setup(tile) {
    var tileId = tile.getAttribute("id");

    var translateString =
      "translateX(" +
      tileMap[tileId].left * 3.3 +
      "%) " +
      "translateY(" +
      tileMap[tileId].top * 3.3 +
      "%)";

    tile.style.webkitTransform = translateString;
    recolorTile(tile, tileId);
  }

  function tileClicked(event) {
    var tileNumber = event.target.getAttribute("id");
    if (
      (isShuffleBtnClicked && checkSol == false && number == 3) ||
      (isShuffleBtnClicked && checkSol == false && number == 30)
    ) {
      moveTile(event.target);
    }
  }

  function moveTile(tile, recordHistory = true) {
    var tileNumber = tile.getAttribute("id");

    if (!tileMovable(tileNumber)) {
      return;
    }

    // Push to history
    if (recordHistory == true) {
      if (history.length >= 3) {
        if (history[history.length - 1] != history[history.length - 3])
          history.push(tileNumber);
      } else {
        history.push(tileNumber);
      }
    }

    var emptyTop = tileMap.empty.top;
    var emptyLeft = tileMap.empty.left;
    var emptyPosition = tileMap.empty.position;
    tileMap.empty.top = tileMap[tileNumber].top;
    tileMap.empty.left = tileMap[tileNumber].left;
    tileMap.empty.position = tileMap[tileNumber].position;

    var xMovement = emptyLeft * 3.3;
    var yMovement = emptyTop * 3.3;

    var translateString =
      "translateX(" + xMovement + "%) " + "translateY(" + yMovement + "%)";

    tile.style.webkitTransform = translateString;

    tileMap[tileNumber].top = emptyTop;
    tileMap[tileNumber].left = emptyLeft;
    tileMap[tileNumber].position = emptyPosition;

    if (checkSolution()) {
      checkSol = true;
      setTimeout(() => {
        modal.style.display = "block";
      }, 1000);
    }

    recolorTile(tile, tileNumber);
  }

  function tileMovable(tileNumber) {
    var selectedTile = tileMap[tileNumber];
    var emptyTile = tileMap.empty;
    var movableTiles = movementMap(emptyTile.position);

    if (movableTiles.includes(selectedTile.position)) {
      return true;
    } else {
      return false;
    }
  }

  var checkSol = false;

  function checkSolution() {
    if (tileMap.empty.position !== 9) return false;

    for (var key in tileMap) {
      if (key != 1 && key != "empty") {
        if (tileMap[key].position < tileMap[key - 1].position) return false;
      }
    }

    // Clear history if solved
    history = [];
    return true;
  }

  function recolorTile(tile, tileId) {
    if (tileId == tileMap[tileId].position) {
      tile.classList.remove("error");
    } else {
      tile.classList.add("error");
    }
  }

  var a = document.getElementById("shuffle-option-book");

  let shuffleOption = 0;
  var isShuffle = false;
  var isShuffleBtnClicked = false;

  a.addEventListener("change", () => {
    shuffleOption = a.options[a.value].textContent;
    shuffleBtn.style.display = "block";
  });
  shuffleTimeouts = [];
  var shuffleCounter = 0;

  var shuffleDelay = 200;
  function shuffle() {
    clearTimers(solveTimeouts);
    shuffleLoop();

    if (shuffleOption == 3) {
      while (shuffleCounter < 2) {
        shuffleDelay += 200;
        shuffleTimeouts.push(setTimeout(shuffleLoop, shuffleDelay));
        shuffleCounter++;
      }
    }

    if (shuffleOption == 30) {
      while (shuffleCounter < 29) {
        shuffleDelay += 200;
        shuffleTimeouts.push(setTimeout(shuffleLoop, shuffleDelay));
        shuffleCounter++;
      }
    }
    isShuffleBtnClicked = true;
    a.style.display = "none";
    shuffleBtn.style.display = "none";
  }

  var lastShuffled;

  var number = 0;

  function shuffleLoop() {
    var emptyPosition = tileMap.empty.position;
    var shuffleTiles = movementMap(emptyPosition);
    var tilePosition =
      shuffleTiles[Math.floor(Math.floor(Math.random() * shuffleTiles.length))];
    var locatedTile;
    for (var i = 1; i <= 8; i++) {
      if (tileMap[i].position == tilePosition) {
        var locatedTileNumber = tileMap[i].tileNumber;
        locatedTile = tiles[locatedTileNumber - 1];
      }
    }
    if (lastShuffled != locatedTileNumber) {
      moveTile(locatedTile);
      number++;
      console.log(number);
      lastShuffled = locatedTileNumber;
    } else {
      shuffleLoop();
    }
  }

  function clearTimers(timeoutArray) {
    for (var i = 0; i < timeoutArray.length; i++) {
      clearTimeout(timeoutArray[i]);
    }
  }

  solveTimeouts = [];

  function solve() {
    clearTimers(shuffleTimeouts);

    repeater = history.length;

    for (var i = 0; i < repeater; i++) {
      solveTimeouts.push(
        setTimeout(moveTile, i * 100, tiles[history.pop() - 1], false)
      );
    }
  }
  var modal = document.querySelector("#myModal");

  modal.addEventListener("click", () => {
    modal.style.display = "none";
    shuffleOption = 0;
    isShuffle = false;
    isShuffleBtnClicked = false;
    checkSol = false;
    a.style.display = "block";
    a.value = "Not selected";
    a.addEventListener("change", () => {
      shuffleOption = a.options[a.value].textContent;
      shuffleBtn.style.display = "block";
    });
  });
}
