export function truncate(str, n = 10) {
    if (str.length > n) {
        return `${str.slice(0, n)}...`;
    }
        return str;
}
