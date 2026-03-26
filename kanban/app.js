const cards = document.querySelectorAll(".card");
for (const card of cards) {
  if (!card.id) {
    card.id = crypto.randomUUID();
  }
}
const lists = document.querySelectorAll(".list");
const newCardInput = document.getElementById("newCardInput");
const addNewCardBtn = document.getElementById("addNewCardBtn");
const form = document.querySelector("form");

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

const createCard = (text) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("draggable", "true");

  const id = crypto.randomUUID();
  card.id = id;
  card.textContent = text;

  // attach drag events
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  return card;
};

const addCardToList = ({ listElement, text }) => {
  const card = createCard(text);
  listElement.appendChild(card);
};

const addCard = () => {
  // TODO: Tasks pending completion -@kyleperkins at 3/21/2026, 4:41:52 AM
  // ensure lists aren't hard coded for future addition
  const list = document.getElementById("list1");
  const newCardInputText = newCardInput.value;

  // if the text field is empty, don't do anything
  if (!newCardInput) return;

  // otherwise, continue
  addCardToList(list, newCardInputText);
  newCardInput.value = "";
  newCardInput.focus();
};
form.addEventListener("submit", (e) => e.preventDefault());

addNewCardBtn.addEventListener("click", addCard);
