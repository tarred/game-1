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
    }
  }
})