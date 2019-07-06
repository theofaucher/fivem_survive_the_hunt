/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />
import './../events/death.js'
import { Delay } from '../utils/wait'
let locksound = false
let tick

on('events:playerDied', async() => {

        console.log("Un joueur est mort")
        StartScreenEffect("DeathFailOut", 0, 0)

        if (locksound == false) {

                PlaySoundFrontend(-1, "Bed", "WastedSounds", 1)
                locksound = true

        }

        ShakeGameplayCam("DEATH_FAIL_IN_EFFECT_SHAKE", 1.0)
        const scaleform = RequestScaleformMovie("MP_BIG_MESSAGE_FREEMODE")

        while (!HasScaleformMovieLoaded(scaleform)) {await Delay(500)}
                
                tick = setTick(() => {
                        PushScaleformMovieFunction(scaleform, "SHOW_SHARD_WASTED_MP_MESSAGE")
                        BeginTextComponent("STRING")
                        AddTextComponentString("~r~wasted")
                        EndTextComponent()
                        PopScaleformMovieFunctionVoid()
                        DrawScaleformMovieFullscreen(scaleform, 255, 255, 255, 255)
                })

                PlaySoundFrontend(-1, "TextHit", "WastedSounds", 1)
    

})


on('events:playerAlive'), () => {

        console.log("Ca test")
        clearTick(tick);
        StopScreenEffect("DeathFailOut")
        locksound = false

}
