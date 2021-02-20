const highscoreslist = document.querySelector('#highscoreslist');
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscoreslist.innerHTML =
    highscores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");