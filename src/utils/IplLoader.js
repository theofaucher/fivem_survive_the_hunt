import {iplsList} from '../hashes/ipl'
LoadMpDlcMaps()
iplsList.forEach(element => {
    RequestIpl(element)
});