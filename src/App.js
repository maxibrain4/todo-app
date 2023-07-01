import "./index.css";
import moon from "./images/icon-moon.svg";
import icon from "./images/icon-cross.svg";
import { useState } from "react";
const initialItems = [
  {
    id: 1,
    description: "Complete online JavaSceipt course",
    completed: true,
  },
  {
    id: 2,
    description: "Jog around the pack 3x",
    completed: false,
  },
  {
    id: 3,
    description: "10 minutes meditation",
    completed: false,
  },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="container">
      <Card
        items={items}
        onAddItems={handleAddItems}
        onDeleteItems={handleDeleteItem}
      />
    </div>
  );
}

function Card({ items, onAddItems, onDeleteItems }) {
  return (
    <div className="card">
      <div className="bold-text-icon">
        <div className="text-box">
          <h2 className="header-text">TODO</h2>
        </div>
        <div className="icon-box">
          <img src={moon} alt="" />
        </div>
      </div>
      <SearchBox onAddItems={onAddItems} />

      <div className="outside-todo-box">
        {/* <TodoItem items={items} /> */}
        <TodoList items={items} onDeleteItems={onDeleteItems} />
        <Footer />
      </div>
    </div>
  );
}

function SearchBox({ onAddItems }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, completed: false, id: Date.now() };
    if (!description) return;
    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
  }
  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <input
        type="text"
        className="inputb"
        placeholder="Create a new todo..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
}
function TodoList({ items, onDeleteItems }) {
  return (
    <div>
      {items.map((item) => (
        <TodoItem item={item} onDeleteItems={onDeleteItems} key={item.id} />
      ))}
    </div>
  );
}
function TodoItem({ item, onDeleteItems }) {
  return (
    <>
      <div className="todo-box">
        <div className="todo">
          <div className="checktext">
            <input type="checkbox" />
            <p
              className="todo-text"
              style={
                item.completed
                  ? { textDecoration: "line-through", color: "#ccc" }
                  : {}
              }
            >
              {item.description}
            </p>
          </div>
          <button onClick={() => onDeleteItems(item.id)}>
            <img src={icon} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div>
      <div className="two-menu-box">
        <div className="two-menu">
          <p>5mins left</p>
          <p className="">Clear Completeed</p>
        </div>
      </div>

      <div className="todo-box2">
        <div className="todo2">
          <div className="checktext">
            <p className="">5mins left</p>
          </div>
          <div className="todo-menu">
            <div>All</div>
            <div>Active</div>
            <div>Complete</div>
          </div>
          <p className="">Clear Completeed</p>
        </div>
      </div>
      <div className="todo-box-mobile">
        <div className="todo-mobile">
          <div className="todo-menu">
            <div>All</div>
            <div>Active</div>
            <div>Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
