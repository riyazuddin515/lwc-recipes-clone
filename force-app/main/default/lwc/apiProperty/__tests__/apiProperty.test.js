import { createElement } from "lwc";
import ApiProperty from "c/apiProperty";

describe("c-api-property", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render input and chart bar element", () => {
    const element = createElement("c-api-property", {
      is: ApiProperty
    });
    document.body.appendChild(element);

    const liEl = element.shadowRoot.querySelector("lightning-input");
    expect(liEl).not.toBeNull();

    const cbEl = element.shadowRoot.querySelector("c-chart-bar");
    expect(cbEl).not.toBeNull();
  });

  it("change chart bar percentage property", async () => {
    const element = createElement("c-api-property", {
      is: ApiProperty
    });
    document.body.appendChild(element);

    const liEl = element.shadowRoot.querySelector("lightning-input");
    expect(liEl).not.toBeNull();

    liEl.value = 23;
    liEl.dispatchEvent(new CustomEvent("change"));

    await flushPromises();

    const cbEl = element.shadowRoot.querySelector("c-chart-bar");
    expect(cbEl.percentage).toBe(23);
  });
});
