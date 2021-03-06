	var canvas = document.createElement("canvas");
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	var ctx = canvas.getContext("2d");
	var width = 640,
		height = 640;
	var cWidth = 64,
		cHeight = 64;
	var dir = null;
	var worldOff = 0;
	var x = 0,
		y = 0;
	var bgX = 0;
	var enemyOffset = 0;
	var xOffset = width/2 - cWidth/2,
		yOffset = 0;
	var world = document.createElement("img");
	var char = document.createElement("img");
	var charA = document.createElement("img");
	var charB = document.createElement("img");
	var enemy = document.createElement("img");
  var vw = document.createElement("img");
	var background = document.createElement("img");
	var aesthetic = document.createElement("img");
	var enemyStats = {x:0, size:0};
	var realX = 256;
	var score = 0;
	var chars = [];
	var switchChar = 0;
	var showBgAt = 64;
	var isTutorial = false;
	var started = false;
  var button1 = {
    x:180,
    y:240,
    width:80,
    heigth:40
};
  var button2 = {
    x:380,
    y:240,
    width:155,
    heigth:40
};
  
  
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	ctx.font = "20px sans";
	charA.src = "http://aydensgame.neocities.org/charA.png";
	charB.src = "http://aydensgame.neocities.org/charB.png";
	char.src = "http://aydensgame.neocities.org/char.png";
	world.src = "http://aydensgame.neocities.org/world.png";
	background.src = "http://aydensgame.neocities.org/bg.png";
	aesthetic.src = "http://aydensgame.neocities.org/vap.jpg";
	vw.src = "http://aydensgame.neocities.org/bg2.png";
	enemy.src="http://aydensgame.neocities.org/en.png";
	ctx.imageSmoothingEnabled = false;
	canvas.style.borderStyle = "solid";
	canvas.style.borderWidth = "1px";
  
  //Shh, easter egg
  function vaporwave(){
    background.src = vw.src;
    document.body.style.backgroundImage = 'url("http://aydensgame.neocities.org/vap.jpg")';
    showBgAt = 1080;
    render();
    }
    
  //setup stuff
  function startingScreen(){
    render();
    ctx.fillStyle="black";
    ctx.globalAlpha=0.8;
    ctx.fillRect(0, 0, 640, 640);
    ctx.globalAlpha=1;
    ctx.fillStyle="#ffffff";
    ctx.font="50px Verdana";
    ctx.fillText("Plombus and the Blombuses",30, 100);
    ctx.font="20px Verdana";
    ctx.fillText("By Ayden Diel",30, 150);
    ctx.font="30px Verdana";
    ctx.strokeStyle="#ffffff";
    ctx.fillText("Start",190,270);
    ctx.strokeRect(180, 240, 80, 40);
    ctx.fillText("Tutorial",390,270);
    ctx.strokeRect(380, 240, 115, 40);
    ctx.stroke();
    }
  
	window.onload = function(){
		document.body.appendChild(canvas);
		makeEnemy();
		startingScreen();
	  if (!isChrome){
    alert("Use Google Chrome Desktop For Smooth Graphics");
    }
	}
	function makeEnemy(){
	  if (score>0){
		enemyStats.x = parseInt(getRandomArbitrary(0, 2560));
		enemyStats.size = parseInt(getRandomArbitrary(12, 20));
		console.log(parseInt(enemyStats.x), parseInt(enemyStats.size));
	  }else{
	    enemyStats.x = 100;
	    }
	}
	function makeFirstEnemy(){
		enemyStats.x = 100;
		render();
		ctx.fillText("Press D to shoot this Blumbus", 250,270);
		
	}
	//I got this from stackexchange, idk where it gets called
	function getRandomArbitrary(min, max) {
    	return Math.random() * (max - min) + min;
	}
	//Movement+shooting
	function jump(){
		char.src="http://aydensgame.neocities.org/char.png";
		render();
	}
	function moveLeft(){
	  if(started){
		if (bgX <= 0){
			xOffset-=10;
		}else{
			if (xOffset != 288){
				xOffset-=10;
			}else{
				bgX-=.75;	
				worldOff-=1;
				realX +=10;
			}
		
		}
		dir = false;
		console.log("bgX: " + bgX + " x: " + x + " xOffset: " + xOffset);
		console.log("enemy x: " + realX + enemyStats.x);
		render();
	  }else{startingScreen();}
	}
	function moveRight(){
	  if(started){
		if (bgX >= 256 - 64){
			xOffset+=10;
      
		}else{
			if (xOffset != 288){
				xOffset+=10;
			}else{
				bgX+=.75;	
				worldOff+=1;
				realX -=10;
			}
			if(isTutorial){
			  if(enemyStats.x + realX <= 640){
			 setTimeout(function(){
			 render();
	     ctx.fillText("You have found a blumbus", 100,270);
	     }, 2000);
	     setTimeout(function(){
			 render();
	     ctx.fillText("Shoot him down using A if he is to your left, ", 100,240);
	     ctx.fillText("or D if he is to your right", 100, 270)
	     },2000);
	     setTimeout(function(){
			 render();
	     ctx.fillText("The tutorial will end once you shoot this blumbus", 100,270);
	     }, 3000);
	     isTutorial = false;
			    }
			  }
		}
		
		dir = true;
		console.log("bgX: " + bgX + " x: " + x + " xOffset: " + xOffset);
		console.log("enemy x: " + realX + enemyStats.x);
		render();
	  }else{startingScreen();}
	}
	function duck(){

	}
	function shootLeft(){
	  if(started){
	  render();
	   char.src= charB.src;
	   render();
	   setTimeout(function(){
	   render();
	   char.src="http://aydensgame.neocities.org/char.png";
	   render();}, 300);
	   if(realX + enemyStats.x <= xOffset + x*10 && realX + enemyStats.x >= 0){
	     score++;
	     makeEnemy();
	     render();
	     }
	  }else{startingScreen();}
	 }
	 function shootRight(){
	   if(started){
	   render();
	   char.src= charA.src;
	   render();
	   setTimeout(function(){
	     render();
	     char.src="http://aydensgame.neocities.org/char.png";
	     render();}, 300);
	     if(realX + enemyStats.x >= xOffset + x*10 && realX + enemyStats.x <= 640){
	     score++;
	     makeEnemy();
	     render();
	     }
	   if(isTutorial){
	     setTimeout(function(){
	      ctx.fillText("Blumbuses move around when you shoot them", 80,270);
	     }, 1000);
	      setTimeout(function(){
	     render();
	      ctx.fillText("Use the left and right arrow keys to look for them", 40,270);}, 3000);
	     }
	 } else{startingScreen();}
	 }
	 //render, duhh
	function render(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(background, bgX, 0, showBgAt, showBgAt, 0, 0, width, height);
		ctx.drawImage(world, worldOff, 0, 64, 64, 0, 0, width, height);
		ctx.drawImage(char, 0, 0, 16, 16, x*10 + xOffset, y + height / 2 - cHeight / 2, cWidth, cHeight);
		ctx.drawImage(enemy, 0, 0, 16, 16, realX + enemyStats.x, height / 2 - cHeight / 2, 64, 64);
		ctx.fillText("Score: " + score, 0,40);
	}
	//dealing with clicks and button presses:
	function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}
	function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,button1)) {
        if(!started){
        console.log("started game");
        started=true;
        render();
        }
    } 
    if (isInside(mousePos,button2)) {
        if(!started){
        isTutorial=true;
        started=true;
        render();
        makeFirstEnemy();
        console.log("started tutorial");
        }
    } 
    
}, false);
	document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
          if(started){
        	moveLeft();
          }else{startingScreen();}
            break;
        case 38:
          if(started){
            jump();
          }else{startingScreen();}
            break;
        case 39:
          if(started){
            moveRight();
          }else{startingScreen();}
            break;
        case 40:
          if(started){
            duck();
          }else{startingScreen();}
            break;
        case 65:
          if(started){
            shootLeft();
          }else{startingScreen();}
            break;
        case 68:
          if(started){
            shootRight();
          }else{startingScreen();}
            break;
    
    }
	};