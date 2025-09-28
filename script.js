// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    const langToggle = document.getElementById('langToggle');
    const langText = document.querySelector('.lang-text');

    // Language switching functionality
    let currentLang = localStorage.getItem('language') || 'en';
    
    function switchLanguage() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('language', currentLang);
        
        // Update all elements with data attributes
        const elementsToTranslate = document.querySelectorAll('[data-en][data-zh]');
        elementsToTranslate.forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });
        
        // Update language button text
        langText.textContent = currentLang === 'en' ? '中文' : 'English';
        
        // Update page title
        document.title = currentLang === 'en' ? 'Guide/ Procedure' : '指南/程序';
    }
    
    function initializeLanguage() {
        // Set initial language
        const elementsToTranslate = document.querySelectorAll('[data-en][data-zh]');
        elementsToTranslate.forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });
        
        // Set initial button text
        langText.textContent = currentLang === 'en' ? '中文' : 'English';
        
        // Set initial page title
        document.title = currentLang === 'en' ? 'Guide/ Procedure' : '指南/程序';
    }
    
    // Initialize language on page load
    initializeLanguage();
    
    // Add click event listener for language toggle
    langToggle.addEventListener('click', switchLanguage);

    // Track if user is manually clicking navigation (to prevent scroll handler from overriding)
    let isManualNavigation = false;

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Set flag to indicate manual navigation
            isManualNavigation = true;
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to target section
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Reset flag after scroll animation completes
                setTimeout(() => {
                    isManualNavigation = false;
                }, 1000);
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        // Don't update if user is manually navigating
        if (isManualNavigation) return;
        
        const scrollPosition = window.scrollY + 200; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events to update active navigation
    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize active navigation on page load
    updateActiveNavLink();
});
