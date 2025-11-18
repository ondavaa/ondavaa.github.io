document.addEventListener('DOMContentLoaded', function() {
    console.log('Скрипт загружен!');
    
    const openFormBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const feedbackForm = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    
    const STORAGE_KEY = 'feedbackFormData';
    
    openFormBtn.addEventListener('click', openForm);
    closeBtn.addEventListener('click', closeForm);
    overlay.addEventListener('click', closeForm);
    
    window.addEventListener('popstate', function(event) {
        if (popup.style.display === 'block') {
            closeForm();
        }
    });
    
    function loadFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('fullName').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('messageText').value = formData.messageText || '';
            document.getElementById('consent').checked = formData.consent || false;
        }
    }
    
    function saveFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            messageText: document.getElementById('messageText').value,
            consent: document.getElementById('consent').checked
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    
    function clearFormData() {
        localStorage.removeItem(STORAGE_KEY);
    }
    
    function openForm() {
        history.pushState({ formOpen: true }, '', '#feedback');
        overlay.style.display = 'block';
        popup.style.display = 'block';
        loadFormData();
        feedbackForm.addEventListener('input', saveFormData);
        feedbackForm.addEventListener('change', saveFormData);
        document.getElementById('fullName').focus();
    }
    
    function closeForm() {
        if (history.state && history.state.formOpen) {
            history.back();
        }
        overlay.style.display = 'none';
        popup.style.display = 'none';
        feedbackForm.removeEventListener('input', saveFormData);
        feedbackForm.removeEventListener('change', saveFormData);
        hideMessage();
    }
    
    function showMessage(text, isSuccess) {
        messageDiv.textContent = text;
        messageDiv.className = isSuccess ? 'message success' : 'message error';
        messageDiv.style.display = 'block';
        setTimeout(hideMessage, 5000);
    }
    
    function hideMessage() {
        messageDiv.style.display = 'none';
    }
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('consent').checked) {
            showMessage('Необходимо согласие с политикой обработки персональных данных', false);
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData.entries());
        
        setTimeout(() => {
            showMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', true);
            feedbackForm.reset();
            clearFormData();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        }, 1000);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            closeForm();
        }
    });
});