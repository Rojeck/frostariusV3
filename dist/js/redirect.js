const userLangFromBrowser = window.navigator.language;
const localStorageLang = window.localStorage.getItem('lang');
userLang = localStorageLang ? localStorageLang : userLangFromBrowser.slice(0,2);
window.localStorage.setItem('lang', userLang);


function redirect (lang) {
    document.location.href = `${window.location.href}${lang}/main.html`
}

switch (userLang) {
    case 'ru': {
        redirect('ru');
        break
    }
    default: {
        redirect('ru');
        break
    }
}

