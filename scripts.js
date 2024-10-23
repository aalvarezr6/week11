

let box0 = $('#box0'); //jQuery to select HTML elements
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

let player1 = "X" //Define the symbols for each player
let player2 = "O"

let turn = 0; //keeps track of the numbers of turns that have ocurred in the game.
let winner = false; //boolean variable set to false

$('#alertStart').hide();   //alets are hidden
$('#alertWinner').hide();
$('#alertDraw').hide();



let currentPlayer=''; //It'll switch between "X" and "O"

const winningOutcomes = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8], //This arrays contains all winning combinations.
    [box0, box3, box6], [box1, box4, box7], [box2, box5, box8],
    [box0, box4, box8], [box2, box4, box6]
];

const endGame=()=>{
    console.log("GAME OVER"); // This function is called when the gamey is over 
    $(".box").css("pointer-events", "none");

};
//This function checks if the current player has won
const checkWinner = (currentPlayer, a, b, c) => { //If the boxes have the same symbol, that indicates there's a winner.
 
    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer){
        winner = true;
        console.log(`${currentPlayer} is the winner`);

        if(currentPlayer ==='X'){
            currentPlayer = "Player 1";
        } else{
            currentPlayer = "Player 2";
        }

        $('#alertWinner').text(`${currentPlayer} is the winner!`); //Alerts who's the winner.
        $('#alertWinner').show();

        endGame();
    }
};

const checkOutcomes = () => { //Checks all possible winning outcomes.
    checkWinner(currentPlayer, ...winningOutcomes[0]);
    checkWinner(currentPlayer, ...winningOutcomes[1]);
    checkWinner(currentPlayer, ...winningOutcomes[2]);
    checkWinner(currentPlayer, ...winningOutcomes[3]);
    checkWinner(currentPlayer, ...winningOutcomes[4]);
    checkWinner(currentPlayer, ...winningOutcomes[5]);
    checkWinner(currentPlayer, ...winningOutcomes[6]);
    checkWinner(currentPlayer, ...winningOutcomes[7]);

    if(turn === 9 && winner === false){
        endGame();
        $('#alertDraw').show(); //Alerts if the outcome is a draw
    }
    
};

const startGame = () => { //Function initiates the game

    console.log("Start Game!");
    console.log(turn++);
    currentPlayer = player1; //Player 1 starts
    console.log(currentPlayer);

    $('#p1').addClass("bg-success border border-light");

    $('#alertStart').show(); //Alerts the start game

    $('.box').on('click', function(){
        $('#alertStart').hide();

        $(this).text(currentPlayer);
        
        
        if(turn > 4){
            console.log('possible winner'); //If turns exceeds 4 counts, the game checks possible winner.
            checkOutcomes();
        }

        if(winner=== false){ //If there isn't a winner, the game keeps going switching between players

        if(currentPlayer === player1){
            currentPlayer = player2;
            console.log(turn++);
            $('#p2').addClass("bg-success border border-light");
            $('#p1').removeClass("bg-success border border-light");



        } else{
            currentPlayer = player1;
            console.log(turn++);
            $('#p1').addClass("bg-success border border-light");
            $('#p2').removeClass("bg-success border border-light");
        }
    }
    })

};

document.getElementById('startButton').addEventListener('click', ()=> startGame());

document.getElementById('resetButton').addEventListener('click', ()=> document.location.reload(true));
