class MainCanvas {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.canvas.width = 900;
        this.canvas.height = 900;
    }
}