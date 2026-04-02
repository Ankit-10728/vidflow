function formatMonthYear(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date)) return "";

    return date.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });
}

export default formatMonthYear