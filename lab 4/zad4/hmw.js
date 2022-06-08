const fs = require('fs');
const util = require('util');

let form = document.forms["path_form"];
let output = document.getElementById("result");
document.getElementById("check").addEventListener("click", check);
window.alert("ok");

function check() {
    let path = form.elements["path"].value;
    let message = document.createElement("p");
    let isfile = true;

    fs.stat(path, (err, stats) => {
        if(! err ){
            isfile = (stats.isFile());
        }
    });

    if (! isfile) {
        let type = document.createTextNode("folder");
        message.appendChild(type);
    }
    if (isfile) {
        let type = document.createTextNode("file");
        message.appendChild(type);
        
        getStuff(path).then(data => {
            let text = createTextNode(data);
            message.appendChild(text);
        })
    }  

    output.appendChild(message);
};

const readFile = util.promisify(fs.readFile);

function getStuff(path) {
    return readFile(path);
}

