import fs, { existsSync } from 'fs';

class Path {
    constructor(path) {
        this.path = path;
    }

    checkType() {
        if (! existsSync(this.path)) {
            return "wrong path";
        } else {
            if (fs.lstatSync(this.path).isDirectory()) {
                return "folder";
            }
            if (fs.lstatSync(this.path).isFile()) {
                return "file";
            }
        }    
    }
    
    printFile() {
        if (fs.lstatSync(this.path).isFile()) {
            try {
                const data = fs.readFileSync(this.path, 'utf8');
                return(data);
            } catch (err) {
                return(err);
            }
        }
        return "path is not a file";
    }
    
}

// const path = new Path(process.argv[2]);
// console.log(path.checkType());
// console.log(path.printFile());


export {Path};
