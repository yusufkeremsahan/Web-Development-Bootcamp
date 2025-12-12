const fs = require("fs")



function logMessage() {
    fs.readFile("message.txt", { encoding: "utf8" }, (err, data) => {
        if (err) {
            console.log(err.message)
            return;
        }
        console.log(data);
    })
}



logMessage()



