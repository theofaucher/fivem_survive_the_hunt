/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />

//GetPlayerWantedLevel
//ClearPlayerWantedLevel
 /*setInterval(function(){

    SetPlayerWantedLevel(PlayerId(), 4, 0)
    SetPlayerWantedLevelNow(PlayerId(), 0)
    console.log(GetPlayerWantedLevel())

}*/
import { Delay } from '../utils/wait'


let startTime = 0
let endTime = 0
var lockDateTo2Wanted = false
var lockDateTo3Wanted = false

setInterval(function(){
    
    if (GetPlayerWantedLevel() >= 2){

        if (GetPlayerWantedLevel() == 2){

          console.log("Au moins 2 etoiles")

            if ( lockDateTo2Wanted == false ){
                startTime = Date.now()
                endTime = 0
                lockDateTo2Wanted = true

            }
    
            endTime = Date.now()

            let test = new Date(endTime - startTime).toISOString().substr(11, 8)
            console.log(test)

                if (new Date(endTime - startTime).toISOString().substr(11, 8) == "00:01:00"){
                    
                    console.log("O yes 1")
                    ClearPlayerWantedLevel()
                    lockDateTo2Wanted = false
                    lockDateTo3Wanted = false
                    startTime = 0
                    endTime = 0

                }

        }


        if (GetPlayerWantedLevel() == 3){

            console.log("Au moins 3 etoiles")

            if ( lockDateTo3Wanted == false ){

                startTime = Date.now()
                endTime = 0
                lockDateTo3Wanted = true

            }
    
            endTime = Date.now()

            let test = new Date(endTime - startTime).toISOString().substr(11, 8)
            console.log(test)

                if (new Date(endTime - startTime).toISOString().substr(11, 8) == "00:00:30"){
                    
                    console.log("O yes 2")
                    ClearPlayerWantedLevel()
                    lockDateTo3Wanted = false
                    lockDateTo2Wanted = false
                    startTime = 0
                    endTime = 0

                }

        }

        }

        if (GetPlayerWantedLevel()>= 4){

            SetPlayerWantedLevel(PlayerId(), 3, 0)
            SetPlayerWantedLevelNow(PlayerId(), 0)
    
        }


},500)