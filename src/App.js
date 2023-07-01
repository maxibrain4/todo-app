import "./index.css";
import moon from "./images/icon-moon.svg";
import iconcheck from "./images/icon-check.svg";
export default function App() {
  return (
    <div className="container">
      <Card />
    </div>
  );
}

function Card() {
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
      <SearchBox />
      <TodoList />
      <TodoList />
      <div className="outside-todo-box">
        <TodoList />
        <Footer />
      </div>
    </div>
  );
}

function SearchBox() {
  return (
    <div className="input-box">
      <input
        type="text"
        className="inputb"
        placeholder="Create a new todo..."
      />
    </div>
  );
}

function TodoList() {
  return (
    <>
      <div className="todo-box">
        <div className="todo">
          <div className="checktext">
            <input type="checkbox" />
            <p className="todo-text">Complete online JavaSceipt course</p>
          </div>
          <span>
            <img src={iconcheck} alt="" />
          </span>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div>
      <div class="two-menu-box">
        <div class="two-menu">
          <p>5mins left</p>
          <p class="">Clear Completeed</p>
        </div>
      </div>

      <div class="todo-box2">
        <div class="todo2">
          <div class="checktext">
            <p class="">5mins left</p>
          </div>
          <div class="todo-menu">
            <div>All</div>
            <div>Active</div>
            <div>Complete</div>
          </div>
          <p class="">Clear Completeed</p>
        </div>
      </div>
      <div class="todo-box-mobile">
        <div class="todo-mobile">
          <div class="todo-menu">
            <div>All</div>
            <div>Active</div>
            <div>Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
