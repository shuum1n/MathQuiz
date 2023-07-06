const answerBox = document.getElementById("answer-box");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const timer = document.getElementById("timer");
const countdownStart = document.getElementById("countdowntimer");

const leaderboardKey = "mathQuizLeaderboard";
const leaderboardSize = 10; // Maximum number of scores to display in the leaderboard

let quizStarted = false;
let currentQuestion = 0;
let score = 0;
let maxTime = 30;
let countdown = 3;
let questionCount = 0;
let audio = new Audio('assets/audio/countdown.mp3')




function getReady() {
    audio.play();
    countdownStart.style.display = "block";
    document.getElementById("start-button-container").style.display = "none";
    countdownStart.innerHTML = countdown;
    const cntd = setInterval(() => {
        countdown--;
        countdownStart.innerHTML = countdown;
        if (countdown === 0) {
            countdownStart.innerHTML = "Go!";
        }
        if (countdown < 0) {
            countdownStart.style.display = "none";
            clearInterval(cntd);
            startQuiz();
        }
    }, 1000);
}

function startQuiz() {
    quizStarted = true;
    maxTime = 30;
    document.getElementById("start-button-container").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("quiz-score").textContent = "";
    answerBox.focus();
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    timerCountdown();
}


function timerCountdown() {
    timer.innerHTML = maxTime;
    const time = setInterval(() => {
        maxTime--;
        timer.innerHTML = maxTime;
        if (maxTime === 0) {
            clearInterval(time);
            displayResult();
        }
    }, 1000);
}

answerBox.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        //u console.log("test");
        checkAnswer(event.target.value);
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function generateQuestion() {
    if (score < 5)
    {
        let n1 = getRandomInt(10);
        let n2 = getRandomInt(10);
        expAns = n1 + n2;
        questionElement.textContent = `${n1} + ${n2}`;
    }
    else
    {
        let rand = Math.random();
        if (rand < 0.25)
        {
            let n1 = getRandomInt(100);
            let n2 = getRandomInt(100);
            let n1rand = Math.random();
            let n2rand = Math.random();
            if (n1rand < 0.5)
            {
                n1 = -Math.abs(n1);
            }
            if (n2rand < 0.5)
            {
                n2 = -Math.abs(n1);
            }
            expAns = n1 + n2;
            questionElement.textContent = `${n1} + ${n2}`;
        }
        else if (rand < 0.50)
        {
            let n1 = getRandomInt(100);
            let n2 = getRandomInt(100);
            let n1rand = Math.random();
            let n2rand = Math.random();
            if (n1rand < 0.5)
            {
                n1 = -Math.abs(n1);
            }
            if (n2rand < 0.5)
            {
                n2 = -Math.abs(n1);
            }
            expAns = n1 - n2;
            questionElement.textContent = `${n1} - ${n2}`;
        }
        else if (rand < 0.75)
        {
            let n1 = getRandomInt(10);
            let n2 = getRandomInt(10);
            let n1rand = Math.random();
            let n2rand = Math.random();
            if (n1rand < 0.5)
            {
                n1 = -Math.abs(n1);
            }
            if (n2rand < 0.5)
            {
                n2 = -Math.abs(n1);
            }
            expAns = n1 * n2;
            questionElement.textContent = `${n1} * ${n2}`;
        }
        else
        {
            let n1 = getRandomInt(10);
            let n2 = getRandomInt(10);
            let n1rand = Math.random();
            let n2rand = Math.random();
            if (n1rand < 0.5)
            {
                n1 = -Math.abs(n1);
            }
            if (n2rand < 0.5)
            {
                n2 = -Math.abs(n1);
            }
            let multipleRes = n1*n2;
            expAns = multipleRes / n2;
            questionElement.textContent = `${n1} / ${n2}`;
        }
    }
    answerBox.value = "";
}

function displayQuestion() {

    generateQuestion();
    questionCount++;
    // const question = questions[currentQuestion];
    // questionElement.textContent = question.question;
    // choicesElement.innerHTML = "";
    // for (let i = 0; i < question.choices.length; i++) {
    //     const choice = question.choices[i];

    //     const li = document.createElement("li");
    //     const input = document.createElement("input");
    //     const label = document.createElement("label");

    //     input.type = "radio";
    //     input.name = "answer";
    //     input.value = i;
    //     input.id = "choice" + (i + 1);
    //     input.addEventListener("change", checkAnswer);

    //     label.textContent = choice;
    //     label.htmlFor = "choice" + (i + 1);

    //     li.appendChild(input);
    //     li.appendChild(label);

    //     choicesElement.appendChild(li);
    // }
}

function checkAnswer(event) {
    if (!quizStarted) {
        alert("Please start the quiz first.");
        event.target.checked = false;
        return;
    }
    const answer = parseInt(event);
    if (answer == expAns) {
        score++;
    }
    console.log(event);
    currentQuestion++;
    if (maxTime > 0) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("quiz-score").textContent = "You scored " + score + " out of " + questionCount + " questions.";
}

function saveScore() {
    const playerName = document.getElementById("name").value.trim();
    if (!playerName) {
        Swal.fire("Please enter your name.")
        return;
    }

    const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    leaderboard.sort((a, b) => b.score - a.score); // Sort scores in descending order
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort scores in descending order
    leaderboard.splice(leaderboardSize); // Keep only the top 10 scores
    if (leaderboard[9].score < score) {

        Swal.fire("Selamat anda masuk 10 besar!")

    }
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));

    displayLeaderboard();
    document.getElementById("leaderboard").style.display = "block";
}

function resetQuiz() {
    quizStarted = false;
    document.getElementById("start-button-container").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("leaderboard").style.display = "none";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("name").value = "";
    countdown = 3;
    maxTime = 30;
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey));
    if (leaderboard) {
        const scoresList = document.getElementById("scoresList");
        scoresList.innerHTML = "";

        leaderboard.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.name}: ${entry.score}`;
            scoresList.appendChild(listItem);
        });
    }
}

function showLeaderboard() {
    if (!quizStarted) {
        alert("Please start the quiz first.");
        return;
    }

    displayLeaderboard();
    document.getElementById("result").style.display = "none";
    document.getElementById("leaderboard").style.display = "block";
}
