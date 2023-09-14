import { desk, chipsArr } from "./data.js";
import { chipToHtml, cellToHtml } from "./chip.js";
import { shuffleArr } from "./utils.js";

const gameTable = document.querySelector(".game-table");
let game = document.querySelector(".game");
const shuflleBtn = document.querySelector(".btn-shuffle");
// const toShuffle = shuffleArr(arr);
const chips = document.querySelector(".chips");
const body = document.querySelector("body");

const renderChip = (data) => {
  const a = data.map(chipToHtml).join("");
  chips.innerHTML = a;
};
renderChip(chipsArr);

const renderDesk = (data) => {
  const b = data.map(cellToHtml).join("");
  gameTable.innerHTML = b;
};
renderDesk(desk);

const chipsArray = document.querySelectorAll(".chip");

const newChipsArr = Array.from(chipsArray);

const getChipId = (arr) =>
  arr.map((chip) => {
    return Number(chip.dataset.number);
  });
const startChipsArray = getChipId(newChipsArr);

// const newCellArr = Array.from(document.querySelectorAll(".chip-box"));

let coordinates = setCoordinates(
  newChipsArr.map((cell) => {
    return Number(cell.dataset.number);
  })
);

shuflleBtn.addEventListener("click", () => {
  const arrToShuffle = shuffleArr(coordinates.flat());
  coordinates = setCoordinates(arrToShuffle);
  setChipPosition(coordinates);
});

setChipPosition(coordinates);
// const newArr = cellCoordinates(newCellArr);
// let obj = Object.assign({}, newArr[0]);

function setCoordinates(arr) {
  const coordinates = [[], [], [], []];
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    coordinates[y][x] = arr[i];
    x++;
  }

  return coordinates;
}

// console.log(q);

function findCoordinates(number, coordinates) {
  for (let y = 0; y < coordinates.length; y++) {
    for (let x = 0; x < coordinates[y].length; x++) {
      if (coordinates[y][x] === number) {
        return { x, y };
      }
    }
  }
}

function setChipPosition(coordinates) {
  for (let y = 0; y < coordinates.length; y++) {
    for (let x = 0; x < coordinates[y].length; x++) {
      const value = coordinates[y][x];
      const item = newChipsArr[value - 1];

      setItem(item, x, y);
    }
  }
}

function setItem(item, x, y) {
  const shiftChip = 63;

  item.style.transform = `translate3D(${x * shiftChip}px, 
    ${y * shiftChip}px, 0)`;
}

// const findCoordinates = (arr) => {
//   for (let y = 0; y < coordinates.length; y++) {
//      for (let x = 0; x < coordinates[y].length; x++) {

//     }
// };

// console.log(setCellPosition(q));

// let obj = {};
// for (let i = 0; i < newArr.length; i++) {
//   obj = newArr[0][i];
// }
// console.log(asd);
// const newArr = chipsArr.forEach((chip) => {
//   chip = new Array(`${data.id}`);
//   console.log(newArr);
// });

// const getPosition = (arr1, arr2) => {
//   for (let i of arr1) {
//     for (let j of arr2) {
//       return (arr1[i] = arr2[j]);
//     }
//   }
// };

// console.log(getPosition(d, newArr));

// getPosition(arr);

// let isCanMove = false;
// if()

// chips.forEach((chip) => {

// chips.addEventListener("click", (evt) => {
//   let isCanMove = false;
//   const chipClick = evt.target.closest(".chip");
//   const chipNumber = chipClick.dataset.number;
//   console.log(chipNumber);
// });
// const emptyChip = newChipsArr[newChipsArr.length - 1];
// console.log(emptyChip);
// emptyChip.style.display = "none";

// emptyChip.style.display = "none";

chips.addEventListener("click", (evt) => {
  const emptyChip = 16;
  const chipClick = evt.target.closest(".chip");
  const chipNumber = Number(chipClick.dataset.number);
  const chipCoordinate = findCoordinates(chipNumber, coordinates);
  const emptyChipCoordinate = findCoordinates(emptyChip, coordinates);
  const canMove = canMoveChip(chipCoordinate, emptyChipCoordinate);

  if (canMove) {
    swapChips(chipCoordinate, emptyChipCoordinate, coordinates);
    setChipPosition(coordinates);
  }
});

function canMoveChip(coordinate1, coordinate2) {
  const nextChipX = Math.abs(coordinate1.x - coordinate2.x);
  const nextChipY = Math.abs(coordinate1.y - coordinate2.y);

  return (
    (nextChipX === 1 || nextChipY === 1) &&
    (coordinate1.x === coordinate2.x || coordinate1.y === coordinate2.y)
  );
}

function swapChips(chipCoordinate1, chipCoordinate2, coordinates) {
  const chipCoord1 = coordinates[chipCoordinate1.y][chipCoordinate1.x];
  coordinates[chipCoordinate1.y][chipCoordinate1.x] =
    coordinates[chipCoordinate2.y][chipCoordinate2.x];
  coordinates[chipCoordinate2.y][chipCoordinate2.x] = chipCoord1;

  if (isWinner(coordinates)) {
    setTimeout(() => {
      game.innerHTML = "";
      const winner = document.createElement("div");
      game.append(winner);
      winner.classList.add("win");
    }, 1000);
  }
}

function isWinner(coordinates) {
  const winArray = coordinates.flat();
  for (let i = 0; i < winArray.length; i++) {
    if (winArray[i] !== startChipsArray[i]) {
      return false;
    }
  }
  return true;
}

// function winClassAdd() {
//   setTimeout(() => {
//     chipsArray.classlist.add("win");
//   }, 1000);
// }

// console.log(newChipsArr);
