document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openBtn');
    const noBtn = document.getElementById('noBtn');
    const persuasionMessage = document.getElementById('persuasion-message');
    const buttonsContainer = document.querySelector('.button-group');

    // Handle "Open it" button click
    openBtn.addEventListener('click', () => {
        // Add a class to trigger the open animation
        envelope.classList.add('open');
        // Hide buttons after opening
        buttonsContainer.style.display = 'none';
        persuasionMessage.style.display = 'none';
        // You could add a new button here for "I love you too" etc.
    });

    // Handle "No, I'm shy" button click
    noBtn.addEventListener('click', () => {
        // Show the persuasion message
        persuasionMessage.textContent = "Ayolah, jangan malu-malu! Aku sudah siapkan ini khusus untukmu. Plis, buka yaa.. 🙏";
        persuasionMessage.classList.add('show');
        
        // Hide the "No" button
        noBtn.style.display = 'none';
        
        // Add a little nudge animation to the "Open it" button
        openBtn.style.animation = 'nudge 0.5s infinite alternate';
    });
});