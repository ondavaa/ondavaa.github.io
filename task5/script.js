document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const quantityError = document.getElementById('quantity-error');
    
    calculateButton.addEventListener('click', function() {
        quantityError.style.display = 'none';
        quantityInput.style.borderColor = '#ddd';
        
        const quantity = parseInt(quantityInput.value);
        const price = parseInt(productSelect.value);
        
        let isValid = true;
        
        if (isNaN(quantity) || quantity < 1) {
            quantityError.style.display = 'block';
            quantityInput.style.borderColor = '#d32f2f';
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        const totalCost = quantity * price;
        
        resultDiv.textContent = `Стоимость заказа: ${totalCost} руб.`;
        resultDiv.style.display = 'block';
    });
});