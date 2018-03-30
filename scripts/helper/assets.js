define(() => {
  return {
    canvas: {
      width: 1520,
      height: 1200
    },
    physics: {
      hero: {
        topSpeed: 20, // movement in pixels per second
        jumpSpeed: -100, // higher, jump higher
      }
    },
    hero: {
      width: 150,
      height: 200,

      x: 100,
      vx: 0,
      ax: 5,

      y: 0,
      vy: 0,
      ay: 5.5

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
