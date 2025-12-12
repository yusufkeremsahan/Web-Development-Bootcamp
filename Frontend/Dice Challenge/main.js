function setImage(player, num) {
    document.querySelector(".img"+player).setAttribute("src",  "./images/dice"+num+".png") ;
}
document.querySelector("h1").addEventListener("click",() => {
    var randomNum1 = Math.floor(Math.random() * 6 + 1);
    var randomNum2 = Math.floor(Math.random() * 6 + 1);

    setImage(1, randomNum1);
    setImage(2, randomNum2);
    if(randomNum1 > randomNum2){
        document.querySelector("h1").innerHTML = "🚩 Player1 won!";
    }else if(randomNum2 > randomNum1){
        document.querySelector("h1").innerHTML = "Player2 won! 🚩";
    }else{
        document.querySelector("h1").innerHTML = "It's draw!";

    }
})


