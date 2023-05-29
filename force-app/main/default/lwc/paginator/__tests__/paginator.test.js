import { createElement } from "lwc";
import Paginator from "c/paginator";

describe("c-paginator", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("send next & previous events on click of a button", () => {
    const element = createElement("c-paginator", {
      is: Paginator
    });
    document.body.appendChild(element);

    // Mock handlers
    const handlerPrevious = jest.fn();
    const handlerNext = jest.fn();
    // Add event listners to catch child events
    element.addEventListener("previous", handlerPrevious);
    element.addEventListener("next", handlerNext);

    element.shadowRoot
      .querySelectorAll("lightning-button")
      .forEach((btn) => btn.click());

    expect(handlerPrevious.mock.calls.length).toBe(1);
    expect(handlerNext.mock.calls.length).toBe(1);
  });
});
