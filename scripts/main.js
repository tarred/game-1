

  let reqFrameCount = 1;

  const canvas = {
    width: 1920,
    height: 1200
  }

  const physics = {
    env: {
      gravity: 9.5
    },
    hero: {
      topSpeed: 13, // movement in pixels per second
      jumpSpeed: -100, // higher, jump higher
    }
  }

  // game objects
  const hero = {
    width: 150,
    height: 200,

    x: 100,
    vx: 0,
    ax: 2,

    y: 722,
    vy: 0,
    ay: 0

  }

  const blocks = [
    { // box 1
      x: 300,
      y: 770,
      height: 130,
      width: 120
    },
    { // box 2
      x: 350,
      y: 700,
      height: 200,
      width: 200
    },
    { // ground
      x: -1,
      y: 900,
      height: 300,
      width: 1922
    }
  ]

  let background;
  let foreground;
  let heroImage;

requirejs(['helper/util'], (util) => {
  // create canvas
  background = util.createCanvas(canvas.width, canvas.height, 0, 0)
  document.body.appendChild(background.canvas)

  foreground = util.createCanvas(canvas.width, canvas.height, 0, 0)
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
      hero.vy = physics.hero.jumpSpeed
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
      hero.vx = Math.max(hero.vx - hero.ax, -physics.hero.topSpeed)
    }

    if (39 in keysDown) { // Player holding right
      hero.vx = Math.min(hero.vx + hero.ax, physics.hero.topSpeed)
    }

    if (Object.keys(keysDown).length === 0) {
      hero.vx /= 1.3;
      if (Math.abs(hero.vx) < 1) {
        hero.vx = 0
      }
    }

    hero.vy += hero.ay;
    // hero.ay += physics.env.gravity
  }

  //update game object
  const updatePositions = () => {
    hero.x = Math.min(canvas.width - hero.width, Math.max(0, hero.x + hero.vx))
    hero.vy += physics.env.gravity
    hero.y = Math.min(canvas.height - 500, hero.y + hero.vy)
  }

  const renderOnce = () => {
    background.ctx.fillStyle = 'red'
    blocks.forEach((block) => {
      background.ctx.strokeRect(block.x, block.y, block.width, block.height)
    })
  }

  const render = () => {
    if (heroImage) {
      // console.log('aa')
      foreground.ctx.clearRect(0,0, canvas.width, canvas.height)
      foreground.ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height)
    }

    if (reqFrameCount <= 1) {
      requestAnimationFrame(main)
    } else {
      reqFrameCount--;
    }
  }

  let main = () => {
    // console.log(hero.x)
    readKey()
    updatePositions()
    render()
  }

