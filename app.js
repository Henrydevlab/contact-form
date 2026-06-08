document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');
  const radioContainers = document.querySelectorAll('.form__radio-wrapper');

  // Sync state tracking on row radio element change wrappers
  form.querySelectorAll('input[name="queryType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      radioContainers.forEach(container => {
        container.classList.remove('form__radio-wrapper--selected');
      });
      if (e.target.checked) {
        e.target.closest('.form__radio-wrapper').classList.add('form__radio-wrapper--selected');
      }
    });
  });

  // Client Validation Loop Execution Context
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isFormValid = true;

    // 1. Textual Fields Validation Block
    const textFields = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textFields.forEach(field => {
      const parentGroup = field.closest('.form__group');
      const errorSpan = parentGroup.querySelector('.form__error-message');
      let isFieldValid = true;

      if (field.required && !field.value.trim()) {
        isFieldValid = false;
        errorSpan.textContent = "This field is required";
      } else if (field.type === 'email' && !validateEmail(field.value)) {
        isFieldValid = false;
        errorSpan.textContent = "Please enter a valid email address";
      }

      if (!isFieldValid) {
        parentGroup.classList.add('form__group--error');
        field.setAttribute('aria-invalid', 'true');
        isFormValid = false;
      } else {
        parentGroup.classList.remove('form__group--error');
        field.setAttribute('aria-invalid', 'false');
      }
    });

    // 2. Query Type Radio Field Validation Block
    const radioGroupChecked = form.querySelector('input[name="queryType"]:checked');
    const radioFieldset = form.querySelector('.form__fieldset');
    const allRadios = form.querySelectorAll('input[name="queryType"]');
    
    if (!radioGroupChecked) {
      radioFieldset.classList.add('form__group--error');
      allRadios.forEach(radio => radio.setAttribute('aria-invalid', 'true'));
      isFormValid = false;
    } else {
      radioFieldset.classList.remove('form__group--error');
      allRadios.forEach(radio => radio.setAttribute('aria-invalid', 'false'));
    }

    // 3. Consent Checkbox Agreement Validation Block
    const consentBox = document.getElementById('consent');
    const consentGroup = consentBox.closest('.form__group');
    
    if (!consentBox.checked) {
      consentGroup.classList.add('form__group--error');
      consentBox.setAttribute('aria-invalid', 'true');
      isFormValid = false;
    } else {
      consentGroup.classList.remove('form__group--error');
      consentBox.setAttribute('aria-invalid', 'false');
    }

    // Handling Clean Success Pass Submission Loop Lifecycle
    if (isFormValid) {
      triggerSuccessToast();
      form.reset();
      radioContainers.forEach(container => container.classList.remove('form__radio-wrapper--selected'));
    }
  });

  function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(String(email).toLowerCase());
  }

  function triggerSuccessToast() {
    toast.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Automatically fade element screen footprint out cleanly 
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4500);
  }
});
