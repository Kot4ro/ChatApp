'use strict';

{
    const message = document.getElementById('message');
    const btn = document.getElementById('btn');
    const openbtn = document.getElementById('openbtn');
    const menu = document.getElementById('menu');
    const mask = document.getElementById('mask');
    const remove = document.getElementById('delete');
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

    let word = 0;
    let loc = 0;

    let histories;
    let JsonMymessage;

    if (localStorage.getItem('histories') === null) {
        histories = [];
    } else {
        histories = JSON.parse(localStorage.getItem('histories'));
    }

    const saveHistories = () => {
        localStorage.setItem('histories', JSON.stringify(histories));
    };


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

    function botQue() {
        const spanBot = document.createElement('span');
        spanBot.classList.add('botChat');
        newChat.appendChild(spanBot);
        word = Math.floor(Math.random() * words.length);
        spanBot.textContent = words[word];
        loc = 0;
        const history = {
            id: Date.now(),
            chat: words[word],
            class: 'botChat',
        };
        histories.push(history);
        saveHistories();
    }

    addEventListener('load', () => {
        setTimeout(botQue, 500);
        if (localStorage.getItem('histories') !== null) {
            histories = JSON.parse(localStorage.getItem('histories'));
            renderHistories();
            const JsonMymessage = JSON.stringify(history);
        }
        renderHistories();
    }, {once: true});

    btn.addEventListener('click', () => {
        loc++;
        console.log(loc);
        const Mymessage = message.value.trim().toLowerCase();
        const span = document.createElement('span');
        span.classList.add('youChat');
        newChat.appendChild(span);
        const history = {
            id: Date.now(),
            chat: Mymessage,
            class: 'youChat',
        };
        JsonMymessage = JSON.stringify(history);

        if (/^\s*$/.test(Mymessage)) {
            span.textContent = '文字を入力してください';
            const history = {
                id: Date.now(),
                chat: '文字を入力してください',
                class: 'botChat',
            };
            histories.push(history);
            saveHistories();
        } else {
            span.textContent = Mymessage;
            input.value = '';
            input.focus();
            histories.push(history);
            saveHistories();
            if (Mymessage === wordsAns[word]) {
                correctAns();
                const history = {
                    id: Date.now(),
                    chat: '正解！',
                    class: 'correctChat',
                };
                JsonMymessage = JSON.stringify(history);
                histories.push(history);
                saveHistories();
            } else {
                wrongAns();
                const history = {
                    id: Date.now(),
                    chat: '不正解！',
                    class: 'wrongChat',
                };
                JsonMymessage = JSON.stringify(history);
                histories.push(history);
                saveHistories();
            }
            setTimeout(botQue, 500);
        }
        console.table(histories);
        console.table(JsonMymessage);
    });

    end.addEventListener('click', () => {
        const endCSS = document.createElement('span');
        const history = {
            id: Date.now(),
            chat: '終了',
            class: 'endChat',
        };
        endCSS.classList.add('endChat')
        newChat.appendChild(endCSS)
        endCSS.textContent = '終了';
        input.value = '';
        input.focus();
        JsonMymessage = JSON.stringify(history);
        histories.push(history);
        saveHistories();
    });

    const renderHistories = () => {
        newChat.innerHTML = '';
        histories.forEach((history) => {
            if (history.class === 'correctChat') {
                const correct = document.createElement('span');
                correct.classList.add('correctChat');
                correct.textContent = '正解！';
                newChat.appendChild(correct);
            } else if (history.class === 'wrongChat') {
                const wrong = document.createElement('span');
                wrong.classList.add('wrongChat');
                wrong.textContent = '不正解！';
                newChat.appendChild(wrong);
            } else if (history.class === 'endChat') {
                const endCSS = document.createElement('span');
                endCSS.classList.add('endChat')
                endCSS.textContent = '終了';
                newChat.appendChild(endCSS)
            } else if (history.class === 'botChat'){
                const spanBot = document.createElement('span');
                spanBot.classList.add('botChat');
                spanBot.textContent = history.chat;
                newChat.appendChild(spanBot);
            } else {
                const span = document.createElement('span');
                span.classList.add('youChat');
                span.textContent = history.chat;
                newChat.appendChild(span);
            }
        });
    };

    mask.addEventListener('click', () => {
        menu.classList.add('hidden');
        mask.classList.add('hidden');
        remove.classList.add('hidden');
        openbtn.classList.remove('active');
    });

    remove.addEventListener('click', () => {
        console.log('削除ボタン押せた');
        if (confirm('削除しますか？')) {
            localStorage.clear();
            span.remove();
        }
    });

    openbtn.addEventListener('click', () => {
        menu.classList.remove('hidden');
        mask.classList.remove('hidden');
        remove.classList.remove('hidden');
        openbtn.classList.add('active');
    });
}