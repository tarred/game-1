let reqFrameCount = 1;
let background;
let foreground;
let heroImage;
let presets;
let hero;
let collisionDirection = {}; // [top, right, bottom, left]

requirejs(['helper/util', 'helper/assets'], (util, assets) => {

  presets = assets
  hero = assets.hero

  // create canvas
  background = util.createCanvas(presets.canvas.width, presets.canvas.height, 0, 0)
  document.body.appendChild(background.canvas)

  foreground = util.createCanvas(presets.canvas.width, presets.canvas.height, 0, 0)
  document.body.appendChild(foreground.canvas)

  // load assets
  util.loadImage('img/hero.gif')
  .then(hrImg => {
    heroImage = hrImg;
  })

  // start game
  renderOnce()
  main()

})


// handle keyboard controls
const keysDown = {}

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 38) {
    console.log('jmp')
    hero.vy = presets.physics.hero.jumpSpeed
    reqFrameCount++;
    requestAnimationFrame(main)
  } else {
    keysDown[e.keyCode] = true
  }

}, false)

window.addEventListener('keyup', (e) => {
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
    hero.vx /= 1.3;
    if (Math.abs(hero.vx) < 1) {
      hero.vx = 0
    }
  }

  hero.vy += hero.ay;
}

const collisionDetection = () => {
  presets.blocks.forEach(function(block) {
    let nextX = hero.x + hero.vx
    let nextY = hero.y + hero.vy

    if (nextX < block.x + block.width &&
       nextX + hero.width > block.x &&
       nextY < block.y + block.height &&
       hero.height + nextY > block.y) {
        // collision detected!

        
        console.log('collision')
        collisionDirection.right = block.x

    }
  })
}

//update game object
const updatePositions = () => {
  if (collisionDirection.right) {
    hero.vx = 0
    hero.x = collisionDirection.right - hero.width
    delete collisionDirection.right
  } else {
    hero.x = Math.min(presets.canvas.width - hero.width, Math.max(0, hero.x + hero.vx))
  }

  hero.vy += hero.ay
  hero.y = Math.min(presets.canvas.height - 500, hero.y + hero.vy)
}

const renderOnce = () => {
  background.ctx.fillStyle = 'red'
  presets.blocks.forEach((block) => {
    background.ctx.strokeRect(block.x, block.y, block.width, block.height)
  })
}

const render = () => {
  if (heroImage) {
    // console.log('aa')
    foreground.ctx.clearRect(0,0, presets.canvas.width, presets.canvas.height)
    foreground.ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height)
  }

  if (reqFrameCount <= 1) {
    requestAnimationFrame(main)
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
