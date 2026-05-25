export function capitalizeWords(sentence: string) {
    const titleCase = sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return titleCase;
}

export function initialsFromName(name: string){
    const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
}