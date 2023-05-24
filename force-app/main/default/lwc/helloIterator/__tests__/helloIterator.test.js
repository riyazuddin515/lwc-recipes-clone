import { createElement } from "lwc";
import HelloIterator from "c/helloIterator";

const EXPECTED_CONTACTS_LIST = [
  "Amy Taylor, VP of Engineering",
  "Michael Jones, VP of Sales",
  "Jennifer Wu, CEO"
];

describe("c-hello-iterator", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Display contact in list and 2 divs", () => {
    const element = createElement("c-hello-iterator", {
      is: HelloIterator
    });
    document.body.appendChild(element);

    const contacts = Array.from(
      element.shadowRoot.querySelectorAll("span")
    ).map((e) => e.textContent);
    expect(contacts).toEqual(EXPECTED_CONTACTS_LIST);
  });

  it("2 div at first and last", () => {
    const element = createElement("c-hello-iterator", {
      is: HelloIterator
    });
    document.body.appendChild(element);

    const firstDiv = element.shadowRoot.querySelector(".first");
    expect(firstDiv.nextElementSibling.textContent).toBe(
      EXPECTED_CONTACTS_LIST[0]
    );

    const lastDiv = element.shadowRoot.querySelector(".last");
    expect(lastDiv.previousElementSibling.textContent).toBe(
      EXPECTED_CONTACTS_LIST[2]
    );
  });
});
