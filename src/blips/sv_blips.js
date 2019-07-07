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
        category: 2
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
    emitNet('setBlip', -1, blipName, blip)// Send them to the clients
})

on('removeBlip', (blipName) => {
    delete blips[blipName]
    emitNet('setBlip', -1, blipName, blip)// Send them to the clients
})

onNet('playerConnected', () => {
    let playerId = GetPlayerFromIndex(0)

    Object.keys(blips).forEach(blipName => {
        emitNet('setBlip', playerId, blipName, blips[blipName])
    })

})