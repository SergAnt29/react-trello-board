const compare = (a, b, field) => {
    if (a[field] < b[field]) {
        return -1;
    }
    if (a[field] > b[field]) {
        return 1;
    }
    return 0;
};

export const getMaxFieldOfArrayOfItems = (items, field) => {
    return Math.max(...items.map(item => item[field]), 0);
};

export const compareByIndex = (a, b) => {
    return compare(a, b, 'index')
}

