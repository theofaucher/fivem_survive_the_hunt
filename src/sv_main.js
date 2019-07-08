/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />
import { huntersSpawnpoints } from './spawnpoints/hunters'
import { chasedSpawnpoints } from './spawnpoints/chased'
import { getPlayers } from './utils/sv_players'
import { Delay } from './utils/wait'
import { getRandomArbitrary } from './utils/random'
import './blips/sv_blips'
let chased;
let hunters = [];
let isGameStarted = false;
let startTime;
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

let huntersHQ = huntersSpawnpoints.lifeinvader
huntersHQ.blip = {
    type: 'blip',
    coords: huntersHQ.location,
    name: 'Hunters HQ',
    sprite: 'radar_rampage',
    colour: 1
}
emit('setBlip', 'huntersHQ', huntersHQ.blip)

let zoneInterval
let zoneLastChanged
let zoneBlip = {
    type: 'radius',
    alpha: 128,
    coords: [0, 0, 0],
    scale: 1000,
    colour: 26,
}

let config = {} // Configuration, will contain the configuration of the gamemode from the convars

onNet('playerConnected', () => { // Triggered when a player has finished loading
    let playerId = source
    console.log(`${GetPlayerName(playerId)} connected!`)
    emitNet('notify', -1, `~b~${GetPlayerName(playerId)}~s~ has connected`)

    if (!isGameStarted) {
        if (GetNumPlayerIndices() >= config.min_players) { // enough players to start a game 
            emit('startGame')
        } else {
            let location = huntersHQ.spawnpoints[Math.floor(Math.random() * huntersHQ.spawnpoints.length)] //Get a random spawn point
            emitNet('spawn', playerId, location) // Force player respawn
            emitNet('giveWeapons', playerId, huntersWeapons, true) // Give weapons 
            emitNet('notify', -1, `Game will start when ~b~${config.min_players}~s~ players will be connected (~r~${config.min_players - GetNumPlayerIndices()}~s~ to go)`) // Notify everyone 
        }

    } else {
        hunters.push(playerId)
        emit('notify', `${GetPlayerName(playerId)} joined the ~r~hunters`)
        let location = huntersHQ.spawnpoints[Math.floor(Math.random() * huntersHQ.spawnpoints.length)] //Get a random spawn point
        emitNet('spawn', playerId, location) // Force player respawn
        emitNet('notify', playerId, `The game started! Kill ~b~${GetPlayerName(chased)}~s~ to win!`) //Notify ( to improve 
        emitNet('giveWeapons', playerId, huntersWeapons, true) // Give weapons 
    }

})

on('playerDropped', (reason) => {
    let playerId = source
    console.log(`${GetPlayerName(source)} disconnected :  ${reason}`)
    emitNet('notify', -1, `${GetPlayerName(source)} disconnected`)
    if (isGameStarted) {
        playerQuittedTheGame(playerId, reason)
    }
})

