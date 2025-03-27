document.addEventListener("DOMContentLoaded", function () {
    // ======================
    // Carousel Functionality
    // ======================
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".carousel-btn.left");
    const nextBtn = document.querySelector(".carousel-btn.right");

    let currentIndex = 0;
    const carouselItems = document.querySelectorAll(".carousel-item");
    const itemWidth = carouselItems[0].offsetWidth + 20;
    const totalItems = carouselItems.length;
    const itemsPerView = 5;

    function updateCarousel() {
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > totalItems - itemsPerView) currentIndex = totalItems - itemsPerView;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevBtn.addEventListener("click", function () {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - itemsPerView;
        updateCarousel();
    });

    nextBtn.addEventListener("click", function () {
        currentIndex = currentIndex < totalItems - itemsPerView ? currentIndex + 1 : 0;
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();

    // ======================
    // Pop-up Modal Functionality
    // ======================
    const modal = document.getElementById("coinModal");
    const closeModal = document.querySelector(".close");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalBonus = document.getElementById("modal-bonus");

    const modalImage = document.createElement("img");
    modalImage.style.width = "150px";
    modalImage.style.marginBottom = "10px";
    modalImage.id = "modal-image";
    modalImage.style.borderRadius = "10px";

    document.querySelector(".modal-content").insertBefore(modalImage, modalTitle);

    document.querySelectorAll(".carousel-item").forEach((item) => {
        item.addEventListener("click", function () {
            modalTitle.textContent = item.querySelector(".coin-title").textContent;
            modalPrice.textContent = "Price: " + item.querySelector(".coin-price").textContent;
            modalBonus.innerHTML = "Bonus: " + item.querySelector(".bonus-info").innerHTML;
            modalImage.src = item.querySelector("img").src;
            modal.style.display = "flex";
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) modal.style.display = "none";
    });

    // ======================
    // Modal Pop-ups for Products
    // ======================
    function openPopModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            document.querySelectorAll(".card-banner, .timer1").forEach(el => el.style.display = "none");
        }
    }

    function closeAllModals() {
        document.querySelectorAll(".pop-modal").forEach(modal => modal.style.display = "none");
        document.body.style.overflow = "auto";
        document.querySelectorAll(".card-banner, .timer1").forEach(el => el.style.display = "block");
    }

    function closePopModal(modalId) {
        if (document.getElementById(modalId)) closeAllModals();
    }

    window.onclick = function (event) {
        document.querySelectorAll(".pop-modal").forEach(modal => {
            if (event.target === modal) closeAllModals();
        });
    };

    // ======================
    // jQuery-based Functionality
    // ======================
    $(document).ready(function () {
        console.log("jQuery version:", $.fn.jquery);

        // Sticky Navigation Scroll
        $('.sticky-nav .nav-link').on('click', function (e) {
            e.preventDefault();
            const targetId = $(this).attr('href');
            const targetSection = $(targetId);

            if (targetSection.length) {
                console.log('Scrolling to section with ID:', targetId);
                $('.sticky-nav .nav-link').removeClass('active');
                $(this).addClass('active');

                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 60
                }, 800);
            } else {
                console.error('Section not found with ID:', targetId);
            }
        });

        $(window).on('scroll', function () {
            const scrollPosition = $(window).scrollTop() + 100;
            $('.product-section').each(function () {
                const sectionTop = $(this).offset().top;
                const sectionBottom = sectionTop + $(this).outerHeight();
                const sectionId = '#' + $(this).attr('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $('.sticky-nav .nav-link').removeClass('active');
                    $(`.sticky-nav .nav-link[href="${sectionId}"]`).addClass('active');
                }
            });
        });

        $(window).trigger('scroll');

        // Bootstrap Carousel
        $('#carouselExampleIndicators').carousel({
            interval: 5000,
            pause: "hover",
            wrap: true
        });

        $('#carouselExampleIndicators').on('slid.bs.carousel', function () {
            $(this).find('.carousel-item').removeClass('animated');
            $(this).find('.carousel-item.active').addClass('animated');
        }).trigger('slid.bs.carousel');

        $('.pokeball-indicators li').hover(
            function () { $(this).css('transform', 'scale(1.1)'); },
            function () { if (!$(this).hasClass('active')) $(this).css('transform', 'scale(1)'); }
        );

        // Countdown Timer
        function startCountdown() {
            const timerElement = document.getElementById("eventCountdown");

            if (!timerElement) {
                console.error("Error: Could not find element with ID 'eventCountdown'");
                return;
            }

            const endTime = new Date();
            endTime.setHours(endTime.getHours() + 24);

            function updateTimer() {
                const now = new Date();
                const timeLeft = endTime - now;

                if (timeLeft <= 0) {
                    timerElement.textContent = "00:00:00";
                    return;
                }

                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                timerElement.textContent =
                    `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
            }

            updateTimer();
            setInterval(updateTimer, 1000);
        }

        startCountdown();

        // Product Modal Functionality
        $('.carousel-item, .cta-btn').click(function (e) {
            if ($(e.target).hasClass('cta-btn') || $(e.target).closest('.cta-btn').length) {
                e.stopPropagation();
            }

            const activeSlide = $('.carousel-item.active');
            const title = activeSlide.find('h1').text();
            const popupImage = activeSlide.data('popup-image');
            const badgeText = activeSlide.find('.badge').text();

            $('#productModal .modal-title').text(title);
            $('#productModal .modal-body').html(`
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Purchase</button>
                </div>
            `);
            $('#productModal').modal('show');
        });
    });
});
