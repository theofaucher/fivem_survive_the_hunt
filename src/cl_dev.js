/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />
import { WeaponsList } from './hashes/weapons'
import { spawnPlayerWithTransition, spawnPlayer, randomizePed, setPed } from './utils/spawn'
import { Delay } from './utils/wait';
import {huntersSpawnpoints } from './spawnpoints/hunters'
RegisterCommand("e", (source, args) => {
    let command = args.join(" ")
    console.log(`Executing: ${command}`)
    console.log(`Returned : ${eval(command)}`)
})

RegisterCommand("v", (source, args) => {

    let location = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 3, 0, 0)
    let heading = GetEntityHeading(PlayerPedId())
    let model = args[0]

    if (typeof (model) == 'undefined') {
        model = 't20'
    }

    if (IsModelAVehicle(model)) {

        RequestModel(model)


        let interval = setInterval(() => {
            if (HasModelLoaded(model)) {
                clearInterval(interval)
                let vehicle = CreateVehicle(model, location[0], location[1], location[2], heading, true, false)
                SetVehicleNeedsToBeHotwired(vehicle, false)
                SetVehicleColours(vehicle, 120, 135)
                SetModelAsNoLongerNeeded(model)
            }
        }, 100)


    }

})

RegisterCommand('w', (source, args) => {
    let ped = PlayerPedId()
    if (typeof (args[0]) == 'undefined') {
        WeaponsList.forEach(element => {
            GiveWeaponToPed(ped, element, 9999, false, false)
        })
    } else {
        GiveWeaponToPed(ped, args[0], 9999)
    }
})

RegisterCommand('spawn', (source, args) => {

    if (typeof (args[0]) !== 'undefined') {
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
        spawnPlayer(PlayerId(), location)
    } else {
        spawnPlayer(PlayerId())
    }

})

RegisterCommand('spawnT', (source, args) => {

    if (typeof (args[0]) !== 'undefined') {
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
        spawnPlayerWithTransition(PlayerId(), location)
    } else {
        spawnPlayerWithTransition(PlayerId())
    }

})

RegisterCommand('chped', (source, args) => {
    if (typeof (args[0]) == 'undefined') {
        randomizePed(PlayerId())
    } else {
        setPed(PlayerId(), args[0])
    }
})

RegisterCommand('nightvision', () => {
    SetNightvision(!IsNightvisionActive())
})

RegisterCommand('tpw', async () => {

    if (IsWaypointActive()) {
        let waypointCoord = GetBlipCoords(GetFirstBlipInfoId(8))

        DoScreenFadeOut(500)
        SetPlayerControl(PlayerId(), false)
        while (!IsScreenFadedOut()) {
            await Delay(100)
        }
        StartPlayerTeleport(PlayerId(), waypointCoord[0], waypointCoord[1], -400, 0)
        while (!HasPlayerTeleportFinished()) {
            await Delay(100)
        }
        DoScreenFadeIn(500)
        while (!IsScreenFadedIn()) {
            await Delay(100)
        }
        SetPlayerControl(PlayerId(), true)
    }
})

RegisterCommand('gl', ()=>{
    let location = GetEntityCoords(PlayerPedId())
    let heading = GetEntityHeading(PlayerPedId())
    console.log(`x: ${location[0]} | y: ${location[1]} | z: ${location[2]} | h : ${heading}`)
})

RegisterCommand('rs', ()=>{
    let location = huntersSpawnpoints[Math.floor(Math.random() * huntersSpawnpoints.length)]
    spawnPlayer(PlayerId(), location)
})