const questions = [
    {
        questionImage:[ "images/bear_quation.jpg" ],
        options: [
            { text: "セブン", image: "images/sevenmelon.png" },
            { text: "ファミマ", image: "images/rosonmelon.png" },
            { text: "ローソン", image: "images/famimamelon.png" }
        ],
        answerImages: {
            correct: "images/chicken_famima.png",
            incorrect: "images/chicken_incorrect.png",
            famima: "images/shufamima2.png",
            seven: "images/shuseven2.png",
            lawson: "images/shuroson2.png"
        },
        answer: "ローソン"
    },
    {
        questionImage:[ "images/shu_quation.png" ],
        options: [
            { text: "セブン", image: "images/sevenshu.png" },
            { text: "ファミマ", image: "images/famimashu.png" },
            { text: "ローソン", image: "images/rosonshu.png" }
        ],
        answerImages: {
            correct: "images/melon_correct.png",
            incorrect: "images/melon_incorrect.png",
            famima: "images/shufamima3.png",
            seven: "images/shuseven3.png",
            lawson: "images/shuroson3.png"
        },
        answer: "ローソン"
    },
    {
        questionImage:[ "images/chicken_quation.png" ],
        options: [
            { text: "セブン", image: "images/sevenchicken.png" },
            { text: "ファミマ", image: "images/famimachicken.png" },
            { text: "ローソン", image: "images/rosonchicken.png" }
        ],
        answerImages: {
            correct: "images/shu_correct.png",
            incorrect: "images/shu_incorrect.png",
            seven: "images/sevenchicken2.png",
            famima: "images/famimachicken2.png",
            lawson: "images/rosonchicken2.png"
        },
        answer: "セブン"
    },
    {
        questionImage:[ "images/ume_quation.png" ],
        options: [
            { text: "セブン", image: "images/sevenume.png" },
            { text: "ファミマ", image: "images/famimaume.png" },
            { text: "ローソン", image: "images/rosonume.png" }
        ],
        answerImages: {
            correct: "images/tuna_correct.png",
            incorrect: "images/tuna_incorrect.png",
            famima: "images/famimaume2.png",
            seven: "images/sevenume2.png",
            lawson: "images/rosonume2.png"
        },
        answer: "ローソン"
    },
    {
        questionImage:[ "images/tuna_quation.png" ],
        options: [
            { text: "セブン", image: "images/seventuna.png" },
            { text: "ファミマ", image: "images/famimatuna.png" },
            { text: "ローソン", image: "images/rosontuna.png" }
        ],
        answerImages: {
            correct: "images/ume_corrct.png",
            incorrect: "images/ume_incorrect.png",
            famima: "images/famimatuna2.png",
            seven: "images/seventuna2.png",
            lawson: "images/rosontuna2.png"
        },
        answer: "ローソン"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null; // 選択された回答を一時的に保持する変数

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz');
    
    let optionsHtml = '';
    question.options.forEach((option, index) => {
        // ボタンにクラスを順番に割り当てる
        const buttonClass = getButtonClass(index);
        
        optionsHtml += `
            <div class="option-button ${buttonClass}" id="option${index}" onclick="selectOption(${index})">
                <img src="${option.image}" alt="${option.text}">
            </div>
        `;
    });

    quizContainer.innerHTML = `
    <h2><img src="${question.questionImage}" alt="Question Image" style="width: 80%; height: auto;"></h2>
      
        <div class="options">${optionsHtml}</div>
        <div class="answer-images" id="answerImages"></div>
        <button id="answerButton" onclick="checkAnswerAndScore()">これを渡す！</button>
        <button id="nextQuestionButton" onclick="nextQuestion()" style="display:none;">次の問題へ</button>
    `;

    //「次の問題へ」ボタンを非表示にする
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    if (nextQuestionButton) {
        nextQuestionButton.style.display = 'none';
    }
}

function getButtonClass(index) {
    // 各インデックスに対応するクラスを指定する
    switch (index) {
        case 0:
            return "green";
        case 1:
            return "red";
        case 2:
            return "blue";
        default:
            return "";
    }
}

function selectOption(index) {
    const question = questions[currentQuestionIndex];
    const selectedOption = question.options[index];
    selectedAnswer = selectedOption.text; // 選択された回答を保持する

    const answerImageKey = getAnswerImageKey(selectedOption.text);
    const answerImageSrc = question.answerImages[answerImageKey];

    const selectedOptionContainer = document.createElement('div');
    selectedOptionContainer.classList.add('selected-option');
    selectedOptionContainer.innerHTML = `
        <div class="selected-image">
            <img src="${answerImageSrc}" alt="Selected Option">
        </div>
    `;

    const answerImagesContainer = document.getElementById('answerImages');
    
    // すでに表示されている選択肢画像をクリアしてから新しいものを追加する
    answerImagesContainer.innerHTML = '';
    answerImagesContainer.appendChild(selectedOptionContainer);

    const options = document.querySelectorAll('.option-button');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

function checkAnswerAndScore() {
    if (!selectedAnswer) {
        alert('選択肢を選んでください。');
        return;
    }

    const question = questions[currentQuestionIndex];
    const isCorrect = (selectedAnswer === question.answer);

    // 正解か不正解の画像を表示する
    const answerImageSrc = isCorrect ? question.answerImages.correct : question.answerImages.incorrect;
    const answerImageContainer = document.createElement('div');
    answerImageContainer.classList.add('answer-image');
    answerImageContainer.innerHTML = `
        <img src="${answerImageSrc}" alt="${isCorrect ? 'Correct' : 'Incorrect'}">
    `;
    const answerImagesContainer = document.getElementById('answerImages');
    answerImagesContainer.appendChild(answerImageContainer);

    // 正解の場合スコアを増やす
    if (isCorrect) {
        score++;
    }

    selectedAnswer = null; // 選択をリセットする

    // 「次の問題へ」ボタンを表示
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    if (nextQuestionButton) {
        nextQuestionButton.style.display = 'block';
    }

    // 「これを渡す！」ボタンを非表示にする
    const answerButton = document.getElementById('answerButton');
    if (answerButton) {
        answerButton.style.display = 'none';
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    // 次の問題を表示するか、結果を表示するか判断する
    if (currentQuestionIndex < questions.length) {
        // 次の問題を表示
        showQuestion();
    } else {
        // 結果を表示
        showResult();
    }
}

function showResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
        <div class="score">${score} / ${questions.length}</div>
        <div class="score-images">
            <img src="${getScoreImage()}" alt="Score Image">
        </div>
    `;
    const quizContainer = document.getElementById('quiz');
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // 「次の問題へ」ボタンを非表示にする
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    if (nextQuestionButton) {
        nextQuestionButton.style.display = 'none';
    }
}

function getAnswerImageKey(optionText) {
    switch (optionText) {
        case "ファミマ":
            return "famima";
        case "セブン":
            return "seven";
        case "ローソン":
            return "lawson";
        default:
            return "";
    }
}

function getScoreImage() {
    if (score === 5) {
        return "images/correct5.jpg";
    } else if (score === 4) {
        return "images/correct4.jpg";
    } else if (score === 3) {
        return "images/correct3.jpg";
    } else if (score === 2) {
        return "images/correct2.jpg";
    } else if (score === 1) {
        return "images/correct1.jpg";
    }else if(score === 0) {
        return "images/correct0.jpg";
}}
document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});