console.log("Hello World!");

const number = parseInt(prompt("Enter the number of squares per side:"));
if (number > 100) {
  alert(
    "Please enter a number less than or equal to 100. The browser is likely to cause delays, freeze, or crash if the number is too high.",
  );
  location.reload();
}
const NOFSQUARES = number * number;

const content = document.querySelector("#content");

for (let i = 0; i < NOFSQUARES; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `${500 / number}px`;
  square.dataset.darkness = 0;
  content.appendChild(square);
}

function changeSquareColor(e) {
  if (!isDrawing) return;

  const square = e.target;

  // Darkening effect: Each time the square is hovered over, increase its darkness by 0.3 until it reaches full black (1.0).
  const currentDarkness = Number(square.dataset.darkness || 0);
  const nextDarkness = Math.min(currentDarkness + 0.3, 1);

  square.dataset.darkness = nextDarkness;
  square.style.backgroundColor = `rgba(0, 0, 0, ${nextDarkness})`;
}

const squares = document.querySelectorAll(".square");
let isDrawing = false;

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    isDrawing = true;
  });
  square.addEventListener("mouseover", changeSquareColor);
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});
