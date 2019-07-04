/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />


RegisterCommand("e", (source, args) => {
    command = args.join(" ")
    console.log(`Executing: ${command}`)
    console.log(`Returned : ${eval(command)}`)
})

RegisterCommand("v", (source, args) => {

    let location = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 3, 0, 0)
    let heading = GetEntityHeading(PlayerPedId())
    let model = args[0]
    
    if (typeof(model) == 'undefined') {
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
    if (typeof(args[0]) == 'undefined') {
        exports.utils.getWeaponsList().forEach(element => {
            GiveWeaponToPed(ped,element,9999,false,false)
        })
    }else{
        GiveWeaponToPed(ped,args[0],9999)
    }
})