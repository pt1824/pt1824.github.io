// Get modal and elements
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close');
const images = document.querySelectorAll('.image-grid img');

// Add click event to each image
images.forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'flex'; // Show modal
        modalImg.src = this.src; // Set modal image source
        modalImg.alt = this.alt; // Set modal image alt text
    });
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Optional: Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

