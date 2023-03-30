"use strict";

const _ = require("lodash");

const getInfo = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

const getInfoArray = ({ fields = [], data = [] }) => {
    return data.map((object) => _.pick(object, fields));
};

module.exports = { getInfo, getInfoArray };
