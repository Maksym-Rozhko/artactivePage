const popUpCloseBtn = document.querySelectorAll('.pop-up-close');
const popUpElem = document.querySelector('.pop-up');
const orderCallBtn = document.querySelector('.tel-box-btn');
const orderPrintBtn = document.querySelector('.container-order-btn');
const popUpTitleElem = document.querySelector('.pop-up-title');
const popUpBtnSubmit = document.querySelector('.pop-up-btn');
const resetFormBtn = document.querySelector('.pop-up-btn-reset');
const popUpInputElems = document.querySelectorAll('.pop-up-input');
const btnScrollDown = document.querySelector('.button-down');
const footerElem = document.querySelector('.footer'); 
const navMenu = document.querySelector('.navigation');
const burgerMenu = document.querySelector('#burgerToogle');
const servicesFormBtn = document.querySelector('.services-form-box-button');


function checkTitleText(titleTextElem) {
  let text = titleTextElem.innerHTML.trim();
  let changeWordToCall = text.replace('печать', 'звонок');
  let changeWordToPrint = text.replace('звонок', 'печать');

  text.includes('печать') ?  newText = changeWordToCall : newText = changeWordToPrint;

  return newText;
}

closePopUp = (e) => {
  popUpElem.classList.toggle('pop-up__hidden');
}

for (btn of popUpCloseBtn) {
  btn.addEventListener('click', e => closePopUp(e));
}

window.addEventListener('click', e => {
  const target = e.target;
  target === popUpElem ? popUpElem.classList.toggle('pop-up__hidden') : false;
});

orderCallBtn.addEventListener('click', () => {
  checkTitleText(popUpTitleElem);
  
  popUpTitleElem.innerHTML.includes('печать') ? popUpTitleElem.innerHTML = newText : false;
  closePopUp();
});

orderPrintBtn.addEventListener('click', () => {
  checkTitleText(popUpTitleElem);

  popUpTitleElem.innerHTML.includes('звонок') ? popUpTitleElem.innerHTML = newText : false;
  closePopUp();
});

servicesFormBtn.addEventListener('click', () => {
  checkTitleText(popUpTitleElem);
  popUpTitleElem.innerHTML = newText;

  closePopUp();
});

function changeContainer() {
  const containerActive = document.querySelector('.pop-up-form.pop-up__is-active');
  const containerInactive = document.querySelector('.pop-up-form:not(.pop-up__is-active)'); 

  containerActive.classList.remove('pop-up__is-active');
  containerInactive.classList.add('pop-up__is-active');
}

function resetApp() {
  for (input of popUpInputElems) {
    input.value = ''
  }
}

popUpBtnSubmit.addEventListener('click', e => {
  e.preventDefault();
  changeContainer();

  setTimeout(resetApp, 500);
});

resetFormBtn.addEventListener('click', changeContainer);


let header = document.querySelector(".header");
let switchPanel = document.getElementsByClassName("switch")[0];
switchPanel.addEventListener("change", scrollSwitch, true);

let indicator = document.getElementsByClassName("switch__indicator")[0];
indicator.addEventListener("click", toggleIndicator, false);

let section = document.querySelectorAll("section[data-label]");
let subsection = document.querySelectorAll("div.services-content, section.section-interior, section.section-printing");
let prevSect;
let prevEl;

document.addEventListener("scroll", getCoords, false);

function getCoords() {
  if (header.getBoundingClientRect().bottom >= 10) {
    scrollSwitch("header");
    return;
  };

  if (section[0].getBoundingClientRect().bottom >= 10) {
    scrollSwitch(section[0].id);
    return;
  };

  for (let i = 0; i < subsection.length; i++) {
    if (subsection[i].getBoundingClientRect().bottom >= 10) {
      scrollSwitch("services"+ (i + 1));
      return;
    };
  };

  for (let i = 1; i < section.length; i++) {
    if (i === section.length - 2 && section[section.length - 1].getBoundingClientRect().top <= window.outerHeight / 2) {
      scrollSwitch(section[section.length - 1].id);
      return;
    };

    if (section[i].getBoundingClientRect().bottom >= 10) {
      scrollSwitch(section[i].id);
      return;
    };
  };
};

