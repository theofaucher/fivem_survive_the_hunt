/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />

import {getPlayers} from './utils/sv_players'

RegisterCommand('list',()=>{
    console.log(`Connected players: ${GetNumPlayerIndices()}/${GetConvar('sv_maxClients')}`)
    getPlayers().forEach(player => {
        console.log(`${player} : ${GetPlayerName(player)}`)
    });
})

RegisterCommand('startGame',()=>{
    emit('startGame')
})

RegisterCommand('rr', ()=>{
    ExecuteCommand('refresh')
    ExecuteCommand('ensure init')
})

RegisterCommand('pos',(source, args, raw)=>{
    let ped = GetPlayerPed(source)
    let coords = GetEntityCoords(ped, false)
    let heading = GetEntityHeading(ped)
    console.log(`x: ${coords[0]} | y: ${coords[1]} | z: ${coords[2]} | h : ${heading}`)
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var s = fso.CreateTextFile("../spawnpoints/spawnhunter", true);
    s.WriteLine(`x: ${coords[0]} | y: ${coords[1]} | z: ${coords[2]} | h : ${heading}`);
    s.Close();
})
