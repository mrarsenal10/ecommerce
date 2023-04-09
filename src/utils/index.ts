"use strict";

import _ from "lodash";

const getInfo = ({
    fields = [],
    object = {},
}: {
    fields: string[];
    object: {};
}) => {
    return _.pick(object, fields);
};

const getInfoArray = ({
    fields = [],
    objects = [],
}: {
    fields: string[];
    objects: [];
}) => {
    return objects.map((object) => _.pick(object, fields));
};

export { getInfo, getInfoArray };
