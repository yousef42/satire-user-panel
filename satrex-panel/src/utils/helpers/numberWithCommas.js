export const numberWithCommas = (num) => {
    if (num) {
        const x = num.toString().split('.');
        const result = x ? x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x;
        if (x[1]) return `${result}.${x[1]}`;
        return result;
    }
    return num;
};
