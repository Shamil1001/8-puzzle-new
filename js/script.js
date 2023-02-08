// Begin game once DOM loaded
document.addEventListener("DOMContentLoaded", game);

function game() {
  // Data structure to hold positions of tiles
  var parentX = document.querySelector(".sliding-puzzle").clientHeight;
  console.log(parentX);
  // var screenSize=window.innerWidth
  var baseDistance = 32;

  // document.addEventListener("resize", e => {
  //   if (window.innerWidth < 650) {
  //     // baseDistance=20
  //   }
  // });

  var tileMap = {
    1: {
      tileNumber: 1,
      position: 1,
      top: 0,
      left: 0
    },
    2: {
      tileNumber: 2,
      position: 2,
      top: 0,
      left: baseDistance * 1
    },
    3: {
      tileNumber: 3,
      position: 3,
      top: 0,
      left: baseDistance * 2
    },
    4: {
      tileNumber: 4,
      position: 4,
      top: baseDistance,
      left: 0
    },
    5: {
      tileNumber: 5,
      position: 5,
      top: baseDistance,
      left: baseDistance
    },
    6: {
      tileNumber: 6,
      position: 6,
      top: baseDistance,
      left: baseDistance * 2
    },
    7: {
      tileNumber: 7,
      position: 7,
      top: baseDistance * 2,
      left: 0
    },
    8: {
      tileNumber: 8,
      position: 8,
      top: baseDistance * 2,
      left: baseDistance
    },
    empty: {
      position: 9,
      top: baseDistance * 2,
      left: baseDistance * 2
    }
  };

  // Array of tileNumbers in order of last moved
  var history = [];

  // Movement map
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

  // Board setup according to the tileMap
  let shuffleBtn = document.querySelector("#shuffle");
  shuffleBtn.addEventListener("click", shuffle, true);

  document.querySelector("#solve").addEventListener("click", solve, true);
  var tiles = document.querySelectorAll(".surat");
  // var images = document.querySelectorAll(".surat");
  var delay = -50;
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", tileClicked, true);

    // !tileMovable(tileNumber)

    // console.log(images[i]);
    var tileId = tiles[i].getAttribute("id");

    delay += 50;
    setTimeout(setup, delay, tiles[i]);
  }

  function setup(tile) {
    var tileId = tile.getAttribute("id");
    // console.log(tileId)
    // if (!tileMovable(tileId)) {
    // }

    // tile.style.left = tileMap[tileId].left + "%";
    // tile.style.top = tileMap[tileId].top + "%";
    
    // var xMovement = parentX * (tileMap[tileId].left / 100);
    // var yMovement = parentX * (tileMap[tileId].top / 100);
    // var translateString =
      // "translateX(" + xMovement + "px) " + "translateY(" + yMovement + "px)";

    var translateString =
      "translateX(" + tileMap[tileId].left*3.2 + "%) " + "translateY(" + tileMap[tileId].top*3.2 + "%)";

    tile.style.webkitTransform = translateString;
    recolorTile(tile, tileId);
    checkActive(tile, tileId);
  }

  function checkActive(tile, tileId) {
    if (!tileMovable(tileId)) {
      // tile.classList.remove("active");
      // tile.style.opacity='50%'
    } else {
      // tile.classList.add("active");
      // tile.style.opacity='100%'
    }
  }

  function tileClicked(event) {
    var tileNumber = event.target.getAttribute("id");
    // console.log(event.target);
    if (shuffleOption !== 0) {
      moveTile(event.target);
    }

    if (checkSolution()) {
      console.log("You win!");
      setTimeout(() => {
        modal.style.display = "block";
      }, 1000);
    }
  }

  function moveTile(tile, recordHistory = true) {
    var tileNumber = tile.getAttribute("id");
    checkActive(tile, tileNumber);

    if (!tileMovable(tileNumber)) {
      console.log("Tile " + tileNumber + " can't be moved.");
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

    // Swap tile with empty tile
    var emptyTop = tileMap.empty.top;
    var emptyLeft = tileMap.empty.left;
    var emptyPosition = tileMap.empty.position;
    tileMap.empty.top = tileMap[tileNumber].top;
    tileMap.empty.left = tileMap[tileNumber].left;
    tileMap.empty.position = tileMap[tileNumber].position;

    // tile.style.top = emptyTop + "%";
    // tile.style.left = emptyLeft + "%";

    // var xMovement = emptyLeft;
    // var yMovement = emptyTop;

    var xMovement = parentX * (emptyLeft / 100);
    var yMovement = parentX * (emptyTop / 100);
    var translateString =
      "translateX(" + xMovement + "px) " + "translateY(" + yMovement + "px)";

      // var translateString =
      // "translateX(" + tileMap[tileId].left + "%) " + "translateY(" + tileMap[tileId].top + "%)";

    tile.style.webkitTransform = translateString;

    tileMap[tileNumber].top = emptyTop;
    tileMap[tileNumber].left = emptyLeft;
    tileMap[tileNumber].position = emptyPosition;

    // if (checkSolution()) {
    //   // console.log("You win!");
    //   alert("You win!")
    // }

    recolorTile(tile, tileNumber);
  }

  // Determines whether a given tile can be moved
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

  // Returns true/false based on if the puzzle has been solved
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

  // Check if tile is in correct place!
  function recolorTile(tile, tileId) {
    if (tileId == tileMap[tileId].position) {
      tile.classList.remove("error");
    } else {
      tile.classList.add("error");
    }
  }

  let a = document.getElementById("shuffle-option");

  let shuffleOption = 0;

  a.addEventListener("change", () => {
    shuffleOption = a.options[a.value].textContent;
    // console.log(a.options[a.value].textContent);
    shuffleBtn.style.display = "block";
  });

  // Shuffles the current tiles
  shuffleTimeouts = [];
  function shuffle() {
    clearTimers(solveTimeouts);
    var boardTiles = document.querySelectorAll(".tile");
    var shuffleDelay = 200;
    shuffleLoop();

    var shuffleCounter = 0;
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
    a.style.display = "none";
    shuffleBtn.style.display = "none";
  }

  var lastShuffled;

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
      console.log("started");
      solveTimeouts.push(
        setTimeout(moveTile, i * 100, tiles[history.pop() - 1], false)
      );
    }
  }
}

//modal funcionality
var modal = document.getElementById("myModal");
// var btn = document.getElementById("myBtn");
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// };

// span.onclick = function() {
//   modal.style.display = "none";
// };

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
