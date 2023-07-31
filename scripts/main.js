// Intersection Observer setup
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0, // When the entire non-sticky grid is visible
};

const nonStickyGrid = document.getElementById('non-sticky-grid');

const resizeObserver = new ResizeObserver(entries => {
  // Update the height of the non-sticky grid to match its content height
  for (const entry of entries) {
    if (entry.target === nonStickyGrid) {
      nonStickyGrid.style.height = `${entry.target.scrollHeight}px`;
      break;
    }
  }
});

const intersectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.target === nonStickyGrid) {
      if (entry.isIntersecting) {
        // If the non-sticky grid is fully visible, start observing its size changes
        resizeObserver.observe(nonStickyGrid);
      } else {
        // If the non-sticky grid is not visible, stop observing its size changes
        resizeObserver.disconnect();
      }
      break;
    }
  }
}, observerOptions);

// Start observing the non-sticky grid's intersection
intersectionObserver.observe(nonStickyGrid);
