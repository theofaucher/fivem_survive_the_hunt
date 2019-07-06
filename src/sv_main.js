/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />
import { huntersSpawnpoints } from './spawnpoints/hunters'
import { chasedSpawnpoints } from './spawnpoints/chased'
import { getPlayers } from './utils/sv_players'
let chased;
let hunters;

const huntersWeapons = [
    {
        hash: 'WEAPON_PUMPSHOTGUN',
        ammo: 3 * 8
    },
    {
        hash: 'WEAPON_PISTOL',
        ammo: 3 * 12
    },
    {
        hash: 'WEAPON_NIGHTSTICK',
        ammo: 1
    }
]

onNet('playerConnected', () => {

    console.log(`${GetPlayerName(source)} connected!`)

    let location = huntersSpawnpoints[Math.floor(Math.random() * huntersSpawnpoints.length)]
    emitNet('spawn', source, location) // Force player respawn
    emitNet('giveWeapons', source, huntersWeapons)

    emitNet('notify', -1, `~b~${GetPlayerName(source)}~s~ has connected`)


    if (GetNumPlayerIndices() >= GetConvarInt('min_players', 20)) {
        emit('startGame')
    } else {
        emitNet('notify', -1, `Game will start when ~b~${GetConvar('min_players')}~s~ players will be connected (~r~${GetConvar('min_players') - GetNumPlayerIndices()}~s~ to go)`)
    }
})

on('startGame', () => {
    let players = getPlayers()
    chased = players[Math.floor(Math.random() * players.length)]
    players.slice(players.indexOf(chased), 1)
    hunters = players

    console.log(`Game started, chased : ${GetPlayerName(chased)}`)

    emitNet('spawn', chased, chasedSpawnpoints[Math.floor(Math.random() * chasedSpawnpoints.length)])
    emitNet('giveWeapons',chased)
    emitNet('notify', chased, "The game started! you are ~r~chased~s~!~n~RUN!")



    hunters.forEach(hunter => {
        emitNet('notify', hunter, `The game started! Kill ~r~${GetPlayerName(chased)}~s~ to win!`)
    })

})