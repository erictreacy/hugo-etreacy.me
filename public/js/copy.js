document.addEventListener('DOMContentLoaded', () => {
    // Add copy button to all code blocks
    document.querySelectorAll('.highlight').forEach(block => {
        const button = document.createElement('button');
        button.className = 'highlight-copy';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        button.setAttribute('title', 'Copy code to clipboard');
        
        // Get the actual code content
        const code = block.querySelector('code');
        
        // Show button on hover
        block.addEventListener('mouseenter', () => {
            button.style.opacity = '0.6';
        });
        
        block.addEventListener('mouseleave', () => {
            if (!button.classList.contains('copied')) {
                button.style.opacity = '0';
            }
        });
        
        button.addEventListener('click', async () => {
            try {
                // Get text content, removing line numbers if present
                const text = Array.from(code.querySelectorAll('.cl'))
                    .map(line => line.textContent)
                    .join('\n')
                    .trim();
                
                await navigator.clipboard.writeText(text);
                
                // Visual feedback
                button.classList.add('copied');
                button.textContent = 'Copied!';
                button.setAttribute('aria-label', 'Code copied to clipboard');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.textContent = 'Copy';
                    button.setAttribute('aria-label', 'Copy code to clipboard');
                    button.style.opacity = block.matches(':hover') ? '0.6' : '0';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Failed';
                button.style.color = '#dc2626'; // Error red
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.color = '';
                    button.style.opacity = block.matches(':hover') ? '0.6' : '0';
                }, 2000);
            }
        });
        
        // Initial state
        button.style.opacity = '0';
        block.insertBefore(button, block.firstChild);
    });
});
