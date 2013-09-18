define(function(require) {
    var actions = [
        {
            path: '/overview/index/',
            type: 'monitor/MonitorAction',
            title: 'Information',
        },
    ];
    var controller = require('er/controller');
    controller.registerAction(actions[0]);
    return {
        action: require('monitor/MonitorAction'),
    };
});
