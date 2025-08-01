document.addEventListener('DOMContentLoaded', () => {
    const layers = document.querySelectorAll('.layer');
    let currentLayerIndex = 0;

    // Layer 1 Logic
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const persuasionMessage = document.getElementById('persuasion-message');
    
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            openCurrentLayer();
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', () => {
            persuasionMessage.textContent = "Ayolah, jangan galak-galak, Sayang... 🥺 Pilih 'Ya' dong, ya?";
            persuasionMessage.style.opacity = '1';
            yesBtn.style.animation = 'shake 0.5s 3';
        });
    }

    // Layer 2 Logic
    const loveIcon = document.getElementById('loveIcon');
    if (loveIcon) {
        loveIcon.addEventListener('click', () => {
            loveIcon.classList.add('clicked');
            setTimeout(openCurrentLayer, 500); // Wait for animation
        });
    }

    // Layer 3 Logic
    const pinkyPromise = document.getElementById('pinkyPromise');
    if (pinkyPromise) {
        pinkyPromise.addEventListener('click', () => {
            pinkyPromise.classList.add('clicked');
            setTimeout(openCurrentLayer, 500); // Wait for animation
        });
    }

    // Layer 4 Logic
    const photos = document.querySelectorAll('.photo-gallery img');
    let viewedPhotos = new Set();
    const photoNextBtn = document.getElementById('photoNextBtn');
    
    if (photos.length > 0) {
        photos.forEach(photo => {
            photo.addEventListener('click', () => {
                photo.classList.add('viewed');
                viewedPhotos.add(photo.src);
                if (viewedPhotos.size === photos.length) {
                    photoNextBtn.style.display = 'block';
                }
            });
        });
        if (photoNextBtn) {
            photoNextBtn.addEventListener('click', () => {
                openCurrentLayer();
            });
        }
    }


    // Layer 5 Logic
    const musicNextBtn = document.getElementById('musicNextBtn');
    if (musicNextBtn) {
        musicNextBtn.addEventListener('click', () => {
            openCurrentLayer();
        });
    }


    // Layer 6 Logic
    const movieNextBtn = document.getElementById('movieNextBtn');
    if (movieNextBtn) {
        movieNextBtn.addEventListener('click', () => {
            openCurrentLayer();
        });
    }


    // Main function to open a layer
    function openCurrentLayer() {
        if (currentLayerIndex < layers.length - 1) {
            layers[currentLayerIndex].classList.add('open');
            currentLayerIndex++;
        }
    }
});