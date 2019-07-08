/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

import * as spawnLib from './utils/spawn'
import { WeaponsList } from './hashes/weapons'
import { Delay } from './utils/wait';
async function main() {
    DoScreenFadeOut(0)
    
    await spawnLib.randomizePed(PlayerId()) // Change Skin

    RequestCollisionAtCoord(0, 0, 0) // Load collisions
    //SetEntityCoordsNoOffset(GetPlayerPed(), 0, 0, 0, false, false, false) //Initial Position ( game doesn't work if you dont have one)
    SetEntityCoords(PlayerPedId(),0,0,0,false,false,false,false)

    NetworkSetFriendlyFireOption(true)//PvP
    SetCanAttackFriendly(PlayerPedId(), true, true)

    SetAutoGiveParachuteWhenEnterPlane(PlayerId(),true)

    ShutdownLoadingScreen()
    emitNet('playerConnected')
}

main()

onNet('spawn', (location, enableTransition = false) => {
    if (enableTransition) {
        spawnLib.spawnPlayerWithTransition(PlayerId(), location)
    } else {
        spawnLib.spawnPlayer(PlayerId(), location)
    }
})

onNet('giveWeapons', (weapons, clearWeapons=false) => {
    let ped = PlayerPedId()
    if(clearWeapons){
        RemoveAllPedWeapons(ped)
    }
    
    if (typeof (weapons) == 'undefined') {
        WeaponsList.forEach(element => {
            GiveWeaponToPed(ped, element, 9999, false, false)
        })
    } else {
        weapons.forEach(weapon => {
            GiveWeaponToPed(ped, weapon.hash, weapon.ammo)
        })
    }
})

onNet('clearMap', (x=0,y=0,z=0,radius=10000)=>{
    ClearAreaOfEverything(x,y,z,radius)
})

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



