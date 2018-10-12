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


// 0:blanc, 
game = {
  pos_p1 : 0,
  pos_p2 : 10,
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

    var countDownDate = new Date().getTime() + 10000;
    var countdown = setInterval(function() {

      var distance = countDownDate - new Date().getTime();
      console.log( Math.ceil(distance/1000))
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(countdown);
        isFighting = false
        isQuestionningWhoWin = true;
        console.log( "Who win ?" );
      }
    }, 1000);

  }
  
}

updateMaxToWin = a => {
  maxToWin = a;
  document.getElementById("firstAt").innerHTML = maxToWin;
}

isFigth = () => (game.pos_p1 + 1 == game.pos_p2)

moveP1 = () => {
  if (isFigth()) {
    startFight()
  }else{
    if(isQuestionningWhoWin){
      game.score[0] ++ ;
      isQuestionningWhoWin = false;
    }else{
      player1.nbOfClick ++;
      game.pos_p1 ++;
    }
  }

  console.log("player position : " + game.pos_p1 + " - " + game.pos_p2)
}  

moveP2 = () => {
  if (isFigth() && !isQuestionningWhoWin) {
    startFight()
  }else{
    if(isQuestionningWhoWin){
      game.score[1] ++ ;
      isQuestionningWhoWin = false;
    }else{
      player2.nbOfClick ++;
      game.pos_p2 --;
    }
  }

  console.log("player position : " + game.pos_p1 + " - " + game.pos_p2)
} 
