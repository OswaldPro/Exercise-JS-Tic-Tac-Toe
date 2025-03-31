//Conceptualisation : 
// En HTML : besoin d'un container (id=board) et des 9 cases ou cellules 

// Pour la mise en forme "grille" : Mettre board en display:grid, indiquer 3 lignes et 3 colonnes
// Metter un peu de style rapidement pour pouvoir discerner facilement les cellules 

//En JS : 
// 1. On "ouvre" son plateau de jeu (pour ce faire on va recupérer les variables/constantes board et cell)
// 2. Avant de commencer à jouer il faut savoir qui va jouer : les croix ou les ronds (en créant une variable) 
// 3. On souhaite que : lorsqu'on clique sur une case cela affiche croix/rond selon a qui était-ce le tour.
// 4. On verifie d'abord que la case est bien vide, si elle ne l'est pas afficher "cliquer sur une autre case"
// 5. Ensuite on verifie qu'il n'y a pas de gagnant : Qu'il n'y a pas de ligne ou de colonne contenant 3 fois le même symbole, et si aucune 2 diagonales non plus.
// 6. Puis on verifie qu'il reste des cases vides (si pas de gagnant ni de cases vide = égalité)
// 7. On change le tour : si c'était au croix, c'est désormais aux ronds et inversement (on affiche à qui le tour)
// 8. S'il y a un gagnant ou une égalité, on affiche le résultat et on propose une nouvelle partie (reset)

// Fonctions à faire : 
// Remplir correctement la case cliquée : event click, if cell =
// Vérifier qu'une case est vides
// Vérifier qu'il y a un gagnant
// Vérifier un égalité
// Proposer un reset de la partie

const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const player1 = "X";
const player2 = "O";

const winCombos = [
  //Lignes
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  //Colonnes
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  //Diag
  [0, 4, 8], [2, 4, 6]
];

let playerTurn = player1;
let gameOver = false;
let gameStatus = `C'est au tour des ${playerTurn}`;

//Fonction de jeu
function play(j) {
  if(gameOver === false){ //Si gameover est faux, on continue de jouer
    j.innerHTML = playerTurn; //on joue
    if (checkWin()){ // on verifie la victoire
      setTimeout(() => alert(`Les ${playerTurn} ont gagné`), 9);
      gameOver = true
      return;
    } 
    if (checkDraw()){
      setTimeout(() => alert("Egalité, pas de gagnant"), 9);
      return;
    }
  }
}

//Fonction pour vérifier la victoire
function checkWin() { 
  return winCombos.some(function(combo){ //.some pour un tableau, va vérifier si un element du tableau winCombos passe le test de la fonction combo. Donc que combo est true. si combo = true, winCombos.some renvoi true et donc la fonction checkWin est vérifié
    const a = combo[0];
    const b = combo[1];
    const c = combo[2];
    return (cells[a].innerHTML !== "" && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML); //si j'ai une case non vide, et qui contient le meme symbole, en suivant les patterns de combo = winner
  });
}

//Fonction egalité
function checkDraw() {
  return [...cells].every(function(cell){ // .every permet de verifier si TOUS les elements du tableau passe le test de la fonction cell. 
    return cell.innerHTML == player1 || cell.innerHTML == player2;// si toute les case contiente soir X soit O = draw. Mis bien placer après la condition de win 
  });
}

//Fonction reset
function resetGame() {
  gameOver = false; // on réactive le jeu suite a un gameOver
  playerTurn = player1; // On redonne la main au player1
  cells.forEach(cell => cell.innerHTML = ""); // on vide le morpion
}

resetButton.addEventListener("click", function(){
  resetGame();
});


// A chaque clique dans une cellule, si cell vide et tour p1 alors inscrire le symbole p1 et changer le joueur  en p2
// Si cell vide + tour de p2, on inscrit psymbole p2 et on change le joueur en p1
// Si cell pas vide, on affiche l'alert
cells.forEach(function(cell){// on check cell par cell et on applique la fonction(cell)
  cell.addEventListener("click", function(){ // 
    if (cell.innerHTML === "" && playerTurn == player1){ //le joueur 1 joue
      play(cell); 
      setTimeout(() => playerTurn = player2, 10);

    } else if ( cell.innerHTML === "" && playerTurn == player2){ //le joueur 2 joue
      play(cell);
      setTimeout(() => playerTurn = player1, 10);

    } else {
      alert("Case déjà prise, choisissez-en une vide")
    }
  })
})



