var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var orderBtn = document.querySelector('.js-order');
var cartModal = document.querySelector('.cart-modal');
var overlay = document.querySelector('.overlay');

var cartModalClose = function() {
  overlay.classList.remove('overlay--active');
  cartModal.classList.add('cart-modal--close');
};

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

orderBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (cartModal.classList.contains('cart-modal--close')) {
    cartModal.classList.remove('cart-modal--close')
    overlay.classList.add('overlay--active')


  }
});

document.addEventListener('click', function(evt) {
  var isClickInside = cartModal.contains(evt.target);
  if (isClickInside) {
    console.log('click inside')
    cartModalClose();
  } else {
    console.log('click outside')
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    cartModalClose();
    console.log('close')
  };
});
