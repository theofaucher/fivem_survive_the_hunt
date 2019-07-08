let countdowns = {
    wantedCountdown: {
        text: function (timeLeft) {
            return `Some random time with ~r~${timeLeft}~s~ seconds left:`
        },
        startTime: Date.now(),
        endTime: Date.now() + 20 * 1000,
        font: 0,
        size: 1,
        colour: [255, 255, 255, 255],
        clearWhenEnded: true,
        decimals: 1
    },
}

setTick(() => {
    let y = 0.94
    Object.keys(countdowns).forEach(countdown => {
        let timeLeft = (countdowns[countdown].endTime - Date.now()) / 1000
        if (countdowns[countdown].clearWhenEnded !== undefined && countdowns[countdown].clearWhenEnded && timeLeft <= 0) {
            delete countdowns[countdown]
            return
        }
        BeginTextCommandDisplayText("STRING")
        if (countdowns[countdown].font !== undefined) SetTextFont(countdowns[countdown].font)
        if (countdowns[countdown].size !== undefined) SetTextScale(1, countdowns[countdown].size)
        if (countdowns[countdown].colour !== undefined) SetTextColour.apply(null, countdowns[countdown].colour)
        if (countdowns[countdown].dropShadow !== undefined) SetTextDropShadow.apply(null, countdowns[countdown].dropShadow)
        if (countdowns[countdown].edge !== undefined) SetTextEdge.apply(null, countdowns[countdown].edge)


        AddTextComponentString(countdowns[countdown].text(timeLeft.toFixed((countdowns[countdown].decimals !== undefined) ? countdowns[countdown].decimals : 0)))
        let textHeight = GetTextScaleHeight((countdowns[countdown].size == undefined) ? 1 : countdowns[countdown].size, (countdowns[countdown].font == undefined) ? 0 : countdowns[countdown].font)
        y -= textHeight
        SetScriptGfxAlign(0,84)
        DrawRect(0,y,1,textHeight,0,0,0,128)
        ResetScriptGfxAlign()
        
        EndTextCommandDisplayText(0, y)
        

        


    })
})

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