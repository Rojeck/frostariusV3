let userLang = window.navigator.language;
const localStorageLang = window.localStorage.getItem('lang');
userLang = localStorageLang ? localStorageLang : userLang.slice(0,2);

function redirect (lang) {
    document.location.href = `${window.location.href}${userLang}/main.html`
}

switch (userLang) {
    case 'ru': {
        redirect('ru');
    }
    default: {
        redirect('ru');
    }
}

