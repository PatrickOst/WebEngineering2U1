export function Zahlen(von, bis, res){
    for (let i = von; i <= bis; i++) {
        res.write(i.toString() + "\n");
    }
    res.end();
}