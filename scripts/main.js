let reqFrameCount = 1;
let background;
let foreground;
let heroImage;
let backgroundImage = {}
let hero;
let step;
let jumped = false;
let jumpReleased = true
const keysDown = {}
const con = console.log
let physics = null
let util = null
let assets = null
let level = null

const startingX = 4500

const modAssetsPos = () => {
  assets.background.x -= startingX
  assets.hero.x -= startingX
  level.blocks.forEach(block => {
    block.x -= startingX
  })
}

requirejs(
  ['helper/util', 'helper/assets', 'helper/physics', 'levels/level-1'],
  (gUtil, gAssets, gPhysics, lvl1) => {


  assets = gAssets
  physics = gPhysics
  util = gUtil
  level = lvl1

  modAssetsPos()

  createCanvas(assets.canvas, util)
  addEventListeners()

  // load assets
  Promise.all([
    util.loadImage(assets.characters.hero.source),
    util.loadImage(assets.background.source)
  ]).then((arr) => {
    heroImage = arr[0]
    backgroundImage = arr[1]
    main()
  })
})

// create canvas
const createCanvas = (canvas) => {
  background = util.createCanvas(canvas.width, canvas.height, 0, 0)
  document.body.appendChild(background.canvas)

  foreground = util.createCanvas(canvas.width, canvas.height, 0, 0)
  document.body.appendChild(foreground.canvas)
}

const addEventListeners = () => {
  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 38 && heroJumpable()) {
      // console.log('jmp')
      assets.hero.vy = assets.physics.hero.jumpSpeed
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
}

const heroJumpable = () => {
  const hero = assets.hero
  const blocks = level.blocks

  if (jumped || !jumpReleased) { return false }

  for(var i = 0; i < blocks.length; i++) {
    const block = blocks[i]
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

//update game object
const updatePositions = (collisionDirection) => {
  const hero = assets.hero
  const physics = assets.physics
  const canvas = assets.canvas

  hero.vx = Math.max(hero.vx, -physics.hero.topRunSpeed)
  hero.vx = Math.min(hero.vx, physics.hero.topRunSpeed)

  hero.y = Math.min(hero.y + hero.vy)

  if (hero.x + hero.vx > assets.canvas.width/2 && !collisionDirection.right) {
    const diff = assets.canvas.width/2 - (hero.x + hero.vx)
    hero.x = assets.canvas.width/2

    assets.background.x += diff
    level.blocks.forEach((block) => {
      block.x += diff
    })

  } else {
    hero.x = Math.max(0, hero.x + hero.vx)
  }

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

}

const render = () => {
  const canvas = assets.canvas
  const hero = assets.hero
  const backgroundAsset = assets.background


  con(hero.x)
  foreground.ctx.clearRect(0,0, canvas.width, canvas.height)
  background.ctx.clearRect(0,0, canvas.width, canvas.height)

  foreground.ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height)
  background.ctx.drawImage(backgroundImage, backgroundAsset.x, backgroundAsset.y, backgroundAsset.width, backgroundAsset.height)

  level.blocks.forEach((block) => {
    background.ctx.strokeRect(block.x, block.y, block.width, block.height)
  })

  if (reqFrameCount <= 1) {
    step = requestAnimationFrame(main)
  } else {
    reqFrameCount--;
  }
}

let main = () => {
  util.readKey(assets.hero)
  const collisionDirection = physics.collisionDetection(assets.hero, level.blocks)
  updatePositions(collisionDirection)
  render()
}
