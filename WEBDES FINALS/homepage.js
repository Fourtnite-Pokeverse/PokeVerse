$(document).ready(function() {
    // ======================
    // Sticky Navigation
    // ======================
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop();
        
        // Update active nav link based on scroll position
        $('.product-section').each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.sticky-nav .nav-link').removeClass('active');
                $('.sticky-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    // Smooth scrolling for nav links
    $('.sticky-nav .nav-link').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 60
        }, 500);
        
        // Update active state
        $('.sticky-nav .nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // ======================
    // Carousel Initialization
    // ======================
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
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            if (!$(this).hasClass('active')) {
                $(this).css('transform', 'scale(1)');
            }
        }
    );

    // ======================
    // Countdown Timer
    // ======================
    function startCountdown() {
        const timerElement = document.getElementById("eventCountdown");
        
        if (!timerElement) {
            console.error("Error: Could not find element with ID 'eventCountdown'");
            return;
        }

        // Set end time (24 hours from now)
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);

        function updateTimer() {
            const now = new Date();
            const timeLeft = endTime - now;

            // Stop if time is up
            if (timeLeft <= 0) {
                timerElement.textContent = "00:00:00";
                return;
            }

            // Calculate hours, minutes, seconds
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Format and display
            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
        }

        // Run immediately, then every second
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // Initialize countdown
    startCountdown();

    // ======================
    // Product Modal Functionality
    // ======================
    $('.carousel-item, .cta-btn').click(function(e) {
        // Don't trigger if clicking on the CTA button from carousel item
        if ($(e.target).hasClass('cta-btn') || $(e.target).closest('.cta-btn').length) {
            e.stopPropagation();
        }
        
        // Get the active slide
        const activeSlide = $('.carousel-item.active');
        const title = activeSlide.find('h1').text();
        const popupImage = activeSlide.data('popup-image');
        const badgeText = activeSlide.find('.badge').text();
        
        // Update modal title
        $('#productModal .modal-title').text(title);
        
        // Default template for unknown items
        let modalContent = `
            <div class="product-image-container mb-4">
                <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                <div class="badge-overlay">${badgeText}</div>
            </div>
            <div class="text-center mt-4">
                <button class="btn btn-primary px-4 py-2 font-weight-bold">Purchase</button>
            </div>
        `;

        // Custom content for each product type
        if (title.includes('Pokemon GO Fest')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <p class="text-muted mb-3">Can only be purchased 1 time.</p>
                <div class="price-container mb-4">
                    <span class="original-price">P450.00</span>
                    <span class="discounted-price">P373.15</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">FEATURES</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>x1 Eggs-pedition Access: February</strong></li>
                        <li class="mb-2"><strong>x5 Max Revive</strong></li>
                        <li class="mb-2"><strong>x5 Rare Candy</strong></li>
                        <li class="mb-2"><strong>x3 Premium Battle Pass</strong></li>
                    </ul>
                    <a href="#" class="text-primary">View event details</a>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Purchase Ticket</button>
                </div>
            `;
        }
        else if (title.includes('PokéCoin Bundle')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <p class="text-muted mb-3">Special limited-time offer.</p>
                <div class="price-container mb-4">
                    <span class="original-price">P299.00</span>
                    <span class="discounted-price">P249.00</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">CONTENTS</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>1200 PokéCoins</strong></li>
                        <li class="mb-2"><strong>+100 Bonus PokéCoins</strong></li>
                        <li class="mb-2"><strong>Limited-time exclusive</strong></li>
                    </ul>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Buy PokéCoins</button>
                </div>
            `;
        }
        else if (title.includes('Item Boxes')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">${badgeText}</div>
                </div>
                <p class="text-muted mb-3">Exclusive item collection.</p>
                <div class="price-container mb-4">
                    <span class="original-price">P199.00</span>
                    <span class="discounted-price">P159.00</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">BOX CONTENTS</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>20 Poké Balls</strong></li>
                        <li class="mb-2"><strong>10 Great Balls</strong></li>
                        <li class="mb-2"><strong>5 Ultra Balls</strong></li>
                        <li class="mb-2"><strong>3 Incense</strong></li>
                        <li class="mb-2"><strong>2 Lucky Eggs</strong></li>
                    </ul>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Get Item Box</button>
                </div>
            `;
        }
        else if (title.includes('Daily Bundles')) {
            modalContent = `
                <div class="product-image-container mb-4">
                    <img src="${popupImage}" class="img-fluid rounded" alt="${title}">
                    <div class="badge-overlay">DAILY DEAL</div>
                </div>
                <p class="text-muted mb-3">Available for 24 hours only.</p>
                <div class="price-container mb-4">
                    <span class="discounted-price">P99.00</span>
                </div>
                <hr class="my-4">
                <div class="features mb-4">
                    <h6 class="text-uppercase font-weight-bold text-muted mb-3">TODAY'S BUNDLE</h6>
                    <ul class="pl-3 mb-3">
                        <li class="mb-2"><strong>10 Poké Balls</strong></li>
                        <li class="mb-2"><strong>5 Razz Berries</strong></li>
                        <li class="mb-2"><strong>1 Incense</strong></li>
                        <li class="mb-2"><strong>1 Star Piece</strong></li>
                    </ul>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-primary px-4 py-2 font-weight-bold">Get Daily Bundle</button>
                </div>
            `;
        }

        // Insert the customized content
        $('#productModal .modal-body').html(modalContent);
        $('#productModal').modal('show');
    });
});