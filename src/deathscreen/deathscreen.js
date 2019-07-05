//<reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />
import  './../events/death.js'
let locksound = false

on('event:playerDied', (playerDead) => {

        console.log("Un joueur est mort")
        StartScreenEffect("DeathFailOut", 0, 0)

                if (locksound == false)
                {

                        PlaySoundFrontend(-1, "Bed", "WastedSounds", 1)
                        locksound = true

                }

                ShakeGameplayCam("DEATH_FAIL_IN_EFFECT_SHAKE", 1.0)
                const scaleform = RequestScaleformMovie("MP_BIG_MESSAGE_FREEMODE")

                if (HasScaleformMovieLoaded(scaleform))
                {

                        PushScaleformMovieFunction(scaleform, "SHOW_SHARD_WASTED_MP_MESSAGE")
                        BeginTextComponent("STRING")
                        AddTextComponentString("~r~wasted")
                        EndTextComponent()
                        PopScaleformMovieFunctionVoid()

                        setTimeout(function(){
                                PlaySoundFrontend(-1, "TextHit", "WastedSounds", 1)

                                on('event:playerDied', (playerDead) => {
                                        DrawScaleformMovieFullscreen(scaleform, 255, 255, 255, 255)

                                })

                           },500);

                        StopScreenEffect("DeathFailOut")
                        locksound = false

                }

})