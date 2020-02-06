function enemy () {
    meteor = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . 2 2 2 2 2 . . . . . 
. . . . . 2 2 2 2 2 2 2 2 . . . 
. . . . 2 2 2 f 2 2 2 2 2 2 . . 
. . . 2 2 2 2 2 2 2 2 2 2 2 . . 
. . . 2 f 2 2 2 2 2 2 2 2 2 . . 
. . 2 2 2 2 2 2 f 2 2 f 2 2 . . 
. . 2 2 2 2 2 2 2 2 2 f 2 2 . . 
. . 2 2 2 2 f 2 2 2 2 f 2 2 . . 
. . 2 2 f 2 2 2 2 2 2 2 2 . . . 
. . 2 2 2 2 2 2 f 2 f 2 2 . . . 
. . . 2 2 2 2 f 2 2 2 2 . . . . 
. . . . . 2 2 2 2 2 2 2 . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
    meteor.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
    extraVelocity = 0
    if (Math.percentChance(20)) {
        extraVelocity = Math.randomRange(0, 50)
    } else {
        extraVelocity = Math.randomRange(-16, 16)
    }
    meteor.vx = -50 - 5 * info.score() - extraVelocity
    if (info.score() <= 20) {
        controller.moveSprite(spaceShip, 100 - 2 * info.score(), 100 - 2 * info.score())
    }
}
function gameOver () {
    game.over(false)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    gameOver()
})
function changeScore () {
    info.changeScoreBy(1)
}
let extraVelocity = 0
let meteor: Sprite = null
let spaceShip: Sprite = null
spaceShip = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . f . . . . . . . . . 
. . . . . f f f . . . . . . . . 
. . . . f f b f f . . . . . . . 
. . . f f b b b f f . . . . . . 
. . . f b b f b b f . . . . . . 
. . f f b b f b b f f . . . . . 
. . f b b f f f b b f . . . . . 
. . f b b b b b b b f . . . . . 
. . f b f b b b f b f . . . . . 
. . f b b b b b b b f . . . . . 
. . f f b b b b b f f . . . . . 
. . 2 f f f f f f f 2 . . . . . 
. . . 2 4 2 4 2 4 2 . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
controller.moveSprite(spaceShip, 500, 500)
spaceShip.x = 8
spaceShip.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
enemy()
changeScore()
// Meteorites
game.onUpdateInterval(2000, function () {
    enemy()
    enemy()
    enemy()
    enemy()
})
// score
game.onUpdateInterval(200, function () {
    changeScore()
})
