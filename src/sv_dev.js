/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />
const fs = require('fs')

RegisterCommand('pos',(source, args, raw) =>{
    let ped = GetPlayerPed(source)
    let coords = GetEntityCoords(ped, false)
    let heading = GetEntityHeading(ped)
    let essai = `\n {\n    "x": ${coords[0]},\n    "y": ${coords[1]},\n    "z": ${coords[2]},\n    "heading" : ${heading}\n},`
    console.log(essai)
    fs.writeFile('spawnhunters.txt', essai , (err) => {});
    //fs.close();
})

/*function fonction() , async =>{


}
*/