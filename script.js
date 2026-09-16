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

carouselButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.carouselDirection === 'next' ? 1 : -1;
    productGrid.scrollBy({ left: direction * productGrid.clientWidth, behavior: 'smooth' });
  });
});