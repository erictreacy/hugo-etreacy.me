document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showStatus(message, type) {
        status.textContent = message;
        status.className = `form-status ${type}`;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        // Reset previous errors
        form.querySelectorAll('input, textarea').forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate inputs
        let hasError = false;
        
        if (name.length < 2) {
            form.name.classList.add('error');
            hasError = true;
        }
        
        if (!validateEmail(email)) {
            form.email.classList.add('error');
            hasError = true;
        }
        
        if (message.length < 10) {
            form.message.classList.add('error');
            hasError = true;
        }
        
        if (hasError) {
            showStatus('Please check the highlighted fields', 'error');
            return;
        }

        // Prepare form data
        const formData = {
            name,
            email,
            message
        };

        // Here you would typically send the form data to your server
        // For now, we'll just simulate a successful submission
        showStatus('Message sent successfully!', 'success');
        form.reset();
    });
});
