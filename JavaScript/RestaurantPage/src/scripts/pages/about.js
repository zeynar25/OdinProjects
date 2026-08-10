export function renderAbout(page) {
  const heading = document.createElement("h1");
  heading.textContent = "About Us";

  const paragraphOne = document.createElement("p");
  paragraphOne.textContent =
    "We are a small coffee shop focused on simple drinks, fresh ingredients, and a calm place to relax.";

  const paragraphTwo = document.createElement("p");
  paragraphTwo.textContent =
    "Stop by for a quick cup or stay a while and enjoy the atmosphere.";

  page.append(heading, paragraphOne, paragraphTwo);
}
