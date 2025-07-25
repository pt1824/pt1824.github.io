// Get modal and elements
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close');
const images = document.querySelectorAll('.image-grid img');

// Swiper Initialization for Mobile
let swiperInstances = [];

function initSwipers() {
    // Destroy existing Swiper instances if they exist
    swiperInstances.forEach(instance => {
        instance.destroy(true, true);
    });
    swiperInstances = [];

    // Initialize Swiper for each .image-grid.swiper on mobile (≤ 768px)
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.image-grid.swiper').forEach((swiperElement) => {
            const swiperInstance = new Swiper(swiperElement, {
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });
            swiperInstances.push(swiperInstance);
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swipers
    initSwipers();

    // Add click event to each image for modal
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

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});

// Re-run Swiper initialization on window resize
window.addEventListener('resize', initSwipers);