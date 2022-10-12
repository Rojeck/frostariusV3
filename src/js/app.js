// slider
const localStorage = window.localStorage;
const select = document.querySelector("#lang-select");
select.addEventListener("change", changeURLLanguage);
const isApple =
  navigator.userAgent.includes("iPhone") ||
  navigator.userAgent.includes("iPad");
// setLang

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("hidden");
    wrapper.classList.remove("overflow-hidden");
  }, 1000);
});

function setLang() {
  const userLangFromBrowser = window.navigator.language;
  switch (userLangFromBrowser.slice(0, 2)) {
    case "ru": {
      window.localStorage.setItem("lang", "ru");
      break;
    }
    case "en": {
      window.localStorage.setItem("lang", "en");
      break;
    }
    case "uk": {
      window.localStorage.setItem("lang", "uk");
      break;
    }
    default: {
      window.localStorage.setItem("lang", "ru");
      break;
    }
  }
}

if (!window.localStorage.getItem("lang")) {
  setLang();
}

function usePreventDefaultToSideSlides() {
  document.querySelectorAll(".swiper-slide a").forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

const portfolioSlider = new Swiper(".portfolio__content", {
  spaceBetween: 5,
  centeredSlides: true,
  loop: true,
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
  },
  on: {
    afterInit: function () {
      goToHashSlide();
      document.querySelectorAll(".portfolio__item a").forEach((e) => {
        e.addEventListener("click", (v) => {
          if (e.parentElement.classList.contains("swiper-slide-next")) {
            v.preventDefault();
            portfolioSlider.slideNext();
          }
          if (e.parentElement.classList.contains("swiper-slide-prev")) {
            v.preventDefault();
            portfolioSlider.slidePrev();
          }
        });
      });
    },
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  pagination: {
    el: ".pagination",
    clickable: true,
  },
  breakpoints: {
    1: {
      slidesPerView: 1.5,
      spaceBetween: 0,
    },

    428: {
      slidesPerView: 1.75,
      spaceBetween: 0,
    },
    769: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

function goToHashSlide() {
  if (window.location.hash) {
    let initialPortfolioSlide = window.location.hash.split("#p-")[1];
    if (isApple) {
      initialPortfolioSlide--;
    }
    setTimeout(() => {
      portfolioSlider.slideTo(initialPortfolioSlide);
    }, 500);
  }
}

new Swiper(".project-swiper", {
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  breakpoints: {
    1: {
      slidesPerView: 2.3,
    },
    769: {},
    992: {},
  },
});

new Swiper(".about__slider", {
  spaceBetween: 30,
  centeredSlides: true,
  initialSlide: 5,

  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
  },
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  preloadImages: false,
  lazy: true,
  slideToClickedSlide: true,
  loop: true,

  breakpoints: {
    1: {
      slidesPerView: 2.3,
      spaceBetween: 15,
    },
    769: {
      slidesPerView: 2.6,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

new Swiper(".cards-container", {
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
  },
  navigation: {
    prevEl: ".cards__left",
    nextEl: ".cards__right",
  },
  pagination: {
    el: ".swiper-pagination",
    clicable: true,
  },
  slidesPerView: 2.9,
  effect: "coverflow",
  spaceBetween: 50,
  loop: true,
  coverflowEffect: {
    slideShadows: false,
  },
  centeredSlides: true,
  breakpoints: {
    320: {
      slidesPerView: 1.3,
      effect: "coverflow",
      spaceBetween: 0,
    },
    375: {
      slidesPerView: 1.4,
      spaceBetween: 0,
      effect: "coverflow",
    },
    430: {
      slidesPerView: 1.5,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 1.7,
      spaceBetween: 5,
    },
    560: {
      slidesPerView: 1.8,
      spaceBetween: 15,
    },
    680: {
      slidesPerView: 2.2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2.3,
      spaceBetween: 20,
    },
    880: {
      slidesPerView: 2.6,
      spaceBetween: 30,
    },
    980: {
      slidesPerView: 2.6,
      spaceBetween: 100,
    },
  },
});

const menuLinks = document.querySelectorAll("[data-goto]");
menuLinks.forEach((element) => {
  element.addEventListener("click", goto);
});

function goto(e) {
  e.preventDefault();
  const menulink = e.target;
  const gotoObject = document.querySelector(menulink.dataset.goto);
  const gotoObjectValue = gotoObject.getBoundingClientRect().top + pageYOffset;
  window.scrollTo({
    top: gotoObjectValue,
    behavior: "smooth",
  });
}

const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm(form)) {
    const sendButton = form.querySelector(".form__button");
    formLoading(form, true);
    disableInputs(form, true);
    const data = {
      service_id: "service_qd6sg5t",
      template_id: "template_wqwoxc1",
      user_id: "9Mted7Y1TpHPSiEya",
      template_params: {
        username: form.querySelector("#username").value,
        usertel: form.querySelector("#usertel").value,
        usermail: form.querySelector("#usermail").value,
      },
    };
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        formLoading(form, false);
        disableInputs(form, true);
        sendButton.disabled = true;
        sendButton.classList.add("btn-inactive");
        form.reset();
        changeFormText(form, getDoneMessage()[0], getDoneMessage()[1]);
      })
      .catch(() => {
        formLoading(form, false);
        disableInputs(form, false);
        changeFormText(form, getErrorMessage()[0], getErrorMessage()[1]);
      });
  }
});

function formLoading(form, loadingOn) {
  const formBtn = form.querySelector("button");
  if (loadingOn) {
    disableInputs(form, true);
    formBtn.classList.add("btn-loading");
    formBtn.disabled = true;
  } else {
    disableInputs(form, false);
    formBtn.classList.remove("btn-loading");
    formBtn.disabled = false;
  }
}

function disableInputs(form, status) {
  const inputs = form.querySelectorAll("input");
  if (status) {
    inputs.forEach((input) => {
      input.disabled = true;
    });
  } else {
    inputs.forEach((input) => {
      input.disabled = false;
    });
  }
}

function changeFormText(form, title, subTitle) {
  const titleItem = form.closest(".container").querySelector("._form-title"),
    subTitleItem = form.closest(".container").querySelector("._form-sub-title");
  titleItem.textContent = title;
  subTitleItem.textContent = subTitle;
}

function validateForm(form) {
  const elements = form.querySelectorAll("._req");
  let validate = true;
  elements.forEach((element) => {
    if (element.value === "") {
      element.classList.add("red-highlighted");
      validate = false;
    } else if (element.classList.contains("red-highlighted")) {
      element.classList.remove("red-highlighted");
    }
  });
  return validate;
}

function changeURLLanguage() {
  const langValue = select.value.toLowerCase();
  localStorage.setItem("lang", langValue);
  document.location.href = window.location.origin;
}

function getDoneMessage() {
  const lang = localStorage.getItem("lang");
  let title;
  let subTitle;
  switch (lang) {
    case "ru":
      title = "Заявка отправлена";
      subTitle = "Мы свяжемся с вами в течение 30 минут";
      break;
    case "en":
      title = "Application sent";
      subTitle = "We will contact you within 30 minutes";
      break;
    case "uk":
      title = "Заявка відправлена";
      subTitle = "Ми зв'яжемося з вами протягом 30 хвилин";
      break;
    default: {
      title = "Заявка отправлена";
      subTitle = "Мы свяжемся с вами в течение 30 минут";
      break;
    }
  }
  return [title, subTitle];
}

function getErrorMessage() {
  const lang = localStorage.getItem("lang");
  let title;
  let subTitle;
  switch (lang) {
    case "ru":
      title = "Произошла ошибка";
      subTitle = "Пожалуйста, попробуйте позже";
      break;
    case "en":
      title = "An error occurred";
      subTitle = "Please try again later";
      break;
    case "uk":
      title = "Ой, сталася помилка";
      subTitle = "Будь ласка, спробуйте пізніше";
      break;
    default: {
      title = "Произошла ошибка";
      subTitle = "Пожалуйста, попробуйте позже";
      break;
    }
  }
  return [title, subTitle];
}

// lazy loading

const lazyImages = document.querySelectorAll(
  "img[data-src],source[data-srcset]"
);

const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];

if (lazyImages.length > 0) {
  lazyImages.forEach((img) => {
    if (img.dataset.src || img.dataset.srcset) {
      lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
      lazyScrollCheck();
    }
  });
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
  if (
    document.querySelectorAll("img[data-src], source[data-srcset]").length > 0
  ) {
    lazyScrollCheck();
  }
}

function lazyScrollCheck() {
  let imgIndex = lazyImagesPositions.findIndex(
    (item) => pageYOffset > item - windowHeight
  );
  if (imgIndex >= 0) {
    if (lazyImages[imgIndex].dataset.src) {
      lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute("data-src");
    } else if (lazyImages[imgIndex].dataset.srcsetl) {
      lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcsetl;
      lazyImages[imgIndex].removeAttribute("data-srcset");
    }
    delete lazyImagesPositions[imgIndex];
  }
}

// if (
//   !isApple
// ) {
//   const cards = document.querySelectorAll(".card");
//   if (cards.length) {
//     cards.forEach((card) => {
//       card.classList.add("safari-fix-outline");
//     });
//   }
// }
