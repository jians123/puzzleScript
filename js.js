// 点击开始游戏
let mark_btn = document.querySelector(".mark_btn")
let mark = document.querySelector(".mark")
mark_btn.onclick = function () {
    mark.style.display = 'none'
}


// 最大值范围
let xMin = 140
let xMax = 660

let yMin = 140
let yMax = 660
let speed = 8
// 分数
let fraction = 0
// 人物宽度
let characterWidth = 80
// 人物变小时间戳
let renTimer;
let food = document.querySelector(".food")
let character = document.querySelector(".character")

function playGame() {
    food.style.left = randomNumber() + 'px'
    food.style.top = randomNumber() + 'px'
}
// 获取随机值
function randomNumber() {
    var randomIntegerInRange = Math.floor(Math.random() * 600) + 100
    return randomIntegerInRange
}

let topTimeState = true,rightTimeState = true,bottomTimeState = true,leftTimeState = true;
let topTime,rightTime,bottomTime,leftTime;
let collisionTimer;

// 人物移动
function move() {
    document.addEventListener('keydown',function (e) {
        switch (e.keyCode) {
            case 38:
                if(topTimeState){
                    timeFun1()
                }
                topTimeState = false
                break
            case 39:
                if(rightTimeState){
                    timeFun2()
                }
                rightTimeState = false
                break
            case 40:
                if(bottomTimeState){
                    timeFun3()
                }
                bottomTimeState = false
                break
            case 37:
                if(leftTimeState){
                    timeFun4()
                }
                leftTimeState = false
                break
        }
    })
    document.addEventListener('keyup',function (e) {
        switch (e.keyCode) {
            case 38:
                topTimeState = true
                clearInterval(topTime)
                break
            case 39:
                rightTimeState = true
                clearInterval(rightTime)
                break
            case 40:
                bottomTimeState = true
                clearInterval(bottomTime)
                break
            case 37:
                leftTimeState = true
                clearInterval(leftTime)
                break
        }
    })
}

function timeFun1() {
    topTime = setInterval(function () {
        if(character.offsetTop > yMin){
            requestAnimationFrame(function () {
                character.style.top = character.offsetTop - speed + 'px'
            })
        }else {
            character.style.top = yMin + 'px'
            topTimeState = true
            clearInterval(topTime)
        }
    },10)

}
function timeFun2() {
    rightTime = setInterval(function () {
        if(character.offsetLeft < xMax){
            requestAnimationFrame(function () {
                character.style.left = character.offsetLeft + speed + 'px'
            })
        }else {
            character.style.left = xMax + 'px'
            rightTimeState = true
            clearInterval(rightTime)
        }
    },10)

}
function timeFun3() {
    bottomTime = setInterval(function () {
        if(character.offsetTop < yMax){
            requestAnimationFrame(function () {
                character.style.top = character.offsetTop + speed + 'px'
            })
        }else {
            character.style.top = yMax + 'px'
            bottomTimeState = true
            clearInterval(bottomTime)
        }
    },10)

}
function timeFun4() {
    leftTime = setInterval(function () {
        if(character.offsetLeft > xMin){
            requestAnimationFrame(function () {
                character.style.left = character.offsetLeft - speed + 'px'
            })
        }else {
            character.style.left = xMin + 'px'
            leftTimeState = true
            clearInterval(leftTime)
        }
    },10)

}

// 检测碰撞
function detectionCollision() {
    collisionTimer = setInterval(function () {
        let food = document.querySelector(".food")
        let character = document.querySelector(".character")
        let characterOffsetWidth = character.offsetWidth/2
        let foodOffsetWidth = food.offsetWidth/2
        let cxPos = characterOffsetWidth + character.offsetLeft
        let cyPos = characterOffsetWidth + character.offsetTop
        let fxPos = foodOffsetWidth + food.offsetLeft
        let fyPos = foodOffsetWidth + food.offsetTop
        if(Math.abs(cxPos - fxPos) <= characterOffsetWidth+foodOffsetWidth
            &&
            Math.abs(cyPos - fyPos) <= characterOffsetWidth+foodOffsetWidth){
            collisionOK()
        }
    },20)
}
// 人物变小
function renSmalle() {
    let character = document.querySelector(".character")
    renTimer = setInterval(function () {
        characterWidth = characterWidth - 5
        if(characterWidth <= 0){
            clearInterval(collisionTimer)
            clearInterval(renTimer)
            document.querySelector(".gameOver").style.display = 'flex'
        }
        character.style.width = characterWidth + 'px'
    },1000)

}


// 碰撞成功后的操作
function collisionOK() {
    fraction = fraction + 1
    let score = document.querySelector(".score")
    let score_sp = document.querySelector(".score_sp")
    score.innerHTML = fraction
    score_sp.innerHTML = fraction
    if(characterWidth < 90){
        characterWidth = characterWidth + 5
    }else {
        characterWidth = 90
    }
    character.style.width = characterWidth + 'px'
    playGame()
}

document.querySelector(".btn1").onclick = function () {
    clickRestart()
}
document.querySelector(".btn2").onclick = function () {
    clickRestart()
}
// 点击开始游戏、重新开始
function clickRestart() {
    playGame()
    move()
    speed = 8
    fraction = 0
    characterWidth = 80
    renSmalle()
    detectionCollision()
    document.querySelector(".gameOver").style.display = 'none'
    document.querySelector(".mark").style.display = 'none'
}
// 游戏结束结算画面



