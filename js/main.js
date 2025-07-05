// Wait for the entire HTML document to be loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    // --- Function to initialize the Carousel ---
    function initCarousel() {
        const carouselElement = document.querySelector('#churchCarousel');
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: 5000,
                ride: 'carousel',
                pause: 'hover'
            });
        }
    }

    // --- Function to initialize the Retreat Countdown ---
    function initRetreatCountdown() {
        const countdownDate = new Date('2025-09-04T16:00:00'); 
        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minutesEl = document.getElementById('countdown-minutes');
        const secondsEl = document.getElementById('countdown-seconds');

        // Check if all elements exist before proceeding
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            return; // Exit if any countdown element is not found
        }

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                const container = document.querySelector('.countdown-container');
                if (container) {
                    container.innerHTML = '<p class="event-ended-message">The event has started!</p>';
                }
                return;
            }

            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update the DOM
            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        };
        
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call to display immediately
    }

    // --- Function to calculate and display next event dates ---
    function initNextEventDates() {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };

        const getNextDate = (dayOfWeek, eventHour, eventMinute) => {
            const now = new Date();
            let daysUntilNext = dayOfWeek - now.getDay();

            if (daysUntilNext < 0 || (daysUntilNext === 0 && (now.getHours() > eventHour || (now.getHours() === eventHour && now.getMinutes() >= eventMinute)))) {
                daysUntilNext += 7; // It's today but passed, or it was earlier in the week
            }
            
            const nextDate = new Date(now);
            nextDate.setDate(now.getDate() + daysUntilNext);
            return nextDate.toLocaleDateString('en-US', options).toUpperCase();
        };
        
        const sundayEl = document.getElementById('next-sunday-date');
        const wednesdayEl = document.getElementById('next-wednesday-date');
        const fridayEl = document.getElementById('next-friday-date');

        if(sundayEl) sundayEl.textContent = getNextDate(0, 17, 0); // Sunday, 5:00 PM
        if(wednesdayEl) wednesdayEl.textContent = getNextDate(3, 20, 0); // Wednesday, 8:00 PM
        if(fridayEl) fridayEl.textContent = getNextDate(5, 19, 45); // Friday, 7:45 PM
    }

    // --- Function to update copyright year ---
    function initCopyrightYear() {
        const yearEl = document.getElementById('copyright-year');
        if(yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }


    // --- Initialize all functions ---
    initCarousel();
    initRetreatCountdown();
    initNextEventDates();
    initCopyrightYear();

});