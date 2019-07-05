export function getPlayers(){
    let players = []
    for (var i=0 ; i<GetNumPlayerIndices(); i++){
        players.push(GetPlayerFromIndex(i))
    }
    return players
}