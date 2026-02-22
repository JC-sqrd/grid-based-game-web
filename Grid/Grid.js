class Grid {
    constructor(gridPos, gridSize, tileSize){     
        this.pos = gridPos
        this.gridSize = gridSize // Vector2
        this.tileSize = tileSize // Vector2
    
        this.columns = new Array(this.gridSize.x);
        this.rows = new Array(this.gridSize.y);
        this.tiles = [];
        this.debugDraw = false;
    }

    generateGrid() {
        this.tiles = [];
        let xIndex = 0;
        for (let column of this.columns) {
            let yIndex = 0;
            console.log("Generate Column");
            let tileX = this.pos.x + (this.tileSize.x * xIndex)
            console.log(tileX);
            for (let row of this.rows) {
                let tileY = this.pos.y + (this.tileSize.y * yIndex)  
                console.log("Generate Rows");
                console.log(tileY);
                

                let tileGridPos = new Vector2(xIndex, yIndex);
                let tile = new Tile(tileX, tileY, this.tileSize.x, this.tileSize.y, tileGridPos); 
                this.tiles.push(tile);
                ;
                yIndex += 1;
            }
            xIndex += 1;
        }
        console.log("Generated Tiles: ");
        console.log(this.tiles);
    }

    getTileOnPoint(point) {
        for (const tile of this.tiles) {
            if (tile.isPointInTile(point)) {
                return tile;
            }
        }
        console.log("Point is not in tile")
        return null;
    }

    getNeighborTile(tile, direction){
        let clampedDirection = new Vector2(direction.x == 0 ? 0 : direction.x / Math.abs(direction.x), direction.y == 0 ? 0 : direction.y / Math.abs(direction.y));
        console.log("CLMAPED DIRECTION: ");
        console.log(clampedDirection);
        let neighborGridPos = new Vector2(tile.gridPos.x + clampedDirection.x, tile.gridPos.y + clampedDirection.y);
        return this.getTileOnGridPos(neighborGridPos);
    }

    getTileOnGridPos(gridPos){
        for (const tile of this.tiles) {
            if (tile.gridPos.x == gridPos.x && tile.gridPos.y == gridPos.y) {
                return tile;
            }
        }
        return null;
    }


    startDrawLoop(ctx) {
        for (const tile of this.tiles) {
            tile.draw(ctx);
        }

        if (this.debugDraw) {
            for (const tile of this.tiles) {
                ctx.fillStyle = "black";
                ctx.font = "16px Arial";
                ctx.fillText("(" + tile.gridPos.x + ", " + tile.gridPos.y + ")", tile.x, tile.y);
            }
        }
        requestAnimationFrame(this.startDrawLoop.bind(this, ctx));
    }
}