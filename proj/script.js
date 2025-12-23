 /*<!-- Скрипт для мобильного меню -->*/
 
    document.addEventListener('DOMContentLoaded', function() {
      if (window.innerWidth <= 992) {
        const dropdownItems = document.querySelectorAll('.nav-menu > li');

        dropdownItems.forEach(item => {
          item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            dropdownItems.forEach(other => {
              if (other !== this) {
                other.classList.remove('active-dropdown');
              }
            });

            this.classList.toggle('active-dropdown');
          });
        });

        document.addEventListener('click', function(e) {
          if (!e.target.closest('.nav-menu')) {
            dropdownItems.forEach(item => {
              item.classList.remove('active-dropdown');
            });
          }
        });
      }
    });


 
  document.addEventListener('DOMContentLoaded', function() {
    const reviewItems = document.querySelectorAll('.review-item');
    const prevBtn = document.querySelector('.review-prev');
    const nextBtn = document.querySelector('.review-next');
    const counter = document.querySelector('.review-counter');
    let currentIndex = 0;

    function showReview(index) {
      reviewItems.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
          item.classList.add('active');
        }
      });
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(reviewItems.length).padStart(2, '0')}`;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + reviewItems.length) % reviewItems.length;
      showReview(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % reviewItems.length;
      showReview(currentIndex);
    });

   
  });



  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      item.classList.toggle('active');
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Открытие/закрытие основного мобильного меню
    mobileMenuToggle.addEventListener('click', function() {
      mobileNavMenu.classList.toggle('active');
    });

    // Обработка кликов по кнопкам раскрытия подменю
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        const isActive = submenu.classList.contains('active');

        // Закрываем все другие подменю
        document.querySelectorAll('.dropdown-submenu').forEach(sm => {
          sm.classList.remove('active');
        });

        // Если это не было активно — открываем
        if (!isActive) {
          submenu.classList.add('active');
          this.classList.add('active');
        } else {
          this.classList.remove('active');
        }
      });
    });

    // Закрытие меню при клике на ссылку (опционально)
    const navLinks = document.querySelectorAll('.mobile-nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNavMenu.classList.remove('active');
        // Убираем активность со всех подменю
        document.querySelectorAll('.dropdown-submenu').forEach(sm => {
          sm.classList.remove('active');
        });
        document.querySelectorAll('.dropdown-toggle').forEach(t => {
          t.classList.remove('active');
        });
      });
    });
  });
