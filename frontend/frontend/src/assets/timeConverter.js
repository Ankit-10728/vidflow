function formatDuration(minutes) {
    if (!minutes) return 0
    const totalSeconds = Math.floor(minutes * 60);

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours === 0) {
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}


export default formatDuration