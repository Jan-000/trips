// Navigation functionality for swipe and scroll
let touchStartX = 0;
let touchEndX = 0;
let swipeThreshold = 50; // Minimum swipe distance to trigger navigation

// Configuration for navigation targets (set via data attributes or global config)
let navConfig = {
    leftTarget: null,  // URL to navigate on left swipe/arrow
    rightTarget: null  // URL to navigate on right swipe/arrow
};

// Initialize navigation with custom targets
function initNavigation(config) {
    navConfig = { ...navConfig, ...config };
}

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
    
    // Swipe right (positive distance)
    if (swipeDistance > swipeThreshold && navConfig.rightTarget) {
        window.location.href = navConfig.rightTarget;
    }
    // Swipe left (negative distance)
    else if (swipeDistance < -swipeThreshold && navConfig.leftTarget) {
        window.location.href = navConfig.leftTarget;
    }
}

// Handle keyboard events
function handleKeyPress(event) {
    // Right arrow key
    if (event.key === 'ArrowRight' && navConfig.rightTarget) {
        window.location.href = navConfig.rightTarget;
    }
    // Left arrow key
    else if (event.key === 'ArrowLeft' && navConfig.leftTarget) {
        window.location.href = navConfig.leftTarget;
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Touch events for mobile
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyPress, false);
});
