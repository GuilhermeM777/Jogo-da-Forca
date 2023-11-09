const words = [
    ["CHAMA", "DIAMANTE", "ARTROPODE", "ALIENX", "GIGANTE"],
    ["ESCARABOLA", "AQUÁTICO", "CROMÁTICO", "GOSMA", "FEEDBACK"]
];

let currentRound = 0;
let selectedWord = words[currentRound][Math.floor(Math.random() * words[currentRound].length)];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersContainer = document.getElementById("letters");
const wordDisplay = document.getElementById("word-display");
const hangmanParts = document.querySelectorAll(".hangman > div");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let wrongGuesses = 0;
let displayWord = "";

canvas.width = 400; // Largura do canvas
canvas.height = 400; // Altura do canvas

// Centralize o canvas no HTML
canvas.style.display = "block";
canvas.style.margin = "0 auto";

// Função para desenhar o boneco da forca e a forca
function drawHangman() {
    context.clearRect(0, 0, canvas.width, canvas.height);

		    context.beginPath();
    context.moveTo(120, 100);
    context.lineTo(120, 300);
    context.lineTo(250, 300);
    context.stroke();		
	
   // Desenhe o boneco
    if (wrongGuesses >= 1) {
        context.beginPath();
        context.arc(185, 120, 20, 0, Math.PI * 2); // Cabeça
        context.stroke();
    }
    if (wrongGuesses >= 2) {
        context.moveTo(185, 140);
        context.lineTo(185, 190); // Corpo
        context.stroke();
    }
    if (wrongGuesses >= 3) {
        context.moveTo(185, 150);
        context.lineTo(125, 130); // Braço esquerdo
        context.stroke();
    }
    if (wrongGuesses >= 4) {
        context.moveTo(185, 150);
        context.lineTo(850, 150); // Braço direito
        context.stroke();
    }
    if (wrongGuesses >= 5) {
        context.moveTo(186, 185);
        context.lineTo(150, 220); // Perna esquerda
        context.stroke();
    }
    if (wrongGuesses >= 6) {
        context.moveTo(186, 185);
        context.lineTo(248, 220); // Perna direita
        context.stroke();
		
		    context.beginPath();
    context.moveTo(120, 100);
    context.lineTo(120, 300);
    context.lineTo(250, 300);
    context.stroke();		
	

    }
}

for (let i = 0; i < selectedWord.length; i++) {
    displayWord += "_";
}
wordDisplay.textContent = displayWord;

for (let i = 0; i < alphabet.length; i++) {
    const letter = document.createElement("span");
    letter.textContent = alphabet[i];
    letter.addEventListener("click", () => {
        if (wrongGuesses < hangmanParts.length) {
            if (!letter.classList.contains("used")) {
                let found = false;
                let newDisplayWord = "";
                for (let j = 0; j < selectedWord.length; j++) {
                    if (selectedWord[j] === letter.textContent) {
                        newDisplayWord += letter.textContent;
                        found = true;
                    } else {
                        newDisplayWord += displayWord[j];
                    }
                }
                displayWord = newDisplayWord;
                wordDisplay.textContent = displayWord;

                if (!found) {
                    hangmanParts[wrongGuesses].style.display = "block";
                    wrongGuesses++;

                    // Desenhe o boneco da forca
                    drawHangman();
                }

                letter.classList.add("used");

                if (displayWord === selectedWord) {
                    alert("Você ganhou! A palavra era: " + selectedWord);
                    resetGame();
                }

                if (wrongGuesses === hangmanParts.length) {
                    alert("Você perdeu! A palavra era: " + selectedWord);
                    resetGame();
                }
            }
        }
    });
    lettersContainer.appendChild(letter);
}

function resetGame() {
    selectedWord = words[currentRound][Math.floor(Math.random() * words[currentRound].length)];
    displayWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
        displayWord += "_";
    }
    wordDisplay.textContent = displayWord;
    letters.forEach(letter => {
        letter.classList.remove("used");
    });
    hangmanParts.forEach(part => {
        part.style.display = "none";
    });
    wrongGuesses = 0;

    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
}