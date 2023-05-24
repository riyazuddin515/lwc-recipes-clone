import { createElement } from "lwc";
import HelloBinding from "c/helloBinding";

describe("c-hello-binding", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("display greetings specified by change event target", async () => {
    const element = createElement("c-hello-binding", {
      is: HelloBinding
    });
    document.body.appendChild(element);

    let div = element.shadowRoot.querySelector("div");
    expect(div.textContent).toBe("Hello, World");

    const inp = "TestInp";
    let inputElement = element.shadowRoot.querySelector("lightning-input");
    inputElement.value = inp;
    inputElement.dispatchEvent(new CustomEvent("change"));

    await flushPromises();

    expect(div.textContent).toBe(`Hello, ${inp}`);
  });
});
