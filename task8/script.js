/*jslint browser:true */
/*global document, window, localStorage, fetch, history */

document.addEventListener("DOMContentLoaded", function () {
  var FORM_ENDPOINT = "https://formcarry.com/s/ywrVs6H3YKS";

  var openBtn = document.getElementById("open-contact");
  var overlay = document.getElementById("overlay");
  var closeBtn = document.getElementById("close-contact");
  var cancelBtn = document.getElementById("cancel-btn");

  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("submit-btn");

  var fio = document.getElementById("fio");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var org = document.getElementById("org");
  var message = document.getElementById("message");
  var agree = document.getElementById("agree");

  var STORAGE_KEY = "contactForm:v1";

  function openForm() {
    restoreFromStorage();
    overlay.className = "overlay open";
    overlay.setAttribute("aria-hidden", "false");
    history.pushState({ contactOpen: true }, "", "?contact=open");
    statusEl.textContent = "";
    fio.focus();
  }

  function closeForm() {
    overlay.className = "overlay";
    overlay.setAttribute("aria-hidden", "true");
    statusEl.textContent = "";

    try {
      history.back();
    } catch (e) {
    }
  }

  window.addEventListener("popstate", function (evt) {
    var state = evt.state;
    if (state && state.contactOpen) {
      overlay.className = "overlay open";
      overlay.setAttribute("aria-hidden", "false");
      restoreFromStorage();
    } else {
      overlay.className = "overlay";
      overlay.setAttribute("aria-hidden", "true");
    }
  });

  function saveToStorage() {
    var obj = {
      fio: fio.value,
      email: email.value,
      phone: phone.value,
      org: org.value,
      message: message.value,
      agree: agree.checked
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (e) {
    }
  }

  function restoreFromStorage() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { return; }
      var obj = JSON.parse(raw);
      fio.value = obj.fio || "";
      email.value = obj.email || "";
      phone.value = obj.phone || "";
      org.value = obj.org || "";
      message.value = obj.message || "";
      agree.checked = !!obj.agree;
    } catch (e) {
    }
  }

  function clearFormAndStorage() {
    form.reset();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function validateForm() {
    if (!fio.value.trim()) {
      statusEl.textContent = "Пожалуйста, укажите ФИО.";
      return false;
    }
    if (!email.value.trim()) {
      statusEl.textContent = "Пожалуйста, укажите Email.";
      return false;
    }
    if (!message.value.trim()) {
      statusEl.textContent = "Пожалуйста, введите сообщение.";
      return false;
    }
    if (!agree.checked) {
      statusEl.textContent = "Необходимо согласиться на обработку персональных данных.";
      return false;
    }
    return true;
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    statusEl.textContent = "";

    if (!validateForm()) { return; }

    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    var payload = {
      fio: fio.value,
      email: email.value,
      phone: phone.value,
      organization: org.value,
      message: message.value
    };

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function (resp) {
      if (!resp.ok) {
        throw new Error("Сервер вернул ошибку: " + resp.status);
      }
      return resp.json();
    }).then(function (data) {
      statusEl.style.color = "green";
      statusEl.textContent = "Спасибо! Ваше сообщение отправлено.";
      clearFormAndStorage();
    }).catch(function (err) {
      statusEl.style.color = "crimson";
      statusEl.textContent = "Ошибка отправки: " + (err.message || "Попробуйте позже.");
    }).finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Отправить";
    });
  });

  fio.addEventListener("input", saveToStorage);
  email.addEventListener("input", saveToStorage);
  phone.addEventListener("input", saveToStorage);
  org.addEventListener("input", saveToStorage);
  message.addEventListener("input", saveToStorage);
  agree.addEventListener("change", saveToStorage);

  openBtn.addEventListener("click", function () {
    openForm();
  });

  closeBtn.addEventListener("click", function () {
    closeForm();
  });

  cancelBtn.addEventListener("click", function () {
    closeForm();
  });

  if (window.location.search.indexOf("contact=open") !== -1) {
    history.replaceState({ contactOpen: true }, "", window.location.href);
    overlay.className = "overlay open";
    overlay.setAttribute("aria-hidden", "false");
    restoreFromStorage();
  }
});



