// prints out files in given directory
// for .txt files displays their content right-aligned
// for other files shows their file-system permissions
import { promisify } from 'util';
import { resolve, extname } from 'path';
import fs from 'fs';
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

class Files {
    constructor(dir_name) {
        this.dir_name = dir_name;
    }

    async getFiles() {
        const subdirs = await readdir(this.dir_name);
        const files = await Promise.all(subdirs.map(async (subdir) => {
            const res = resolve(this.dir_name, subdir);
            return (await stat(res)).isDirectory() ? new Files(res).getFiles() : res;
        }));
        let red_files = files.reduce((a, f) => a.concat(f), []);
        return red_files;
    }

    recursively() {
        let found_files = [];
        this.getFiles()
            .then(files => {console.log(files); found_files = files})
            .catch(e => console.error(e));
        return found_files;
    }

    right() {  // dla plikow tekstowych
        if (extname(this.dir_name) != ".txt") {
            return [];
        }

        let split_content = [];
        let N = 60;
        let line = "";
        let index = 0;
        let word = "";

        try {
            const file_content = fs.readFileSync(this.dir_name, 'utf8');
            while (index < file_content.length) {
                while (line.length + word.length + 1 < N && index < file_content.length) {
                    if (file_content[index] == " " || file_content[index] == "\n") {
                        if (word.length > 0)
                            line = line.concat(" ");
                        line = line.concat(word);
                        word = "";
                    } else { 
                        word = word.concat(file_content[index]);
                    }
                    index++;
                }

                if (line.length > 0) {
                    let spaces = "";
                    for (let j=0; j<N-line.length; j++) {
                        spaces = spaces.concat(" ");
                    }
                    spaces = spaces.concat(line);
                    split_content.push(spaces);
                    line = "";
                } else {
                    line = line.concat(word);
                    split_content.push(line);
                    line = "";
                    word = "";
                }
            }
          } catch (err) {
            console.error(err);
          }

        return split_content;
    } 

    info() {  // dla plikow binarnych - uid i prawa dostępu
        if (extname(this.dir_name) == ".txt") {
            return "";
        }
        return fs.lstatSync(this.dir_name).uid + " " + (fs.lstatSync(this.dir_name).mode & parseInt ("777", 8));
    }
}


/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
*/
function requestListener(request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object

    if (url.pathname == '/submit') { // Processing the form content, if the relative URL is '/submit'
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        if (request.method == 'GET') {// If the GET method was used to send data to the server
            let dir = new Files(url.searchParams.get('name'));

            let f = [];
            dir.getFiles()
                .then(files => {
                    f = files;
                    for (let i=0; i<f.length; i++) {
                        response.write(f[i] + "\n"); 
                        let s = new Files(f[i]).right();
                        for (let j=0; j<s.length; j++)
                            response.write(s[j] + "\n");
                        response.write(new Files(f[i]).info() + "\n");
                    }
                })
                .finally(() => {response.end();})
                .catch(e => console.error(e)); 
                
        } else {
            response.write(`This application does not support the ${request.method} method`);
            response.end();

        }
    } else { // Generating the form
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(`<form method="GET" action="/submit">
                            <label for="name">directory name:</label>
                            <input name="name">
                            <br>
                            <input type="submit">
                            <input type="reset">
                        </form>`);

        response.end();
    }
}


/* ************************************************** */
/* Main block
/* ************************************************** */
// var http = require("http");
import http from 'http';
import { exit } from 'process';

var server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8080);
console.log("The server was started on port 8080");
console.log("To stop the server, press 'CTRL + C'");
