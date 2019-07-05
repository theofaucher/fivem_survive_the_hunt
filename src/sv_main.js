/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />


on('playerConnecting', (playerName) => {
    console.log(`${playerName} is connecting`)
})

onNet('playerConnected', () => {
        console.log(`${GetPlayerName(source)} connected!`)
})

on('playerDropped', (reason) => {
    console.log(`${GetPlayerName(source)} disconnected : ${reason}`)
})