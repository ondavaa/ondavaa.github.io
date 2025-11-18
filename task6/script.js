const basePrices = {
    basic: 100,
    premium: 200,
    custom: 150
};

const optionMultipliers = {
    standard: 1.0,
    advanced: 1.5,
    expert: 2.0
};

const propertyPrice = 50;

const quantityInput = document.getElementById('quantity');
const quantityError = document.getElementById('quantityError');
const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
const optionsGroup = document.getElementById('optionsGroup');
const optionsSelect = document.getElementById('options');
const propertyGroup = document.getElementById('propertyGroup');
const propertyCheckbox = document.getElementById('property');
const totalPriceElement = document.getElementById('totalPrice');
const calculatorForm = document.getElementById('calculatorForm');

function validateQuantity() {
    const quantity = parseInt(quantityInput.value);
    const isValid = quantity > 0 && Number.isInteger(quantity);
    
    if (!isValid) {
        quantityError.classList.remove('visually-hidden');
        quantityInput.setAttribute('aria-invalid', 'true');
    } else {
        quantityError.classList.add('visually-hidden');
        quantityInput.setAttribute('aria-invalid', 'false');
    }
    
    return isValid;
}

function updateFormVisibility() {
    const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
    
    if (optionsSelect) optionsSelect.selectedIndex = 0;
    if (propertyCheckbox) propertyCheckbox.checked = false;
    
    switch(selectedType) {
        case 'basic':
            optionsGroup.classList.add('hidden');
            propertyGroup.classList.add('hidden');
            break;
        case 'premium':
            optionsGroup.classList.remove('hidden');
            propertyGroup.classList.add('hidden');
            break;
        case 'custom':
            optionsGroup.classList.add('hidden');
            propertyGroup.classList.remove('hidden');
            break;
    }
    
    calculateTotalPrice();
}

function calculateTotalPrice() {
    if (!validateQuantity()) {
        totalPriceElement.textContent = '0 руб.';
        return;
    }
    
    const quantity = parseInt(quantityInput.value);
    const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
    
    let totalPrice = basePrices[selectedType] * quantity;
    
    if (selectedType === 'premium' && optionsSelect) {
        const selectedOption = optionsSelect.value;
        totalPrice *= optionMultipliers[selectedOption];
    }
    
    if (selectedType === 'custom' && propertyCheckbox && propertyCheckbox.checked) {
        totalPrice += propertyPrice * quantity;
    }
    
    totalPriceElement.textContent = `${Math.round(totalPrice)} руб.`;
}

function initEventListeners() {
    quantityInput.addEventListener('input', calculateTotalPrice);
    quantityInput.addEventListener('blur', validateQuantity);
    
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateFormVisibility);
    });
    
    if (optionsSelect) {
        optionsSelect.addEventListener('change', calculateTotalPrice);
    }
    
    if (propertyCheckbox) {
        propertyCheckbox.addEventListener('change', calculateTotalPrice);
    }
    
    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateTotalPrice();
    });
}

function init() {
    initEventListeners();
    updateFormVisibility();
    validateQuantity();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}