const username = document.querySelector('#username');
const savescorebtn = document.querySelector('#savescorebtn');
const finalscore = document.querySelector('#finalscore');
const recentscore = localStorage.getItem('recentscore');

const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

finalscore.innerText = recentscore;
/* When user has entered the username, remove the disabled option on savescorebtn.*/
username.addEventListener('keyup', () => {
    savescorebtn.disabled = !username.value;
});
/* When savescorebtn is clicked, store username and score. Store data in local storage and go to leaderboard */
let saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: recentscore,
        name: username.value
    };

    highscores.push(score);

    highscores.sort((a, b) => {
        return b.score - a.score;
    });

    highscores.splice(5);

    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.assign('highscores.html');
};