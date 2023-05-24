import { createElement } from "lwc";
import HelloExpression from "c/helloExpression";

describe("c-hello-expression", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  function inputHelper(element, firstName, lastName) {
    element.shadowRoot.querySelectorAll("lightning-input").forEach((input) => {
      if (input.name === "firstName" && firstName) {
        input.value = firstName;
        input.dispatchEvent(new CustomEvent("change"));
      } else if (input.name === "lastName" && lastName) {
        input.value = lastName;
        input.dispatchEvent(new CustomEvent("change"));
      }
    });
  }

  it("firstName uppercased", async () => {
    // Arrange
    const element = createElement("c-hello-expression", {
      is: HelloExpression
    });
    document.body.appendChild(element);

    inputHelper(element, "john", undefined);

    await flushPromises();

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe("Uppercased Full Name: JOHN");
  });

  it("lastName uppercased", async () => {
    // Arrange
    const element = createElement("c-hello-expression", {
      is: HelloExpression
    });
    document.body.appendChild(element);

    inputHelper(element, undefined, "doe");

    await flushPromises();

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe("Uppercased Full Name: DOE");
  });

  it("lastName and lastName uppercased", async () => {
    // Arrange
    const element = createElement("c-hello-expression", {
      is: HelloExpression
    });
    document.body.appendChild(element);

    inputHelper(element, "john", "doe");

    await flushPromises();

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe("Uppercased Full Name: JOHN DOE");
  });
});
