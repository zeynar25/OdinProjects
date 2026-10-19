import Node from "./Node.js";

function knightMoves(start, end) {
  const visited = new Set([start.join("")]);
  const positions = [];
  positions.push(new Node(start));

  while (positions.length > 0) {
    // note: array shifting is inefficient.
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
      if (!visited.has(move.join(""))) {
        visited.add(move.join(""));
        const newPosition = new Node(move, currentPath);
        positions.push(newPosition);
      }
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
