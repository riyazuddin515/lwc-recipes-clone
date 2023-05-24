import { createElement } from "lwc";
import HelloForEach from "c/helloForEach";

describe("c-hello-for-each", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Display contact in list", () => {
    // Arrange
    const EXPECTED_CONTACTS_LIST = [
      "Amy Taylor, VP of Engineering",
      "Michael Jones, VP of Sales",
      "Jennifer Wu, CEO"
    ];

    const element = createElement("c-hello-for-each", {
      is: HelloForEach
    });

    document.body.appendChild(element);

    // Assert
    const contactsList = Array.from(
      element.shadowRoot.querySelectorAll("p")
    ).map((eachEle) => eachEle.textContent);
    expect(contactsList).toEqual(EXPECTED_CONTACTS_LIST);
  });
});
