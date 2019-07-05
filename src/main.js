import * as spawnLib from './spawn/spawn'
import './dev'

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
}

main()