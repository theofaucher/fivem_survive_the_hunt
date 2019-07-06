/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />
import { huntersSpawnpoints } from './spawnpoints/hunters'
import { chasedSpawnpoints } from './spawnpoints/chased'
import { getPlayers } from './utils/sv_players'
import { Delay } from './utils/wait'
let chased;
let hunters = [];
let isGameStarted = false;

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
    let hunters = getPlayers()

    let rand = Math.floor(Math.random() * hunters.length)

    chased = hunters[rand]
    hunters.splice(rand, 1)


    console.log(hunters)

    console.log(`Game started, chased : ${GetPlayerName(chased)}`)

    emitNet('spawn', chased, chasedSpawnpoints[Math.floor(Math.random() * chasedSpawnpoints.length)], true)
    emitNet('giveWeapons', chased)
    emitNet('notify', chased, "The game started! you are ~r~chased~s~!~n~RUN!")


    let locations = huntersSpawnpoints
    hunters.forEach(hunter => {
        let locationIdx = Math.floor(Math.random() * locations.length)
        emitNet('spawn', hunter, locations[locationIdx])
        locations.splice(locationIdx, 1)
        emitNet('giveWeapons', huntersWeapons, true)
        emitNet('notify', hunter, `The game started! Kill ~r~${GetPlayerName(chased)}~s~ to win!`)
    })
    isGameStarted = true

})

onNet('events:playerDied', async () => {
    emitNet('notify', -1, `~r~${GetPlayerName(source)}~s~ died`)
    if (isGameStarted) {
        if (hunters.includes(source)) {
            hunters.splice(hunters.indexOf(source), 1)
            if (hunters.length > 0) {
                emitNet('notify', -1, `~r~${hunters.length}~s~ hunters left`)
            } else {
                emit('gameEnd')
            }
        }

        if (source == chased) {
            emit('gameEnd')
        }

    } else {
        await Delay(5000)
        emitNet('spawn', source, huntersSpawnpoints[Math.floor(Math.random() * huntersSpawnpoints.length)])
    }
})