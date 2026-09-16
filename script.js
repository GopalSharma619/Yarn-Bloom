const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

const sections = document.querySelectorAll('main section[id]');
const updateActiveLink = () => {
  const current = [...sections].find((section) => window.scrollY >= section.offsetTop - 180);
  navLinks.forEach((link) => link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`));
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

const productGrid = document.querySelector('.product-grid');
const carouselButtons = document.querySelectorAll('[data-carousel-direction]');
const productCards = [...productGrid.querySelectorAll('.product-card')];
const productsPerPage = 6;
let productPage = 0;

const updateProducts = () => {
  const pageCount = Math.ceil(productCards.length / productsPerPage);
  const firstProduct = productPage * productsPerPage;

  productCards.forEach((card, index) => {
    card.classList.toggle('is-visible', index >= firstProduct && index < firstProduct + productsPerPage);
  });

  carouselButtons.forEach((button) => {
    const isPrevious = button.dataset.carouselDirection === 'previous';
    button.disabled = isPrevious ? productPage === 0 : productPage === pageCount - 1;
    button.setAttribute('aria-disabled', String(button.disabled));
  });
};

carouselButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.carouselDirection === 'next' ? 1 : -1;
    const pageCount = Math.ceil(productCards.length / productsPerPage);
    productPage = Math.max(0, Math.min(productPage + direction, pageCount - 1));
    updateProducts();
    productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

updateProducts();