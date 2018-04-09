define(() => {
  return {
    loadImage: url => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject()
        img.src = url
      })
    },
    createCanvas: (width, height, top, left) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = width
      canvas.height = height
      canvas.style.position = 'absolute'
      canvas.style.top = top
      canvas.style.left = left

      return {
        canvas: canvas,
        ctx: ctx
      }
    },
    readKey: (hero) => {
      if (37 in keysDown) { // Player holding left
        hero.vx -= hero.ax
      }

      if (39 in keysDown) { // Player holding right
        hero.vx += hero.ax
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
  }
})
