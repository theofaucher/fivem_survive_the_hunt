/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

import * as spawnLib from './utils/spawn'
import { WeaponsList } from './hashes/weapons'

async function main() {
    ShutdownLoadingScreen()
    await spawnLib.randomizePed(PlayerId())
    /*await spawnLib.spawnPlayer(PlayerId(), {
        x: 0,
        y: 0,
        z: 71,
        heading: 0
    })*/
    //Enable PvP
    NetworkSetFriendlyFireOption(true)
    SetCanAttackFriendly(PlayerPedId(), true, true)
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

onNet('giveWeapons', (weapons) => {
    let ped = PlayerPedId()

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