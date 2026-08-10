export function renderMenu(page) {
  const heading = document.createElement("h1");
  heading.classList.add("menu-heading");
  heading.textContent = "Menu";

  const menuGroup = document.createElement("div");
  menuGroup.classList.add("menu-group");

  const hotCoffee = document.createElement("div");
  hotCoffee.classList.add("menu-box");

  const hotHeading = document.createElement("h2");
  hotHeading.classList.add("menu-subheading");
  hotHeading.textContent = "Hot Coffee";

  const hotList = document.createElement("ul");
  ["Espresso", "Americano", "Latte", "Cappuccino"].forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("menu-item");
    listItem.textContent = item;
    hotList.append(listItem);
  });

  hotCoffee.append(hotHeading, hotList);

  const coldCoffee = document.createElement("div");
  coldCoffee.classList.add("menu-box");

  const coldHeading = document.createElement("h2");
  coldHeading.classList.add("menu-subheading");
  coldHeading.textContent = "Cold Coffee";

  const coldList = document.createElement("ul");
  ["Iced Coffee", "Iced Latte", "Cold Brew"].forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("menu-item");
    listItem.textContent = item;
    coldList.append(listItem);
  });

  coldCoffee.append(coldHeading, coldList);

  const frappe = document.createElement("div");
  frappe.classList.add("menu-box");

  const frappeHeading = document.createElement("h2");
  frappeHeading.classList.add("menu-subheading");
  frappeHeading.textContent = "Frappe";

  const frappeList = document.createElement("ul");
  ["Mocha Frappe", "Caramel Frappe", "Vanilla Frappe"].forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("menu-item");
    listItem.textContent = item;
    frappeList.append(listItem);
  });

  frappe.append(frappeHeading, frappeList);

  menuGroup.append(hotCoffee, coldCoffee, frappe);

  page.append(heading, menuGroup);
}
