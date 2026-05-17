export function getHours(seconds: number){
    return Math.floor(seconds / 3600);
}

export function getMins(seconds: number){
    return Math.floor((seconds % 3600) / 60);
}

export function formatTime(seconds: number) {
    const hours = getHours(seconds);
    const mins = getMins(seconds);
    // return hours === 0 ? `${hours}h ${mins}m`
    if(hours === 0 && mins !== 0) {
        return `${mins}m`
    }else if(hours !== 0 && mins === 0){
        return `${hours}h`
    }else {
        return `${hours}h ${mins}m`
    }
}