// Handle scroll indicators and interactions for photo gallery
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.photos-container');
    if (!container) return;

    // Initial scroll position
    let hasUserScrolled = false;

    const updateScrollState = () => {
        const isStart = container.scrollLeft <= 0;
        const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        
        container.dataset.scroll = isStart ? '0' : isEnd ? 'end' : 'middle';

        // Track if user has scrolled
        if (!hasUserScrolled && container.scrollLeft > 0) {
            hasUserScrolled = true;
            container.parentElement.classList.add('has-scrolled');
        }
    };

    // Update on scroll
    container.addEventListener('scroll', () => {
        requestAnimationFrame(updateScrollState);
    });

    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateScrollState, 100);
    });

    // Initial state
    updateScrollState();

    // Add keyboard navigation
    container.addEventListener('keydown', (e) => {
        const scrollAmount = container.clientWidth * 0.75;
        
        if (e.key === 'ArrowLeft') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    // Add mouse and touch interaction
    let isScrolling = false;
    let startX;
    let scrollLeft;
    let startTime;
    let startScrollLeft;
    let velocity = 0;
    let lastX;
    let lastTime;
    let momentumTimer;

    const startDrag = (e) => {
        isScrolling = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = container.scrollLeft;
        startTime = Date.now();
        startScrollLeft = scrollLeft;
        velocity = 0;
        lastX = startX;
        lastTime = startTime;

        // Clear any ongoing momentum scrolling
        clearTimeout(momentumTimer);

        // Prevent image dragging
        e.preventDefault();
    };

    const onDrag = (e) => {
        if (!isScrolling) return;

        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const dx = x - lastX;
        const dt = Date.now() - lastTime;
        
        if (dt > 0) {
            velocity = dx / dt;
        }

        const walk = x - startX;
        container.scrollLeft = scrollLeft - walk;

        lastX = x;
        lastTime = Date.now();

        // Prevent text selection
        e.preventDefault();
    };

    const endDrag = () => {
        if (!isScrolling) return;
        isScrolling = false;

        // Add momentum scrolling with easing
        if (Math.abs(velocity) > 0.5) {
            const startVelocity = velocity;
            const startTimestamp = Date.now();
            const duration = 1000; // Match your transition duration

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const momentumScroll = () => {
                const elapsed = Date.now() - startTimestamp;
                const progress = Math.min(1, elapsed / duration);
                const easing = easeOutQuart(progress);
                const currentVelocity = startVelocity * (1 - easing);

                if (progress < 1) {
                    container.scrollBy({
                        left: -currentVelocity * 16, // 16ms frame time
                        behavior: 'auto'
                    });
                    momentumTimer = requestAnimationFrame(momentumScroll);
                }
            };

            momentumTimer = requestAnimationFrame(momentumScroll);
        }
    };

    // Mouse events
    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);

    // Touch events
    container.addEventListener('touchstart', startDrag);
    container.addEventListener('touchmove', onDrag);
    container.addEventListener('touchend', endDrag);
    container.addEventListener('touchcancel', endDrag);

    // Prevent context menu on long press
    container.addEventListener('contextmenu', (e) => {
        if (isScrolling) {
            e.preventDefault();
        }
    });

    // Cleanup
    window.addEventListener('blur', () => {
        clearTimeout(momentumTimer);
        endDrag();
    });
});
