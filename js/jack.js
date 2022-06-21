/*
Copyright (c) 2016, Jack Jack All Rights Reserved.
*/
'use strict';
;(function () {
  'use strict';
  // element-closest | CC0-1.0 | github.com/jonathantneal/closest
  if (typeof Element.prototype.matches !== 'function') {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;
      while (elements[index] && elements[index] !== element) {
        ++index;
      }
      return Boolean(elements[index]);
    };
  }
  if (typeof Element.prototype.closest !== 'function') {
    Element.prototype.closest = function closest(selector) {
      var element = this;
      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
      }
      return null;
    };
  }


  // Modal
  var modal = document.querySelector('[data-modal-modal]');
  var closeElem = document.querySelector('[data-modal-close]');

  closeElem.addEventListener('click', closeModal);
  window.addEventListener('click', exitModal);

  // BTN
  document.body.addEventListener('click', addBtn);
  document.body.addEventListener('keyup', addBtn);

  var leftBtn  = createBtn('Book your showroom visit online', 'leftBtnGal', 'https://baczewskiluxury.youcanbook.me');
  var rightBtn = createBtn('Price your kitchen', 'rightBtnGal', '#');
  rightBtn.onclick = 'return false';
  rightBtn.setAttribute('data-modal-open', '');


  // Step
  var procent = document.querySelector('[data-progress-procent]');
  var line = document.querySelector('[data-progress-line]');

  var stepBtn = document.querySelectorAll('[data-checker]');

  for (var i = 0; i < stepBtn.length; i++) {
    stepBtn[i].addEventListener('click', enable);
  }

  // Details
  var allDetails = document.querySelectorAll('[data-details]');

  for (var _i = 0; _i < allDetails.length; _i++) {
    allDetails[_i].addEventListener('input', enableDetails);
  }

  // FUNC
  function addBtn(e) {
    if (e.target.closest('.rightBtnGal') || e.target.closest('.modal')) { return; }

    var wait = setTimeout(function () {
      if (document.querySelector('.fancybox-inner')) {
        document.querySelector('.fancybox-inner').appendChild(leftBtn);
        document.querySelector('.fancybox-inner').appendChild(rightBtn);
        // Modal
        document.querySelector('[data-modal-open]').addEventListener('click', openModal);
        clearTimeout(wait);
      }
    }, 400);
  }
  function createBtn(text, className, href) {
    var btnElem = document.createElement('a');
    btnElem.innerHTML = text;
    btnElem.className = className;
    btnElem.href = href;
    return btnElem;
  }

  // Modal
  function closeModal() {
    modal.style.display = "none";
  }
  function openModal() {
    modal.style.display = "block";
  }
  function exitModal(e) {
    if (e.target === modal) {
      closeModal();
    }
  }

  // Step
  function enable(e) {
    var currentBtn = e.target.closest('.step').querySelector('[data-next]');
    currentBtn.disabled = false;
    currentBtn.addEventListener('click', plus);
  }
  function plus(e) {
    procent.innerHTML = '';
    line.innerHTML = e.target.dataset.next;
    line.style.width = e.target.dataset.next;
    doSlide(e);
  }
  function doSlide(e) {
    e.target.closest('.step--wrap').style.width = "0px";
  }

  // Details
  function enableDetails(e) {
    for (var _i2 = 0; _i2 < allDetails.length; _i2++) {
      if (allDetails[_i2].value === '') {
        return;
      }
    }
    enable(e);
  }
})(window);
