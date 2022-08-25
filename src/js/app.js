// slider
const localStorage = window.localStorage;
const select = document.querySelector('#lang-select');
select.addEventListener('change', changeURLLanguage);



new Swiper ('.portfolio__content', {
    spaceBetween: 5,
    centeredSlides: true,
    initialSlide: 5,
    loop: true,
    pagination: {
        el: '.pagination',
        clickable: true
    },
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true
    },
    breakpoints: {
        1: {
            slidesPerView: 1.5,
            spaceBetween: 0
        },
       
        428: {
            slidesPerView: 1.75,
            spaceBetween: 0
        },
        769: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

new Swiper ('.about__slider', {
    spaceBetween: 30,
    centeredSlides: true,
    initialSlide: 5,
    slideToClickedSlide: true,
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true
    },
    breakpoints: {
       
        1: {
            slidesPerView: 2.3,
            spaceBetween: 15
        },
        769: {
            slidesPerView: 2.6,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

new Swiper ('.cards-container', {
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true
    },
    navigation: {
        prevEl: ('.cards__left'),
        nextEl: ('.cards__right')
    },
    pagination: {
        el: '.swiper-pagination',
        clicable: true
    },
    slidesPerView: 2.9,
    effect: 'coverflow',
    spaceBetween: 50,
    loop: true,
    coverflowEffect: {
        slideShadows: false,
      },
    centeredSlides: true,
    breakpoints: {
        320: {
            slidesPerView: 1.3,
            effect: 'coverflow',
            spaceBetween: 0,
           
        },
        375: {
            slidesPerView: 1.4,
            spaceBetween: 0,
            effect: 'coverflow',
            
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

        } 
    }
});

const menuLinks = document.querySelectorAll ('[data-goto]');
menuLinks.forEach (element => {
    element.addEventListener('click', goto)
})

function goto (e) {
    e.preventDefault();
    const menulink = e.target;
    const gotoObject = document.querySelector(menulink.dataset.goto);
    const gotoObjectValue = gotoObject.getBoundingClientRect().top + pageYOffset;
    window.scrollTo({
        top: gotoObjectValue,
        behavior: "smooth"
    })
}


   // Form functionality

    $('.form').on('submit', function(event) {
        event.preventDefault();
        const sendButton = this.querySelector('button'); // prevent reload 
        const form = this;
        if (validateForm(form)) {
            const formData = new FormData(form);
            formData.append('service_id', 'service_qd6sg5t');
            formData.append('template_id', 'template_wqwoxc1');
            formData.append('user_id', '9Mted7Y1TpHPSiEya');
            formLoading(form, true);
            disableInputs(form, true);
            $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
                type: 'POST',
                data: formData,
                contentType: false, // auto-detection
                processData: false // no need to parse formData to string
            }).done(function() {
                formLoading(form, false);
                disableInputs(form, true);
                sendButton.disabled = true;
                sendButton.classList.add('btn-inactive');
                form.reset();
                changeFormText(form, getDoneMessage()[0], getDoneMessage()[1]);
            }).fail(function(error) {
                formLoading(form, false);
                disableInputs(form, false);
                changeFormText(form, getErrorMessage()[0], getErrorMessage()[1]);
            });
        }
    });

    function formLoading (form, loadingOn) {
        const formBtn = form.querySelector('button');
        if (loadingOn){
            disableInputs (form, true);
            formBtn.classList.add('btn-loading');
            formBtn.disabled = true;
        } else {
            disableInputs (form, false);
            formBtn.classList.remove('btn-loading');
            formBtn.disabled = false;
        }
    }

    function disableInputs (form, status) {
        const inputs = form.querySelectorAll('input');
        if (status) {
            inputs.forEach(input => {
                input.disabled = true;
            });
        } else {
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
    }

    function changeFormText (form, title, subTitle) {
        const titleItem = form.closest('.container').querySelector('._form-title'),
             subTitleItem = form.closest('.container').querySelector('._form-sub-title');
             titleItem.textContent = title;
             subTitleItem.textContent = subTitle;
    }

    function validateForm (form) {
        const elements = form.querySelectorAll('._req');
        let validate = true;
         elements.forEach(element => {
            if (element.value === '') {
                element.classList.add('red-highlighted');
                validate = false;
            }  else if (element.classList.contains('red-highlighted')) {
                element.classList.remove('red-highlighted');
            }
        })
        return validate;
    }
    

   //  $('.request-form__close-btn').on('click', closeContactForm);
    // $('.connect-btn').on('click', openContactForm);
     
   //  $('.cover').on('click',closeContactForm);
   //  
   //  function closeContactForm () {
   //      $('.contact-block')[0].removeAttribute('style');    
   //      $('.cover')[0].classList.remove('back-filter');
   //      $('.contact-block')[0].classList.remove('form-fixed');
   //      $('.request-form__close-btn')[0].classList.add('hidden');
   //      document.body.classList.remove('overflow-hidden');
   //  }
   //  
   //  function openContactForm (e) {
   //      e.preventDefault();
   //      $('.contact-block')[0].style.display = 'block';
   //      $('.cover')[0].classList.add('back-filter');
   //      $('.contact-block')[0].classList.add('form-fixed');
   //      $('.request-form__close-btn')[0].classList.remove('hidden');
   //      document.body.classList.add('overflow-hidden');
   //  }
    
// select language




function changeURLLanguage () {
    const langValue = select.value.toLowerCase();
    localStorage.setItem('lang', langValue);
    document.location.href = window.location.origin;
}

function getDoneMessage () {
    const lang = localStorage.getItem('lang');
    let title;
    let subTitle;
    switch (lang) {
        case 'ru': 
            title = "Заявка отправлена";
            subTitle = "Мы свяжемся с вами в течение 30 минут"
            break;
        case 'en':
            title = "Application sent";
            subTitle = "We will contact you within 30 minutes"
            break;
    }
    return [title, subTitle];
}

function getErrorMessage () {
    const lang = localStorage.getItem('lang');
    let title;
    let subTitle;
    switch (lang) {
        case 'ru': 
            title = "Произошла ошибка";
            subTitle = "Пожалуйста, попробуйте позже"
            break;
        case 'en':
            title = "An error occurred";
            subTitle = "Please try again later"
            break;
    }
    return [title, subTitle];
}

