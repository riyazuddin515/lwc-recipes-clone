import { createElement } from "lwc";
import EventSimple from "c/eventSimple";

describe("c-event-simple", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("increment and decrement page value by 1 on click of a button", async () => {
    const element = createElement("c-event-simple", {
      is: EventSimple
    });
    document.body.appendChild(element);

    const paginatorEl = element.shadowRoot.querySelector("c-paginator");
    const btnEls = paginatorEl.shadowRoot.querySelectorAll("lightning-button");

    // next button click
    btnEls[1].click();
    await flushPromises();
    let pEl = element.shadowRoot.querySelector("p");
    expect(pEl.textContent).toBe("Page 2");

    // previos button click
    btnEls[0].click();
    await flushPromises();
    pEl = element.shadowRoot.querySelector("p");
    expect(pEl.textContent).toBe("Page 1");
  });
});
