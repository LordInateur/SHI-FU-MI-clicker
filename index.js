player1 = {
  nbOfClick  : 0,
  nbOfMoves : {"PIERRE" : 0, "FEUILLE" : 0, "CISEAUX" : 0}
}

player2 = {
  nbOfClick  : 0,
  nbOfMoves : {"PIERRE" : 0, "FEUILLE" : 0, "CISEAUX" : 0}
}

listOfPossibleMoveAndWhatTheyBeat = {"PIERRE" : "CISEAUX", "FEUILLE" : "PIERRE", "CISEAUX" : "FEUILLE"}
maxToWin = 5
nbOfBaseCase = 5;

bg = {
  path : "src/",
  basicMap : "blanc.png",
  base1 : "bleu.png",
  base2 : "rouge.png",
  player1 : "bleu-blanc.png",
  player2 : "rouge-blanc.png",
  player1OnBase : "bleu-bleu.png",
  player2OnBase : "rouge-rouge.png",
  player1Trace : "bord-bleu.png",
  player2Trace : "bord-rouge.png",
  player1OnEnemyBase : "bleu-rouge.png",
  player2OnEnemyBase : "rouge-bleu.png"
}

game = {
  nbOfCase : 60,
  pos_p1 : 0,
  pos_p2 : 59,
  grille : [],
  score : [0,0]
}

// 1 : p1 win, 0 : draw, -1 : p1 lose
fight = (p1, p2) => {
  if(p1 == p2){
    return 0;
  }
  return (listOfPossibleMoveAndWhatTheyBeat[p1] == p2 ) ? 1 : -1
}

isFighting = false;
isQuestionningWhoWin = false
startFight = () => {
  console.log("StartFight !!!")
  if(!isFighting){
    isFighting = true;
    countdown(3000, ()=>{
      isFighting = false
      isQuestionningWhoWin = true;
      console.log( "Who win ?" );
    })
  }
}

countdown = (timer, callback) => {
    document.getElementById("clickPanel").style.display = "None"
    var countDownDate = new Date().getTime() + timer;
    var theFinalCountDown = setInterval(function() {

      var distance = countDownDate - new Date().getTime();
      console.log( Math.ceil(distance/1000))
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(theFinalCountDown);
        document.getElementById("clickPanel").style.display = "block"
        callback()
      }
    }, 1000);
}

updateMaxToWin = a => {
  maxToWin = a;
  document.getElementById("firstAt").innerHTML = maxToWin;
}

isVictory = ()=> {
  let isVictory = false;
  if(game.pos_p1 > game.nbOfCase - nbOfBaseCase -1){
    console.log("player1 win the round")
    game.score[0] ++ ;
    isVictory = true;
  }
  if(game.pos_p2 < nbOfBaseCase){
    console.log("player2 win the round")
    game.score[1] ++ ;
    isVictory = true;
  }

  if(game.score[0] >= maxToWin ){
    console.log("Victory of Player 1")
  }

  if(game.score[1] >= maxToWin ){
    console.log("Victory of Player 2")
  }
}

getElementToAdd = a => {
  return "<div class=\"cellule\"><img src=\"./" +a+ "\" class=\"border-bottom border-right\"/></div>"
}

updateGrille = () => {
  console.log("updateGrille")

  for (i = 0 ; i < game.nbOfCase ; i++){

    if(i < nbOfBaseCase){
      if(game.pos_p1 == i){
        game.grille[i] = bg.player1OnBase;
      }else if(game.pos_p2 == i){
        game.grille[i] = bg.player2OnEnemyBase;
      }else {
        game.grille[i] = bg.base1;
      }

    } else if(game.pos_p1 > i ){
      game.grille[i] = bg.player1Trace;

    } else if (i > game.nbOfCase -1 - nbOfBaseCase){
      if(game.pos_p1 == i){
        game.grille[i] = bg.player1OnEnemyBase;
      }else if (game.pos_p2 == i){
        game.grille[i] = bg.player2OnBase;
      }else{
        game.grille[i] = bg.base2
      }

    } else if (game.pos_p2 < i){
      game.grille[i] = bg.player2Trace;

    } else if ( game.pos_p1 == i){
      game.grille[i] = bg.player1;

    } else if ( game.pos_p2 == i){
      game.grille[i] = bg.player2

    } else {

      game.grille[i] = bg.basicMap
    }

  }
  html_element = document.getElementById("caseContainer")
  html_element.innerHTML = ""
  
  game.grille.forEach(a=>html_element.innerHTML += getElementToAdd(bg.path + a))

  //console.log(game.grille)
}

isFigth = () => (game.pos_p1 + 1 == game.pos_p2)

moveP1 = () => {

  if (isFigth() && !isQuestionningWhoWin) {
    startFight()
  }else if(isQuestionningWhoWin){
    isQuestionningWhoWin = false;
    game.pos_p2 = game.nbOfCase -1
  }else{
    player1.nbOfClick ++;
    game.pos_p1 ++;
    isVictory()
  }
  updateGrille()

  //console.log("player position : " + game.pos_p1 + " - " + game.pos_p2)
}  

moveP2 = () => {
  if (isFigth() && !isQuestionningWhoWin) {
    startFight()
  }else if(isQuestionningWhoWin){
    isQuestionningWhoWin = false;
    game.pos_p1 = 0
  }else {
    player2.nbOfClick ++;
    game.pos_p2 --;
    isVictory()
  }
  updateGrille()

  //console.log("player position : " + game.pos_p1 + " - " + game.pos_p2)
} 


updateGrille()