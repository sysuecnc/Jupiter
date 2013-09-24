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
        getGroupedSwitchList: {
            url: baseURL + "/monitor/query",
            type: 'POST',
            data: {
                request: JSON.stringify({
                    operation: config.ajax.operation.QUERY,
                    target: config.ajax.target.SWITCH,
                    params: {
                        command: 'getGroupedList',
                    },
                }),
            },
        },
        getSwitchList: {
            url: baseURL + "/monitor/query",
            type: 'POST',
            data: {
                request: JSON.stringify({
                    operation: config.ajax.operation.QUERY,
                    target: config.ajax.target.SWITCH,
                    params: {
                        command: 'getList',
                    },
                }),
            },
        },
        getBuildingList: {
            url: baseURL + "/monitor/query",
            type: 'POST',
            data: {
                request: JSON.stringify({
                    operation: config.ajax.operation.QUERY,
                    target: config.ajax.target.BUILDING,
                    params: {
                        command: 'getList',
                    },
                }),
            },
        },
    };
    config.erajax.options = {
        getGroupedSwitchList: config.ajax.options.getGroupedSwitchList,
        getSwitchList: config.ajax.options.getSwitchList,
        getBuildingList: config.ajax.options.getBuildingList,
    };
    var opts = config.erajax.options;
    opts.getGroupedSwitchList.data = JSON.stringify(opts.getGroupedSwitchList.data);
    opts.getSwitchList.data = JSON.stringify(opts.getSwitchList.data);
    opts.getBuildingList.data = JSON.stringify(opts.getBuildingList.data);

    return config;
});
