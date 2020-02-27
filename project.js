let drawingGame = document.getElementById("drawing");
let ctx = drawingGame.getContext("2d");

// draw chicken
var basket ={x: 250, y:500};
let xHeart = 450;
let yHeart = 10;
let scorceArray = [0];
let functionMove;
let life = 3;
let speed = [5,10,15];
let xEgg;
let falling;
function drawObject () {
    //upload chicken pic
    let img = new Image();
    img.src = "image/chicken.jpg";
    // upload heart pic
    var heart = new Image();
    heart.src="image/heart.png"
    heart.onload = function () { // draw hearts outside function Interval to avoid re-draw problem
        for (let x=450, y=10; x <=600; x+=50) {
        ctx.drawImage (heart, x, y, 20, 20);
        }
    }
    //upload basket pic
    let basketPic = new Image();
    basketPic.src="image/basket.jpg";
    //upload egg pic
    var egg = new Image();
    egg.src= "image/egg.png";
    //after loading chicken img, draw all pics
    img.onload = function () {
        var chicken1 = {xEgg : 50, yEgg : 140, scorce : 0, speed : 5};
        var chicken0 = {xEgg : 350, yEgg : 140, scorce : 0, speed : 8};


        var xEgg = [50, 200, 350, 500] // position of egg fall down assoiciated with 4 chickens
        falling = setInterval (function(){
            for (let x = 10; x <= 500; x+= 150) { // draw 4 chicken with 150 distance far
                ctx.drawImage (img, x, 40, 100, 100);
            }
            
            fallingDown(egg,ctx,xEgg,chicken0);
            countScorce(chicken0,basket,ctx,xEgg);
            fallingDown(egg,ctx,xEgg,chicken1);
            countScorce(chicken1,basket,ctx,xEgg);

            ctx.drawImage (basketPic, basket.x, basket.y, 100, 100);
        
        // Game Life
            if (chicken0.yEgg >= drawingGame.width || chicken1.yEgg >= drawingGame.width) {
                life -= 1;
                switch(life){
                    case 2:
                    ctx.clearRect(xHeart,yHeart,20,20);
                    break;
                    case 1:
                    ctx.clearRect(xHeart +50,yHeart,20,20);
                    break;
            }
            if (life == 0) {
                clearInterval(timer);
                clearInterval(falling);
                stop = true;
                functionMove = false;
                life = 1;
                scorceArray.push(scorce);
                scorce = 0;
                basket.x = 250;
                basket.y = 500;
                var gameover = new Image();
                gameover.src = "image/gameover.png";
                gameover.onload = function () {
                ctx.drawImage(gameover, 0, 0,drawingGame.width,drawingGame.height);
                }
        }
        }
    }, 100);   
        
        // function moveLeft      
        function moveLeft (basketPic,ctx) {
            ctx.clearRect (basket.x, basket.y, 100, 100)
            basket.x -= 20;
            ctx.drawImage (basketPic, basket.x, basket.y, 100, 100);
        }
        
        //move basket left
        addEventListener("keydown", function() {
            if (event.keyCode == 37 && basket.x > 10 && functionMove == true) {
                moveLeft(basketPic,ctx);
                }   
            }
        )  
        
        //function basket move right
        function moveRight (basketPic,ctx) {
            ctx .clearRect (basket.x, basket.y, 100, 100);
            basket.x += 20;
            ctx.drawImage (basketPic, basket.x, basket.y, 100, 100);
        }

        //move basket right
        addEventListener("keydown", function() {
            if (event.keyCode == 39 && basket.x < 490 && functionMove == true) {
                moveRight(basketPic,ctx);
            }
        }
    )
 
    }
}
    
let timer;
let time;
let stop = true;
function countDown () {
    document.getElementById("scorce").innerHTML = "Your Scorce:0";
    if (stop == true) {
        ctx.clearRect(0,0, drawingGame.width,drawingGame.height)
        time = 60;
        timer = setInterval (myTimer, 1000);
        drawObject();
        stop= false;
        function myTimer () {
            time= time - 1;
            document.getElementById("time").innerHTML= "Time left: " + time;
            functionMove = true;
                if (time == 0) { 
                    clearInterval(timer);
                    clearInterval(falling);
                    stop=true;
                    functionMove = false;
                    scorceArray.push(scorce);
                    basket.x= 250;
                    basket.y = 500;
                    life = 3;
                    ctx.clearRect(0,0,drawingGame.width,drawingGame.height)
                    let gameWin = new Image();
                    gameWin.src = "image/win.png";
                    gameWin.onload = function () {
                        ctx.drawImage(gameWin, 0, 0,drawingGame.width,drawingGame.height);
                }
            }
        }
    }
}

function fallingDown(egg,ctx,xEgg, chicken){
    if (chicken.yEgg < 600) { 
        ctx.clearRect(chicken.xEgg, chicken.yEgg, 20,20);
        chicken.yEgg+=chicken.speed;
        ctx.drawImage(egg,chicken.xEgg,chicken.yEgg,20,20)
    } else {                                   // if yEgg is outside canvas, re-set yEgg and xEgg
        chicken.yEgg=140;
        chicken.xEgg = xEgg[Math.floor(Math.random()*xEgg.length)];
    }
}

function countScorce (chicken,basket,ctx,xEgg){
    if ((chicken.yEgg > basket.y) && (chicken.xEgg > basket.x - 20 && chicken.xEgg < basket.x + 100)){
        ctx.clearRect (chicken.x, chicken.y, 20, 20);
        chicken.yEgg = 140;
        chicken.xEgg = xEgg[Math.floor(Math.random()*xEgg.length)];
        scorceArray[0] += 1;
        document.getElementById("scorce").innerHTML= "Your Scorce:" + scorceArray[0];
    }
}
