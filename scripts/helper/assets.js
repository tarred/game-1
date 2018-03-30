define(() => {
  return {
    canvas: {
      width: 1920,
      height: 1200
    },
    physics: {
      env: {
        gravity: 9.5
      },
      hero: {
        topSpeed: 13, // movement in pixels per second
        jumpSpeed: -100, // higher, jump higher
      }
    },
    hero: {
      width: 150,
      height: 200,

      x: 100,
      vx: 0,
      ax: 2,

      y: 722,
      vy: 0,
      ay: 0

    },
    blocks: [
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
  }
})
