let blips = {}

import { blipsSprites } from '../hashes/blips'

function SetBlip(blip) {
    switch (blip.type) {
        case 'radius':
            if (typeof blip.id == 'undefined') {
                blip.id = AddBlipForRadius(0, 0, 0, 0)
            }

            if (blip.shrink && typeof blip.shrinkInterval == 'undefined'){
                blip.shrinkInterval = setInterval(()=>{
                    blip.scale -= blip.shrinkSpeed / 10
                    SetBlipScale(blip.id,blip.scale)
                },100)
            }

            break;
        case 'blip':
            if (typeof blip.id == 'undefined') {
                blip.id = AddBlipForCoord(0, 0, 0)
            }
            if (typeof blip.sprite !== 'undefined') {
                SetBlipSprite(blip.id, blipsSprites[blip.sprite])
            }

            break;

        default:
            if (typeof blip.id == 'undefined') {
                blip.id = AddBlipForCoord(0, 0, 0)
            }
            if (typeof blip.sprite !== 'undefined') {
                SetBlipSprite(blip.id, blipsSprites[blip.sprite])
            }
            break;
    }

    if (typeof blip.scale !== 'undefined') {
        SetBlipScale(blip.id, blip.scale)
    }

    if (typeof blip.coords !== 'undefined') {
        SetBlipCoords(blip.id, blip.coords[0], blip.coords[1], blip.coords[2])
    }

    if (typeof blip.colour !== 'undefined') {
        SetBlipColour(blip.id, blip.colour)
    }

    if (typeof blip.alpha !== 'undefined') {
        SetBlipAlpha(blip.id, blip.alpha)
    }

    if (typeof blip.name !== 'undefined') {
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString(blip.name)
        EndTextCommandSetBlipName(blip.id)
    }

    if (typeof blip.category !== 'undefined') {
        SetBlipCategory(blip.id, blip.category)
    }

    if (typeof blip.route !== 'undefined') {
        SetBlipRoute(blip.id, blip.route)
    }


}

onNet('setBlip', (blipName, blip) => {
    try {
        if (typeof (blips[blipName]) == 'undefined') blips[blipName] = {}
        Object.assign(blips[blipName], blip) // Update blip infos
        SetBlip(blips[blipName]) //Apply them
    } catch (e) {
        console.log(e)
    }

})

onNet('removeBlip', (blipName) => {
    if (typeof (blips[blipName]) !== 'undefined') {
        if ( typeof blips[blipName].shrinkInterval != 'undefined'){
            clearInterval(blips[blipName].shrinkInterval)
        }
        RemoveBlip(blips[blipName].id)
        delete blips[blipName]
    }
})
