'use strict';

{
    const message = document.getElementById('message');
    const btn = document.getElementById('btn');
    const you = document.getElementById('you');
    const end = document.getElementById('end');
    const li = document.createElement('li');
    const input = document.querySelector('#add-chat input');
    const span = document.createElement('span');
    const newChat = document.getElementById('chat-ans');


    const words = [
        'りんご', // 0
        'みかん', // 1
        'いちご', // 2
        '英語', // 3
        '算数', // 4
        '勉強', // 5
        '野球', // 6
        'サッカー', // 7
        'ギター', // 8
        '星', // 9
    ];

    const wordsAns = [
        'apple', // 0
        'orange', // 1
        'strawberry', // 2
        'english', // 3
        'math', // 4
        'study', // 5
        'baseball', // 6
        'soccer', // 7
        'guitar', // 8
        'star', // 9
    ];

    let word;
    let loc = 0;

    function correctAns() {
        const correct = document.createElement('span');
        correct.classList.add('correctChat');
        newChat.appendChild(correct);
        correct.textContent = '正解！';
    }

    function wrongAns() {
        const wrong = document.createElement('span');
        wrong.classList.add('wrongChat');
        newChat.appendChild(wrong);
        wrong.textContent = '不正解！';
    }

    function judge() {
        if (word === wordsAns) {
        // if (word === wordsAns().toUpperCase().trim()) {
            correctAns();
        } else {
            wrongAns();
        }
    }

    function botQue() {
        // const botChat = document.getElementById('chat-que');
        const spanBot = document.createElement('span');
        spanBot.classList.add('botChat');
        newChat.appendChild(spanBot);
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        spanBot.textContent = word;
        loc = 0;
    }

    btn.addEventListener('click', () => {
        const span = document.createElement('span');
        span.classList.add('youChat');
        newChat.appendChild(span);
        span.textContent = message.value;
        input.value = '';
        input.focus();
        setTimeout(judge, 500);
        setTimeout(botQue, 500);
    });

    end.addEventListener('click', () =>{
        const endCSS = document.createElement('span');
        endCSS.classList.add('endChat')
        newChat.appendChild(endCSS)
        endCSS.textContent = '終了';
        input.value = '';
        input.focus();
    });
}