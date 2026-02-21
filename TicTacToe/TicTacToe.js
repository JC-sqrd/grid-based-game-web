class TicTacToe {
    
    static GameState = {
        START : "START",
        XTURN : "XTURN",
        OTURN : "OTURN",
        XWIN : "XWIN",
        OWIN : "OWIN"
    };

    static FirstTurn = {
        X : "X",
        O : "O"
    };

    static gameState = this.GameState.START;

    constructor(grid, canvas, firstTurn) {
        this.grid = grid
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.firstTurn = firstTurn;

        this.#addEventListener();
        
        switch(this.firstTurn) {
            case "X":
                TicTacToe.gameState = TicTacToe.GameState.XTURN;
                break;
            case "O":
                TicTacToe.gameState = TicTacToe.GameState.OTURN;
                break;
            default:
                TicTacToe.gameState = TicTacToe.GameState.XTURN;
                break;
        }

        this.xTiles = [];
        this.oTiles = [];

        
        const paragraph = document.createElement('p');
        paragraph.textContent = "TIC TAC TOE";
        document.body.appendChild(paragraph);

    }

    #addEventListener() {
        this.canvas.addEventListener(
            'mousedown',
            evt => {
                let mousePos = new Vector2(evt.offsetX, evt.offsetY);
                let tileOnMouse = this.grid.getTileOnPoint(mousePos);
                if (tileOnMouse != null && !tileOnMouse.occupied) {
                    let tileData = {tile : tileOnMouse, x : tileOnMouse.x + (tileOnMouse.width / 2), y : tileOnMouse.y + (tileOnMouse.height / 2)};
                
                    if (TicTacToe.gameState == TicTacToe.GameState.XTURN) {
                        tileData.tile.occupied = true;
                        tileData.tile.type = "X";
                        this.xTiles.push(tileData);
                        //Check if X wins, if not change turn
                        console.log("X WIN: " + this.checkTileSequence(tileData.tile));
                        TicTacToe.gameState = TicTacToe.GameState.OTURN;
                    }
                    else if (TicTacToe.gameState == TicTacToe.GameState.OTURN) {
                        tileData.tile.occupied = true;
                        tileData.tile.type = "O";
                        this.oTiles.push(tileData);
                        // Check if O wins, if not change turn
                        console.log("O WIN: " + this.checkTileSequence(tileData.tile));
                        TicTacToe.gameState = TicTacToe.GameState.XTURN
                    }
                }
                //console.log("MOUSE POS: "  + mousePos.x + " " + mousePos.y)
                //console.log(tileOnMouse);
            }
        );
    }

    startDrawLoop(ctx){
        for (const x of this.xTiles) {
            ctx.fillStyle = "green"; 

            ctx.beginPath();
            ctx.arc(x.x, x.y, 20, 0, 2 * Math.PI);
            ctx.fill(); 
        }

        for (const o of this.oTiles) {
            ctx.fillStyle = "yellow";
            ctx.beginPath(); 
            ctx.arc(o.x, o.y, 20, 0, 2 * Math.PI);
            ctx.fill(); 
        }

        requestAnimationFrame(this.startDrawLoop.bind(this, ctx));
    }

    checkTileSequence(startTile) {
        let checkForType = startTile.type;
        let pivotTile = startTile;
        let requiredSequence = 3;
        let currentStreak = 1;
        let nextTile;
        let direction;


        //Check direction : (-1, 0)
        direction = new Vector2(-1, 0);
        let doneChecking = false
        let leftSequence = 0;

        while (!doneChecking) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                leftSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }


        //Check direction : (-1, -1)
        direction = new Vector2(-1, -1);
        let topLeftSequence = 0;
        //console.log("CHECK DIRECTION: (-1, -1)");
        
        currentStreak = 0;
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                topLeftSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }
        

        //Check direction : (0, -1)
        direction = new Vector2(0, -1);
        let topSequence = 0;
        //console.log("CHECK DIRECTION: (0, -1)");
        
        currentStreak = 1;
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                topSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }

        //Check direction : (1, 1)
        direction = new Vector2(1, 1);
        let topRightSequence = 0;
        //console.log("CHECK DIRECTION: (1, 1)");
        
        currentStreak = 1;
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                topRightSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }

        //Check direction : (1, 0)
        direction = new Vector2(1, 0);
        let rightSequence = 0;
        //console.log("CHECK DIRECTION: (1, 0)");
        
        currentStreak = 1;
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                rightSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }


        //Check direction : (1, 1)
        direction = new Vector2(1, 1);
        let bottomRightSequence = 0;
        //console.log("CHECK DIRECTION: (1, 1)");
        
        currentStreak = 1;
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                bottomRightSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }


        //Check direction : (0, 1)
        direction = new Vector2(0, 1);
        let bottomSequence = 0;
        //console.log("CHECK DIRECTION: (0, 1)");
        
        currentStreak = 1;
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                bottomSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }


        //Check direction : (-1, 1)
        direction = new Vector2(-1, 1);
        let bottomLeftSequence = 0;
        //console.log("CHECK DIRECTION: (0, -1)");
        
        currentStreak = 1;
        pivotTile = startTile;
        
        while (currentStreak < requiredSequence) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                currentStreak += 1;
                bottomLeftSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }


        let horizontalSequence = leftSequence + rightSequence + 1
        let verticalSequence = topSequence + bottomSequence + 1
        let downLeftDiagonalSequence = topLeftSequence + bottomRightSequence + 1
        let downRightDiagonalSequence = topRightSequence + bottomLeftSequence + 1

        console.log("HORIZONTAL SEQUENCE: " + leftSequence + " + " + rightSequence + " = " + horizontalSequence);
        console.log("VERTICAL SEQUNCE: " + topSequence + " + " + bottomSequence + " = " + verticalSequence);
        console.log("DOWN LEFT DIAGONAL SEQUNCE: " + topLeftSequence + " + " + bottomRightSequence + " = " + downLeftDiagonalSequence);
        console.log("DOWN RIGHT DIAGONAL SEQUENCE: " + topRightSequence + " + "+ bottomLeftSequence + " = " + downRightDiagonalSequence);
        console.log("REQUIRED SEQUENCE: " + requiredSequence);

        if (horizontalSequence == requiredSequence) {
            return true;
        }
        else if (verticalSequence == requiredSequence) {
            return true;
        }
        else if (downLeftDiagonalSequence == requiredSequence) {
            return true;
        }
        else if (downRightDiagonalSequence == requiredSequence) {
            return true;
        }

        return false;
    }

}