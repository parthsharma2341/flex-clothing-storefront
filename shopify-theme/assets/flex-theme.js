// FLEX Theme Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileDrawer = document.querySelector('[data-mobile-drawer]');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-open');
    });
  }

  // Collapsible Accordions
  const accordions = document.querySelectorAll('.flex-accordion-trigger');
  accordions.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.flex-accordion-item');
      if (parent) {
        parent.classList.toggle('is-active');
      }
    });
  });

  // Variant selector change handler
  const variantSelects = document.querySelectorAll('[data-variant-select]');
  variantSelects.forEach((select) => {
    select.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const price = selectedOption.dataset.price;
      const comparePrice = selectedOption.dataset.comparePrice;
      const priceTarget = document.querySelector('[data-product-price]');
      if (priceTarget && price) {
        priceTarget.textContent = price;
      }
    });
  });
});
