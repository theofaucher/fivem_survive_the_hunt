/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />
import {huntersSpawnpoints} from './spawnpoints/hunters'

onNet('playerConnected', () => {
    console.log(`${GetPlayerName(source)} connected!`)

    let location = huntersSpawnpoints[Math.floor(Math.random() * huntersSpawnpoints.length)]
    emitNet('spawn',source,location) // Force player respawn
    emitNet('giveWeapons',source,[
        {
            hash:'WEAPON_PUMPSHOTGUN',
            ammo: 3*8
        },
        {
            hash:'WEAPON_PISTOL',
            ammo: 3*12
        }
    ])
    if (GetNumPlayerIndices() > GetConvarInt('min_players', 20)) {
        emit('startGame')
    }
})