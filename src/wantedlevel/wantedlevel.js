/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />

import './../events/death.js'
import { Delay } from '../utils/wait.js';

let startTime = 0
let endTime = 0
let dateSubtraction = 0
let notificationContent
let Displayoftheremainingtimefor2stars 
let Displayoftheremainingtimefor3stars
let DisplayLesterCalledfor3stars
var lockDateTo2Wanted = false
var lockDateTo3Wanted = false

setInterval(async function () {

    if (!IsPlayerDead(PlayerId())) {

        if (GetPlayerWantedLevel(PlayerId()) >= 1) {

                await Delay(100)

                if (!GetPlayerWantedLevel(PlayerId()))
                {
                    
                    clearTick(Displayoftheremainingtimefor3stars);
                    clearTick(Displayoftheremainingtimefor2stars);
                    Displayoftheremainingtimefor3stars = undefined
                    Displayoftheremainingtimefor2stars = undefined
        
                    notificationContent = `Cancelled Lester call !`
        
                    SetNotificationTextEntry("STRING")
                    AddTextComponentString(notificationContent)
                    let notification = DrawNotification(true, true)
        
                    lockDateTo2Wanted = false
                    lockDateTo3Wanted = false
                    startTime = 0
                    endTime = 0
                    dateSubtraction = 0
        
                }
        

            if (GetPlayerWantedLevel(PlayerId()) == 2) {

                if (lockDateTo2Wanted == false) {
                    startTime = Date.now()
                    endTime = 0
                    lockDateTo2Wanted = true
                    dateSubtraction = 0

                }

                endTime = Date.now()
                dateSubtraction = Math.round((endTime - startTime) / 1000);

                console.log(dateSubtraction)

                notificationContent = `Calling Lester to clear your wanted level in ${60 - dateSubtraction} second(s)`

                if (typeof Displayoftheremainingtimefor2stars == 'undefined') {

                    Displayoftheremainingtimefor2stars = setTick(() => {

                        drawTxt(notificationContent, 4, 0.5, 0.17, 0.94)

                    })

                }

                if (dateSubtraction == 60) {

                    ClearPlayerWantedLevel(PlayerId())
                    clearTick(Displayoftheremainingtimefor2stars);
                    clearTick(Displayoftheremainingtimefor3stars);
                    Displayoftheremainingtimefor3stars = undefined
                    Displayoftheremainingtimefor2stars = undefined    
                    
                    notificationContent = `Lester called !`

                    SetNotificationTextEntry("STRING")
                    AddTextComponentString(notificationContent)
                    let notification = DrawNotification(true, true)

                    lockDateTo2Wanted = false
                    lockDateTo3Wanted = false
                    startTime = 0
                    endTime = 0
                    dateSubtraction = 0

                }

            }


            if (GetPlayerWantedLevel(PlayerId()) == 3) {

                if (lockDateTo3Wanted == false) {

                    startTime = Date.now()
                    endTime = 0
                    lockDateTo3Wanted = true
                    dateSubtraction = 0

                }

                endTime = Date.now()

                dateSubtraction = Math.round((endTime - startTime) / 1000);

                console.log(dateSubtraction)

                notificationContent = `Calling Lester to clear your wanted level in ${30 - dateSubtraction} second(s)`

                if (typeof Displayoftheremainingtimefor3stars == 'undefined') {

                    Displayoftheremainingtimefor3stars = setTick(() => {

                        drawTxt(notificationContent, 4, 0.5, 0.17, 0.94)

                    })

                }

                if (dateSubtraction == 30) {

                    ClearPlayerWantedLevel(PlayerId())
                    clearTick(Displayoftheremainingtimefor3stars);
                    clearTick(Displayoftheremainingtimefor2stars);
                    Displayoftheremainingtimefor3stars = undefined
                    Displayoftheremainingtimefor2stars = undefined

                    notificationContent = `Lester called !`

                    SetNotificationTextEntry("STRING")
                    AddTextComponentString(notificationContent)
                    let notification = DrawNotification(true, true)

                    lockDateTo2Wanted = false
                    lockDateTo3Wanted = false
                    startTime = 0
                    endTime = 0
                    dateSubtraction = 0

                }

            }

        }

        if (GetPlayerWantedLevel(PlayerId()) >= 4) {

            SetPlayerWantedLevel(PlayerId(), 3, 0)
            SetPlayerWantedLevelNow(PlayerId(), 0)

        }


    }

    if (IsPlayerDead(PlayerId())) {

        clearTick(Displayoftheremainingtimefor3stars);
        clearTick(Displayoftheremainingtimefor2stars);
        Displayoftheremainingtimefor3stars = undefined
        Displayoftheremainingtimefor2stars = undefined
        lockDateTo2Wanted = false
        lockDateTo3Wanted = false
        startTime = 0
        endTime = 0
        dateSubtraction = 0

    }

}, 500)

function drawTxt(content, font, scale, x, y) {
    SetTextFont(font)
    SetTextScale(scale, scale)
    SetTextColour(255, 255, 255, 255)
    SetTextEntry("STRING")
    SetTextDropShadow(0, 0, 0, 0, 255)
    SetTextDropShadow()
    SetTextEdge(4, 0, 0, 0, 255)
    SetTextOutline()
    AddTextComponentString(content)
    DrawText(x, y)
}