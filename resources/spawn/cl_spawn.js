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
    SwitchOutPlayer(ped,0,1)
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

exports('initialSpawn', (playerId, location) => {
    let ped = GetPlayerPed(playerId)
    DoScreenFadeOut(0)
    SetPlayerControl(playerId, false) // Disable controls, collisions and freeze position
    FreezeEntityPosition(ped, true)
    SetEntityCollision(ped, false)

    RequestCollisionAtCoord(location.x, location.y, location.z) // Load collisions
    SetEntityCoordsNoOffset(ped, location.x, location.y, location.z, false, false, false)// Teleport
    NetworkResurrectLocalPlayer(location.x, location.y, location.z, location.heading, true, false) //Resurect
    ClearPedTasksImmediately(ped)// Clean gamelogic

    SetEntityCollision(ped, true)// Enable collisions
    FreezeEntityPosition(ped, false) // Unfreeze

    SwitchOutPlayer(ped, 0, 2)
    let interval = setInterval(() => {
        if (GetPlayerSwitchState() == 5) {
            clearInterval(interval)
            DoScreenFadeIn(0)
            SetPlayerControl(playerId, true)
            SwitchInPlayer(ped)
        }
    },50)

})


RegisterCommand('spawn', (source, args) => {

    let location = {
        x: 0,
        y: 0,
        z: 0,
        heading: 0
    };

    location.x = parseInt(args[0])
    if (isNaN(location.x)) {
        //console.log("Error x value is not a number, defaulting to 0")
        location.x = 0
    }


    location.y = parseInt(args[1])
    if (isNaN(location.y)) {
        //console.log("Error y value is not a number, defaulting to 0")
        location.y = 0
    }



    location.z = parseInt(args[2])
    if (isNaN(location.z)) {
        //console.log("Error z value is not a number, defaulting to 0")
        location.z = 0
    }


    location.heading = parseInt(args[3])
    if (isNaN(location.heading)) {
        //console.log("Error heading value is not a number, defaulting to 0")
        location.heading = 0
    }

    console.log("Spawning with data :")
    console.log(location)

    exports.spawn.spawnPlayer(PlayerId(), location)
})
