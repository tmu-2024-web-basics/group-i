const questions = [
    {
        questionImage:[ "IMG/bear_quation.jpg" ],
        options: [
            { text: "セブン", image: "IMG/sevenmelon.png" },
            { text: "ファミマ", image: "IMG/rosonmelon.png" },
            { text: "ローソン", image: "IMG/famimamelon.png" }
        ],
        answerImages: {
            correct: "IMG/chicken_famima.png",
            incorrect: "IMG/chicken_incorrect.png",
            famima: "IMG/shufamima2.png",
            seven: "IMG/shuseven2.png",
            lawson: "IMG/shuroson2.png"
        },
        answer: "ローソン"
    },
    {
        questionImage:[ "IMG/shu_quation.png" ],
        options: [
            { text: "セブン", image: "IMG/sevenshu.png" },
            { text: "ファミマ", image: "IMG/famimashu.png" },
            { text: "ローソン", image: "IMG/rosonshu.png" }
        ],
        answerImages: {
            correct: "IMG/melon_correct.png",
            incorrect: "IMG/melon_incorrect.png",
            famima: "IMG/shufamima3.png",
            seven: "IMG/shuseven3.png",
            lawson: "IMG/shuroson3.png"
        },
        answer: "ローソン"
    },
    {
        questionImage:[ "IMG/chicken_quation.png" ],
        options: [
            { text: "セブン", image: "IMG/sevenchicken.png" },
            { text: "ファミマ", image: "IMG/famimachicken.png" },
            { text: "ローソン", image: "IMG/rosonchicken.png" }
        ],
        answerImages: {
            correct: "IMG/shu_correct.png",
            incorrect: "IMG/shu_incorrect.png",
            seven: "IMG/sevenchicken2.png",
            famima: "IMG/famimachicken2.png",
            lawson: "IMG/rosonchicken2.png"
        },
        answer: "セブン"
    },
    {
        questionImage:[ "IMG/ume_quation.png" ],
        options: [
            { text: "セブン", image: "IMG/sevenume.png" },
            { text: "ファミマ", image: "IMG/famimaume.png" },
            { text: "ローソン", image: "IMG/rosonume.png" }
        ],
        answerImages: {
            correct: "IMG/tuna_correct.png",
            incorrect: "IMG/tuna_incorrect.png",
            famima: "IMG/famimaume2.png",
            seven: "IMG/sevenume2.png",
            lawson: "IMG/rosonume2.png"
        },
        answer: "ローソン"
    },
    {
        questionImage:[ "IMG/tuna_quation.png" ],
        options: [
            { text: "セブン", image: "IMG/seventuna.png" },
            { text: "ファミマ", image: "IMG/famimatuna.png" },
            { text: "ローソン", image: "IMG/rosontuna.png" }
        ],
        answerImages: {
            correct: "IMG/ume_correct.png",
            incorrect: "IMG/ume_incorrect.png",
            famima: "IMG/famimatuna2.png",
            seven: "IMG/seventuna2.png",
            lawson: "IMG/rosontuna2.png"
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
        return "IMG/Group524.png";
    } else if (score === 4) {
        return "IMG/Group524.png";
    } else if (score === 3) {
        return "IMG/Group524.png";
    } else if (score === 2) {
        return "IMG/Group524.png";
    } else if (score === 1) {
        return "IMG/Group524.png";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});