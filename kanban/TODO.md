# Kanban Board – Roadmap

## 🎯 Goal

Build a fully interactive, persistent Kanban board that demonstrates:

- Drag & drop logic
- Dynamic DOM manipulation
- State management
- Real-world usability

---

## 🧱 Phase 1 – Foundation (DONE / CURRENT)

- [x] Basic layout (lists + cards)
- [x] Drag & drop between lists
- [x] Fix event handling (`e.currentTarget` vs `e.target`)
- [x] Clean up code structure (optional refactor)

---

## 🥇 Phase 2 – Core Features (NEXT)

### Cards

- [ ] Add new card (input + button)
- [ ] Delete card (button on card)
- [ ] Edit card text

### Drag & Drop (Upgrade)

- [ ] Reorder cards within the same list
- [ ] Insert card BETWEEN other cards (not just append)
- [ ] Visual placeholder while dragging

---

## 🥈 Phase 3 – State & Persistence

### Data Model

- [ ] Introduce `state` object
- [ ] Normalize structure (lists + cards)

### Persistence

- [ ] Save board to `localStorage`
- [ ] Load board on page refresh
- [ ] Handle empty state

---

## 🥉 Phase 4 – UX Improvements

### Visual

- [ ] Card colors / labels (priority, category)
- [ ] Dragging styles (opacity, highlight drop zones)
- [ ] Empty column indicator ("Drop here")

### Interaction

- [ ] Add multiple lists (columns)
- [ ] Rename lists
- [ ] Delete lists

---

## 🚀 Phase 5 – Advanced / Portfolio Boost

### Architecture

- [ ] Refactor into modular JS (separate files or functions)
- [ ] Introduce event delegation for dynamic elements

### Features

- [ ] Filter/search cards
- [ ] Due dates or tags
- [ ] Drag between multiple boards (optional)

---

## 🔒 Phase 6 – Polish

- [ ] Error handling (invalid drops, edge cases)
- [ ] Accessibility (keyboard support, ARIA roles)
- [ ] Mobile drag support (touch events)

---

## 🧠 Notes

- Always build on a feature branch
- Only merge stable features into `main`
- Keep commits small and descriptive
- Prioritize functionality over styling early

---

## ⚡ Next Immediate Task

👉 Implement:

- Add Card
- Delete Card
- Reorder within list (insert between cards)
