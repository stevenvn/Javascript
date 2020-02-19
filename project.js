let drawingGame = document.getElementById("drawing");
let ctx = drawingGame.getContext("2d");

// draw chicken

let xBasket= 250;
let yBasket= 500;
let xHeart = 450;
let yHeart = 10;
let scorce = 0; 
let scorceArray = [];
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
    let heart = new Image();
    heart.src="image/heart.png"
    heart.onload = function () { // draw hearts outside function Interval to avoid re-draw problem
        for (let x=450, y=10; x <=600; x+=50) {
        ctx.drawImage (heart, x, y, 20, 20);
        }
    }
    //upload basket pic
    let basket = new Image();
    basket.src="image/basket.jpg";
    //upload egg pic
    let egg = new Image();
    egg.src= "image/egg.png";
    //after loading chicken img, draw all pics
    img.onload = function () {
        let xEgg = [50, 200, 350, 500] // position of egg fall down assoiciated with 4 chickens
        let randomX = xEgg[Math.floor(Math.random()*xEgg.length)]
        let randomX1 = xEgg[Math.floor(Math.random()*xEgg.length)]
        let randomX2 = xEgg[Math.floor(Math.random()*xEgg.length)]
        let y = 140;
        let yEgg = y;
        let yEgg1 = y;
        let yEgg2 = y;
    falling = setInterval (function(){
        for (let x = 10; x <= 500; x+= 150) { // draw 4 chicken with 150 distance far
            ctx.drawImage (img, x, 40, 100, 100);
        }
        
        if (yEgg < drawingGame.width) { // make first egg fall down
            ctx.clearRect(randomX, yEgg, 20,20);
            yEgg+= speed[0];
            ctx.drawImage(egg,randomX,yEgg,20,20)
        } else {                                   // if yEgg is outside canvas, re-set yEgg and xEgg
            yEgg=y;
            randomX = xEgg[Math.floor(Math.random()*xEgg.length)];
        }
        
        // count scorce if yEgg falls in basket
        if ((yEgg> yBasket) && (randomX >xBasket-20) && (randomX < (xBasket + 100))) { // scorce is count if height egg is greater than height basket and width egg is within the range of basket
            ctx.clearRect(randomX, yEgg, 20,20);
            yEgg = y;
            randomX = xEgg[Math.floor(Math.random()*xEgg.length)];
            scorce+= 1;
            document.getElementById("scorce").innerHTML= "Your Scorce:" + scorce;
        }
        
        // make second egg fall down
        if (yEgg1 < drawingGame.width) { 
            ctx.clearRect(randomX1, yEgg1, 20,20);
            yEgg1+= speed[1];
            ctx.drawImage(egg,randomX1,yEgg1,20,20)
        } else {                                   // if yEgg is outside canvas, re-set yEgg and xEgg
            yEgg1=y;
            randomX1 = xEgg[Math.floor(Math.random()*xEgg.length)];
        }
        
        // count scorce if yEgg1 falls in basket
        if ((yEgg1> yBasket) && (randomX1 >xBasket- 20) && (randomX1 < (xBasket + 100))) {
            ctx.clearRect(randomX1, yEgg1, 20,20);
            yEgg1 = y;
            randomX1 = xEgg[Math.floor(Math.random()*xEgg.length)];
            scorce+= 1;
            document.getElementById("scorce").innerHTML= "Your Scorce:" + scorce;
        }
        
        // increase the dificulty of Game
        if (scorce >= 5) {
            if (yEgg2 < drawingGame.width) {
            ctx.clearRect(randomX2, yEgg2, 20,20);
            yEgg2+= speed[2];
            ctx.drawImage(egg,randomX2,yEgg2,20,20)
        } else {  // if yEgg is outside canvas, re-set yEgg and xEgg
            yEgg2=y;
            randomX2 = xEgg[Math.floor(Math.random()*xEgg.length)];
        }
        }
        // count scorce if yEgg2 falls in basket
        if ((yEgg2> yBasket) && (randomX2 >xBasket- 20) && (randomX2 < (xBasket + 100))) {
            ctx.clearRect(randomX2, yEgg2, 20,20);
            yEgg2 = y;
            randomX2 = xEgg[Math.floor(Math.random()*xEgg.length)];
            scorce+= 1;
            document.getElementById("scorce").innerHTML= "Your Scorce:" + scorce;
        }
        
        // if Eggs are fall outside canvas 3 times, player lose
        ctx.drawImage (basket, xBasket, yBasket, 100, 100);
        
        // Game Life
            if (yEgg >= drawingGame.width || yEgg1 >= drawingGame.width || yEgg2 >= drawingGame.width) {
            
            life-=1;
            console.log(life);
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
                stop=true;
                functionMove = false;
                life = 3;
                scorceArray.push(scorce);
                scorce = 0;
                xBasket= 250;
                yBasket = 500;
                let gameover = new Image();
                gameover.src = "image/gameover.png";
                gameover.onload = function () {
                ctx.drawImage(gameover, 0, 0,drawingGame.width,drawingGame.height);
            }
        }
    }
    }, 100);   
        
// function moveLeft      
function moveLeft () {
    ctx.clearRect (xBasket, yBasket, 100, 100)
    xBasket = xBasket - 20;
    ctx.drawImage (basket, xBasket, yBasket, 100, 100);
}
        
//move basket left
addEventListener("keydown", function() {
    if (event.keyCode == 37 && xBasket > 10 && functionMove == true) {
        moveLeft();
    }
}
)  
        
//function basket move right
function moveRight () {
    ctx .clearRect (xBasket, yBasket, 100, 100);
    xBasket = xBasket + 20;
    ctx.drawImage (basket, xBasket, yBasket, 100, 100);
}

//move basket right
addEventListener("keydown", function() {
    if (event.keyCode == 39 && xBasket < 490 && functionMove == true) {
        moveRight();
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
                scorce=0;
                xBasket= 250;
                yBasket = 500;
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

