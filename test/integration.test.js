require('@testing-library/jest-dom'); // Mengaktifkan jest-dom untuk toBeInTheDocument dan toBeVisible
const fs = require('fs');
const path = require('path');
const { fireEvent } = require('@testing-library/dom');
const { JSDOM } = require('jsdom');

// Muat file HTML sebelum setiap pengujian
beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = dom.window.navigator;
});

describe('HTML and CSS Integration Tests', () => {
  test('navigation links scroll to correct section', () => {
    const link = document.querySelector('a[href="#sobre-mim"]');
    fireEvent.click(link);

    const section = document.getElementById('sobre-mim');
    expect(section).toBeInTheDocument();  // Memastikan bahwa section ada di dokumen
    expect(section).toBeVisible();        // Memastikan bahwa section terlihat setelah klik
  });
});
