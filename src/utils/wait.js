export function Delay(ms) {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}