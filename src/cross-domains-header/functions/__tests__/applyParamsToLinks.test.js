/**
 * @jest-environment jsdom
 */


const { TextEncoder, TextDecoder } = require("text-encoding");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// import test dependencies
const { JSDOM } = require("jsdom");


const { applyParamsToLinks } = require("../applyParamsToLinks");

describe("applyParamsToLinks", () => {
  let dom;
  let container;

  beforeEach(() => {
    // Set up DOM
    dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    container = dom.window.document.body;
  });


  it("should be able to apply a single Param to links", async () => {
    container.innerHTML = '<a href="http://google.com/">Google</a>';
    const link = container.querySelector("a");
    let id = "123";
    applyParamsToLinks(["google.com"], [{ name: "phg_id", value: id }], dom.window);

    expect(link.href).toBe(
      "http://google.com/?phg_id=123"
    );
  });

  it("should be able to apply multiple Params to links", async () => {
    container.innerHTML = '<a href="http://google.com/">Google</a>';
    const link = container.querySelector("a");
    let p1 = "123";
    let p2 = "1234"
    applyParamsToLinks(
      ["google.com"],
      [
        { name: "p1", value: p1 },
        { name: "p2", value: p2 }
      ],
      dom.window
    );

    expect(link.href).toBe(
      "http://google.com/?p1=123&p2=1234"
    );
  });

  it("should apply Params to links with a trailing slash", async () => {
    container.innerHTML = '<a href="http://google.com/">Google</a>';
    const link = container.querySelector("a");
    let id = "123";
    applyParamsToLinks(["google.com"], [{ name: "phg_id", value: id }], dom.window);

    expect(link.href).toBe(
      "http://google.com/?phg_id=123"
    );
  });

  it("should apply Params to nested links with a trailing slash", async () => {
    container.innerHTML = '<a href="http://google.com/a/nested/link/">Google</a>';
    const link = container.querySelector("a");
    let id = "123";
    applyParamsToLinks(["google.com"], [{ name: "phg_id", value: id }], dom.window);

    expect(link.href).toBe(
      "http://google.com/a/nested/link/?phg_id=123"
    );
  });

  it("should apply Params to links without a trailing slash", async () => {
    container.innerHTML = '<a href="http://google.com">Google</a>';
    const link = container.querySelector("a");
    let id = "123";
    applyParamsToLinks(["google.com"], [{ name: "phg_id", value: id }], dom.window);

    expect(link.href).toBe(
      "http://google.com/?phg_id=123"
    );
  });

  it("should apply Params to links with pre-existing params", async () => {
    container.innerHTML = '<a href="http://google.com?some_pre_existing_param=7346">Google</a>';
    const link = container.querySelector("a");
    let id = "123";
    applyParamsToLinks(["google.com"], [{ name: "phg_id", value: id }], dom.window);

    expect(link.href).toBe(
      "http://google.com/?some_pre_existing_param=7346&phg_id=123"
    );
  });

  it("should be able to apply a single Param to all links on the page", async () => {
    container.innerHTML = `
      <a href="http://google.com/">Google</a>
      <a href="http://google.com/">Google</a>
      <a href="http://google.com/">Google</a>
    `;
    const links = container.querySelectorAll("a");
    let id = "123";
    applyParamsToLinks(["google.com"], [{ name: "phg_id", value: id }], dom.window);

    links.forEach(link => {
      expect(link.href).toBe(
        "http://google.com/?phg_id=123"
      );
    });
  });

});

