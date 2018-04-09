define(() => {
  return {
    canvas: {
      width: 1200,
      height: 600
    },
    physics: {
      hero: {
        topRunSpeed: 10, // movement in pixels per second
        jumpSpeed: -45, // higher, jump higher
      }
    },
    characters: {
      hero: {
        source: 'img/hero.png',
      }
    },
    background: {
      source: 'img/1-1.gif',
      x: 0,
      y: 0,
      width: 10000,
      height: 600
    },
    hero: {
      width: 30,
      height: 45,

      x: 100,
      vx: 0,
      ax: 3,

      y: 0,
      vy: 0,
      ay: 4

    },
    blocks: [
      { // box 1
        x: 700,
        y: 360,
        height: 50,
        width: 50
      },
      { // box 2
        x: 875,
        y: 360,
        height: 50,
        width: 225
      },
      { // ground
        x: 0,
        y: 540,
        height: 1000,
        width: 2000
      }
    ]
  }
})
