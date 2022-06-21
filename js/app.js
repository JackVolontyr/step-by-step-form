'use strict';

(function () {
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
  // variable
  var modal            = document.querySelector('[data-modal-modal]'),
      line             = document.querySelector('[data-progress-line]'),
      withIslandNumber = document.querySelector('[data-with-island-number]'),
      imageIn          = document.querySelector('[data-image-in]'),
      imageOut         = document.querySelector('[data-image-out]'),

      checkers   = document.querySelectorAll('[data-checker]'),
      allDetails = document.querySelectorAll('[data-details]'),
      allSizes   = document.querySelectorAll('[data-size]'),

      inputParent = withIslandNumber.parentElement,

      shapeIn = document.querySelector('[data-shape-in]'),

      sizeIn  = document.querySelector('[data-size-in]'),
      sizeInWidth  = document.querySelector('[data-size-width]'),
      sizeInHeight = document.querySelector('[data-size-height]'),

      lengthIn  = document.querySelector('[data-length-in]'),
      lengthInHeight = document.querySelector('[data-length-height]'),
      lengthInWidth  = document.querySelector('[data-length-width]'),

      materialsIn = document.querySelector('[data-materials-in]'),

      configurationInA = document.querySelector('[data-configuration-in-a]'),
      configurationInE = document.querySelector('[data-configuration-in-e]'),

      total = {
        grid: document.querySelector('[data-total-grid]'),

        shape:  document.querySelector('[data-total-shape]'),
        size:   document.querySelector('[data-total-size]'),
        length: document.querySelector('[data-total-length]'),

        materials:     document.querySelector('[data-total-materials]'),
        configuration: document.querySelector('[data-total-configuration]')
      }
  ;


  // Event
  // modal-close
  document.querySelector('[data-modal-close]').addEventListener(
    'click', closeModal
  );

  // modal-open
  document.querySelector('[data-modal-open]').addEventListener(
    'click', openModal
  );

  // with-island
  document.querySelector('[data-with-island]').addEventListener(
    'click', toggleVisibility
  );

  // window
  window.addEventListener('click', exitModal);

  // data-prev
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-prev]'),
    function(item, i, arr) {
      item.addEventListener('click', minus);
    }
  );

  // data-checker
  Array.prototype.forEach.call(
    checkers,
    function(item, i, arr) {
      item.addEventListener('click', enable);
      item.addEventListener('click', resetPicture);
      item.addEventListener('click', toTotal);
    }
  );

  // data-size
  Array.prototype.forEach.call(
    allSizes,
    function(item, i, arr) {
      item.addEventListener('input', enableSize);
      item.addEventListener('input', toTotal);
    }
  );

  // data-details
  Array.prototype.forEach.call(
    allDetails,
    function(item, i, arr) {
      item.addEventListener('input', enableDetails);
    }
  );

  // INIT
  // hide data-with-island-number
  inputParent.removeChild(withIslandNumber);
  allSizes = document.querySelectorAll('[data-size]');

  // FUNC

  ////////////////////
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


  ////////////////////
  function toggleVisibility(e) {
    if (e.target.checked) {
      inputParent.appendChild(withIslandNumber);
      // visibility in total
      total.grid.className = 'total--top third';
    } else {
      inputParent.removeChild(withIslandNumber);
      // visibility in total
      total.grid.className = 'total--top half';
    }
    return allSizes = document.querySelectorAll('[data-size]');
  }

  ////////////////////
  function enable(e) {
    var currentBtn = e.target.closest('.step').querySelector('[data-next]');
    currentBtn.disabled = false;
    currentBtn.addEventListener('click', plus);
  }
  function disable(e) {
    var currentBtn = e.target.closest('.step').querySelector('[data-next]');
    currentBtn.disabled = true;
    currentBtn.removeEventListener('click', plus);
  }

  function plus(e) {
    line.style.width = e.target.dataset.next;
    doSlide(e, 'next');
  }

  function minus(e) {
    line.style.width = e.target.dataset.prev;
    doSlide(e, 'prev');
  }

  function doSlide(e, direction) {
    switch (direction) {
      case 'next':
        e.target.closest('.step--wrap').style.width = "0px";
        break;

      case 'prev':
        e.target.closest('.step--wrap').previousElementSibling.style.width = "776px";
        break;

      default: break;
    }
  }


  ////////////////////
  function enableSize(e) {
    if (Array.prototype.every.call(allSizes, checkAll)) {
      enable(e);
    } else {
      disable(e)
    }
  }

  function enableDetails(e) {
    if (Array.prototype.every.call(allDetails, checkAll)) {
      enable(e);
    } else {
      disable(e)
    }
  }

  function checkAll(field) {
    return Boolean(field.value);
  }

  ////////////////////
  function resetPicture(e) {
    if (e.target.parentElement === imageIn) {
      var currentImage = document.querySelector('label[for="' + e.target.id + '"] [data-image]');
      imageOut.src = currentImage.src;
    }
  }

  function toTotal(e) {
    switch (e.target.parentElement) {
      case shapeIn:
        total.shape.value = e.target.value;
        break;

      case sizeIn:
        total.size.value = sizeInWidth.value + 'x' + sizeInHeight.value;
        break;

      case lengthIn:
        total.length.value = lengthInHeight.value + 'x' + lengthInWidth.value;
        break;

      case materialsIn:
        total.materials.value = e.target.value;
        break;

      case configurationInA:
      case configurationInE:
        total.configuration.value = e.target.value;
        break;

      default: break;
    }
  }

})(window);


//let eventOpen = new Event("click");
//document.querySelector('[data-modal-open]').dispatchEvent(eventOpen);
