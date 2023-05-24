import { createElement } from "lwc";
import Hello from "c/hello";

describe("c-hello", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("display greeting", () => {
    // Arrange
    const element = createElement("c-hello", {
      is: Hello
    });

    // Act
    document.body.appendChild(element);

    // Assert
    const div = element.shadowRoot.querySelector("div");
    expect(div.textContent).toBe("Hello World!");
  });

  // test('is accessible', async () => {
  //     const element = createElement('c-hello', {
  //         is: Hello
  //     });
  //     document.body.appendChild(element);
  //     await expect(element).toBeAccessible();
  // })
});
