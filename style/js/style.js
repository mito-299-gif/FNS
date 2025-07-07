
const cssFiles = [
    './style/css/index.css',
    './style/css/contact.css',
    './style/css/contact-1.css',
    './style/css/contact-2.css',
    './style/css/contact-3.css',
    './style/css/contact-4.css',
    './style/css-DIR-2/DIR-1.css',
    './style/DIR-error/DIR-error.css',
    './style/css-login/login.css'
];

cssFiles.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
});