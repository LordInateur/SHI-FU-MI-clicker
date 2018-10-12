player1 = {
  nbOfClick  : 0,
  nbOfMoves : {"PIERRE" : 0, "FEUILLE" : 0, "CISEAUX" : 0}
}

player2 = {
  nbOfClick  : 0,
  nbOfMoves : {"PIERRE" : 0, "FEUILLE" : 0, "CISEAUX" : 0}
}

listOfPossibleMoveAndWhatTheyBeat = {"PIERRE" : "CISEAUX", "FEUILLE" : "PIERRE", "CISEAUX" : "FEUILLE"}

// 0:blanc, 
game = []

// 1 : p1 win, 0 : draw, -1 : p1 lose
fight = (p1, p2) => {
  if(p1 == p2){
    return 0;
  }
  return (listOfPossibleMoveAndWhatTheyBeat[p1] == p2 ) ? 1 : -1
}



