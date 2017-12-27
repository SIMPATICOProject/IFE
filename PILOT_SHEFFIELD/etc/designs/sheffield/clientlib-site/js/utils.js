'use strict';
var SCC = SCC || {};

SCC.is_external_link = function (a) {
    return !(location.hostname === a.hostname || !a.hostname.length);
};