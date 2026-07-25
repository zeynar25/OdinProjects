import "./styles.css";
import pikachu from "./images/pikachu.png";
import { greeting } from "./greeting.js";

console.log(greeting);

const image = document.createElement("img");
image.src = pikachu;
document.body.appendChild(image);
