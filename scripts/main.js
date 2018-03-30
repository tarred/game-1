

  let reqFrameCount = 1;
  let background;
  let foreground;
  let heroImage;
  let presets;

requirejs(['helper/util', 'helper/assets'], (util, assets) => {

  presets = assets;

  // create canvas
  background = util.createCanvas(presets.canvas.width, presets.canvas.height, 0, 0)
  document.body.appendChild(background.canvas)

  foreground = util.createCanvas(presets.canvas.width, presets.canvas.height, 0, 0)
  document.body.appendChild(foreground.canvas)


  // load assets
  util.loadImage('img/hero.gif')
  .then(hrImg => {
    presets.heroImage = hrImg;
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
      presets.hero.vy = presets.physics.hero.jumpSpeed
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
      presets.hero.vx = Math.max(presets.hero.vx - presets.hero.ax, -presets.physics.hero.topSpeed)
    }

    if (39 in keysDown) { // Player holding right
      presets.hero.vx = Math.min(presets.hero.vx + presets.hero.ax, presets.physics.hero.topSpeed)
    }

    if (Object.keys(keysDown).length === 0) {
      presets.hero.vx /= 1.3;
      if (Math.abs(presets.hero.vx) < 1) {
        presets.hero.vx = 0
      }
    }

    presets.hero.vy += presets.hero.ay;
    // presets.hero.ay += physics.env.gravity
  }

  //update game object
  const updatePositions = () => {
    presets.hero.x = Math.min(presets.canvas.width - presets.hero.width, Math.max(0, presets.hero.x + presets.hero.vx))
    presets.hero.vy += presets.physics.env.gravity
    presets.hero.y = Math.min(presets.canvas.height - 500, presets.hero.y + presets.hero.vy)
  }

  const renderOnce = () => {
    background.ctx.fillStyle = 'red'
    presets.blocks.forEach((block) => {
      background.ctx.strokeRect(block.x, block.y, block.width, block.height)
    })
  }

  const render = () => {
    if (presets.heroImage) {
      // console.log('aa')
      foreground.ctx.clearRect(0,0, presets.canvas.width, presets.canvas.height)
      foreground.ctx.drawImage(presets.heroImage, presets.hero.x, presets.hero.y, presets.hero.width, presets.hero.height)
    }

    if (reqFrameCount <= 1) {
      requestAnimationFrame(main)
    } else {
      reqFrameCount--;
    }
  }

  let main = () => {
    // console.log(presets.hero.x)
    readKey()
    updatePositions()
    render()
  }
