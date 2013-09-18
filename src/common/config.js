/**
 * @file global configuration
 * @author NO.39(lykling.lyk@gmail.com)
 */ 

define(function(require) {
    var baseURL = 'http://222.200.191.28:8888'
    var config = {};
    config.ajax = {
        operation: {
            'ADD': 1,
            'DELETE': 2,
            'MODIFY': 3,
            'QUERY': 4,
        },
        target: {
            'SWITCH': 1,
            'BUILDING': 2,
        },
    };
    config.ajax.options = {
        getSwitchList: {
            url: baseURL + "/monitor/query",
            method: 'POST',
            data: {
                request: JSON.stringify({
                    operation: config.ajax.operation.QUERY,
                    target: config.ajax.target.SWITCH,
                    params: {},
                }),
            },
        },
        getBuildingList: {
            url: baseURL + "/monitor/query",
            method: 'POST',
            data: {
                request: JSON.stringify({
                    operation: config.ajax.operation.QUERY,
                    target: config.ajax.target.BUILDING,
                    params: {},
                }),
            },
        },
    };

    return config;
});
