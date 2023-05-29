import { createElement } from "lwc";
import ApiMethod from "c/apiMethod";

describe("c-api-method", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("render button and clock elements", () => {
    const element = createElement("c-api-method", {
      is: ApiMethod
    });
    document.body.appendChild(element);

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    expect(lbEl).not.toBeNull();

    const clockEl = element.shadowRoot.querySelector("c-clock");
    expect(clockEl).not.toBeNull();
  });

  it("perform refresh time click to call clocks public method", () => {
    const element = createElement("c-api-method", {
      is: ApiMethod
    });
    document.body.appendChild(element);

    const lbEl = element.shadowRoot.querySelector("lightning-button");

    let clockEl = element.shadowRoot.querySelector("c-clock");
    clockEl.refresh = jest.fn();

    lbEl.click();

    clockEl = element.shadowRoot.querySelector("c-clock");
    expect(clockEl.refresh).toHaveBeenCalled();
  });
});
