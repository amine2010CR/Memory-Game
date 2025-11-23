let matchedPairs = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
const cards = document.querySelectorAll(".card");
const audio1 = new Audio("/sounds/victory-chime-366449.mp3")
const message = document.getElementById('win');
let player1Score = 0;
let player2Score = 0;
let courrentPlayer = 1;


cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
function flipCard() {
    if (disableDeck || this === cardOne) return;

    this.classList.add("flip");

    if (!cardOne) {
        cardOne = this;
        return;
    }

    cardTwo = this;
    disableDeck = true;

    checkMatch();
}
function checkMatch() {
    let emoji1 = cardOne.querySelector(".back-view").textContent;
    let emoji2 = cardTwo.querySelector(".back-view").textContent;

    if (emoji1 === emoji2) {
        updateScore()
        matchedPairs++;
        if (matchedPairs === 8) {
            console.log("win");
            
            win();
            shuffleCards();

            // resetGame();
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        resetCards();

    } else {
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
        setTimeout(() => {
            cardOne.classList.remove("flip");
            cardTwo.classList.remove("flip");
            resetCards();
        }, 1000);
        courrentPlayer = courrentPlayer === 1 ? 2 : 1;
    }
    updatePlayerInfo()
}
function resetCards() {
    cardOne = null;
    cardTwo = null;
    disableDeck = false; 
}
function shuffleCards() {
    const emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍", "🥝", "🍒"];
    const duplicateEmojis = [...emojis, ...emojis];
    duplicateEmojis.sort(() => Math.random() - 0.5);

    document.querySelectorAll(".card .back-view").forEach((back, i) => {
        back.textContent = duplicateEmojis[i];
    });
}
window.addEventListener("DOMContentLoaded", shuffleCards);
function resetGame() {
    endGame()
    matchedPairs = 0;
    player1Score = 0;
    player2Score = 0;
    let courrentPlayer = 1;
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
}
function updateScore() {
    if (courrentPlayer === 1) {
        player1Score++
    } else {
        player2Score++

    }
}
function updatePlayerInfo() {
    document.getElementById("player1").textContent = player1Score
    document.getElementById("player2").textContent = player2Score
    document.getElementById('current-player').textContent = courrentPlayer
}
function win() {
    // audio1.play()
endGame();
    // setTimeout(() => showWinMessage(), 100
    // )
}
function endGame() {
    if (matchedPairs !== 8) return;

    let resultText = document.getElementById("winner-text");
    let winCard = document.querySelector(".win-message");

    if (player1Score > player2Score) {
        resultText.textContent = "Player 1 Wins! 🎉";
    } else if (player2Score > player1Score) {
        resultText.textContent = "Player 2 Wins! 🎊";
    } else {
        resultText.textContent = "It's a Tie! 🤝";
    }

    winCard.style.display = "flex";
    // sound ()
}
