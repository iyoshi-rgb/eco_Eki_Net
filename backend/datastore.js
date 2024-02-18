// dataStore.js
let sharedData = {};

exports.set = function(key, value) {
    sharedData[key] = value;
};

exports.get = function(key) {
    return sharedData[key];
};
