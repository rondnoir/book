// Gestion du thème et de la langue
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation
    const currentLang = localStorage.getItem('language') || 'fr';
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Application initiale
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('lang', currentLang);
    
    // Création des contrôles dans le header
    const menu = document.querySelector('.menu');
    const controls = document.createElement('div');
    controls.className = 'controls';
    
    // Bouton de langue
    const langButton = document.createElement('button');
    langButton.className = 'control-button lang-button';
    updateLangButtonText();
    
    // Bouton de thème
    const themeButton = document.createElement('button');
    themeButton.className = 'control-button theme-button';
    updateThemeButtonText();
    
    // Ajout des boutons
    controls.appendChild(langButton);
    controls.appendChild(themeButton);
    menu.appendChild(controls);
    
    // Event listeners
    langButton.addEventListener('click', toggleLanguage);
    themeButton.addEventListener('click', toggleTheme);
    
    // Mise à jour initiale du contenu
    updateContent();
    
    // Fonctions
    function toggleLanguage() {
        const newLang = document.documentElement.getAttribute('lang') === 'fr' ? 'en' : 'fr';
        document.documentElement.setAttribute('lang', newLang);
        localStorage.setItem('language', newLang);
        updateLangButtonText();
        updateContent();
    }
    
    function toggleTheme() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButtonText();
    }
    
    function updateLangButtonText() {
        const currentLang = document.documentElement.getAttribute('lang');
        langButton.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        langButton.classList.toggle('active', currentLang === 'en');
    }
    
    function updateThemeButtonText() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        themeButton.textContent = currentTheme === 'light' ? '🌙' : '☀️';
        themeButton.classList.toggle('active', currentTheme === 'light');
    }
    
    function updateContent() {
        const currentLang = document.documentElement.getAttribute('lang');
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const keys = key.split('.');
            let translation = translations[currentLang];
            
            for (const k of keys) {
                if (translation) {
                    translation = translation[k];
                }
            }
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
});
