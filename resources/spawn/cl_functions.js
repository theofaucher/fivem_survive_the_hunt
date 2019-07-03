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
            setTimeout(() => {
                SwitchInPlayer(ped)
            }, 2000)

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






/* exports('generateRandomPed', (playerId) => {
    let modelHash;
    if (exports.utils.getRandomIntInclusive(0, 1) == 1) {
        modelHash = 'mp_m_freemode_01'
    } else {
        modelHash = 'mp_f_freemode_01'
    }
    modelHash = 'mp_m_freemode_01'

    RequestModel(modelHash)

    let interval = setInterval(() => {
        if (HasModelLoaded(modelHash)) {
            clearInterval(interval)
            SetPlayerModel(playerId, modelHash)
            let pedId = PlayerPedId()
            //SetPedHeadBlendData(pedId, 0, exports.utils.getRandomArbitrary(0, 45), 0, exports.utils.getRandomArbitrary(0, 45), exports.utils.getRandomArbitrary(0, 5), exports.utils.getRandomArbitrary(0, 5), 1.0, 1.0, 1.0, false)
            SetPedHairColor(pedId, exports.utils.getRandomIntInclusive(0, 4), 1)

            if (IsPedMale(pedId)) {
                SetPedComponentVariation(pedId, 0, exports.utils.getRandomIntInclusive(0, 20), 0, 2)
                SetPedHeadBlendData(pedId, 0, exports.utils.getRandomArbitrary(0, 45), 0, exports.utils.getRandomArbitrary(0, 45), exports.utils.getRandomArbitrary(0, 5), exports.utils.getRandomArbitrary(0, 5), 1.0, 1.0, 1.0, false)
                SetPedComponentVariation(pedId, 2, exports.utils.getRandomIntInclusive(1, 17), 3, 2)
                SetPedComponentVariation(pedId, 3, 0, 0, 2)

                SetPedComponentVariation(pedId, 4, 1, exports.utils.getRandomIntInclusive(0, 15), 2)
                SetPedComponentVariation(pedId, 6, 3, exports.utils.getRandomIntInclusive(0, 15), 2)
                SetPedComponentVariation(pedId, 8, 0, 240, 0)
                SetPedComponentVariation(pedId, 10, 0, 0, 2)
                SetPedComponentVariation(pedId, 11, 0, exports.utils.getRandomIntInclusive(0, 5), 0)
            } else {
                SetPedComponentVariation(pedId, 0, 0, 0, 2)
                SetPedComponentVariation(pedId, 2, exports.utils.getRandomIntInclusive(1, 17), 3, 2)
                SetPedComponentVariation(pedId, 3, 0, 0, 2)
                SetPedComponentVariation(pedId, 4, 1, exports.utils.getRandomIntInclusive(2), 2)
                SetPedComponentVariation(pedId, 6, exports.utils.getRandomIntInclusive(0, 6), 0, 2)

                SetPedComponentVariation(pedId, 8, 2, 2, 2)
                SetPedComponentVariation(pedId, 10, 7, 0, 2)
                SetPedComponentVariation(pedId, 11, 0, 2, 2)
            }

            SetModelAsNoLongerNeeded(modelhash)



        }
    }, 100)
}) */

