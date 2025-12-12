let colorButton = ["blue", "green", "yellow", "red"]
let buttonSequence = []
let level = 0
let userClick = 0

function makeSound(color) {
    $(`.${color}`).addClass("pressed");
    setTimeout(() => {
        $(`.${color}`).removeClass("pressed");
    }, 100);
    let green = new Audio(`./sounds/${color}.mp3`);
    green.play();
}

for (let i = 0; i < colorButton.length; i++) {
    $("." + colorButton[i]).click(function () {
        makeSound(colorButton[i]);
    })
}

function appendButton() {
    let randomNum = Math.floor(Math.random() * 4)
    buttonSequence.push(randomNum)
    makeSound(colorButton[randomNum])
}

function nextLevel() {
    $("h1").text(`Level ${++level}`)
    setTimeout(appendButton,800)
    userClick = 0
}


$(document).keypress(function (event) {
    if (event.key.toLowerCase() === "s") {
        buttonSequence = [];
        level = 0;
        nextLevel();
        $("body").removeClass("game-over")
    }
});



$(document).on("click", function (event) {
    let clickedElement = $(event.target);
    let className = clickedElement.attr("class");
    if (className.includes("btn")) {
        let isOkey = false
        
        if ((buttonSequence[userClick] == 0 && className.includes("blue")) || (buttonSequence[userClick] == 1 && className.includes("green")) ||
            (buttonSequence[userClick] == 2 && className.includes("yellow")) || (buttonSequence[userClick] == 3 && className.includes("red"))) {
            isOkey = true
        }
        else {
            isOkey = false
        }
        userClick++
        if (isOkey && userClick  == buttonSequence.length) {
            nextLevel()
        } else if(!isOkey) {
            $("h1").text("Game Over! Press S to Restart")
            $("body").addClass("game-over")
            let fail = new Audio("./sounds/wrong.mp3")
            fail.play()
        }
    }

});