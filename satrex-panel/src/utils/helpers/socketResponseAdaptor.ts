const re = /([^A-Z]+)?([A-Z]{1})(.*)/;

const socketResponseAdaptor = (data: any):any => {
    if (Array.isArray(data)) {
        return data.map((item) => socketResponseAdaptor(item));
    }
    const newobj: any = {};
    Object.keys(data).forEach((key) => {
        if (Object.keys(data[key]).length > 0) {
            data[key] = socketResponseAdaptor(data[key]);
        }
        return newobj[key.replace(re, (_, a, b, c, d) => (a != undefined ? a : '') + b.toLowerCase() + c)] = data[key];
    });
    return newobj;
};

export default socketResponseAdaptor;
