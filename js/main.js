'use strict';

{
    const message = document.getElementById('message');
    const btn = document.getElementById('btn');
    const you = document.getElementById('you');
    const li = document.createElement('li');
    const input = document.querySelector('#add-form input');

    btn.addEventListener('click', () => {
        you.textContent = message.value;
        input.value = '';
        input.focus();
    });
}