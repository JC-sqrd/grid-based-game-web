const canvas = document.getElementById("mainCanvas")
const ctx = canvas.getContext('2d');
const mainCanvas = new MainCanvas(canvas);

console.log(mainCanvas)

const mainGrid = new Grid(new Vector2(100, 100), new Vector2(3,3), new Vector2(128,128));
mainGrid.generateGrid();



const ticTacToe = new TicTacToe(mainGrid, canvas, TicTacToe.FirstTurn.X);
mainGrid.debugDraw = true;
mainGrid.startDrawLoop(ctx);
ticTacToe.startDrawLoop(ctx);