define(() => {
  return {
    canvas: {
      width: 1200,
      height: 600
    },
    physics: {
      hero: {
        topSpeed: 10, // movement in pixels per second
        jumpSpeed: -50, // higher, jump higher
      }
    },
    characters: {
      hero: {
        source: 'img/hero.png',
      }
    },
    hero: {
      width: 50,
      height: 70,

      x: 100,
      vx: 0,
      ax: 3,

      y: 0,
      vy: 0,
      ay: 4.5

    },
    blocks: [
      { // box 1
        x: 300,
        y: 450,
        height: 100,
        width: 150
      },
      { // box 2
        x: 650,
        y: 350,
        height: 100,
        width: 200
      },
      { // ground
        x: 0,
        y: 550,
        height: 1000,
        width: 1200
      }
    ]
  }
})
