document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentPageIndex = 0; // Current visible page index (starting from 0, which is the cover)

    // Initially hide all pages except the cover
    pages.forEach((page, index) => {
        if (index !== 0) { // All pages except the cover
            page.style.display = 'none'; // Hide them initially
        }
    });

    // Function to update button states
    function updateButtons() {
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === pages.length - 1;
    }

    // Function to show a specific page
    function showPage(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.style.display = 'flex'; // Show the target page
                // Reset any flip classes to ensure proper display for the new page
                page.classList.remove('flip-right', 'flip-left', 'flipped');
            } else {
                page.style.display = 'none'; // Hide other pages
            }
        });
        currentPageIndex = index;
        updateButtons();
    }

    // Handle "Next" button click
    nextBtn.addEventListener('click', () => {
        if (currentPageIndex < pages.length - 1) {
            const currentPage = pages[currentPageIndex];
            const nextPage = pages[currentPageIndex + 1];

            // Apply flip animation to the current page
            currentPage.classList.add('flip-right');

            // Wait for the animation to complete before changing display and z-index
            currentPage.addEventListener('transitionend', function handler() {
                currentPage.removeEventListener('transitionend', handler);

                // Hide the flipped page after animation
                currentPage.style.display = 'none';
                currentPage.classList.remove('flip-right'); // Remove class for next flip

                // Show the next page
                showPage(currentPageIndex + 1);
            });
        }
    });

    // Handle "Previous" button click
    prevBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            const currentPage = pages[currentPageIndex];
            const prevPage = pages[currentPageIndex - 1];

            // Show the previous page immediately but flipped to simulate turning back
            prevPage.style.display = 'flex';
            prevPage.classList.add('flip-left'); // Animate back

            // Wait for the animation on the previous page to complete
            prevPage.addEventListener('transitionend', function handler() {
                prevPage.removeEventListener('transitionend', handler);

                // Hide the current page after the previous page has flipped back
                currentPage.style.display = 'none';
                prevPage.classList.remove('flip-left'); // Remove class for next flip
                showPage(currentPageIndex - 1);
            });
        }
    });

    // Initial button state
    updateButtons();
});