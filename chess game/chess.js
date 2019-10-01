var btnStart = document.getElementById("btn-start");
var turn  = document.getElementById("turn");
var chessBoard = document.getElementById("chess-board");
var board,canMove,canEat,tile;
var turnCnt = null;
var count = null;
var xFrom,yFrom;
var moveable=null;
var tileColor = ["black","white"];
function initializeBoard(){
    turnCnt = 1;
    moveable = 1;
    count = 1;
    chessBoard.innerHTML = null;
    board=[];
    canMove=[];
    canEat=[];
    tile=[];
    for (let i = 0; i <= 7; i++) {
        board.push([]);
        tile.push([]);
        canEat.push([]);
        canMove.push([]);
        var boardRow = document.createElement("div");
        var boardTile;
        boardRow.setAttribute("class", "board-row");

        for (let j = 0; j <= 7; j++) {
            boardTile = document.createElement("div");
            boardTile.setAttribute("id", "tile-" + count);
            boardTile.setAttribute("class", "board-tile");
            if (i == 0 || i == 1) board[i][j] = 0;
            else if (i == 6 || i == 7) board[i][j] = 1;
            else board[i][j] = -1;
            if (i == 1) boardTile.setAttribute("class", "board-tile pawn black");
            else if (i == 6) boardTile.setAttribute("class", "board-tile pawn white");
            else if (i == 0 && (j == 0 || j == 7)) boardTile.setAttribute("class", "board-tile rook black");
            else if (i == 0 && j == 1) boardTile.setAttribute("class", "board-tile knight-left black");
            else if (i == 0 && j == 6) boardTile.setAttribute("class", "board-tile knight-right black");
            else if (i == 0 && (j == 2 || j == 5)) boardTile.setAttribute("class", "board-tile bishop black");
            else if (i == 0 && j == 3) boardTile.setAttribute("class", "board-tile queen black");
            else if (i == 0 && j == 4) boardTile.setAttribute("class", "board-tile king black");
            else if (i == 7 && (j == 0 || j == 7)) boardTile.setAttribute("class", "board-tile rook white");
            else if (i == 7 && j == 1) boardTile.setAttribute("class", "board-tile knight-left white");
            else if (i == 7 && j == 6) boardTile.setAttribute("class", "board-tile knight-right white");
            else if (i == 7 && (j == 2 || j == 5)) boardTile.setAttribute("class", "board-tile bishop white");
            else if (i == 7 && j == 3) boardTile.setAttribute("class", "board-tile queen white");
            else if (i == 7 && j == 4) boardTile.setAttribute("class", "board-tile king white");
            count++;
            boardTile.addEventListener('click', makeMoveHelper(i, j));
            tile[i][j] = boardTile;

            boardRow.appendChild(boardTile);
        }
        chessBoard.appendChild(boardRow);
    }
    btnStart.innerHTML = "Reset Game";
    refreshBoard(turnCnt);
}
function refreshBoard(){
    turn.innerHTML = "Turn "+ turnCnt;
    if(turnCnt%2==1)turn.innerHTML += " (White)";
    else turn.innerHTML += " (Black)";
}
function makeMoveHelper(i, j) {
    return function () {
        makeMove(i, j);
    };
}
function memset(array,value){
    for(let i = 0;i<8;i++){
        for(let j = 0;j<8;j++){
            array[i][j] = value;
        }
    }
}
function checkMovePawn(x,y){
    memset(canMove,1);
    memset(canEat,0);
    for(i = 0;i<8;i++){
        for(j = 0;j<8;j++){
            if(turnCnt%2==1 && board[i][j]==0) canEat[i][j]=1;
            else if(turnCnt%2==0 && board[i][j]==1)canEat[i][j]=1;
            if(turnCnt%2==1 && board[i][j]==1)canMove[i][j]=0;
            else if(turnCnt%2==0 && board[i][j]==0)canMove[i][j]=0;
        }
    }
    for( i = 0;i<8;i++){
        for(j = 0;j<8;j++){
            if(turnCnt%2==1){
                if (i == (x - 1)) {
                    if (j == y &&  board[i][j]==-1) canMove[i][j] = 1;
                    else if ((j == y - 1 || j == y + 1) && canEat[i][j] == 1) canMove[i][j] = 1;
                    else canMove[i][j] = 0;
                } else canMove[i][j] = 0;
            }else{
                if (i ==( x + 1)) {
                    if (j == y && board[i][j] == -1) canMove[i][j] = 1;
                    else if ((j == y - 1 || j == y + 1) && canEat[i][j] == 1) canMove[i][j] = 1;
                    else canMove[i][j] = 0;
                } else canMove[i][j] = 0;
            }
        }
    }
    for(i = 1;i<=2;i++){
        if(turnCnt%2==1 && x==6 &&board[x-i][y]==-1)canMove[x-i][y]=1;
        else if(turnCnt%2==0 && x==1 &&board[x+i][y]==-1)canMove[x+i][y]=1;
        else break;
    }
    // if(turnCnt%2==1){
    //     if(board[x-1][y-1]==0)canMove[x-1][y-1]=1;
    //     if(board[x-1][y+1]==0)canMove[x-1][y+1]=1;
    // }else{
    //     if(board[x+1][y-1]==1)canMove[x+1][y-1]=1;
    //     if(board[x+1][y+1]==1)canMove[x+1][y+1]=1;
    // }

    // if(turnCnt%2==1 && x==6 &&board[4][y]==-1)canMove[4][y]=1;
    // else if(turnCnt%2==0 && x==1 &&board[3][y]==-1)canMove[3][y]=1;
}
function checkWin(){
    var kingWhite= 0;
    var kingBlack = 0;
    for(i = 0;i<8;i++){
        for(j = 0;j<8;j++){
            if(tile[i][j].classList.contains("king") && tile[i][j].classList.contains("black")){
                console.log("black",i,j);   
                kingBlack=1;
            }
            if(tile[i][j].classList.contains("king","white") && tile[i][j].classList.contains("white")){
                console.log("white",i,j);   
                kingWhite=1;
            }
        }
    }
    console.log(kingBlack);
    if(kingWhite==0){
        moveable=0;
        turn.innerHTML = "Black wins the game";
    }else if(kingBlack==0){
        moveable=0;
        turn.innerHTML = "White wins the game";
    }
}
function checkMoveRook(x,y){
    for(i = x+1;i<8;i++){//bottom
        if(board[i][y]==-1){
            console.log(board[i][y]);
            canMove[i][y]=1;
        }else if(turnCnt%2==1 && board[i][y]==0){
            canMove[i][y]=1;
            break;
        }else if(turnCnt%2==0 && board[i][y]==1){
            canMove[i][y]=1;
            break;
        }else break;
        
    }
    for( i = y+1;i<8;i++){//right
        if(board[x][i]==-1){
            console.log(board[i][y]);
            canMove[x][i]=1;
        }else if(turnCnt%2==1 && board[x][i]==0){
            canMove[x][i]=1;
            break;
        }else if(turnCnt%2==0 && board[x][i]==1){
            canMove[x][i]=1;
            break;
        }else break;
    }
    for( i = x-1;i>=0;i--){//top
        if(board[i][y]==-1){
            console.log(board[i][y],i,y);
            canMove[i][y]=1;
        }else if(turnCnt%2==1 && board[i][y]==0){
            canMove[i][y]=1;
            break;
        }else if(turnCnt%2==0 && board[i][y]==1){
            canMove[i][y]=1;
            break;
        }else break;
    }
    for( i = y-1;i>=0;i--){//left
        if(board[x][i]==-1)canMove[x][i]=1;
        else if(turnCnt%2==1 && board[x][i]==0){
            canMove[x][i]=1;
            break;
        }else if(turnCnt%2==0 && board[x][i]==1){
            canMove[x][i]=1;
            break;
        }else break;
    }
}
function checkMoveKnight(rowFrom,dX){
    const mv=[
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1]
    ];
    for(let i = 0;i<8;i++){
        var x = rowFrom+mv[i][0];
        var y = dX+mv[i][1];
        if(x<8 && x>=0 && y<8 &&y>=0){
            console.log(board[x][y],x,y);
            if(turnCnt%2==1){
                if((board[x][y]==0 ) || board[x][y]==-1) canMove[x][y]=1;
            }else{
                if((board[x][y]==1 ) || board[x][y]==-1) canMove[x][y]=1;
            }
        }
        
    }
}
function checkMoveBishop(x,y){
    for(let i = x+1,j = y+1;i<8 && j<8;i++,j++){
        console.log(i,j);
        if(board[i][j]==-1)canMove[i][j]=1;
        else if(turnCnt%2==1 && board[i][j]==0){
            canMove[i][j]=1;
            break;
        }else if(turnCnt%2==0 && board[i][j]==1){
            canMove[i][j]=1;
            break;
        }else break;
    }
    for(let i = x-1, j = y-1;i>=0 && j>=0;i--,j--){
        if(board[i][j]==-1)canMove[i][j]=1;
        else if(turnCnt%2==1 && board[i][j]==0){
            canMove[i][j]=1;
            break;
        }else if(turnCnt%2==0 && board[i][j]==1){
            canMove[i][j]=1;
            break;
        }else break;
    }
    for(let i = x-1, j = y+1;i>=0 && j<8;i--,j++){
        console.log(i,j);
        if(board[i][j]==-1)canMove[i][j]=1;
        else if(turnCnt%2==1 && board[i][j]==0){
            canMove[i][j]=1;
            break;
        }else if(turnCnt%2==0 && board[i][j]==1){
            canMove[i][j]=1;
            break;
        }else break;
    }
    for(let i = x+1, j = y-1;i<8 && j>=0;i++,j--){
        if(board[i][j]==-1)canMove[i][j]=1;
        else if(turnCnt%2==1 && board[i][j]==0){
            canMove[i][j]=1;
            break;
        }else if(turnCnt%2==0 && board[i][j]==1){
            canMove[i][j]=1;
            break;
        }else break;
    }
}
function checkMoveKing(rowFrom,dX){
    const mv1=[
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1]];
    for(let i = 0;i<8;i++){
        var x = rowFrom+mv1[i][0];
        var y = dX+mv1[i][1];
        if(x<8 && x>=0 && y<8 &&y>=0){
            if(turnCnt%2==1){
                if((board[x][y]==0 ) || board[x][y]==-1) canMove[x][y]=1;
            }else{
                if((board[x][y]==1 ) || board[x][y]==-1) canMove[x][y]=1;
            }
        }
        
    }
}
function checkMoveQueen(x,y){
    checkMoveRook(x,y);
    checkMoveBishop(x,y);
}
function addHighlight() {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (canMove[i][j] == 1){
                 tile[i][j].classList.add("highlight");
            }

        }
    }
}
function removeHighlight() {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (canMove[i][j] == 1){
                 tile[i][j].classList.remove("highlight");
            }

        }
    }
}
function setBoard(){
    for(i = 0;i<8;i++){
        for(j = 0;j<8;j++){
            if(tile[i][j].classList.contains("white"))board[i][j]=1;
            else if(tile[i][j].classList.contains("black"))board[i][j]=0;
            else board[i][j]=-1;
        }
    }
}
function makeMove(i,j){
    if(tile[i][j].classList.contains("highlight") && moveable){
        const posisi = tile[xFrom][yFrom].classList.item(1);
        const warna = tile[xFrom][yFrom].classList.item(2);
        const tipe = tile[i][j].classList.item(1);
        const war = tile[i][j].classList.item(2);
        const high = tile[i][j].classList.item(3);
        tile[i][j].classList.remove(tipe, war, high);
        tile[i][j].classList.add(posisi, warna);
        tile[xFrom][yFrom].classList.remove(posisi, warna);
        // if(tile[xFrom][yFrom].classList.contains("white"))board[xFrom][yFrom]=1;
        // else if(tile[xFrom][yFrom].classList.contains("black"))board[xFrom][yFrom]=0;
        // else board[xFrom][yFrom]=-1;
        // const tempBoard = board[xFrom][yFrom];
        // board[xFrom][yFrom] = board[i][j];
        // board[i][j]=tempBoard;
        setBoard();
        turnCnt++;
        console.log(board[xFrom][yFrom],xFrom,yFrom);
        refreshBoard(turnCnt);
        removeHighlight();
        checkWin();
    }
    else if(tile[i][j].classList.contains(tileColor[turnCnt%2]) && moveable){
        removeHighlight();
        memset(canMove,0)
        xFrom = i;
        yFrom = j;
        if(tile[i][j].classList.contains("pawn"))checkMovePawn(i,j);
        else if(tile[i][j].classList.contains("rook"))checkMoveRook(i,j);
        else if(tile[i][j].classList.contains("knight-left"))checkMoveKnight(i,j);
        else if(tile[i][j].classList.contains("knight-right"))checkMoveKnight(i,j);
        else if(tile[i][j].classList.contains("bishop"))checkMoveBishop(i,j);
        else if(tile[i][j].classList.contains("king"))checkMoveKing(i,j);
        else if(tile[i][j].classList.contains("queen"))checkMoveQueen(i,j);
        addHighlight();
    }else{
        removeHighlight();
    }
}