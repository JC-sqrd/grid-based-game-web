class ConnectFour {
    
    static GameState = {
        START : "START",
        XTURN : "XTURN",
        OTURN : "OTURN",
        XWIN : "XWIN",
        OWIN : "OWIN",
        UPDATING_PHYSICS : "UPDATING_PHYSICS"
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
                ConnectFour.gameState = ConnectFour.GameState.XTURN;
                break;
            case "O":
                ConnectFour.gameState = ConnectFour.GameState.OTURN;
                break;
            default:
                ConnectFour.gameState = ConnectFour.GameState.XTURN;
                break;
        }

        this.greenDiscs = [];
        this.yellowDiscs = [];

        
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
                    let discData = {tile : tileOnMouse, x : tileOnMouse.x + (tileOnMouse.width / 2), y : tileOnMouse.y + (tileOnMouse.height / 2), type : "NONE"};
                
                    if (ConnectFour.gameState == ConnectFour.GameState.XTURN) {
                        //tileData.tile.occupied = true;
                        //tileData.tile.type = "GREEN";
                        discData.type = "GREEN";
                        this.greenDiscs.push(discData);
                        //Update Disc Gravity
                        ConnectFour.gameState = ConnectFour.GameState.UPDATING_PHYSICS;
                        let landedTile = this.updateDiscGravity(discData, tileOnMouse);
                        //Check if X wins, if not change turn
                        console.log("X WIN: " + this.checkTileSequence(landedTile));
                        ConnectFour.gameState = ConnectFour.GameState.OTURN;
                    }
                    else if (ConnectFour.gameState == ConnectFour.GameState.OTURN) {
                        //tileData.tile.occupied = true;
                        //tileData.tile.type = "YELLOW";
                        discData.type = "YELLOW";
                        this.yellowDiscs.push(discData);
                        //Update Disc Gravity
                        ConnectFour.gameState = ConnectFour.GameState.UPDATING_PHYSICS;
                        let landedTile = this.updateDiscGravity(discData, tileOnMouse);
                        // Check if O wins, if not change turn
                        console.log("O WIN: " + this.checkTileSequence(landedTile));
                        ConnectFour.gameState = ConnectFour.GameState.XTURN
                    }
                }
                //console.log("MOUSE POS: "  + mousePos.x + " " + mousePos.y)
                //console.log(tileOnMouse);
            }
        );
    }


    startDrawLoop(ctx){

         for (const o of this.yellowDiscs) {
            ctx.fillStyle = "yellow";
            ctx.beginPath(); 
            ctx.arc(o.x, o.y, 20, 0, 2 * Math.PI);
            ctx.fill(); 
        }
        
        for (const x of this.greenDiscs) {
            ctx.fillStyle = "green"; 

            ctx.beginPath();
            ctx.arc(x.x, x.y, 20, 0, 2 * Math.PI);
            ctx.fill(); 
        }

       

        requestAnimationFrame(this.startDrawLoop.bind(this, ctx));
    }

    updateDiscGravity(discData, startTile) {
        let direction = new Vector2(0, 1);


        let currentTile = startTile;
        let downTile = this.grid.getNeighborTile(startTile, direction);
        //{tile : tileOnMouse, x : tileOnMouse.x + (tileOnMouse.width / 2), y : tileOnMouse.y + (tileOnMouse.height / 2)};

        if (downTile == null) {
            currentTile.occupied = true;
            currentTile.type = discData.type;
            return currentTile;
        }


        while(true) {
            if (downTile != null) {
                if (!downTile.occupied) {
                    //discData.x += (downTile.width / 2);
                    discData.y += (downTile.height);
                    currentTile = downTile;
                    downTile = this.grid.getNeighborTile(downTile, direction);
                }
                else {
                    currentTile.occupied = true;
                    currentTile.type = discData.type;
                    return currentTile;
                }
                
            }
            else {
                currentTile.occupied = true;
                currentTile.type = discData.type;
                return currentTile;
            }
        }
        
    }

    checkTileSequence(startTile) {
        let checkForType = startTile.type;
        let pivotTile = startTile;
        let requiredSequence = 4;
        let nextTile;
        let direction;


        //Check direction : (-1, 0)
        direction = new Vector2(-1, 0);
        let doneChecking = false
        let leftSequence = 0;

        while (!doneChecking) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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
        
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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
        
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
                topSequence += 1;
                pivotTile = nextTile
            }
            else {
                break;
            }
        }

        //Check direction : (1, 1)
        direction = new Vector2(1, -1);
        let topRightSequence = 0;
        //console.log("CHECK DIRECTION: (1, 1)");
        
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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
        
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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

        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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

        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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
        
        pivotTile = startTile;
        
        while (true) {
            nextTile = this.grid.getNeighborTile(pivotTile, direction);
            if (nextTile != null && nextTile.type == checkForType) {
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

        if (horizontalSequence >= requiredSequence) {
            return true;
        }
        else if (verticalSequence >= requiredSequence) {
            return true;
        }
        else if (downLeftDiagonalSequence >= requiredSequence) {
            return true;
        }
        else if (downRightDiagonalSequence >= requiredSequence) {
            return true;
        }
        
        return false;
    }

}