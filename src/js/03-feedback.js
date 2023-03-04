// import import
import throttle from 'lodash.throttle';
// document.querySelector()
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const submitForm = document.querySelector('button[type="submit"]');
const storageKey = 'feedback-form-state';
// Додавання обробників подій до форми та полів вводу
emailInput.addEventListener('input', throttle(handleInput, 500));
messageInput.addEventListener('input', throttle(handleInput, 500));
submitForm.addEventListener('click', onFormSubmit);
window.addEventListener('load', handleLoad);
// Ця функція є обробником події input для полів форми
function handleInput() {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}
// Функція для виведу в консоль значень полів та очистка при сабміті
function onFormSubmit(e) {
  e.preventDefault();
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
  localStorage.removeItem(storageKey);
  form.reset();
}
// Функція для заповнення полів форми зі збереженого стану сховища
function populateTextarea() {
  const savedForm = localStorage.getItem(storageKey);
  if (savedForm) {
    emailInput.value = JSON.parse(savedForm).email || '';
    messageInput.value = JSON.parse(savedForm).message || '';
  }
}
// Обробник події onload
function handleLoad() {
  populateTextarea();
}
