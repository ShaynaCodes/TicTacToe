const prompt = require('prompt-sync')();

let game_board = [' ', ' ',' ',' ', ' ', ' ', ' ',' ',' '];
let current_player = 'X';
let game_active = true;

function board(){
    console.log(`
        ${game_board[0]} | ${game_board[1]} | ${game_board[2]}
        --------
        ${game_board[3]} | ${game_board[4]} | ${game_board[5]}
        ---------
        ${game_board[6]} | ${game_board[7]} | ${game_board[8]}
        `)
}

function handleMove(position){
    if(game_board[position]=== " "){
        game_board[position] = current_player;
    }else{
        console.log("Already taken, try again. ");
        return false;
    }
    if(checkWin()){
        board();
        console.log(`Player ${current_player} wins!`);
        game_active=false;
        return true;
    }
    if (game_board.every(cell=> cell !== " ")){
        board();
        console.log("It's a draw!");
        game_active=false;
        return true;
    }
    current_player=current_player=== "X" ? "O":"X";
    return true;
}

function checkWin(){
    const conditions =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    return conditions.some(conditions=> {
        const [a,b,c] = conditions;
        return game_board[a] === current_player && game_board[b] === current_player && game_board[c]=== current_player;
    });
}

while (game_active){
    board()
    const position = prompt(`Player ${current_player}, enter your move (0-8): `);

    if(position>= 0 && position <= 8){
        handleMove(parseInt(position));
    }else{
        console.log("Invalid position, enter an number between 0 and 8.");
    }
}

