import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';

// ROUTING
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

// NAVBAR HAMBURGER
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

hamburger.addEventListener('click', () => { navbarMenu.classList.toggle('active'); });

// SKIP TO CONTENT

const skipToContentLink = document.getElementById('skip-to-content');
const contentElement = document.getElementById('content');

skipToContentLink.addEventListener('click', (event) => {
  event.preventDefault(); // Hentikan perilaku default tautan

  contentElement.scrollIntoView({ behavior: 'smooth' });
});
