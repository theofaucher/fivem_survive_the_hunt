import * as spawnLib from './spawn/spawn'
import './dev'

async function main (){
    ShutdownLoadingScreen()
    //await spawnLib.randomizePed(PlayerId())
    console.log('Spawning')
    await spawnLib.spawnPlayer(PlayerId(), {
        x: 0,
        y: 0,
        z: 71,
        heading: 0
    })
    console.log('Spawning END')
    //Enable PvP
    NetworkSetFriendlyFireOption(true)
    SetCanAttackFriendly(PlayerPedId(), true, true)
}

main()