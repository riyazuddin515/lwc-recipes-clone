import { createElement } from "lwc";
import ErrorPanel from "c/errorPanel";

describe("c-error-panel", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("No Error Input", () => {
    const element = createElement("c-error-panel", {
      is: ErrorPanel
    });
    document.body.appendChild(element);

    const h3El = element.shadowRoot.querySelector("h3");
    expect(h3El.textContent).toBe("Error while retrieving data");

    const showBtn = element.shadowRoot.querySelector(".show-details");
    expect(showBtn).toBe(null);

    const hideBtn = element.shadowRoot.querySelector(".hide-details");
    expect(hideBtn).toBe(null);
  });

  it("reduce error with single message in body", async () => {
    const element = createElement("c-error-panel", {
      is: ErrorPanel
    });

    const FULL_ERROR = { body: { message: "mockError" } };
    const REDUCED_ERROR = [FULL_ERROR.body.message];

    element.error = FULL_ERROR;
    document.body.appendChild(element);

    const showBtn = element.shadowRoot.querySelector(".show-details");
    expect(showBtn).not.toBe(null);
    showBtn.dispatchEvent(new CustomEvent("click"));

    await flushPromises();

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe(REDUCED_ERROR[0]);
  });

  it("Show and Hide error message", async () => {
    const element = createElement("c-error-panel", {
      is: ErrorPanel
    });

    const FULL_ERROR = { body: { message: "mockError" } };

    element.error = FULL_ERROR;
    document.body.appendChild(element);

    let showBtn = element.shadowRoot.querySelector(".show-details");
    expect(showBtn).not.toBe(null);

    let hideBtn = element.shadowRoot.querySelector(".hide-details");
    expect(hideBtn).toBe(null);

    showBtn.dispatchEvent(new CustomEvent("click"));
    await flushPromises();

    showBtn = element.shadowRoot.querySelector(".show-details");
    expect(showBtn).toBe(null);

    hideBtn = element.shadowRoot.querySelector(".hide-details");
    expect(hideBtn).not.toBe(null);
  });
});
