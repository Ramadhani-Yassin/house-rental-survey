(function () {
  'use strict';

  const form = document.getElementById('survey-form');
  const sectionTenant = document.getElementById('section-tenant');
  const sectionVendorType = document.getElementById('section-vendor-type');
  const sectionVendorHouse = document.getElementById('section-vendor-house');
  const sectionVendorAirbnb = document.getElementById('section-vendor-airbnb');
  const sectionVendorLand = document.getElementById('section-vendor-land');
  const sectionFinal = document.getElementById('section-final');
  const confirmation = document.getElementById('confirmation');
  const main = form.closest('.survey-main');
  const langToggle = document.getElementById('lang-toggle');

  let currentLang = 'en';

  var i18n = {
    en: {
      title: 'House Rental Platform Survey',
      subtitle: 'Tanzania — Understanding demand for a digital rental platform',
      purpose: 'Your responses are confidential and will help shape a better way to find or list rental houses.',
      langToggle: 'Translate to Swahili',
      respondentDetails: 'Respondent details',
      name: 'Name',
      optional: '(optional)',
      age: 'Age',
      location: 'Location (City / Town)',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      preferNot: 'Prefer not to say',
      areYou: 'Are you',
      tenantRole: 'Looking for a rental house',
      tenantRoleEm: '(Tenant)',
      vendorRole: 'Renting out a property',
      vendorRoleEm: '(House Owner / Vendor)',
      vendorTypeTitle: 'What type of property do you offer?',
      vendorHouseRental: 'House rental',
      vendorAirbnb: 'Airbnb owner',
      vendorLandSeller: 'Land seller',
      sectionTenant: 'For individuals seeking rental houses',
      sectionFinal: 'Final feedback',
      suggestionsLabel: 'Suggestions for features or services you\'d like on a house rental platform',
      suggestionsPlaceholder: 'Share your ideas…',
      submitSurvey: 'Submit survey',
      thankYou: 'Thank you',
      confirmationText: 'Your response has been recorded. Your feedback helps us understand demand for a better house rental platform in Tanzania.',
      footer: 'Confidential • Tanzania House Rental Survey',
      langToggleShowWhenSw: 'Translate to English'
    },
    sw: {
      title: 'Kazi ya Uchunguzi — Jukwaa la Kukodisha Nyumba',
      subtitle: 'Tanzania — Kuelewa mahitaji ya jukwaa la kidijitali la kukodisha nyumba',
      purpose: 'Majibu yako ni ya siri na yatasaidia kuunda njia bora ya kupata au kuorodhesha nyumba za kukodisha.',
      langToggle: 'Tafsiri kwa Kiingereza',
      respondentDetails: 'Taarifa za mhojiwa',
      name: 'Jina',
      optional: '(si lazima)',
      age: 'Umri',
      location: 'Mahali (Jiji / Mji)',
      gender: 'Jinsia',
      male: 'Mwanaume',
      female: 'Mwanamke',
      preferNot: 'Sipendi kusema',
      areYou: 'Je, wewe ni',
      tenantRole: 'Unatafuta nyumba ya kukodisha',
      tenantRoleEm: '(Mkodi)',
      vendorRole: 'Unakodisha mali',
      vendorRoleEm: '(Mmiliki nyumba / Muuzaji)',
      vendorTypeTitle: 'Ni aina gani ya mali unayotoa?',
      vendorHouseRental: 'Kukodisha nyumba',
      vendorAirbnb: 'Mmiliki Airbnb',
      vendorLandSeller: 'Muuzaji ardhi',
      sectionTenant: 'Kwa watu wanaotafuta nyumba za kukodisha',
      sectionFinal: 'Maoni ya mwisho',
      suggestionsLabel: 'Mapendekezo ya vipengele au huduma ungependa kwenye jukwaa la kukodisha nyumba',
      suggestionsPlaceholder: 'Shiriki mawazo yako…',
      submitSurvey: 'Tuma uchunguzi',
      thankYou: 'Asante',
      confirmationText: 'Jibu lako limeandikwa. Maoni yako yanatusaidia kuelewa mahitaji ya jukwaa bora la kukodisha nyumba Tanzania.',
      footer: 'Siri • Uchunguzi wa Kukodisha Nyumba Tanzania'
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'sw' ? 'sw' : 'en';
    var t = i18n[lang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    if (langToggle) langToggle.textContent = lang === 'sw' ? i18n.en.langToggleShowWhenSw : i18n.en.langToggle;
    var placeholders = form.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });
    var confirmTitle = document.querySelector('.confirmation-title');
    var confirmText = document.querySelector('.confirmation-text');
    if (confirmTitle && t.thankYou) confirmTitle.textContent = t.thankYou;
    if (confirmText && t.confirmationText) confirmText.textContent = t.confirmationText;
    var footerP = document.querySelector('.survey-footer p');
    if (footerP && t.footer) footerP.textContent = t.footer;
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'sw' : 'en';
      applyLanguage(currentLang);
    });
  }

  function updateSectionsByRole() {
    var respondentType = form.querySelector('input[name="respondent_type"]:checked')?.value;

    sectionTenant.hidden = respondentType !== 'tenant';
    sectionVendorType.hidden = respondentType !== 'vendor';
    sectionVendorHouse.hidden = true;
    sectionVendorAirbnb.hidden = true;
    sectionVendorLand.hidden = true;

    var showFinal = respondentType === 'tenant';
    if (respondentType === 'vendor') {
      var subtype = form.querySelector('input[name="vendor_subtype"]:checked')?.value;
      if (subtype === 'house_rental') {
        sectionVendorHouse.hidden = false;
        sectionVendorHouse.classList.add('reveal');
      } else if (subtype === 'airbnb_owner') {
        sectionVendorAirbnb.hidden = false;
        sectionVendorAirbnb.classList.add('reveal');
      } else if (subtype === 'land_seller') {
        sectionVendorLand.hidden = false;
        sectionVendorLand.classList.add('reveal');
      }
      showFinal = !!subtype;
    }
    sectionFinal.hidden = !showFinal;

    if (respondentType === 'tenant') sectionTenant.classList.add('reveal');
    if (respondentType === 'vendor') sectionVendorType.classList.add('reveal');
  }

  form.querySelectorAll('input[name="respondent_type"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      form.querySelectorAll('input[name="vendor_subtype"]').forEach(function (r) { r.checked = false; });
      updateSectionsByRole();
    });
  });

  form.querySelectorAll('input[name="vendor_subtype"]').forEach(function (radio) {
    radio.addEventListener('change', updateSectionsByRole);
  });

  form.querySelectorAll('[data-other-trigger]').forEach(function (trigger) {
    var box = trigger.closest('.checkbox-with-other');
    if (!box) return;
    var otherInput = box.querySelector('.input-inline');
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
      var name = block.getAttribute('data-show-when');
      var allowed = (block.getAttribute('data-show-values') || '').split(',').map(function (s) { return s.trim(); });
      var chosen = form.querySelector('input[name="' + name + '"]:checked')?.value;
      block.hidden = !chosen || allowed.indexOf(chosen) === -1;
    });
  }

  form.querySelectorAll('input[name="tenant_willing"], input[name="vendor_willing"], input[name="airbnb_willing"], input[name="land_willing"]').forEach(function (input) {
    input.addEventListener('change', updateConditionalFields);
  });

  function validateBeforeSubmit() {
    var valid = true;
    var required = [
      { el: form.querySelector('#age'), msg: currentLang === 'sw' ? 'Tafadhali weka umri wako.' : 'Please enter your age.' },
      { el: form.querySelector('#location'), msg: currentLang === 'sw' ? 'Tafadhali weka mahali (jiji au mji).' : 'Please enter your location (city or town).' },
      { el: form.querySelector('input[name="gender"]:checked'), msg: currentLang === 'sw' ? 'Tafadhali chagua jinsia.' : 'Please select your gender.' },
      { el: form.querySelector('input[name="respondent_type"]:checked'), msg: currentLang === 'sw' ? 'Tafadhali chagua kama unatafuta nyumba au unakodisha mali.' : 'Please select whether you are looking for a house or renting out a property.' }
    ];
    required.forEach(function (r) {
      var isEmpty = !r.el || (r.el.value !== undefined && String(r.el.value).trim() === '');
      if (isEmpty) {
        valid = false;
        if (r.el) {
          r.el.setCustomValidity(r.msg);
          if (r.el.reportValidity) r.el.reportValidity();
        }
      } else if (r.el && r.el.setCustomValidity) r.el.setCustomValidity('');
    });
    var respondentType = form.querySelector('input[name="respondent_type"]:checked')?.value;
    if (respondentType === 'vendor') {
      var subtype = form.querySelector('input[name="vendor_subtype"]:checked');
      if (!subtype) {
        valid = false;
        if (sectionVendorType) sectionVendorType.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    return valid;
  }

  form.querySelector('#age').addEventListener('input', function () { this.setCustomValidity(''); });
  form.querySelector('#location').addEventListener('input', function () { this.setCustomValidity(''); });
  form.querySelectorAll('input[name="gender"], input[name="respondent_type"]').forEach(function (el) {
    el.addEventListener('change', function () {
      var ageEl = form.querySelector('#age');
      if (ageEl) ageEl.setCustomValidity('');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    updateConditionalFields();
    if (!validateBeforeSubmit()) return;
    var payload = {};
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
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
        if (el.value !== undefined && String(el.value).trim() !== '') payload[el.name] = el.value.trim();
      }
    });
    Object.keys(payload).forEach(function (k) {
      if (Array.isArray(payload[k]) && payload[k].length === 1) payload[k] = payload[k][0];
    });
    console.log('Survey payload:', payload);
    main.classList.add('form-submitted');
    confirmation.hidden = false;
    confirmation.classList.add('reveal');
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  updateSectionsByRole();
  updateConditionalFields();
  applyLanguage('en');
})();
