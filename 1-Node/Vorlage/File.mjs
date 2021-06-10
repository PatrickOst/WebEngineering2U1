import fs from 'fs';
 //pgr 2021
export function FileHandle(writer = console.log){
    let pFilename; // Kommentar eingefügt Git Test
    pFilename = 'Datum.txt';
    fs.writeFile('datum.txt',new Date().toLocaleString(), () =>{
        fs.readFile('datum.txt',(err, content)=>{
            fs.unlink('datum.txt', ()=>{
                writer(content);
            })
        })
    });

}