import {spawnPlayer,randomizePed,setPed} from './spawn'
RegisterCommand('spawn', (source, args) => {

    /* let location = {
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
    } */

    console.log("Spawning with data :")
    console.log(location)

    spawnPlayer(PlayerId(), location)
})


RegisterCommand('chped',(source, args)=>{
    if ( typeof(args[0]) =='undefined' ){
        randomizePed(PlayerId())
    }else{
        setPed(PlayerId(),args[0])
    }
})