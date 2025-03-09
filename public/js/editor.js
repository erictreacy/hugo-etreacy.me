document.addEventListener('DOMContentLoaded', () => {
    // Add expand button to all code blocks
    document.querySelectorAll('.highlight').forEach(block => {
        const expandButton = document.createElement('button');
        expandButton.className = 'highlight-expand';
        expandButton.textContent = 'Edit';
        expandButton.setAttribute('aria-label', 'Open in editor');
        expandButton.setAttribute('title', 'Open in editor');
        
        // Get the code content and language
        const code = block.querySelector('code');
        const language = code.className.replace('language-', '');
        
        expandButton.addEventListener('click', () => {
            createEditorModal(code.textContent.trim(), language);
        });
        
        // Initial state
        expandButton.style.opacity = '0';
        block.insertBefore(expandButton, block.firstChild);
        
        // Show button on hover
        block.addEventListener('mouseenter', () => {
            expandButton.style.opacity = '0.6';
        });
        
        block.addEventListener('mouseleave', () => {
            expandButton.style.opacity = '0';
        });
    });
});

function createEditorModal(code, language) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'editor-modal';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'editor-modal-content';
    
    // Create header with close button
    const header = document.createElement('div');
    header.className = 'editor-modal-header';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.className = 'editor-modal-close';
    closeButton.onclick = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    };
    
    header.appendChild(closeButton);
    modalContent.appendChild(header);
    
    // Create editor container
    const editorContainer = document.createElement('div');
    editorContainer.className = 'editor-container';
    modalContent.appendChild(editorContainer);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Define custom theme
    const customTheme = {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'keyword', foreground: '3b82f6', fontStyle: 'bold' },
            { token: 'string', foreground: '16a34a' },
            { token: 'number', foreground: '171717' },
            { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
            { token: 'type', foreground: '3b82f6', fontStyle: 'bold' },
            { token: 'function', foreground: '9333ea' },
            { token: 'variable', foreground: '1d4ed8' },
            { token: 'operator', foreground: 'dc2626', fontStyle: 'bold' }
        ],
        colors: {
            'editor.background': '#f8fafc',
            'editor.foreground': '#1f2937',
            'editor.lineHighlightBackground': '#eff6ff',
            'editor.selectionBackground': '#dbeafe',
            'editorCursor.foreground': '#3b82f6',
            'editorLineNumber.foreground': '#64748b',
            'editorLineNumber.activeForeground': '#3b82f6'
        }
    };
    
    // Initialize Monaco Editor
    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
    require(['vs/editor/editor.main'], () => {
        // Register custom theme
        monaco.editor.defineTheme('site-theme', customTheme);
        
        const editor = monaco.editor.create(editorContainer, {
            value: code,
            language: language,
            theme: 'site-theme',
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: 'var(--mono)',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            roundedSelection: true,
            selectOnLineNumbers: true,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            editor.layout();
        });
        
        // Handle Escape key
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // Could add save functionality here
        });
        editor.addCommand(monaco.KeyCode.Escape, () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
    });
}
