
    var myGamePiece;
    var myObstacles = [];
    var myScore;
    
    var canvasPos = getPosition("myCanvas");
    var canvas = document.querySelector("myCanvas");
    
    function  startGame() {
        myGamePiece = new component(120, 70, "../media/policeCarPng.png", 10, 120, "image");
        myScore = new component("30px", "Consolas", "Green", 500, 40, "text");
        myGameArea.start();
        
    }
    
    var myGameArea = {
        canvas : document.getElementById("myCanvas"),    
        start : function() {
            this.canvas.width = 700;
            this.canvas.height = 400;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
            },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : function() {
            clearInterval(this.interval);
        }
        
    }
    
    
    
    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image"){
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;    
        this.update = function() {
            ctx = myGameArea.context;
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            }
            else if(type == "image"){
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width,
                    this.height);
            }
            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        this.newPos = function() {
            this.x += this.speedX;
            this.y += this.speedY;        
        }
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }
    
    function updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                return;
            } 
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(300)) {
            x = myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 300;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 100;
            maxGap = 150;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(50, height, "orange", x, 0));
            myObstacles.push(new component(50, x - height - gap, "orange", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].speedX = -1;
            myObstacles[i].newPos();
            myObstacles[i].update();
        }
        myScore.text="SCORE: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();    
        myGamePiece.update();
    }
    
    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
    }
     
    
    function myGamePieceUpdate() {
      myGamePiece.clearRect(0, 0, canvas.width, canvas.height);
     
      myGamePiece.beginPath();
      myGamePiece.arc(mouseX, mouseY, 50, 0, 2 * Math.PI, true);
     
      requestAnimationFrame(myGamePieceUpdate);
    }   
    
    function setMousePosition(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      myGamePiece.clearRect(0, 0, canvas.width, canvas.height);
    
      myGamePiece.beginPath();
      myGamePiece.arc(mouseX, mouseY, 50, 0, 2 * Math.PI, true);
    }  
    
    function getPosition(el) {
      var xPosition = 0;
      var yPosition = 0;
     
      while (el) {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
      }
      return {
        x: xPosition,
        y: yPosition
      };
    }
    
    function moveup() {
        myGamePiece.speedY = -2; 
    }
    
    function movedown() {
        myGamePiece.speedY = 2; 
    }
    
    function moveleft() {
        myGamePiece.speedX = -2; 
    }
    
    function moveright() {
        myGamePiece.speedX = 2; 
    }
    
    function clearmove() {
        myGamePiece.speedX = 0; 
        myGamePiece.speedY = 0; 
    }