import coffee_bg from "../images/coffee-bg.jpeg";

const body = document.querySelector("body");
body.style.backgroundImage = `url(${coffee_bg})`;
body.style.backgroundSize = "cover";
body.style.backgroundRepeat = "no-repeat";
body.style.backgroundPosition = "center";
body.style.backgroundAttachment = "fixed";

export { body };
