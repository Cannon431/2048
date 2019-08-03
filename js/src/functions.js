export function random(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function arrayIsEmpty(array) {
    if (array.length === 0) return true;

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== undefined) {
            if (array[i] instanceof Array) {
                return arrayIsEmpty(array[i]);
            }

            return false;
        }
    }

    return true;
}

export function foreach2dArray(array, func) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            func(i, j, array[i][j]);
        }
    }
}

export function arrayOr(conditions) {
    for (let i = 0; i < conditions.length; i++) {
        if (conditions[i]) {
            return true;
        }
    }

    return false;
}

export function new2dArray(rows) {
    let newArray = [];

    for (let row = 0; row < rows; row++) {
        newArray[row] = [];
    }

    return newArray;
}

export function firstToUpper(string) {
    return string[0].toUpperCase() + string.slice(1);
}
