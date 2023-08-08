import "./index.css";
import moon from "./images/icon-moon.svg";
import icon from "./images/icon-cross.svg";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Load items from local storage when the component mounts
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(initialItems); // If no stored items, use the initialItems
    }
  }, []);

  function updateLocalStorage(updatedItems) {
    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
  }
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    updateLocalStorage([...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    updateLocalStorage(items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    updateLocalStorage(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }
  function handleClearItem() {
    setItems([]);
  }
  return (
    <div className="container">
      <Card
        items={items}
        onAddItems={handleAddItems}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handleToggleItem}
        handleClearItem={handleClearItem}
      />
    </div>
  );
}

function Card({
  items,
  onAddItems,
  onDeleteItems,
  onToggleItems,
  handleClearItem,
}) {
  const [sortItem, setSortItem] = useState(items);

  function handleCompletdItems() {
    setSortItem(() => sortItem.filter((item) => item.completed));
  }
  function handleAllItems() {
    setSortItem(items);
  }

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
        <TodoList
          items={items}
          onDeleteItems={onDeleteItems}
          onToggleItems={onToggleItems}
        />
        <Footer
          items={items}
          sortItem={sortItem}
          handleCompletdItems={handleCompletdItems}
          handleAllItems={handleAllItems}
          handleClearItem={handleClearItem}
        />
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
function TodoList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div>
      {items.map((item) => (
        <TodoItem
          item={item}
          onDeleteItems={onDeleteItems}
          onToggleItems={onToggleItems}
          key={item.id}
        />
      ))}
    </div>
  );
}
function TodoItem({ item, onDeleteItems, onToggleItems }) {
  return (
    <>
      <div className="todo-box">
        <div className="todo">
          <div className="checktext">
            <input
              type="checkbox"
              value={item.completed}
              onChange={() => onToggleItems(item.id)}
            />
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

function Footer({
  items,
  handleCompletdItems,
  handleAllItems,
  handleClearItem,
}) {
  const numItemCompleted = items.filter((item) => !item.completed).length;

  return (
    <div>
      <div className="two-menu-box">
        <div className="two-menu">
          <p>{numItemCompleted}items left</p>
          <button className="" onClick={handleClearItem}>
            Clear Completed
          </button>
        </div>
      </div>

      <div className="todo-box2">
        <div className="todo2">
          <div className="checktext">
            <p className="">{numItemCompleted} left</p>
          </div>
          {/* <div className="todo-menu">
            <button onClick={handleAllItems}>All</button>
            <button value="active">Active</button>
            <button value="complete" onClick={handleCompletdItems}>
              Complete
            </button>
          </div> */}
          <button className="" onClick={handleClearItem}>
            Clear Completed
          </button>
        </div>
      </div>
      {/* <div className="todo-box-mobile">
        <div className="todo-mobile">
          <div className="todo-menu">
            <button onClick={() => {}}>All</button>
            <button value="Active">Active</button>
            <button value="complete" onClick={handleCompletdItems}>
              Completed
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
