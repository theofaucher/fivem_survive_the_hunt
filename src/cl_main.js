/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

import * as spawnLib from './utils/spawn'

async function main (){
    ShutdownLoadingScreen()
    await spawnLib.randomizePed(PlayerId())
    await spawnLib.spawnPlayer(PlayerId(), {
        x: 0,
        y: 0,
        z: 71,
        heading: 0
    })
    //Enable PvP
    NetworkSetFriendlyFireOption(true)
    SetCanAttackFriendly(PlayerPedId(), true, true)
    emitNet('playerConnected')
}

main()