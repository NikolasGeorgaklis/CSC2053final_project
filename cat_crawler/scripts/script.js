const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

const character = {
    height: 32,
    width: 32,
    
    jumping: true,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
};

const controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
      let key_state = (event.type == "keydown") ? true : false;
      switch (event.keyCode) {
        case 37: // left arrow
          controller.left = key_state;
          break;
        case 38: // up arrow
          controller.up = key_state;
          break;
        case 39: // right arrow
          controller.right = key_state;
          break;
      }
    }
  };

  const loop = function () {
    if (controller.up && character.jumping == false) {
      character.yVelocity -= 20;
      character.jumping = true;
    }
    if (controller.left) {
      character.xVelocity -= 0.5;
    }
    if (controller.right) {
      character.xVelocity += 0.5;
    }
  }

  character.yVelocity += 1.5; // gravity
  character.x += character.xVelocity;
  character.y += character.yVelocity;
  character.xVelocity *= 0.9; // friction
  character.yVelocity *= 0.9; // friction


  if (character.x < -20) {
    character.x = 1220;
  } else if (character.x > 1220) {  // if the square goes off the right
    character.x = -20;
  }

// Creates the "ground" for each frame
    context.strokeStyle = "#2E2532";
    context.lineWidth = 30;
    context.beginPath();
    context.moveTo(0, 385);
    context.lineTo(1220, 385);
    context.stroke();

    window.requestAnimationFrame(loop); // Updates when called to tell the browser it is ready to draw again


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

window.requestAnimationFrame(loop);
