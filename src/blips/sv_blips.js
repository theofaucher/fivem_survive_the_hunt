import { isArray } from "util";

let blips = {
}

let blipsIntervals = {

}

const defaultBlip = {
    type: 'blip',
    alpha: 256,
    coords: [0, 0, 0],
    sprite: 'radar_poi'
}

export function setBlip(blipName, blip){
    if ( typeof blips[blipName] == 'undefined' ) blips[blipName] = {}
    Object.assign(blips[blipName], blip) // Update blip infos

    if (blips[blipName].shrink == true && typeof blipsIntervals[blipName] == 'undefined' ){
        blipsIntervals[blipName] = setInterval(()=>{
            if (blips[blipName].scale > 0)blips[blipName].scale -= blips[blipName].shrinkSpeed / 100
        },10)
    }



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

}

export function removeBlip(blipName){
    delete blips[blipName]
    emitNet('removeBlip', -1, blipName)// Send them to the clients
}

export function getBlipInfo(blipName){
    return blips[blipName]
}

export function getBlips(){
    return blips.keys
}



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