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

  // ——— Form submission: Formspree (or Google Sheets) ———
  // 1. Formspree: Sign up at https://formspree.io → New form → copy your form endpoint.
  // 2. Paste it below (replace the placeholder). Leave as '' to only log to console.
  var SUBMIT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw3MFle9_R23oCnc5RE86rT4JiGKAYJVbKuuVhaie8cmHTkLpDnPW-73gGE6Ox7KRGK/exec';

  var i18n = {
    en: {
      title: 'House Rental  Platform Survey',
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
      sending: 'Sending…',
      submitError: 'Something went wrong. Please try again or submit later.',
      thankYou: 'Thank you',
      confirmationText: 'Your response has been recorded. Your feedback helps us understand demand for a better house rental platform in Tanzania.',
      footer: 'Confidential • Tanzania House Rental Survey',
      langToggleShowWhenSw: 'Translate to English',
      selectAll: 'Select all that apply',
      other: 'Other',
      pleaseSpecify: 'Please specify',
      yes: 'Yes',
      no: 'No',
      maybe: 'Maybe',
      tenantFrequency: 'How often do you look for rental houses?',
      tenantFreqFrequently: 'Frequently (every month)',
      tenantFreqOccasionally: 'Occasionally (every 3–6 months)',
      tenantFreqRarely: 'Rarely (less than once a year)',
      tenantMethods: 'What methods do you currently use to find houses for rent?',
      tenantMethWord: 'Word of mouth / Friends',
      tenantMethAgents: 'Real estate agents',
      tenantMethSocial: 'Social media (Facebook, Instagram, WhatsApp, etc.)',
      tenantMethClassified: 'Classified websites / Apps',
      tenantMethWalking: 'Walking around neighborhoods',
      tenantChallenges: 'What challenges do you face when looking for rental houses?',
      tenantChHighPrices: 'High rental prices / Hidden costs',
      tenantChLimited: 'Limited house options',
      tenantChPoorInfo: 'Poor information about the property',
      tenantChLandlords: 'Difficulty finding trusted landlords',
      tenantChLocation: 'Location / Accessibility issues',
      tenantImportance: 'How important are the following when searching?',
      scaleHint: '1 = Not important, 5 = Very important',
      tenantImpPrice: 'Price transparency',
      tenantImpVerified: 'Verified property information',
      tenantImpLocation: 'Location details (maps, nearby services)',
      tenantImpPhotos: 'Photos and videos of the property',
      tenantImpBooking: 'Online booking or reservation',
      tenantWilling: 'Would you use a digital platform to search and view verified rental houses near you?',
      tenantEncourage: 'What would encourage you to use the platform?',
      tenantEncAffordable: 'Affordable subscription / free service',
      tenantEncVariety: 'Wide variety of properties',
      tenantEncAccurate: 'Accurate and detailed property information',
      tenantEncSecure: 'Secure and reliable transactions',
      vendorHouseTitle: 'For house rental (long-term)',
      vendorMethods: 'How do you currently find tenants for your properties?',
      vendorChallenges: 'What challenges do you face when renting out your property?',
      vendorChVacancy: 'Long vacancy periods',
      vendorChTenants: 'Difficulty finding trusted tenants',
      vendorChPayments: 'Delayed or missed payments',
      vendorChMultiple: 'Managing multiple properties',
      vendorChAdvertising: 'Advertising costs',
      vendorWilling: 'Would you list your property (location, photos, prices) on a digital platform for potential tenants?',
      vendorFeatures: 'Which features would you want on the platform?',
      vendorFeatUpload: 'Easy property upload and management',
      vendorFeatVerification: 'Tenant verification system',
      vendorFeatPayment: 'Online rent payment collection',
      vendorFeatBooking: 'Booking / reservation system',
      vendorFeatAnalytics: 'Analytics on property views and interest',
      vendorMotivation: 'What would motivate you most to list on this platform?',
      vendorMotVisibility: 'More visibility and tenants',
      vendorMotVacancy: 'Reduced vacancy periods',
      vendorMotSecure: 'Secure and verified tenants',
      vendorMotManagement: 'Easy property management',
      vendorAirbnbTitle: 'For Airbnb / short-term rental owners',
      airbnbMethods: 'How do you currently find guests for your short-term rental?',
      airbnbMethApp: 'Airbnb or similar apps',
      airbnbMethSocial: 'Social media',
      airbnbMethWord: 'Word of mouth',
      airbnbMethTravel: 'Travel agents / tour operators',
      airbnbChallenges: 'What challenges do you face with short-term rentals?',
      airbnbChSeasonal: 'Seasonal demand / low occupancy',
      airbnbChGuests: 'Finding trusted guests',
      airbnbChCommission: 'High commission fees from platforms',
      airbnbChMaintenance: 'Maintenance between guests',
      airbnbWilling: 'Would you use a Tanzania-focused platform to list your short-term rental alongside long-term options?',
      airbnbFeatures: 'Which features would matter most?',
      airbnbFeatFees: 'Lower fees than international platforms',
      airbnbFeatLocal: 'Local payment methods (M-Pesa, etc.)',
      airbnbFeatBooking: 'Booking and calendar management',
      airbnbFeatReviews: 'Guest reviews and ratings',
      vendorLandTitle: 'For land sellers',
      landMethods: 'How do you currently find buyers for your land?',
      landMethAgents: 'Real estate / land agents',
      landMethSocial: 'Social media',
      landMethWord: 'Word of mouth',
      landMethSignboards: 'Signboards / physical ads',
      landChallenges: 'What challenges do you face when selling land?',
      landChBuyers: 'Difficulty finding serious buyers',
      landChPricing: 'Unclear pricing / valuations',
      landChDocs: 'Documentation and legal process',
      landChScams: 'Fear of scams or fraud',
      landWilling: 'Would you list your land (location, size, price, photos) on a digital platform for potential buyers?',
      landFeatures: 'Which features would you want?',
      landFeatVerified: 'Verified land titles / documentation',
      landFeatMaps: 'Maps and location details',
      landFeatBuyer: 'Buyer verification and safe transactions',
      landFeatLegal: 'Legal and transfer support'
    },
    sw: {
      title: 'Utafiti kuhusu uhitaji— Mfumo wa Kukodisha Nyumba',
      subtitle: 'Tafiti — Kuelewa mahitaji ya mfumo wa  kidijitali la kukodisha nyumba',
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
      sending: 'Inatumwa…',
      submitError: 'Hitilafu imetokea. Tafadhali jaribu tena au tuma baadaye.',
      thankYou: 'Asante',
      confirmationText: 'Jibu lako limeandikwa. Maoni yako yanatusaidia kuelewa mahitaji ya jukwaa bora la kukodisha nyumba Tanzania.',
      footer: 'Siri • Uchunguzi wa Kukodisha Nyumba Tanzania',
      selectAll: 'Chagua yote yanayotumika',
      other: 'Nyingine',
      pleaseSpecify: 'Tafadhali bayana',
      yes: 'Ndiyo',
      no: 'Hapana',
      maybe: 'Labda',
      tenantFrequency: 'Je, mara ngapi unatafuta nyumba za kukodisha?',
      tenantFreqFrequently: 'Mara nyingi (kila mwezi)',
      tenantFreqOccasionally: 'Mara kwa mara (kila miezi 3–6)',
      tenantFreqRarely: 'Mara chache (chini ya mara moja kwa mwaka)',
      tenantMethods: 'Njia zipi unatumia sasa kupata nyumba za kukodisha?',
      tenantMethWord: 'Maneno / Marafiki',
      tenantMethAgents: 'Makundi wa mali isiyohamishika',
      tenantMethSocial: 'Mitandao ya kijamii (Facebook, Instagram, WhatsApp, n.k.)',
      tenantMethClassified: 'Tovuti / programu za matangazo',
      tenantMethWalking: 'Kutembea vitongoji',
      tenantChallenges: 'Je, unakabiliwa na changamoto zipi unapotafuta nyumba za kukodisha?',
      tenantChHighPrices: 'Kodi kubwa / Gharama zilizofichwa',
      tenantChLimited: 'Chaguo chache za nyumba',
      tenantChPoorInfo: 'Taarifa duni kuhusu mali',
      tenantChLandlords: 'Ugumu wa kupata wamiliki waaminifu',
      tenantChLocation: 'Mahali / Mijinz ya ufikiaji',
      tenantImportance: 'Je, mambo yafuatayo yana umuhimu gani unapotafuta?',
      scaleHint: '1 = Si muhimu, 5 = Muhimu sana',
      tenantImpPrice: 'Uwazi wa bei',
      tenantImpVerified: 'Taarifa za mali zilizothibitishwa',
      tenantImpLocation: 'Maelezo ya mahali (ramani, huduma za jirani)',
      tenantImpPhotos: 'Picha na video za mali',
      tenantImpBooking: 'Kuagiza au kuhifadhi nafasi mtandaoni',
      tenantWilling: 'Je, ungetumia jukwaa la kidijitali kutafuta na kuona nyumba za kukodisha zilizothibitishwa karibu nawe?',
      tenantEncourage: 'Ni nini kinachoweza kukuchochea kutumia jukwaa hilo?',
      tenantEncAffordable: 'Uanachama wa bei nafuu / huduma ya bure',
      tenantEncVariety: 'Aina nyingi za mali',
      tenantEncAccurate: 'Taarifa sahihi na za kina kuhusu mali',
      tenantEncSecure: 'Miamala salama na ya kuaminika',
      vendorHouseTitle: 'Kwa wakodishaji wa nyumba (muda mrefu)',
      vendorMethods: 'Je, sasa unapata wakodi kwa mali zako kwa njia gani?',
      vendorChallenges: 'Je, unakabiliwa na changamoto zipi unapokodisha mali yako?',
      vendorChVacancy: 'Vipindi virefu vya utupu',
      vendorChTenants: 'Ugumu wa kupata wakodi waaminifu',
      vendorChPayments: 'Malipo yaliyochelewesha au kukosekana',
      vendorChMultiple: 'Kusimamia mali nyingi',
      vendorChAdvertising: 'Gharama za matangazo',
      vendorWilling: 'Je, ungeorodhesha mali yako (mahali, picha, bei) kwenye jukwaa la kidijitali kwa wakodi watarajiwa?',
      vendorFeatures: 'Ni vipengele vipi ungependa kwenye jukwaa?',
      vendorFeatUpload: 'Kupakia na kusimamia mali kwa urahisi',
      vendorFeatVerification: 'Mfumo wa uthibitishaji wa wakodi',
      vendorFeatPayment: 'Kukusanya malipo ya kodi mtandaoni',
      vendorFeatBooking: 'Mfumo wa kuagiza / kuhifadhi nafasi',
      vendorFeatAnalytics: 'Takwimu za maoni na umakini kuhusu mali',
      vendorMotivation: 'Ni nini kinachoweza kukuchochea zaidi kuorodhesha kwenye jukwaa hili?',
      vendorMotVisibility: 'Kuonekana zaidi na wakodi',
      vendorMotVacancy: 'Kupunguza vipindi vya utupu',
      vendorMotSecure: 'Wakodi salama na waliothibitishwa',
      vendorMotManagement: 'Usimamizi rahisi wa mali',
      vendorAirbnbTitle: 'Kwa wamiliki wa Airbnb / ukodishaji wa muda mfupi',
      airbnbMethods: 'Je, sasa unapata wageni kwa ukodishaji wako wa muda mfupi kwa njia gani?',
      airbnbMethApp: 'Programu za Airbnb au zinazofanana',
      airbnbMethSocial: 'Mitandao ya kijamii',
      airbnbMethWord: 'Maneno',
      airbnbMethTravel: 'Wasafiri / waendesha ziara',
      airbnbChallenges: 'Je, unakabiliwa na changamoto zipi na ukodishaji wa muda mfupi?',
      airbnbChSeasonal: 'Mahitaji ya msimu / uchukuzi chini',
      airbnbChGuests: 'Kupata wageni waaminifu',
      airbnbChCommission: 'Ada kubwa kutoka jukwaa',
      airbnbChMaintenance: 'Matengenezo kati ya wageni',
      airbnbWilling: 'Je, ungetumia jukwaa linalolenga Tanzania kuorodhesha ukodishaji wako wa muda mfupi pamoja na chaguo za muda mrefu?',
      airbnbFeatures: 'Ni vipengele vipi vinavyokuwa muhimu zaidi?',
      airbnbFeatFees: 'Ada ndogo kuliko jukwaa za kimataifa',
      airbnbFeatLocal: 'Njia za malipo za ndani (M-Pesa, n.k.)',
      airbnbFeatBooking: 'Usimamizi wa kuagiza na kalenda',
      airbnbFeatReviews: 'Maoni na ukadiriaji wa wageni',
      vendorLandTitle: 'Kwa wauzaji ardhi',
      landMethods: 'Je, sasa unapata wanunuzi wa ardhi yako kwa njia gani?',
      landMethAgents: 'Wakala wa mali / ardhi',
      landMethSocial: 'Mitandao ya kijamii',
      landMethWord: 'Maneno',
      landMethSignboards: 'Mabango / matangazo halisi',
      landChallenges: 'Je, unakabiliwa na changamoto zipi unapouza ardhi?',
      landChBuyers: 'Ugumu wa kupata wanunuzi makini',
      landChPricing: 'Bei isiyo wazi / ukadiriaji',
      landChDocs: 'Nyaraka na mchakato wa kisheria',
      landChScams: 'Hofu ya udanganyifu',
      landWilling: 'Je, ungeorodhesha ardhi yako (mahali, ukubwa, bei, picha) kwenye jukwaa la kidijitali kwa wanunuzi watarajiwa?',
      landFeatures: 'Ni vipengele vipi ungependa?',
      landFeatVerified: 'Miliki ardhi / nyaraka zilizothibitishwa',
      landFeatMaps: 'Ramani na maelezo ya mahali',
      landFeatBuyer: 'Uthibitishaji wa mununuzi na miamala salama',
      landFeatLegal: 'Msaada wa kisheria na uhamishaji'
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
    /* Floating button content set above via lang-flag and lang-text */
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
    var flagEl = document.getElementById('lang-flag');
    var textEl = document.getElementById('lang-text');
    if (langToggle) {
      langToggle.title = lang === 'sw' ? 'Translate to English' : 'Translate to Swahili';
      if (flagEl) flagEl.textContent = lang === 'sw' ? '🇬🇧' : '🇹🇿';
      if (textEl) textEl.textContent = lang === 'sw' ? 'ENG' : 'SW';
    }
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

  function buildPayload() {
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
    return payload;
  }

  function showSubmitState(button, loading) {
    button.disabled = loading;
    button.textContent = (i18n[currentLang] || i18n.en).sending;
    if (!loading) {
      button.textContent = (i18n[currentLang] || i18n.en).submitSurvey;
    }
  }

  function showSubmitError(button, message) {
    button.disabled = false;
    button.textContent = (i18n[currentLang] || i18n.en).submitSurvey;
    alert(message);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    updateConditionalFields();
    if (!validateBeforeSubmit()) return;

    var payload = buildPayload();
    var submitBtn = form.querySelector('button[type="submit"]');
    var t = i18n[currentLang] || i18n.en;
    var endpoint = (SUBMIT_ENDPOINT || '').trim();

    console.log('Survey payload:', payload);

    if (!endpoint) {
      main.classList.add('form-submitted');
      confirmation.hidden = false;
      confirmation.classList.add('reveal');
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    showSubmitState(submitBtn, true);

    // Send as form-encoded so Google Apps Script receives body (JSON in POST can be lost on redirect)
    var body = 'data=' + encodeURIComponent(JSON.stringify(payload));
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Submit failed');
        main.classList.add('form-submitted');
        confirmation.hidden = false;
        confirmation.classList.add('reveal');
        confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function () {
        showSubmitError(submitBtn, t.submitError);
      })
      .finally(function () {
        showSubmitState(submitBtn, false);
      });
  });

  updateSectionsByRole();
  updateConditionalFields();
  applyLanguage('en');
})();
