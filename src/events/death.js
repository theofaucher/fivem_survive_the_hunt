/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />

let playerDead = false
let player = PlayerId()


setInterval(()=>{
    if (playerDead && !IsPlayerDead(player)){
        
        emit('events:playerAlive')
        playerDead = false
    }
    if ( !playerDead && IsPlayerDead(player)){
        emit('events:playerDied')
        playerDead = true
    }
},200)