on('startGame', () => {
    if (!isGameStarted) { // Check if there is not a game running
        hunters = getPlayers()

        let rand = Math.floor(Math.random() * hunters.length) // Take a random player 

        chased = hunters[rand] // The random player is the chased
        hunters.splice(rand, 1) // Remove the chased from the hunters

        console.log(`Game started, chased : ${GetPlayerName(chased)}`)
        emitNet('clearMap', -1, huntersHQ.location[0], huntersHQ.location[1], huntersHQ.location[2], 500)

        emitNet('spawn', chased, chasedSpawnpoints[Math.floor(Math.random() * chasedSpawnpoints.length)], true) //Spawn the chased
        emitNet('giveWeapons', chased) //Give him all weapons
        emitNet('notify', chased, "The game started! you are ~b~chased~s~!") //Notify the chased ( to improve )


        let locations = huntersHQ.spawnpoints
        hunters.forEach(hunter => { //Respawn all the hunters 
            let locationIdx = Math.floor(Math.random() * locations.length) // Get a random spawnpoint 
            emitNet('spawn', hunter, locations[locationIdx])
            locations.splice(locationIdx, 1) //Remove the spawnpoint from the list ( prevent player spawning in each other)
            emitNet('giveWeapons', hunter, huntersWeapons, true) // Give hunters weapons and clear all weapons
            emitNet('notify', hunter, `The game started! Kill ~b~${GetPlayerName(chased)}~s~ to win!`) //Notify ( to improve )
        })
        isGameStarted = true // Set game as started 
        startTime = Date.now() // Game Start time 
        zoneLastChanged = Date.now()
        zoneInterval = setInterval(() => { //zone updater
            if ((Date.now() - zoneLastChanged) / 1000 > config.zoneDelayBetweenChanges) { // check if zone must be updated
                try {
                    zoneLastChanged = Date.now() // set last change to now
                    let chasedCoords = GetEntityCoords(GetPlayerPed(chased))
                    let dist = Math.sqrt((chasedCoords[0] - zoneBlip.coords[0]) ** 2 + (chasedCoords[1] - zoneBlip.coords[1]) ** 2) // distance between chased and zone center
                    if (dist > zoneBlip.scale) { // if out of zone 
                        zoneBlip.scale = config.maxZoneScale // reset sone to max scale
                    } else if (zoneBlip.scale > config.zoneScaleStep) zoneBlip.scale -= config.zoneScaleStep // else shrink zone
                    zoneBlip.coords[0] = chasedCoords[0] + zoneBlip.scale * getRandomArbitrary(-0.7, 0.7) // get new x coords for zone
                    zoneBlip.coords[1] = chasedCoords[1] + zoneBlip.scale * getRandomArbitrary(-0.7, 0.7) // get new y coords for zone
                    emit('setBlip', 'chasedZone', zoneBlip) // update zone 
                } catch (e) { console.log(e) }
            }
        }, 500)

    }
})

onNet('events:playerDied', async () => { //player died
    let playerId = source
    emitNet('notify', -1, `${GetPlayerName(playerId)} died`) //notify

    if (isGameStarted) { // ingame

        playerQuittedTheGame(playerId)

    } else { // in "lobby"
        console.log(`${GetPlayerName(playerId)} died`)
        await Delay(5000) // wait 5 sec 
        let locationIdx = Math.floor(Math.random() * huntersHQ.spawnpoints.length) // select spawn
        emitNet('spawn', playerId, huntersHQ.spawnpoints[locationIdx]) // respawn 
    }
})

on('gameEnd', (huntersWon) => { // game ended

    isGameStarted = false // set game to false 
    clearInterval(zoneInterval) // stop zone interval
    emit('removeBlip', 'chasedZone') // remove zone blip

    let locations = huntersHQ.spawnpoints
    let timeSurvived = new Date(Date.now() - startTime)

    getPlayers().forEach(player => { // respawn players
        let locationIdx = Math.floor(Math.random() * locations.length)
        emitNet('spawn', player, locations[locationIdx])
        locations.splice(locationIdx, 1)
        emitNet('giveWeapons', player, huntersWeapons, true)
    })

    if (huntersWon) { //notify 
        emitNet('notify', -1, `~b~${GetPlayerName(chased)}~s~ survived ${timeSurvived.toISOString().substr(11, 8)}`) // hunters win
    } else {
        emitNet('notify', -1, `~r~Hunters~s~ were so bad that ~b~${GetPlayerName(chased)}~s~ managed to kill them all!`) // chased win
    }

})

function updateConfig() { // get config from server cfgs ( normally : survive_the_hunt.cfg  )
    config.min_players = GetConvarInt('min_players', 20)
    config.maxZoneScale = GetConvarInt('maxZoneSize', 1000)
    config.zoneDelayBetweenChanges = GetConvarInt('zoneDelayBetweenChanges', 60)
    config.zoneScaleStep = GetConvarInt('zoneScaleStep', 100)
}
updateConfig()
setInterval(updateConfig, 1000) // update every second

async function playerQuittedTheGame(playerId, reason = 'died') {
    if (isGameStarted) {
        if (hunters.includes(playerId.toString())) { // is a hunter 

            hunters.splice(hunters.indexOf(playerId), 1) // remove from hunters

            if (hunters.length > 0) { // there are hunters still in game
                emitNet('notify', -1, `~r~${GetPlayerName(playerId)}~s~ ${reason} ~r~${hunters.length}~s~ hunters left`)
            } else { // no hunter left
                await Delay(5000)
                emit('gameEnd', false) // endgame, hunters loose
            }

        }

        if (playerId == chased) { // chased died
            await Delay(5000)
            emit('gameEnd', true) // hunters win 
        }
    }
}