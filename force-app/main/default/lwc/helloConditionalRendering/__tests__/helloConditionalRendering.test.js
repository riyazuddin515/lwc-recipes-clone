import { createElement } from "lwc";
import HelloConditionalRendering from "c/helloConditionalRendering";

describe("c-hello-conditional-rendering", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("Not showing details", () => {
    // Arrange
    const element = createElement("c-hello-conditional-rendering", {
      is: HelloConditionalRendering
    });
    document.body.appendChild(element);

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe("Not showing details.");
  });

  it("These are the details!", async () => {
    const element = createElement("c-hello-conditional-rendering", {
      is: HelloConditionalRendering
    });
    document.body.appendChild(element);
    const inputElement = element.shadowRoot.querySelector("lightning-input");
    inputElement.checked = true;
    inputElement.dispatchEvent(new CustomEvent("change"));

    await flushPromises();

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe("These are the details!");
  });
});