function scrollSwitch(evt) {
  let switchEl = evt;
  let subs = evt;

  if (prevSect && prevSect === evt) return;
  prevSect = evt;

  if (evt.target && evt.target.nodeName === "INPUT") {
    document.removeEventListener("scroll", getCoords, false);

    switchEl = evt.target.id.substring(14);
    subs = subsection[+evt.target.id.substr(-1, 1) - 1];
  };

  switch (switchEl) {
    case "header":
      goToElem(header)
      break;
    case "about-us":
      goToElem(section[0])
      break;
    case "services1":
      goToElem(section[1], true)
      break;
    case "services2":
      goToElem(section[2])
      break;
    case "services3":
      goToElem(section[3])
      break;
    case "reviews":
      goToElem(section[4])
      break;
    case "questions":
      goToElem(section[5])
      break;
    case "contacts":
      goToElem(section[6])
      break;
  };

  function goToElem(elem, isServices) {
    if (evt.target) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      let currentBtn = document.getElementById("switchButton__" + evt);
      currentBtn.checked = true;
    };

    toggleIndicator(isServices);
    setTimeout(function () { 
      document.addEventListener("scroll", getCoords, false) 
    }, 100);
  };
};

function toggleIndicator(isServicesButton) {
  let isChecked = indicator.classList.contains("switch__indicator--checked");
  let checkedBtn = document.querySelector(".switch__button:checked");

  if (isServicesButton && checkedBtn) checkedBtn.checked = false;

  if (isServicesButton && isServicesButton.target) {
    let servicesFirstBtn = document.getElementById("switchButton__services1");
    servicesFirstBtn.focus();
    servicesFirstBtn.checked = true;
    document.getElementsByClassName("services")[0].scrollIntoView();
  };

  if (isServicesButton && !isChecked) indicator.classList.add("switch__indicator--checked");
  if (!isServicesButton && isChecked) indicator.classList.remove("switch__indicator--checked");
};

function smoothScroll() {
  const anchors = document.querySelectorAll('a.container-logo, a.navigation-link');
  for(let anchor of anchors) {
    const blockId = anchor.getAttribute('href');
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
     
      document.querySelector(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}
smoothScroll();

document.addEventListener("focus", correctTabulation, true);

function correctTabulation(evt) {
  if (prevEl && prevEl.name !== "switchButton" && evt.target.name === "switchButton" || (evt.target.classList && evt.target.classList.contains("switch__indicator"))) {
    document.onkeydown = function (event) {
      if (event.keyCode !== 9) return;

      prevEl.focus();
      document.onkeydown = null;
    };

  } else {
    if (evt.target.nodeName !== "#document" && evt.target !== document.body && evt.target !== document.documentElement) prevEl = evt.target;
  };
};

btnScrollDown.addEventListener('click', () => {
  footerElem.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

burgerMenu.addEventListener('click', (e) => {
  e.preventDefault();
  const overflowBody = document.body;

  navMenu.classList.toggle('navigation-active');
  burgerMenu.classList.toggle('active');
  overflowBody.classList.toggle('overflow');
});

window.addEventListener('click', (e) => {
  const target = e.target;
  const overflowBody = document.body;
  if (target === overflowBody) {
    navMenu.classList.toggle('navigation-active')
    overflowBody.classList.toggle('overflow');
    burgerMenu.classList.toggle('active');
  } else {
    false;
  }
});

const sliderImg = document.querySelector('#sliderImg');
const btnHeaderPrevSlide = document.querySelector('.arrow-left');
const btnHeaderNextSlide = document.querySelector('.arrow-right');

let slideImg = 0;
const delay = 5000;

const imgItems = [
  './images/mobile/services/layer4.png',
  './images/mobile/services/layer5.png',
];

const nextSlide = () => {
  if (slideImg < (imgItems.length - 1)) {
    slideImg++;
  } else {
    slideImg = 0;
  }
  sliderImg.src = `${imgItems[slideImg]}`;
  // sliderImg.classList.toggle('active');
}

const prevSlide = () => {
  if (slideImg > 0) {
    slideImg--;
  } else {
    slideImg = imgItems.length - 1;
  }
  sliderImg.src = `${imgItems[slideImg]}`;  
}

// setInterval(function() {
//   sliderImg.src = imgItems[slideImg];
//   slideImg++;
//   if(slideImg >= imgItems.length) {
//     slideImg = 0;
//   } 
// }, delay);

nextSlide();
btnHeaderNextSlide.addEventListener('click', nextSlide);
btnHeaderPrevSlide.addEventListener('click', prevSlide);
