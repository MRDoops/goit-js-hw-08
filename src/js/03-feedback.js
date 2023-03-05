import throttle from 'lodash.throttle';

// // document.querySelector()
// const form = document.querySelector('.feedback-form');
// const emailInput = form.querySelector('input[name="email"]');
// const messageInput = form.querySelector('textarea[name="message"]');
// const submitForm = document.querySelector('button[type="submit"]');
// const storageKey = 'feedback-form-state';
// let formData = {}; // додали оголошення formData

// // Додавання обробників подій до форми та полів вводу
// emailInput.addEventListener('input', throttle(handleInput, 500));
// messageInput.addEventListener('input', throttle(handleInput, 500));
// submitForm.addEventListener('click', onFormSubmit);
// window.addEventListener('load', handleLoad);

// // Ця функція є обробником події input для полів форми
// function handleInput() {
//   formData = {
//     // збереження даних з форми в змінну formData
//     email: emailInput.value,
//     message: messageInput.value,
//   };
//   localStorage.setItem(storageKey, JSON.stringify(formData));
// }

// // Функція для виведу в консоль значень полів та очистка при сабміті
// function onFormSubmit(e) {
//   e.preventDefault();
//   const emailValue = emailInput.value.trim(); // виправили помилку в emailValue
//   const messageValue = messageInput.value.trim(); // виправили помилку в messageValue
//   if (!emailValue || !messageValue) {
//     // виправили помилку в умові
//     alert('Будь ласка, заповніть усі поля форми!');
//     return;
//   }
//   console.log({
//     email: emailValue,
//     message: messageValue,
//   });
//   localStorage.removeItem(storageKey);
//   form.reset();
// }

// // Функція для заповнення полів форми зі збереженого стану сховища
// function populateTextarea() {
//   const savedForm = localStorage.getItem(storageKey);
//   if (savedForm) {
//     const { email, message } = JSON.parse(savedForm); // деструктуризація об'єкта
//     emailInput.value = email || '';
//     messageInput.value = message || '';
//   }
// }

// // Обробник події onload
// function handleLoad() {
//   populateTextarea();
// }

const LOCAL_KEY = 'feedback-form-state'; // ключ до локального сховища

form = document.querySelector('.feedback-form'); // пошук форми за класом

form.addEventListener('input', throttle(onInputData, 500)); // встановлення обробника введення для форми
form.addEventListener('submit', onFormSubmit); // встановлення обробника події подачі форми

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}; // отримати дані форми з локального сховища якщо є
const { email, message } = form.elements; // розмітка елементів форми
resetPage();

function onInputData(e) {
  // функція обробки введення даних форми
  dataForm = { email: email.value, message: message.value }; // зберігання значення електронної адреси та повідомлення форми
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm)); // збереження форми в локальному сховищі
}

function resetPage() {
  // Ініціалізація сторінки з перевіркою локального сховища на наявність даних
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(e) {
  // Обробник подачі форми при події submit
  e.preventDefault(); // Відмінити стандартну поведінку браузера
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    // Перевірка чи заповнено всі поля форми
    return alert('Будь ласка, заповніть усі поля форми!');
  }

  localStorage.removeItem(LOCAL_KEY); // Видалення форми з локального сховища
  e.currentTarget.reset(); // Очистити форму від присутніх данних
  dataForm = {};
}
