/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

import './commands.js'
import { pedsList } from '../hashes/peds'
import { Delay } from '../utils/wait'

function spawn(playerId, location) {
    let ped = GetPlayerPed(playerId)
    FreezeEntityPosition(ped, true)
    SetEntityCollision(ped, false)

    RequestCollisionAtCoord(location.x, location.y, location.z) // Load collisions
    SetEntityCoordsNoOffset(ped, location.x, location.y, location.z, false, false, false)// Teleport
    NetworkResurrectLocalPlayer(location.x, location.y, location.z, location.heading, true, false) //Resurect
    ClearPedTasksImmediately(ped)// Clean gamelogic

    SetEntityCollision(ped, true)// Enable collisions
    FreezeEntityPosition(ped, false) // Unfreeze
}


export async function spawnPlayer(playerId, location, fadeDuration = 500) {

    DoScreenFadeOut(fadeDuration)
    while (!IsScreenFadedOut) {
        await Delay(100)
    }
    SetPlayerControl(playerId, false)
    spawn(playerId, location)

    DoScreenFadeIn(fadeDuration)
    while (!IsScreenFadedIn) {
        await Delay(100)
    }

    SetPlayerControl(playerId, true)

}


export function spawnPlayerWithTransition(playerId, location) {
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


}



export async function randomizePed(playerId) {
    let modelHash = pedsList[Math.floor(Math.random() * pedsList.length)]
    await setPed(playerId,modelHash)
    
}

export async function setPed(playerId,modelHash){
    console.log(`MODEL: ${modelHash}`)
    if (IsModelValid(modelHash) && IsModelAPed(modelHash)) {
        RequestModel(modelHash)
        while (!HasModelLoaded(modelHash)) {
            await Delay(100)
        }
        SetPlayerModel(playerId, modelHash)
        SetModelAsNoLongerNeeded(modelHash)

    }
}