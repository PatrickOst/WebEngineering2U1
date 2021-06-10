import fs from 'fs';

export function handleFile(writer = console.log) {
    fs.writeFile('datum.txt', new Date().toLocaleString(),  () => {
        fs.readFile('datum.txt',  (err, content) => {
            fs.unlink('datum.txt', () =>{
                writer(content);
            })
        });
    });
}
