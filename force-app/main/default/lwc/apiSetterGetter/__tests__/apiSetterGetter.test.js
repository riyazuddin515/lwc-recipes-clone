import { createElement } from "lwc";
import ApiSetterGetter from "c/apiSetterGetter";

describe("c-api-setter-getter", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render elements", () => {
    const element = createElement("c-api-setter-getter", {
      is: ApiSetterGetter
    });
    document.body.appendChild(element);

    const liEl = element.shadowRoot.querySelector("lightning-input");
    expect(liEl).not.toBeNull();

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    expect(lbEl).not.toBeNull();
  });

  it("create todo item", async () => {
    const element = createElement("c-api-setter-getter", {
      is: ApiSetterGetter
    });
    document.body.appendChild(element);

    const liEl = element.shadowRoot.querySelectorAll("lightning-input");
    liEl[0].value = "Hello";
    liEl[0].dispatchEvent(new CustomEvent("change"));

    await flushPromises();

    liEl[1].checked = true;
    liEl[1].dispatchEvent(new CustomEvent("change"));

    await flushPromises();

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    lbEl.click();

    await flushPromises();

    const todoListEl = element.shadowRoot.querySelector("c-todo-list");
    expect(todoListEl.todos.length).toBe(3);
    expect(todoListEl.todos[2].description).toBe("Hello");
    expect(todoListEl.todos[2].priority).toBeTruthy();
  });
});
