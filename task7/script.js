document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const pagerDots = document.getElementById('pagerDots');
    const pagerText = document.getElementById('pagerText');
    
    let currentPage = 0;
    let slidesPerView = 3;
    let totalPages = 0;
    
    function initGallery() {
        updateSlidesPerView();
        calculateTotalPages();
        createPagerDots();
        updateGallery();
        updateButtons();
    }
    
    function updateSlidesPerView() {
        if (window.innerWidth <= 480) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 768) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }
    
    function calculateTotalPages() {
        totalPages = Math.ceil(slides.length / slidesPerView);
    }
    
    function createPagerDots() {
        pagerDots.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentPage) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            
            pagerDots.appendChild(dot);
        }
    }
    
    function goToPage(page) {
        if (page < 0 || page >= totalPages) return;
        
        currentPage = page;
        updateGallery();
        updateButtons();
        updatePagerText();
    }
    
    function updateGallery() {
        const translateX = -currentPage * 100;
        gallery.style.transform = `translateX(${translateX}%)`;
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }
    
    function updateButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
    
    function updatePagerText() {
        pagerText.textContent = `Страница ${currentPage + 1} из ${totalPages}`;
    }
    
    function nextPage() {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    }
    
    function prevPage() {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    }
    
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevPage();
        if (e.key === 'ArrowRight') nextPage();
    });
    
    window.addEventListener('resize', () => {
        const oldPage = currentPage;
        const oldTotalPages = totalPages;
        
        initGallery();
        
        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }
        
        if (oldPage !== currentPage || oldTotalPages !== totalPages) {
            updateGallery();
            updateButtons();
            updatePagerText();
        }
    });
    
    initGallery();
});