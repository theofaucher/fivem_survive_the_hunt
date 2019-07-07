/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />

import './../events/death.js'



let startTime = 0
let endTime = 0
let dateSubtraction = 0
let notificationContent
let Displayoftheremainingtimefor2stars
let Displayoftheremainingtimefor3stars
var lockDateTo2Wanted = false
var lockDateTo3Wanted = false

setInterval(function () {

    if (!IsPlayerDead()){

        if (GetPlayerWantedLevel() >= 2) {

            if (GetPlayerWantedLevel() == 2) {

                if (lockDateTo2Wanted == false) {
                    startTime = Date.now()
                    endTime = 0
                    lockDateTo2Wanted = true
                    dateSubtraction = 0

                }

                endTime = Date.now()

                dateSubtraction = Math.round((endTime - startTime) / 1000);

                console.log(dateSubtraction)

                notificationContent = `In maximum ${60 - dateSubtraction} second(s), you no longer have the corps`

                Displayoftheremainingtimefor2stars = setTick(() => {

                    drawTxt(notificationContent, 4, 0.5, 0.5, 0.5)

                })

                if (dateSubtraction == 60) {

                    ClearPlayerWantedLevel()
                    clearTick(Displayoftheremainingtimefor2stars);
                    lockDateTo2Wanted = false
                    lockDateTo3Wanted = false
                    startTime = 0
                    endTime = 0
                    dateSubtraction = 0

                }

            }


            if (GetPlayerWantedLevel() == 3){
    
                if ( lockDateTo3Wanted == false ){
    
                    startTime = Date.now()
                    endTime = 0
                    lockDateTo3Wanted = true
                    dateSubtraction = 0
    
                }
        
                endTime = Date.now()
    
                dateSubtraction = Math.round((endTime - startTime)/1000);
    
                console.log(dateSubtraction)
    
                notificationContent = `In maximum ${30 - dateSubtraction} second(s), you no longer have the corps`

                Displayoftheremainingtimefor3stars = setTick(() => {

                    drawTxt(notificationContent, 4, 0.5, 0.5, 0.5)

                })
    
                    if (dateSubtraction == 30){
                        
                        ClearPlayerWantedLevel()
                        clearTick(Displayoftheremainingtimefor3stars);
                        lockDateTo2Wanted = false
                        lockDateTo3Wanted = false
                        startTime = 0
                        endTime = 0
                        dateSubtraction = 0
    
                    }
    
            }

        }

        if (GetPlayerWantedLevel() >= 4) {

            SetPlayerWantedLevel(PlayerId(), 3, 0)
            SetPlayerWantedLevelNow(PlayerId(), 0)

        }


    }

}, 500)

function drawTxt(content, font, scale, x, y){
    SetTextFont(font)
    SetTextScale(scale, scale)
    SetTextColour(255,255,255, 255)
    SetTextEntry("STRING")
    SetTextDropShadow(0, 0, 0, 0,255)
    SetTextDropShadow()
    SetTextEdge(4, 0, 0, 0, 255)
    SetTextOutline()
    AddTextComponentString(content)
    DrawText(x, y)
}