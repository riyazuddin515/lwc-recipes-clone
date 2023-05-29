import { createElement } from "lwc";
import ChartBar from "c/chartBar";

describe("c-chart-bar", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render div with same as percentage value", async () => {
    const element = createElement("c-chart-bar", {
      is: ChartBar
    });
    element.percentage = 50;
    document.body.appendChild(element);

    let div = element.shadowRoot.querySelector("div");
    expect(div).not.toBeNull();
    expect(div.style.width).toBe("50%");

    element.percentage = 89;

    await flushPromises();

    div = element.shadowRoot.querySelector("div");
    expect(div.style.width).toBe("89%");
  });
});
