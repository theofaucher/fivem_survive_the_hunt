/// <reference path="D:\Projets\FiveM\Survive_the_hunt\server-data\autocompletion\typings\index.d.ts" />

//GetPlayerWantedLevel
//ClearPlayerWantedLevel
/*setInterval(function(){

   SetPlayerWantedLevel(PlayerId(), 4, 0)
   SetPlayerWantedLevelNow(PlayerId(), 0)
   console.log(GetPlayerWantedLevel())






}*/

setInterval(function () {

    if (GetPlayerWantedLevel() >= 4) {

        SetPlayerWantedLevel(PlayerId(), 3, 0)
        SetPlayerWantedLevelNow(PlayerId(), 0)
    }

}, 500)