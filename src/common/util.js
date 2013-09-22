/**
 * @file utils
 * @author NO.39(lykling.lyk@gmail.com)
 */ 

define(function(require) {
    var util = {};
    util.optionMix = function(orig, dist) {
        var option = {};
        for (opt in orig) option[opt] = orig[opt];
        for (opt in dist) option[opt] = dist[opt];
        return option;
    };
    return util;
});
