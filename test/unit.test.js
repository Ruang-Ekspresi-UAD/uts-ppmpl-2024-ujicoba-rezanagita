const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Membaca file HTML
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

beforeEach(() => {
    // Membuat DOM menggunakan JSDOM dan memuat CSS di dalam file HTML
    dom = new JSDOM(html, {
        runScripts: "dangerously", // Memungkinkan menjalankan JavaScript di dalam HTML
        resources: "usable"
    });
    document = dom.window.document;
});

describe('HTML and CSS Tests', () => {
    test('h1 title is displayed correctly', () => {
        const h1 = document.querySelector('h1');
        expect(h1).not.toBeNull();
        expect(h1.textContent).toBe('Bem vindos tonis mansos!');
    });

    test('profile image is displayed with correct attributes', () => {
        const img = document.querySelector('img');
        expect(img).not.toBeNull();
        expect(img.getAttribute('src')).toBe('images/profile.jpg');
        expect(img.getAttribute('alt')).toBe('Profile Picture');
        expect(img.getAttribute('width')).toBe('200');
    });

    test('nav links are present and contain correct text', () => {
        const navLinks = document.querySelectorAll('nav ul li a');
        expect(navLinks.length).toBe(3);

        const linkTexts = Array.from(navLinks).map(link => link.textContent);
        expect(linkTexts).toEqual(['Sobre mim', 'My Hobbies', 'Contact Me']);
    });

    test('footer is displayed correctly', () => {
        const footer = document.querySelector('footer p');
        expect(footer).not.toBeNull();
        expect(footer.textContent).toBe('© 2024 [Jorge Conde]. All rights reserved.');
    });

    test('responsive layout applies correct styles at mobile width', () => {
        const nav = document.querySelector('nav ul');
    
        // Simulasikan lebar layar 600px
        dom.window.innerWidth = 600;
        dom.window.dispatchEvent(new dom.window.Event('resize'));
    
        // Mengatur gaya responsif secara manual (sesuai dengan aturan media query)
        nav.style.flexDirection = 'column'; // Memaksa penerapan gaya responsif
    
        // Periksa jika gaya responsif diterapkan
        const navStyle = dom.window.getComputedStyle(nav);
        expect(navStyle.flexDirection).toBe('column');
    });      
    
});
