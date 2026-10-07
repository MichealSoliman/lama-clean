/**
 * Master Services Config & Navigation Dropdown Loader for لمعة كلين
 * To add a new service to all pages across the website, simply add it to the SERVICES_CONFIG array below!
 */
const SERVICES_CONFIG = [
    { name: "تنظيف الشقق", url: "/services/cleaning-apartments/" },
    { name: "تنظيف وتعقيم الخزانات", url: "/services/cabinet-cleaning/" },
    { name: "تنظيف المنازل والبيوت", url: "/services/cleaning-homes/" },
    { name: "تنظيف الفلل والقصور", url: "/services/villa-cleaning-in-jeddah/" },
    { name: "تنظيف المكاتب والشركات", url: "/services/office-and-company-cleaning/" },
    { name: "شركة تنظيف شركات بجدة", url: "/cleaning-companies-in-jeddah/" },
    { name: "تنظيف المجالس والكنب", url: "/services/majlis-cleaning/" },
    { name: "مكافحة الحشرات والآفات", url: "/services/insect-infestation/" },   
    { name: "تنظيف المطابخ", url: "/kitchen-cleaning/" },
    { name: "تنظيف الحمامات", url: "/bathroom-cleaning/" },
    { name: "تنظيف المطاعم", url: "/restaurant-cleaning/" },
    { name: "تنظيف المحلات", url: "/shop-cleaning/" },
    { name: "تنظيف السجاد", url: "/carpet-cleaning/" }
];

function renderServicesDropdowns() {
    const rawPath = window.location.pathname;
    // Normalize path to always have a trailing slash for comparison
    const currentPath = rawPath.endsWith('/') ? rawPath : rawPath + '/';

    // 1. Populate Desktop Dropdown Panels
    const desktopPanels = document.querySelectorAll('.nav-services-panel, [data-services-dropdown], nav details > div.absolute');
    desktopPanels.forEach(panel => {
        let html = '';
        SERVICES_CONFIG.forEach(service => {
            const serviceNormalized = service.url.endsWith('/') ? service.url : service.url + '/';
            const isActive = currentPath === serviceNormalized;
            const activeClass = isActive 
                ? 'font-bold text-primary bg-blue-50' 
                : 'text-gray-700 hover:bg-emerald-50 hover:text-primary';
            
            html += `<a href="${service.url}" class="block px-4 py-2.5 text-sm transition-colors duration-150 ${activeClass}">${service.name}</a>`;
        });
        panel.innerHTML = html;
    });

    // 2. Populate Mobile Dropdown Panels
    const mobilePanels = document.querySelectorAll('.mobile-services-panel, [data-mobile-services], #mobileServicesMenu, #mobileMenu details > div');
    mobilePanels.forEach(panel => {
        let html = '';
        SERVICES_CONFIG.forEach(service => {
            const serviceNormalized = service.url.endsWith('/') ? service.url : service.url + '/';
            const isActive = currentPath === serviceNormalized;
            const activeClass = isActive 
                ? 'font-bold text-primary bg-white' 
                : 'text-gray-700 hover:text-primary hover:bg-white';
            
            html += `<a href="${service.url}" class="block py-2.5 px-6 sm:px-8 text-sm transition-colors duration-150 ${activeClass}">${service.name}</a>`;
        });
        panel.innerHTML = html;
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn') || document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        if (!mobileMenuBtn.dataset.initialized) {
            mobileMenuBtn.dataset.initialized = "true";
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('open');
                } else if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    mobileMenu.classList.add('hidden');
                } else {
                    mobileMenu.classList.toggle('hidden');
                    mobileMenu.classList.toggle('open');
                }
            });
        }
    }
}

// Global invocation on DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderServicesDropdowns();
        initMobileMenu();
    });
} else {
    renderServicesDropdowns();
    initMobileMenu();
}
