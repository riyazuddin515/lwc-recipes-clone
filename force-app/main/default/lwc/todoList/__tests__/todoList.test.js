import { createElement } from "lwc";
import TodoList from "c/todoList";

const TODOS_INPUT = [
  { id: 1, description: "Explore recipes", priority: false },
  { id: 2, description: "Install Ebikes sample app", priority: true }
];

describe("c-todo-list", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushtPromises() {
    return Promise.resolve();
  }

  it("render todos", () => {
    const element = createElement("c-todo-list", {
      is: TodoList
    });
    element.todos = TODOS_INPUT;
    document.body.appendChild(element);

    const div = element.shadowRoot.querySelectorAll("div");
    expect(div.length).toBe(TODOS_INPUT.length);

    const p = element.shadowRoot.querySelectorAll("p");
    expect(p[0].textContent).toBe(TODOS_INPUT[0].description);
    expect(p[1].textContent).toBe("Priority: " + TODOS_INPUT[0].priority);
  });

  it("render priority todos", async () => {
    const element = createElement("c-todo-list", {
      is: TodoList
    });
    element.todos = TODOS_INPUT;
    document.body.appendChild(element);

    const liEl = element.shadowRoot.querySelector("lightning-input");
    liEl.checked = true;
    liEl.dispatchEvent(new CustomEvent("change"));

    await flushtPromises();

    const div = element.shadowRoot.querySelector("div");
    expect(div.length).toBe();

    const p = element.shadowRoot.querySelectorAll("p");
    expect(p[0].textContent).toBe(TODOS_INPUT[1].description);
    expect(p[1].textContent).toBe("Priority: " + TODOS_INPUT[1].priority);
  });
});
