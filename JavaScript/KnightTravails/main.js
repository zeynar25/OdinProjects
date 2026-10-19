import Node from "./Node.js";

function knightMoves(start, end) {
  const map = {
    "00": false,
    "01": false,
    "02": false,
    "03": false,
    "04": false,
    "05": false,
    "06": false,
    "07": false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    20: false,
    21: false,
    22: false,
    23: false,
    24: false,
    25: false,
    26: false,
    27: false,
    30: false,
    31: false,
    32: false,
    33: false,
    34: false,
    35: false,
    36: false,
    37: false,
    40: false,
    41: false,
    42: false,
    43: false,
    44: false,
    45: false,
    46: false,
    47: false,
    50: false,
    51: false,
    52: false,
    53: false,
    54: false,
    55: false,
    56: false,
    57: false,
    60: false,
    61: false,
    62: false,
    63: false,
    64: false,
    65: false,
    66: false,
    67: false,
    70: false,
    71: false,
    72: false,
    73: false,
    74: false,
    75: false,
    76: false,
    77: false,
  };
  map[start.join("")] = true;
  const positions = [];
  positions.push(new Node(start));

  while (positions.length > 0) {
    let positionLength = positions.length;
    let processedPositions = 0;
    while (processedPositions < positionLength) {
      const currentPath = positions.shift();
      const currentPostion = currentPath.value;

      if (currentPostion[0] === end[0] && currentPostion[1] === end[1]) {
        const path = [];
        let currentNode = currentPath;

        while (currentNode) {
          path.push(currentNode.value);
          currentNode = currentNode.parent;
        }
        return path.reverse();
      }

      const moves = possibleNextKnightPosition(currentPostion);
      for (const move of moves) {
        if (!map[move.join("")]) {
          map[move.join("")] = true;
          const newPosition = new Node(move, currentPath);
          positions.push(newPosition);
        }
      }

      processedPositions++;
    }
  }
  return null;
}

function possibleNextKnightPosition(position) {
  let moves = [
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
  ];

  let positions = [];
  for (const move of moves) {
    if (
      position[0] + move[0] >= 0 &&
      position[0] + move[0] <= 7 &&
      position[1] + move[1] >= 0 &&
      position[1] + move[1] <= 7
    ) {
      positions.push([position[0] + move[0], position[1] + move[1]]);
    }
  }
  return positions;
}

const path = knightMoves([0, 0], [7, 7]);
console.log(`You made it in ${path.length - 1} moves!  Here's your path:`);
for (const p of path) {
  console.log(p);
}
