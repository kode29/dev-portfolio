const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

const dragStart = (e) => {
  // this allows the drop location to know which element is being moved when you release it
  e.dataTransfer.setData("text/plain", e.currentTarget.id);
};

const dragEnd = (e) => {
  console.log("Drag ended");
};

const dragOver = (e) => {
  // by default, browsers don't allow browsers to drop elements on other elements
  e.preventDefault();
};

const dragEnter = (e) => {
  e.preventDefault();
  e.currentTarget.classList.add("over");
};

const dragLeave = (e) => {
  e.currentTarget.classList.remove("over");
};

const dragDrop = (e) => {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);
  e.currentTarget.appendChild(card);
  e.currentTarget.classList.remove("over");
};

for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}
