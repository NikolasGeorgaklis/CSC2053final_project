const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

let frameCount = 1;

let obCount = frameCount;

const obXCoors = [];

const player = {

  
  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0



};

const nextFrame = () => {

  frameCount++;
  
  for (let i = 0; i < obCount; i++) {
    // Randomly generate the x coordinate for the top corner start of the obstacle
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }

}

const controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37:// left key
        controller.left = key_state;
        break;
      case 38:// up key
        controller.up = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;

    }

  }

};



const loop = function () {

  if (controller.up && player.jumping == false) {

    player.yVelocity -= 30;
    player.jumping = true;

  }

  if (controller.left) {

    player.xVelocity -= 0.35;

  }

  if (controller.right) {

    player.xVelocity += 0.35;

  }

  player.yVelocity += 0.7;// gravity
  player.x += player.xVelocity;
  player.y += player.yVelocity;
  player.xVelocity *= 0.9;// friction
  player.yVelocity *= 0.9;// friction

  // if player is falling below floor line
  if (player.y > 386 - 16 - 32) {

    player.jumping = false;
    player.y = 386 - 16 - 32;
    player.yVelocity = 0;

  }

  // if player is going off the left of the screen
  if (player.x < -20) {

    player.x = -10;

  } else if (player.x > 1220) {// if player goes past right boundary

    player.x = -20;
    nextFrame();

  }
  // Creates the backdrop for each frame
  context.fillStyle = "#6ccad6";
  context.fillRect(0, 0, 1220, 400); // x, y, width, height


  //collision field for player 
  context.strokeStyle = "white";
  context.strokeRect(player.x,player.y,player.width, player.height);

  // Creates and fills the cube for each frame
  context.fillStyle = "#8DAA9D"; // hex for cube color
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();


  // Create the obstacles for each frame
  // Set the standard obstacle height
  const height = 200 * Math.cos(Math.PI / 6);

  

  context.fillStyle = "#E47041"; // hex for triangle color
  obXCoors.forEach((obXCoor) => {

    //collision field for obstacle

    context.moveTo(obXCoor, 385); // x = random, y = coor. on "ground"
    context.arc(obXCoor, 345, 25, 0, 2 * Math.PI)
  
    context.closePath();
    context.fill();
  })


  // Creates the "ground" for each frame
  context.strokeStyle = "#31805a";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);