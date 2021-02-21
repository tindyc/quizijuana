const highscoreslist = document.querySelector('#highscoreslist');
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
/* Create leaderboard to show saved usernames and scores. */
highscoreslist.innerHTML =
    highscores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");