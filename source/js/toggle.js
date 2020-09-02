var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var orderBtn = document.querySelectorAll('.js-order');
var cartModal = document.querySelector('.cart-modal');
var overlay = document.querySelector('.overlay');
var iframeContact = document.querySelector('.contacts__map-wrapper--iframe');
var pictureContact = document.querySelector('.contacts__map-wrapper--picture');

var cartModalClose = function() {
  if (!cartModal.classList.contains('cart-modal--close')) {
    cartModal.classList.add('cart-modal--close');
    overlay.classList.remove('overlay--active');
  }
};

iframeContact.classList.remove('iframe-close');
pictureContact.classList.add('picture-close');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--close')) {
    navMain.classList.remove('main-nav--close');
    navMain.classList.add('main-nav--open');
  } else {
    navMain.classList.add('main-nav--close');
    navMain.classList.remove('main-nav--open');
  }
});

overlay.addEventListener('click', cartModalClose);

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    cartModalClose();
    console.log('close');
  }
});

for (var i=0; i < orderBtn.length; i++) {
  orderBtn[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    if (cartModal.classList.contains('cart-modal--close')) {
      cartModal.classList.remove('cart-modal--close');
      overlay.classList.add('overlay--active');
    }
  });
}
