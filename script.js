// Get modal and elements
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImg');
const closeBtn = document.querySelector('.close');
const images = document.querySelectorAll('.image-grid img');

// Swiper Initialization for Mobile
let swiperInstances = [];

function initSwipers() {
    // Destroy existing Swiper instances
    swiperInstances.forEach(instance => {
        if (instance && instance.destroy) {
            instance.destroy(true, true); // Remove Swiper styles and classes
        }
    });
    swiperInstances = [];

    // Initialize Swiper only on mobile (≤ 768px)
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.image-grid.swiper').forEach((swiperElement) => {
            // Reset Swiper inline styles
            swiperElement.style.display = 'block';
            const wrapper = swiperElement.querySelector('.swiper-wrapper');
            if (wrapper) {
                wrapper.style.display = 'flex';
                wrapper.style.transform = ''; // Clear transform styles
            }
            const slides = swiperElement.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                slide.style.display = 'flex';
                slide.style.transform = ''; // Clear slide transforms
            });

            const swiperInstance = new Swiper(swiperElement, {
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: {
                    el: swiperElement.querySelector('.swiper-pagination'), // Scope to this Swiper
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperElement.querySelector('.swiper-button-next'), // Scope to this Swiper
                    prevEl: swiperElement.querySelector('.swiper-button-prev'), // Scope to this Swiper
                },
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                // Enable lazy loading
                lazy: {
                    loadPrevNext: true,
                },
            });
            swiperInstances.push(swiperInstance);
        });
    } else {
        // Reset desktop layout
        document.querySelectorAll('.image-grid.swiper').forEach((swiperElement) => {
            swiperElement.style.display = 'grid'; // Restore grid layout
            const wrapper = swiperElement.querySelector('.swiper-wrapper');
            if (wrapper) {
                wrapper.style.display = ''; // Reset to CSS-defined style
                wrapper.style.transform = ''; // Clear transforms
                wrapper.classList.remove('swiper-wrapper-initialized'); // Remove Swiper classes
            }
            const slides = swiperElement.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                slide.style.display = ''; // Reset slide styles
                slide.style.transform = '';
                slide.classList.remove('swiper-slide-active', 'swiper-slide-next', 'swiper-slide-prev'); // Remove Swiper classes
            });
            // Hide pagination and navigation
            const pagination = swiperElement.querySelector('.swiper-pagination');
            const prevButton = swiperElement.querySelector('.swiper-button-prev');
            const nextButton = swiperElement.querySelector('.swiper-button-next');
            if (pagination) pagination.style.display = 'none';
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
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

// Re-run Swiper initialization on window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initSwipers, 100); // Debounce resize events
});