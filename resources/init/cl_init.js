/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

on('onClientResourceStart', () => {
    ShutdownLoadingScreen()

    exports.spawn.initialSpawn(PlayerId(), {
        x: 0,
        y: 0,
        z: 71,
        heading: 0
    })
})