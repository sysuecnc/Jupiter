/**
 * @file monitor Action
 * @author NO.39(lykling.lyk@gmail.com)
 */ 

define(function(require) {
    var Action = require('er/Action');

    /**
     * Action defination, derived from er.Action
     */ 
    var MonitorAction = function() {
        Action.apply(this, arguments);
    };

    /**
     * specify model and view
     */ 
    MonitorAction.prototype.modelType = require('./MonitorModel');
    MonitorAction.prototype.viewType = require('./MonitorView');

    require('er/util').inherits(MonitorAction, Action);

    return MonitorAction;
});
