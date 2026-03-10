(function () {
  'use strict';

  const form = document.getElementById('survey-form');
  const sectionTenant = document.getElementById('section-tenant');
  const sectionVendor = document.getElementById('section-vendor');
  const sectionFinal = document.getElementById('section-final');
  const confirmation = document.getElementById('confirmation');
  const main = form.closest('.survey-main');

  const respondentTypeRadios = form.querySelectorAll('input[name="respondent_type"]');

  function updateSectionsByRole() {
    const value = form.querySelector('input[name="respondent_type"]:checked')?.value;

    sectionTenant.hidden = value !== 'tenant';
    sectionVendor.hidden = value !== 'vendor';
    sectionFinal.hidden = !value;

    if (value === 'tenant') {
      sectionTenant.classList.add('reveal');
      sectionVendor.classList.remove('reveal');
    } else if (value === 'vendor') {
      sectionVendor.classList.add('reveal');
      sectionTenant.classList.remove('reveal');
    }
  }

  respondentTypeRadios.forEach(function (radio) {
    radio.addEventListener('change', updateSectionsByRole);
  });

  form.querySelectorAll('[data-other-trigger]').forEach(function (trigger) {
    const box = trigger.closest('.checkbox-with-other');
    if (!box) return;
    const otherInput = box.querySelector('.input-inline');
    if (!otherInput) return;

    trigger.addEventListener('change', function () {
      if (trigger.checked) {
        otherInput.removeAttribute('hidden');
        otherInput.focus();
      } else {
        otherInput.setAttribute('hidden', '');
        otherInput.value = '';
      }
    });
  });

  function updateConditionalFields() {
    form.querySelectorAll('.field-conditional[data-show-when]').forEach(function (block) {
      const name = block.getAttribute('data-show-when');
      const allowed = (block.getAttribute('data-show-values') || '').split(',').map(function (s) { return s.trim(); });
      const chosen = form.querySelector('input[name="' + name + '"]:checked')?.value;
      const show = chosen && allowed.indexOf(chosen) !== -1;
      block.hidden = !show;
    });
  }

  form.querySelectorAll('input[name="tenant_willing"], input[name="vendor_willing"]').forEach(function (input) {
    input.addEventListener('change', updateConditionalFields);
  });

  function validateBeforeSubmit() {
    let valid = true;
    const required = [
      { name: 'age', el: form.querySelector('#age'), msg: 'Please enter your age.' },
      { name: 'location', el: form.querySelector('#location'), msg: 'Please enter your location (city or town).' },
      { name: 'gender', el: form.querySelector('input[name="gender"]:checked'), msg: 'Please select your gender.' },
      { name: 'respondent_type', el: form.querySelector('input[name="respondent_type"]:checked'), msg: 'Please select whether you are looking for a house or renting out a property.' }
    ];

    required.forEach(function (r) {
      const isEmpty = !r.el || (r.el.value !== undefined && String(r.el.value).trim() === '');
      if (isEmpty) {
        valid = false;
        if (r.el) {
          r.el.setCustomValidity(r.msg);
          r.el.reportValidity && r.el.reportValidity();
        }
      } else if (r.el && r.el.setCustomValidity) {
        r.el.setCustomValidity('');
      }
    });

    return valid;
  }

  form.querySelector('#age').addEventListener('input', function () { this.setCustomValidity(''); });
  form.querySelector('#location').addEventListener('input', function () { this.setCustomValidity(''); });
  form.querySelectorAll('input[name="gender"], input[name="respondent_type"]').forEach(function (el) {
    el.addEventListener('change', function () { if (form.querySelector('#age')) form.querySelector('#age').setCustomValidity(''); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    updateConditionalFields();

    if (!validateBeforeSubmit()) {
      return;
    }

    const payload = {};
    const els = form.querySelectorAll('input, textarea, select');
    els.forEach(function (el) {
      if (!el.name) return;
      if (el.type === 'radio' || el.type === 'checkbox') {
        if (el.checked) {
          if (el.type === 'checkbox') {
            if (!Array.isArray(payload[el.name])) payload[el.name] = [];
            payload[el.name].push(el.value);
          } else {
            payload[el.name] = el.value;
          }
        }
      } else {
        if (el.value !== undefined && String(el.value).trim() !== '') {
          payload[el.name] = el.value.trim();
        }
      }
    });

    Object.keys(payload).forEach(function (k) {
      if (Array.isArray(payload[k]) && payload[k].length === 1) {
        payload[k] = payload[k][0];
      }
    });

    console.log('Survey payload:', payload);

    main.classList.add('form-submitted');
    confirmation.hidden = false;
    confirmation.classList.add('reveal');
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateSectionsByRole();
  updateConditionalFields();
})();
