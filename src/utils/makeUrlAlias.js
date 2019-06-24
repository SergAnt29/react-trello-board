const makeUrlAlias = (entityString, entityIdentifier) => {
    const head = entityString.replace(/\s+/g, '-').toLowerCase();
    const tail = entityIdentifier.slice(3, 9);

    return `${head}-${tail}`;
}

export default makeUrlAlias;