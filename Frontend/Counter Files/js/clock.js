var name = prompt("İsminiz nedir?");
document.querySelector("#myName").innerHTML = name;

function showTime() {
    var time = new Date();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();

    
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    day = day < 10 ? "0"+day: day;
    month = month < 10 ? "0" + month : month;

    document.querySelector("#myClock").innerHTML = day+"."+month+"."+year+"\t"+hour + ":" + minutes + ":" + seconds;

    setTimeout(showTime, 1000); 
}

showTime();
