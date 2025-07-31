document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPageIndex = 0; // Index of the currently visible page (0 = cover)
    let interactionCompleted = false; // Flag to check if interaction on current page is done

    // Function to update button visibility and state
    function updateButtons() {
        if (prevBtn) prevBtn.classList.toggle('show', currentPageIndex > 0);
        if (nextBtn) nextBtn.classList.toggle('show', currentPageIndex < pages.length - 1 && interactionCompleted);
    }

    // Function to set a specific page as active
    function setActivePage(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.classList.add('active-page');
                page.style.zIndex = 1; // Default z-index for active page
                // Reset flip classes if any (important for responsiveness)
                page.classList.remove('flip-right', 'flip-left');
                // Ensure page is visible
                page.style.display = 'flex';
                // Trigger specific page initialization (like hiding next button until interaction)
                initializePageInteraction(page.id);
            } else {
                page.classList.remove('active-page');
                page.style.zIndex = 0; // Pages not active should be behind
                page.style.display = 'none'; // Hide non-active pages
                // Ensure all flip classes are removed from other pages as well
                page.classList.remove('flip-right', 'flip-left');
            }
        });
        currentPageIndex = index;
        updateButtons();
    }

    // Function to handle page flipping animation
    function flipPage(direction) {
        const currentPage = pages[currentPageIndex];
        const targetPageIndex = direction === 'next' ? currentPageIndex + 1 : currentPageIndex - 1;
        const targetPage = pages[targetPageIndex];

        if (!currentPage || !targetPage) return;

        interactionCompleted = false; // Reset interaction for the new page

        // Hide next button during flip
        if (nextBtn) nextBtn.classList.remove('show');
        if (prevBtn) prevBtn.classList.remove('show');

        // Apply flip animation class to the current page
        if (direction === 'next') {
            currentPage.classList.add('flip-right');
        } else {
            // For 'prev', show the target page first, then animate it back
            targetPage.style.display = 'flex'; // Make target page visible
            targetPage.classList.add('flip-left'); // Apply flip animation
            targetPage.style.zIndex = 100; // Bring target page to front during reverse flip
        }

        // Listen for the end of the flip animation on the current page
        currentPage.addEventListener('transitionend', function currentFlipHandler() {
            currentPage.removeEventListener('transitionend', currentFlipHandler);
            
            // Hide the current page after it has flipped
            currentPage.style.display = 'none';
            currentPage.classList.remove('flip-right', 'flip-left');

            // Set the new active page
            setActivePage(targetPageIndex);
        });

        // For 'prev' button, also listen for the end of the animation on the target page
        if (direction === 'prev') {
            targetPage.addEventListener('transitionend', function targetFlipHandler() {
                targetPage.removeEventListener('transitionend', targetFlipHandler);
                targetPage.classList.remove('flip-left');
                targetPage.style.zIndex = 1; // Reset z-index
            });
        }
    }


    // --- Interaction Logic Per Page ---
    function initializePageInteraction(pageId) {
        // Reset interaction completed flag
        interactionCompleted = false;
        if (nextBtn) nextBtn.classList.remove('show'); // Hide next button by default

        switch (pageId) {
            case 'cover':
                const cat = document.getElementById('catInteraction');
                if (cat) {
                    cat.onclick = () => {
                        cat.classList.add('clicked');
                        // Optional: play a sound
                        // new Audio('path/to/meow.mp3').play();
                        setTimeout(() => {
                            cat.classList.remove('clicked');
                            interactionCompleted = true; // Mark interaction complete
                            flipPage('next'); // Automatically go to next page
                        }, 800); // Allow time for bounce animation
                    };
                }
                break;

            case 'page2': // Hidden Heart
                let heartsFound = 0;
                const totalHearts = 3;
                const heartItems = document.querySelectorAll('.hidden-heart-item');
                const heartMessage = document.getElementById('heartMessage');
                
                heartItems.forEach(item => {
                    item.onclick = function() {
                        if (!this.classList.contains('found')) {
                            this.classList.add('found');
                            this.textContent = '❤️'; // Change to heart emoji
                            heartsFound++;
                            if (heartsFound === totalHearts) {
                                heartMessage.textContent = 'Kamu menemukan semua hati! Kamu memang yang terbaik!';
                                heartMessage.classList.add('show');
                                interactionCompleted = true; // Mark interaction complete
                                updateButtons(); // Show next button
                            }
                        }
                    };
                });
                // Reset for next visit (if user goes back and forth)
                heartItems.forEach(item => {
                    item.classList.remove('found');
                    item.textContent = item.dataset.originalText; // Restore original text
                });
                heartMessage.classList.remove('show');
                heartMessage.textContent = '';
                break;

            case 'page3': // Rotating Box
                const rotatingBox = document.getElementById('rotatingBox');
                const memoryDisplay = document.getElementById('memoryDisplay');
                const memories = [
                    "Kencan pertama kita! Canggung tapi manis.",
                    "Saat kita terjebak hujan dan tertawa terbahak-bahak.",
                    "Liburan pertama kita, di mana kita... (isi sendiri).",
                    "Malam saat kamu menemaniku sampai tertidur.",
                    "Setiap kali kamu memberiku kejutan kecil."
                ];
                let rotationCount = 0;
                let currentMemoryIndex = 0;

                rotatingBox.onclick = () => {
                    rotationCount++;
                    rotatingBox.style.transform = `rotateY(${rotationCount * 90}deg)`;
                    
                    setTimeout(() => { // Delay to show memory after rotation starts
                        currentMemoryIndex = (currentMemoryIndex + 1) % memories.length;
                        memoryDisplay.textContent = memories[currentMemoryIndex];
                        memoryDisplay.classList.add('show');
                        
                        if (rotationCount >= 5) { // After 5 rotations, allow next
                            interactionCompleted = true;
                            updateButtons();
                        }
                    }, 300); // Shorter delay for text update
                };
                // Reset for next visit
                rotationCount = 0;
                currentMemoryIndex = 0;
                memoryDisplay.classList.remove('show');
                memoryDisplay.textContent = 'Klik untuk memutar kenangan!';
                rotatingBox.style.transform = 'rotateY(0deg)';
                break;

            case 'page4': // Bubble Message
                const bubbles = document.querySelectorAll('.bubble');
                const bubbleMessage = document.getElementById('bubbleMessage');
                const messageParts = ["Aku", "Cinta", "Kamu", "Selamanya", "!"]; // Message parts
                let poppedBubblesCount = 0;

                bubbles.forEach((bubble, index) => {
                    bubble.textContent = messageParts[index] || ''; // Assign text to bubbles
                    bubble.onclick = function() {
                        if (!this.classList.contains('popped')) {
                            this.classList.add('popped');
                            poppedBubblesCount++;
                            if (poppedBubblesCount === bubbles.length) {
                                setTimeout(() => { // Delay to show full message after all pop
                                    bubbleMessage.textContent = messageParts.join(' ');
                                    bubbleMessage.classList.add('show');
                                    interactionCompleted = true;
                                    updateButtons();
                                }, 500);
                            }
                        }
                    };
                });
                // Reset for next visit
                poppedBubblesCount = 0;
                bubbles.forEach(bubble => {
                    bubble.classList.remove('popped');
                    // Reset opacity/display if necessary from 'pop' animation
                    bubble.style.opacity = '1';
                    bubble.style.transform = 'scale(1)';
                    bubble.style.pointerEvents = 'auto';
                });
                bubbleMessage.classList.remove('show');
                bubbleMessage.textContent = '';
                break;

            case 'page5': // Flower Bloom
                const flowerBud = document.getElementById('flowerBud');
                const flowerMessage = document.getElementById('flowerMessage');
                let clickCount = 0;
                const clicksToBloom = 3;

                flowerBud.onclick = () => {
                    clickCount++;
                    if (clickCount >= clicksToBloom) {
                        flowerBud.classList.add('bloomed');
                        setTimeout(() => {
                            flowerMessage.textContent = 'Janjiku untukmu: aku akan selalu mencintaimu, setiap hari!';
                            flowerMessage.classList.add('show');
                            interactionCompleted = true;
                            updateButtons();
                        }, 1000); // Delay for bloom animation
                    }
                };
                // Reset for next visit
                clickCount = 0;
                flowerBud.classList.remove('bloomed');
                flowerMessage.classList.remove('show');
                flowerMessage.textContent = '';
                break;

            default:
                interactionCompleted = true; // For any page without specific interaction
                updateButtons();
                break;
        }
    }


    // Initial setup
    setActivePage(currentPageIndex); // Show the cover page initially

    // Navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPageIndex < pages.length - 1 && interactionCompleted) {
                flipPage('next');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                flipPage('prev');
            }
        });
    }

    // --- Confetti Effect (optional, from previous version) ---
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // Random bright colors
        confetti.style.width = Math.random() * 8 + 5 + 'px'; // Random size
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random fall duration
        confetti.style.animationDelay = Math.random() * 0.5 + 's'; // Random start delay
        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
    // Uncomment the line below to activate confetti
    // setInterval(createConfetti, 100);
});