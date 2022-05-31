// Quiz variables
debugger
var currentQuestionIndex = 0;
// var time = questions.length * 15;
var timerId;

// Variables for DOM elements
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

// Function to start quiz
function startQuiz() {
    titleScreen.setAttribute("class", "hide");
    quizScreen.setAttribute("class", "show");
    timerId = setInterval(tick, 1000);
    timeEl.textContent = time;
    getQuestion();
}

// Timer function 
function tick() {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

// Function to show questions for quiz
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode);
    });
}

// Function to show next question or end quiz if on last question, and take away time if answer is wrong
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }
        timeEl.textContent = time;


        feedbackEl.textContent = "Wrong!";
    } else {

        feedbackEl.textContent = "Correct!";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// Function to end quiz
function quizEnd() {
    clearInterval(timerId);

    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");

    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;

    quizScreen.setAttribute("class", "hide");
}

// Function for saving highscore
function saveHighscore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: time,
            initials: initials
        };

        // Save scores to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "highScore.html";
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}
submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;