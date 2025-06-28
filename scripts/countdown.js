document.addEventListener('DOMContentLoaded', function() {
   
    const countdownDate = new Date('2025-09-04T16:00:00'); // Note the 'T' for ISO format

    // Get elements for displaying the countdown
    const daysElement = document.getElementById('countdown-days');
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');

    function updateCountdown() {
        const now = new Date().getTime(); // Current time in milliseconds
        const distance = countdownDate.getTime() - now; // Difference in milliseconds

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the results, ensuring two digits (e.g., "05" instead of "5")
        daysElement.innerHTML = String(days).padStart(2, '0');
        hoursElement.innerHTML = String(hours).padStart(2, '0');
        minutesElement.innerHTML = String(minutes).padStart(2, '0');
        secondsElement.innerHTML = String(seconds).padStart(2, '0');

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').innerHTML = '<p style="font-size: 2em; color: #333; text-align: center;">The event has started!</p>';
        }
    }

    // Update the countdown every 1 second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Initial call to display the countdown immediately without waiting for 1 second
    updateCountdown();
});