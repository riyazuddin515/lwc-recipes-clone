import { createElement } from "lwc";
import CompositionWithAppBuilder from "c/compositionWithAppBuilder";

describe("c-composition-with-app-builder", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("reflects public properties values", () => {
    const element = createElement("c-composition-with-app-builder", {
      is: CompositionWithAppBuilder
    });
    element.picklistValue = "Apple";
    element.stringValue = "SomeString";
    element.numberValue = 23;
    document.body.appendChild(element);

    expect(element.picklistValue).toBe("Apple");
    expect(element.stringValue).toBe("SomeString");
    expect(element.numberValue).toBe(23);

    const pEls = element.shadowRoot.querySelectorAll("p");
    expect(pEls[0].textContent).toBe("picklist value: Apple");
    expect(pEls[1].textContent).toBe("String value: SomeString");
    expect(pEls[2].textContent).toBe("Number value: " + 23);
  });
});
