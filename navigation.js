// Navigation functionality for swipe and scroll
let touchStartX = 0;
let touchEndX = 0;
let swipeThreshold = 50; // Minimum swipe distance to trigger navigation

// Configuration for navigation targets (set via data attributes or global config)
let navConfig = {
    leftTarget: null,  // URL to navigate on left swipe/arrow
    rightTarget: null,  // URL to navigate on right swipe/arrow
    currentView: 'map',  // Current view: 'map' or 'text'
    showAllTrips: false,  // Whether to show "all trips" label
    allTripsTarget: null  // URL for "all trips" navigation
};

// Initialize navigation with custom targets
function initNavigation(config) {
    navConfig = { ...navConfig, ...config };
    createHintBar();
    updateHintBar();
}

// Create the hint bar element
function createHintBar() {
    // Check if hint bar already exists
    if (document.querySelector('.hint-bar')) return;
    
    const hintBar = document.createElement('div');
    hintBar.className = 'hint-bar';
    
    let labelsHTML = ``;

    if (navConfig.showAllTrips) {
        labelsHTML += `<span class="hint-label" data-view="all">all trips</span>`;
    }

    labelsHTML += `
        <span class="hint-label" data-view="map">map</span>
        <span class="hint-label" data-view="text">text</span>
    `;
    
    hintBar.innerHTML = `
        <div class="hint-bar-track">
            ${labelsHTML}
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .hint-bar {
            position: fixed;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
        }
        
        .hint-bar-track {
            display: flex;
            gap: 40px;
            background: transparent;
            padding: 8px 24px;
            border-radius: 20px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hint-label {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 13px;
            font-weight: 500;
            color: #666;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
            cursor: pointer;
            pointer-events: auto;
        }
        
        .hint-label.active {
            color: #111;
            font-weight: 600;
            transform: scale(1.1);
            cursor: default;
        }
        
        @media (prefers-color-scheme: dark) {
            .hint-label {
                color: #666;
            }

            .hint-label.active {
                color: #111;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(hintBar);
    
    // Add click handlers to labels
    const labels = hintBar.querySelectorAll('.hint-label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            const targetView = this.dataset.view;
            
            // Navigate based on current view and target view
            if (targetView === 'all') {
                if (navConfig.allTripsTarget) {
                    window.location.href = navConfig.allTripsTarget;
                }
            } else if (navConfig.currentView === 'map' && targetView === 'text') {
                if (navConfig.leftTarget) {
                    window.location.href = navConfig.leftTarget;
                }
            } else if (navConfig.currentView === 'text' && targetView === 'map') {
                if (navConfig.rightTarget) {
                    window.location.href = navConfig.rightTarget;
                }
            }
        });
    });
}

// Update hint bar to reflect current view
function updateHintBar() {
    const labels = document.querySelectorAll('.hint-label');
    const track = document.querySelector('.hint-bar-track');
    
    if (!labels.length || !track) return;
    
    labels.forEach(label => {
        if (label.dataset.view === navConfig.currentView) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
    
    // Center the active label by shifting the track
    const activeLabel = document.querySelector('.hint-label.active');
    if (activeLabel) {
        const trackRect = track.getBoundingClientRect();
        const labelRect = activeLabel.getBoundingClientRect();
        const offset = (labelRect.left + labelRect.width / 2) - (trackRect.left + trackRect.width / 2);
        track.style.transform = `translateX(${-offset}px)`;
    }
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
    if (event.key === 'ArrowRight' && navConfig.leftTarget) {
        window.location.href = navConfig.leftTarget;
    }
    // Left arrow key
    else if (event.key === 'ArrowLeft' && navConfig.rightTarget) {
        window.location.href = navConfig.rightTarget;
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
