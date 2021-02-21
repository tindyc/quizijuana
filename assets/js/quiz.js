const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.answer-content'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
/* Fetch questions and answers from questions.json.
Covert body out of http response to json.
Start game when the questions are loaded.
Handle catch (error scenerio)*/
fetch("assets/js/questions.json")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startQuiz();
    })
    .catch((err) => {
        console.error(err);
    });

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;
/* Start Quiz and set counter for questions and score to 0 */
startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
/* When the questions run out, save score and store in local brower storage. Redirect to endquiz.html.
Shuffle questions and link questions to question and answers container in HTML. */
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentscore', score);

        return window.location.assign('endquiz.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};
/* Set up colour change responses to reflect user's action (apply CSS) - Correct answers turns green, incorrect answers turn red.*/
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});
/* Add score and print score in finalscore in HTML*/
let incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
