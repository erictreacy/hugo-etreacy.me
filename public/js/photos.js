(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".photos-container");
    if (!container)
      return;
    let hasUserScrolled = false;
    const updateScrollState = () => {
      const isStart = container.scrollLeft <= 0;
      const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
      container.dataset.scroll = isStart ? "0" : isEnd ? "end" : "middle";
      if (!hasUserScrolled && container.scrollLeft > 0) {
        hasUserScrolled = true;
        container.parentElement.classList.add("has-scrolled");
      }
    };
    container.addEventListener("scroll", () => {
      requestAnimationFrame(updateScrollState);
    });
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateScrollState, 100);
    });
    updateScrollState();
    container.addEventListener("keydown", (e) => {
      const scrollAmount = container.clientWidth * 0.75;
      if (e.key === "ArrowLeft") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    });
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
      startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
      startTime = Date.now();
      startScrollLeft = scrollLeft;
      velocity = 0;
      lastX = startX;
      lastTime = startTime;
      clearTimeout(momentumTimer);
      e.preventDefault();
    };
    const onDrag = (e) => {
      if (!isScrolling)
        return;
      const x = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
      const dx = x - lastX;
      const dt = Date.now() - lastTime;
      if (dt > 0) {
        velocity = dx / dt;
      }
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
      lastX = x;
      lastTime = Date.now();
      e.preventDefault();
    };
    const endDrag = () => {
      if (!isScrolling)
        return;
      isScrolling = false;
      if (Math.abs(velocity) > 0.5) {
        const startVelocity = velocity;
        const startTimestamp = Date.now();
        const duration = 1e3;
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        const momentumScroll = () => {
          const elapsed = Date.now() - startTimestamp;
          const progress = Math.min(1, elapsed / duration);
          const easing = easeOutQuart(progress);
          const currentVelocity = startVelocity * (1 - easing);
          if (progress < 1) {
            container.scrollBy({
              left: -currentVelocity * 16,
              // 16ms frame time
              behavior: "auto"
            });
            momentumTimer = requestAnimationFrame(momentumScroll);
          }
        };
        momentumTimer = requestAnimationFrame(momentumScroll);
      }
    };
    container.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);
    container.addEventListener("touchstart", startDrag);
    container.addEventListener("touchmove", onDrag);
    container.addEventListener("touchend", endDrag);
    container.addEventListener("touchcancel", endDrag);
    container.addEventListener("contextmenu", (e) => {
      if (isScrolling) {
        e.preventDefault();
      }
    });
    window.addEventListener("blur", () => {
      clearTimeout(momentumTimer);
      endDrag();
    });
  });
})();
