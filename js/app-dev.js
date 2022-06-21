;(function() {
  'use strict';

  // Modal
  let modal = document.querySelector('[data-modal-modal]');
  let open  = document.querySelector('[data-modal-open]');
  let close = document.querySelector('[data-modal-close]');

  close .addEventListener('click', closeModal);
  open  .addEventListener('click', openModal);
  window.addEventListener('click', exitModal);

  // Step
  let procent = document.querySelector('[data-progress-procent]');
  let line = document.querySelector('[data-progress-line]');

  let stepBtn = document.querySelectorAll('[data-checker]');

  for (let i = 0; i < stepBtn.length; i++) {
    stepBtn[i].addEventListener('click', enable);
  }

  // Details
  let allDetails = document.querySelectorAll('[ data-details]');

  for (let i = 0; i < allDetails.length; i++) {
    allDetails[i].addEventListener('input', enableDetails);
  }

  // FUNC
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
    let currentBtn = e.target.closest('.step').querySelector('[data-next]');
    currentBtn.disabled = false;
    currentBtn.addEventListener('click', plus)
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
    for (let i = 0; i < allDetails.length; i++) {
      if (allDetails[i].value === '') { return; }
    }
    enable(e);
  }

})(window);
