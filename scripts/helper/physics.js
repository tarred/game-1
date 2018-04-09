
define(() => {
  return {
    collisionDetection: (hero, blocks) => {
      const collisionDirection = {}

      blocks.forEach((block,index) => {
        const nextX = hero.x + hero.vx
        const nextY = hero.y + hero.vy

        const w = (hero.width + block.width)/2
        const h = (hero.height + block.height)/2

        const heroCX = (nextX + nextX + hero.width)/2
        const blockCX = (block.x + block.x + block.width)/2

        const heroCY = (nextY + nextY + hero.height)/2
        const blockCY = (block.y + block.y + block.height)/2

        const dx = heroCX - blockCX;
        const dy = heroCY - blockCY;

        if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
          /* collision! */
          const wy = w * dy;
          const hx = h * dx;

          if (wy > hx) {
            if (wy > -hx) {
              /* collision at the top */
              collisionDirection.top = block.y + block.height
            } else {
              /* on the right */
              collisionDirection.right = block.x - hero.width
            }
          } else {
            if (wy <= -hx) {
              /* at the bottom */
              collisionDirection.bottom = block.y - hero.height
              jumped = false;
            } else {
              /* on the left */
              collisionDirection.left = block.x + block.width
            }
          }
        }

      })
      // console.log(collisionDirection)
      return collisionDirection
    }
  }
})
