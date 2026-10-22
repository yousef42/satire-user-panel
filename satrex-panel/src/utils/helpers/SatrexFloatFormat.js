export default (num) => {
    const floatPart = num.toString().split('.')[1];
    if (floatPart) {
        for (let i = 0; i < floatPart.length; i++) if (floatPart[i] > 0) return `${num.toString().split('.')[0]}.${floatPart.slice(0, i + 2)}`;
    }

    return num;
};
