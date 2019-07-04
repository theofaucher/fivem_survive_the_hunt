/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />


exports('spawnPlayer', (playerId, location) => {
    let ped = GetPlayerPed(playerId)
    DoScreenFadeOut(500)
    let interval = setInterval(() => {
        if (IsScreenFadedOut()) {

            clearInterval(interval)
            SetPlayerControl(playerId, false) // Disable controls, collisions and freeze position
            FreezeEntityPosition(ped, true)
            SetEntityCollision(ped, false)

            RequestCollisionAtCoord(location.x, location.y, location.z) // Load collisions
            SetEntityCoordsNoOffset(ped, location.x, location.y, location.z, false, false, false)// Teleport
            NetworkResurrectLocalPlayer(location.x, location.y, location.z, location.heading, true, false) //Resurect
            ClearPedTasksImmediately(ped)// Clean gamelogic

            SetEntityCollision(ped, true)// Enable collisions
            FreezeEntityPosition(ped, false) // Unfreeze


            if (IsScreenFadedOut()) {
                DoScreenFadeIn(500)
                interval = setInterval(() => {
                    if (IsScreenFadedIn()) {
                        clearInterval(interval)
                        SetPlayerControl(playerId, true)
                    }
                }, 50)
            }
        }

    }, 50)


})


exports('spawnPlayerWithTransition', (playerId, location) => {
    let ped = GetPlayerPed(playerId)
    SwitchOutPlayer(ped, 0, 1)
    let interval = setInterval(() => {
        if (GetPlayerSwitchState() == 5) {

            clearInterval(interval)
            SetPlayerControl(playerId, false) // Disable controls, collisions and freeze position
            FreezeEntityPosition(ped, true)
            SetEntityCollision(ped, false)

            RequestCollisionAtCoord(location.x, location.y, location.z) // Load collisions
            SetEntityCoordsNoOffset(ped, location.x, location.y, location.z, false, false, false)// Teleport
            NetworkResurrectLocalPlayer(location.x, location.y, location.z, location.heading, true, false) //Resurect
            ClearPedTasksImmediately(ped)// Clean gamelogic

            SetEntityCollision(ped, true)// Enable collisions
            FreezeEntityPosition(ped, false) // Unfreeze



            SwitchInPlayer(ped)
            interval = setInterval(() => {
                if (IsPlayerSwitchInProgress()) {
                    clearInterval(interval)
                    SetPlayerControl(playerId, true)
                }
            }, 50)

        }

    }, 50)


})



exports('randomizePed', (playerId) => {
    let modelHash = exports.utils.getPedsList()[Math.floor(Math.random() * exports.utils.getPedsList().length)]

    RequestModel(modelHash)


    let interval = setInterval(() => {
        if (HasModelLoaded(modelHash)) {
            clearInterval(interval)
            SetPlayerModel(playerId, modelHash)
            SetModelAsNoLongerNeeded(modelHash)
        }
    }, 100)
})
