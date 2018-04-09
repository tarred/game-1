define(() => {
  return {
    canvas: {
      width: 1200,
      height: 1000
    },
    physics: {
      hero: {
        topRunSpeed: 8, // movement in pixels per second
        jumpSpeed: -45, // higher, jump higher
      }
    },
    characters: {
      hero: {
        source: 'img/hero.png',
      }
    },
    background: {
      source: 'img/mario-level-1.png',
      x: 0,
      y: -1800,
      width: 10000,
      height: 2800
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
    }
  }
})
