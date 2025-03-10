document.addEventListener('mousemove', (e) => {
    const doodle = document.querySelector('css-doodle');
    if (doodle) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        doodle.style.setProperty('--mx', x);
        doodle.style.setProperty('--my', y);
    }
});

document.body.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'css-doodle') {
        e.target.update();
    }
});
