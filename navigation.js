// Navigation functionality for swipe and scroll
let touchStartX = 0;
let touchEndX = 0;
let scrollThreshold = 100; // Minimum scroll amount to trigger navigation
let swipeThreshold = 50; // Minimum swipe distance to trigger navigation

// Handle touch events for mobile swipe
function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right (positive distance greater than threshold)
    if (swipeDistance > swipeThreshold) {
        navigateToTrip();
    }
}

// Handle scroll events for desktop
let scrollPosition = 0;

function handleScroll(event) {
    // Horizontal scroll
    if (event.deltaX > 0 && event.deltaX > scrollThreshold) {
        navigateToTrip();
    }
}

// Navigate to trip1text.html
function navigateToTrip() {
    window.location.href = 'trip1text.html';
}

// Handle keyboard events
function handleKeyPress(event) {
    // Right arrow key
    if (event.key === 'ArrowRight') {
        navigateToTrip();
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Touch events for mobile
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    
    // Scroll/wheel events for desktop
    document.addEventListener('wheel', handleScroll, { passive: false });
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyPress, false);
});
