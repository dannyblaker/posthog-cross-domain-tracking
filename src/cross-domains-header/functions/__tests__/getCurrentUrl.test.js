/**
 * @jest-environment jsdom
 */

const { getCurrentUrl } = require("../getCurrentUrl"); 

const { TextEncoder, TextDecoder } = require("text-encoding");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require("jsdom");

let window;
describe('getCurrentUrl', () => {
  beforeEach(() => {
    const dom = new JSDOM(``, { url: "http://localhost/" });
    window = dom.window;
  });

  it('should return current url', () => {
    const url = getCurrentUrl(window);
    expect(url).toEqual('http://localhost/');
  });

  it('should return updated url after changing the location', () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: 'http://localhost/new-url' };
  
    const url = getCurrentUrl(window);
    expect(url).toEqual('http://localhost/new-url');
  });
  

  it('should return empty string if window.location.href is not defined', () => {
    // Reset the location to simulate an undefined href
    delete window.location;
    const url = getCurrentUrl(window);
    expect(url).toEqual('');
  });

  it('should return empty string if window is not defined', () => {
    // Reset the window object to simulate undefined window
    // delete window;
    const url = getCurrentUrl("undefined");
    expect(url).toEqual('');
  });
});
