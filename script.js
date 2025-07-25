// Get modal and elements
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close');
const images = document.querySelectorAll('.image-grid img');

// Swiper Initialization for Mobile
let swiperInstance = null;

function initSwiper() {
    // Destroy existing Swiper instance if it exists
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }

    // Initialize Swiper only on mobile (≤ 768px)
    if (window.innerWidth <= 768) {
        swiperInstance = new Swiper('.swiper', {
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
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    initSwiper();

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
window.addEventListener('resize', initSwiper);