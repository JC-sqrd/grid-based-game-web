
// ----------------- CONNECT FOUR ------------------------------

const connect4Canvas = document.getElementById("connectFourCanvas");
const ctx = connect4Canvas.getContext('2d');

const connect4Grid = new Grid(new Vector2(0, 0), new Vector2(6,7), new Vector2(64,64));

const connectFour = new ConnectFour(connect4Grid, connect4Canvas, ConnectFour.FirstTurn.X);

connect4Grid.debugDraw = true;

connectFour.startDrawLoop(ctx)

// ------------------TIC TAC TOE ------------------------------------

const ticTacToeCanvas = document.getElementById('ticTacToeCanvas')
console.log("TIC TAC TOE CANVAS");
console.log(ticTacToeCanvas);
const tttCtx = ticTacToeCanvas.getContext('2d');

const ticTacToeGrid = new Grid(new Vector2(0,0), new Vector2(3,3), new Vector2(128, 128));

const ticTacToe = new TicTacToe(ticTacToeGrid, ticTacToeCanvas, TicTacToe.FirstTurn.X);

ticTacToeGrid.debugDraw = true;

ticTacToe.startDrawLoop(tttCtx);
