const palavras = ["CHAMA","BESTA","DIAMANTE","GLUTAO","ALIENX","FRIAGEM","ARTROPODE", "ENORMOSSAURO", "WALKATRUTA","GWEN"];
var falhas = 0;
var acertos = 0;
var tentativas ="";
palavraSecreta = palavras[Math.floor(Math.random()* 10)];

var c = document.getElementById("forca");
var ctx = c.getContext("2d");


desenhaPoste();
desenhaBarraSuperior();
desenharApoiar();
desenharTracos();

window.onkeypress = teclaPressionada;

function teclaPressionada(){
        if (!tentativas.includes(event.key)&& palavrasSecreta.includes((event.key).toUpperCase()))
}