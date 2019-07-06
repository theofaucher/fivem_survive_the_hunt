/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

import { pedsList } from '../hashes/peds'
import { Delay } from './wait'

const defaultLocation = {
    x: 0,
    y: 0,
    z: 70,
    heading: 0,
}

async function spawn(playerId, location = defaultLocation) {
    let ped = GetPlayerPed(playerId)
    FreezeEntityPosition(ped, true)
    SetEntityCollision(ped, false)

    RequestCollisionAtCoord(location.x, location.y, location.z) // Load collisions
    StartPlayerTeleport(PlayerId(), location.x, location.y, location.z, location.heading)
    while (IsPlayerTeleportActive()) {
        await Delay(100)
    }// Teleport
    NetworkResurrectLocalPlayer(location.x, location.y, location.z, location.heading, true, false) //Resurect
    ClearPedTasksImmediately(ped)// Clean gamelogic

    SetEntityCollision(ped, true)// Enable collisions
    FreezeEntityPosition(ped, false) // Unfreeze
}

export async function spawnPlayer(playerId, location, fadeDuration = 500) {

    DoScreenFadeOut(fadeDuration)
    while (!IsScreenFadedOut()) {
        await Delay(100)
    }
    SetPlayerControl(playerId, false)
    await spawn(playerId, location)

    DoScreenFadeIn(fadeDuration)
    while (!IsScreenFadedIn()) {
        await Delay(100)
    }

    SetPlayerControl(playerId, true)

}

export async function spawnPlayerWithTransition(playerId, location) {
    let ped = GetPlayerPed(playerId)

    SetPlayerControl(playerId, false)
    SwitchOutPlayer(ped, 0, 1)

    while (GetPlayerSwitchState() !== 5) {
        await Delay(100)
    }

    await spawn(playerId, location)
    SwitchInPlayer(ped)

    while (IsPlayerSwitchInProgress()) {
        await Delay(100)
    }
    SetPlayerControl(playerId, true)

}

export async function randomizePed(playerId) {
    let modelHash = pedsList[Math.floor(Math.random() * pedsList.length)]
    await setPed(playerId, modelHash)

}

export async function setPed(playerId, modelHash) {
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