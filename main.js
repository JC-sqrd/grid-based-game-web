const canvas = document.getElementById("mainCanvas")
const ctx = canvas.getContext('2d');
const mainCanvas = new MainCanvas(canvas);

console.log(mainCanvas)

const mainGrid = new Grid(new Vector2(100, 100), new Vector2(5,5), new Vector2(128,128));
mainGrid.generateGrid();

const connectFour = new ConnectFour(mainGrid, canvas, ConnectFour.FirstTurn.X);

mainGrid.debugDraw = true;

mainGrid.startDrawLoop(ctx);

connectFour.startDrawLoop(ctx)