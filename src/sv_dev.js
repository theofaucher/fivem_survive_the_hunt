/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />
/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />
import * as fs from 'fs';
import {dirname} from 'path';

onNet('savePos', (listName, position) => {
    let player = source

    let listFilePath = "./positions/" + listName + ".json"

    fs.existsSync(dirname(listFilePath)) || fs.mkdirSync(dirname(listFilePath), { recursive: true });

    let positions = []

    if (fs.existsSync(listFilePath)) positions = JSON.parse(fs.readFileSync(listFilePath))

    positions.push(position)
    fs.writeFileSync(listFilePath, JSON.stringify(positions))

    emitNet('notify', player, `Position saved to ~b~${listFilePath}~s~, it now contains ~b~${positions.length}~s~ positions`)
    console.log(`${GetPlayerName(player)} added position ${position.x},${position.y},${position.z},${position.heading} to ${listFilePath}`)
})