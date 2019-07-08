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

onNet('notify', async (text) => {
    while (!IsScreenFadedIn()){
        await Delay(1000)
    }
    SetNotificationTextEntry("STRING")
    AddTextComponentString(text)
    let notification = DrawNotification(true, true)

})