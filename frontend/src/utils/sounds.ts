export function playSound(soundPath: string) {
    const sound = new Audio(soundPath);

    sound.volume = 0.6;

    sound.play().catch((error) => {
        console.log("Sound play failed:", error);
    });
};