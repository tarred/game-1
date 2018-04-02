let reqFrameCount = 1;
let background;
let foreground;
let heroImage;
let presets;
let hero;
let collisionDirection = {};
let step;
let pause = false;
let jumped = false;
let jumpReleased = true
const keysDown = {}
const con = console.log

requirejs(['helper/util', 'helper/assets'], (util, assets) => {

  presets = assets
  hero = assets.hero

  // create canvas
  background = util.createCanvas(presets.canvas.width, presets.canvas.height, 0, 0)
  document.body.appendChild(background.canvas)

  foreground = util.createCanvas(presets.canvas.width, presets.canvas.height, 0, 0)
  document.body.appendChild(foreground.canvas)

  // load assets
  util.loadImage(assets.characters.hero.source)
  .then(hrImg => {
    heroImage = hrImg;
  })

  // start game
  renderOnce()
  main()

})

const heroJumpable = () => {
  if (jumped || !jumpReleased) { return false }

  for(var i = 0; i < presets.blocks.length; i++) {
    const block = presets.blocks[i]
    const nextY = hero.y + hero.vy + hero.ay

    if (hero.x < block.x + block.width &&
       hero.x + hero.width > block.x &&
       nextY < block.y + block.height &&
       hero.height + nextY >= block.y) {
         return true
    }
  }

  return false
}



window.addEventListener('keydown', (e) => {
  if (e.keyCode === 38 && heroJumpable()) {
    // console.log('jmp')
    hero.vy = presets.physics.hero.jumpSpeed
    jumped = true
    jumpReleased = false
    reqFrameCount++
    step = requestAnimationFrame(main)
  } else {
    keysDown[e.keyCode] = true
  }

}, false)

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 38) {
    jumpReleased = true
  }
  delete keysDown[e.keyCode]
}, false)

const readKey = () => {
  if (37 in keysDown) { // Player holding left
    hero.vx = Math.max(hero.vx - hero.ax, -presets.physics.hero.topSpeed)
  }

  if (39 in keysDown) { // Player holding right
    hero.vx = Math.min(hero.vx + hero.ax, presets.physics.hero.topSpeed)
  }

  if (Object.keys(keysDown).length === 0) {
    // con(hero.vx)
    hero.vx /= 1.3;
    if (Math.abs(hero.vx) < 1) {
      hero.vx = 0
    }
  }
  hero.vy += hero.ay;
}

const collisionDetection = () => {
  collisionDirection = {}

  presets.blocks.forEach((block,index) => {
    const nextX = hero.x + hero.vx
    const nextY = hero.y + hero.vy

    // if (nextX < block.x + block.width &&
    //    nextX + hero.width > block.x &&
    //    nextY < block.y + block.height &&
    //    hero.height + nextY >= block.y) {
    //      console.log('con!!')
    //    }
        // collision detected!

    const w = (hero.width + block.width)/2
    const h = (hero.height + block.height)/2

    const heroCX = (nextX + nextX + hero.width)/2
    const blockCX = (block.x + block.x + block.width)/2

    const heroCY = (nextY + nextY + hero.height)/2
    const blockCY = (block.y + block.y + block.height)/2

    const dx = heroCX - blockCX;
    const dy = heroCY - blockCY;

    if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
      console.log('cc')
      /* collision! */
      const wy = w * dy;
      const hx = h * dx;

      if (wy > hx) {
        if (wy > -hx) {
          /* collision at the top */
          collisionDirection.top = block.y + block.height
        } else {
          /* on the right */
          collisionDirection.right = block.x - hero.width
        }
      } else {
        if (wy > -hx) {
          /* on the left */
          collisionDirection.left = block.x + block.width
        } else {
          /* at the bottom */
          collisionDirection.bottom = block.y - hero.height
          jumped = false;
        }
      }
    }

  })
}

//update game object
const updatePositions = () => {
  hero.x = Math.min(presets.canvas.width - hero.width, Math.max(0, hero.x + hero.vx))
  hero.y = Math.min(hero.y + hero.vy)

  // console.log(collisionDirection)
  if (collisionDirection.right) {
    hero.vx = 0
    hero.x = collisionDirection.right
  } else if (collisionDirection.left) {
    hero.vx = 0
    hero.x = collisionDirection.left
  }

  if (collisionDirection.top) {
    hero.vy = 0
    hero.y = collisionDirection.top
  } else if (collisionDirection.bottom) {
    hero.vy = 0
    hero.y = collisionDirection.bottom
  }

  collisionDirection = {}
}

const renderOnce = () => {
  background.ctx.fillStyle = 'red'
  presets.blocks.forEach((block) => {
    background.ctx.strokeRect(block.x, block.y, block.width, block.height)
  })
}

const render = () => {
  if (heroImage) {
    // con(hero.x)
    // con(hero.y)
    foreground.ctx.clearRect(0,0, presets.canvas.width, presets.canvas.height)
    foreground.ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height)
  }

  if (reqFrameCount <= 1) {
    step = requestAnimationFrame(main)
  } else {
    reqFrameCount--;
  }
}

let main = () => {
  readKey()
  collisionDetection()
  updatePositions()
  render()
}
