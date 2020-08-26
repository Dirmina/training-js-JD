const _         = require("lodash");

var MyLodash = { };

/**
 * Removes leading and trailing whitespace or specified characters from string.
 */
MyLodash.trim = function (string) {
    //check chaque character
    return string.split(' ').join('');
}

/**
 * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
 */
MyLodash.reverse = function (array) {
    let reversedString = [];
    //Pour chaque entrée depuis la fin jusqu'au début on push
    for (i = array.length - 1; i > -1; i--) {
        reversedString.push(array[i])
    }
    return reversedString;
}

/**
 * Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first occurrence of each element is kept. 
 * The order of result values is determined by the order they occur in the array.
 */
MyLodash.uniq = function (values) {
    let arrayUniq = []

    for (let i = 0; i < values.length; i++) {
        let existing = false;
        //sur chaque valeur on vérifie qu'elle est pas dans unique
        for (let j = 0; j < arrayUniq.length; j++) {
            if ((values[i] == arrayUniq[j])) {
                existing = true;  
            }
        }
        if (!existing) {
            arrayUniq.push(values[i])
        }
    }
    return arrayUniq;
};

/**
 * This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed. 
 * The order of result values is determined by the order they occur in the array.
 */
MyLodash.uniqBy = function (values, extra) {
    let arrayUniqBy = [];
    //Pour chaque valeur de values 
    for (let value of values) {
        let existing = false;
        for (let uniq of arrayUniqBy) {
            if (extra(value) === extra(uniq)) {
                existing = true;
            }
        }
        if (!existing) {
            arrayUniqBy.push(value)
        }
    }
    return arrayUniqBy;
};

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for. 
 * The predicate is invoked with three arguments: (value, index|key, collection).
 */
MyLodash.find = function (array, extra) {
    for (let i = 0; i < array.length; i++) {
        if (extra(array[i]) ) {
            return array[i];
        }
    }
}

/**
 * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee. 
 * This method performs a stable sort, that is, it preserves the original sort order of equal elements. 
 * The iteratees are invoked with one argument: (value).
 */
MyLodash.sortBy = function (array, extra) {
        //Pour chaque clé
        
        for (let keyValue of extra) {
            let isSwapped = true;
            while (isSwapped) {
                isSwapped = false;
                for (let i = 0; i < array.length;i++) {
                    if (array[i+1] && array[i][keyValue] > array[i+1][keyValue]) {
                        temporaryValue = array[i]
                        array[i] = array[i+1]
                        array[i+1] = temporaryValue
                        isSwapped = true
                    }
                }
            }
        }
        return array;   
}

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays. 
 * The order of result values is determined by the order they occur in the arrays.
 */
MyLodash.xor = function (array, extra) {
    let symmetricDifference = []
    function forXor (array, extra) {
    for (let i=0; i < array.length; i++) {
        let same = false;
        for (let j= 0; j < extra.length; j++) {
            if (array[i] === extra[j]) {
                same = true;
            }
        }
        if (!same) {
            symmetricDifference.push(array[i])
        }
    }
    return symmetricDifference;
    }
    
    forXor(array, extra);
    forXor(extra, array);

    return symmetricDifference
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. 
 * The order of grouped values is determined by the order they occur in collection. 
 * The corresponding value of each key is an array of elements responsible for generating the key. 
 * The iteratee is invoked with one argument: (value).
 */
MyLodash.groupBy = function (array, extra) {
    let groupedBy = {}
    for (let i = 0; i < array.length; i++) {
        let flooredValue = extra(array[i])
        if (!groupedBy[flooredValue]) {
            groupedBy[extra(array[i])] = [array[i]]
        }
        else {
            groupedBy[flooredValue].push(array[i])
        }
    }
    return groupedBy
}

/**
 * Recursively flattens array.
 */
MyLodash.flattenDeep = function (array) {
    return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? MyLodash.flattenDeep(val) : val), []);
}

/**
 * This method is like _.defaults except that it recursively assigns default properties.
 */
MyLodash.defaultsDeep = function (object, extra) {
    //Pour chaque propriété je dois vérifier si c'est un objet (typeof)
    //Si c'est un objet on revérifie que chaque propriété est un objet (recursivité)
    //Quand il n'y a plus d'object (boucle while finie)
    //si l'object de mm profondeur ne possède pas la propriété alors on l'ajoute a object1 (et là il faut creuser)
    for(let property in object) {
        for(let extraProperty in extra) {
            typeA = typeof object[property]
            typeB = typeof extra[extraProperty]
            if (typeA = 'object' && typeB === 'object') {
                MyLodash.defaultsDeep(object[property], extra[extraProperty])
            }
            else {
                if (property !== extraProperty) {
                    //ajout
                    object[extraProperty] = extra[extraProperty]
                    console.log(object[property])
                }
            }
        }
    }
    return object;
}

module.exports = MyLodash;