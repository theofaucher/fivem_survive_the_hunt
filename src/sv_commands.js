import {getPlayers} from './utils/sv_players'

RegisterCommand('list',()=>{
    console.log(`Connected players: ${GetNumPlayerIndices()}/${GetConvar('sv_maxClients')}`)
    getPlayers().forEach(player => {
        console.log(`${player} : ${GetPlayerName(player)}`)
    });
})

RegisterCommand('startGame',()=>{
    emit('startGame')
})

RegisterCommand('rr', ()=>{
    ExecuteCommand('refresh')
    ExecuteCommand('ensure init')
})