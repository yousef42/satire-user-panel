export default function upto2Decimal(num) {
    if ((num).toString().length < 8) return num;
    if (num > 0) {
        const test = Math.floor(num * 1000000000) / 1000000000;
        console.log({ test });
        return test;
    }
    return Math.ceil(num * 1000000000) / 1000000000;
}
