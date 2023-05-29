import { createElement } from "lwc";
import Clock from "c/clock";

describe("c-clock", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render timestamp", async () => {
    const element = createElement("c-clock", {
      is: Clock
    });
    document.body.appendChild(element);

    let lfdtEl = element.shadowRoot.querySelector(
      "lightning-formatted-date-time"
    );
    const currentValue = lfdtEl.value;

    element.refresh();

    await flushPromises();

    lfdtEl = element.shadowRoot.querySelector("lightning-formatted-date-time");
    expect(lfdtEl.value).not.toBe(currentValue);
  });
});
