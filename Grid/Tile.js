class Tile {
    constructor(x, y, h, w, gridPos) {
        this.x = x;
        this.y = y;
        this.height = h;
        this.width = w;
        this.gridPos = gridPos;
        this.occupied = false;
        this.type;
    }


    isPointInTile(point) {
        return (point.x >= this.x && 
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
        )
    }

    draw(ctx) {
    
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}