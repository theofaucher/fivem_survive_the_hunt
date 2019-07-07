import { isArray } from "util";

let blips = {
    chaseZone: {
        type: 'radius',
        colour: 26,
        alpha: 128,
        coords: [0, 0, 0],
        scale: 50
    },
    defaultBlip: {
        type: 'blip',
        coords: [45, 0, 0],
        sprite: 'radar_poi',
        name: 'TEST BLIP',
        category: 2,
        players: GetPlayerFromIndex(0),
    }
}

const defaultBlip = {
    type: 'blip',
    alpha: 256,
    coords: [0, 0, 0],
    sprite: 'radar_poi'
}

on('setBlip', (blipName, blip) => {
    Object.assign(blips[blipName], blip) // Update blip infos
    if (typeof blips[blipName].players !== 'undefined') {
        
        if (isArray(blips[blipName].players)) {
            blips[blipName].players.forEach(player => {
                emitNet('setBlip', player, blipName, blips[blipName])// Send them to the clients
            });
        }else{
            emitNet('setBlip', player, blipName, blips[blipName])// Send them to the clients
        }

    } else {
        emitNet('setBlip', -1, blipName, blips[blipName])// Send them to the clients
    }

})

on('removeBlip', (blipName) => {
    delete blips[blipName]
    emitNet('removeBlip', -1, blipName)// Send them to the clients
})

onNet('playerConnected', () => {
    let playerId = source

    Object.keys(blips).forEach(blipName => {
        if (typeof blips[blipName].players == 'undefined'){
            emitNet('setBlip', playerId, blipName, blips[blipName])
        }else if ((isArray(blips[blipName].players) && blips[blipName].players.includes(playerId)) ||  blips[blipName].players == playerId ){
            emitNet('setBlip', playerId, blipName, blips[blipName])
        }
        
    })

})