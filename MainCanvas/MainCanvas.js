class MainCanvas {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.canvas.width = 1200;
        this.canvas.height = 1200;
    }
}