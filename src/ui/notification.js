import { Delay } from '../utils/wait';

export async function notify(text){
    while (!IsScreenFadedIn()){
        await Delay(1000)
    }
    SetNotificationTextEntry("STRING")
    AddTextComponentString(text)
    DrawNotification(true, true)
}

onNet('notify', notify)
