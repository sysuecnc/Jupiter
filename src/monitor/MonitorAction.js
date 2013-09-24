/**
 * @file monitor Action
 * @author NO.39(lykling.lyk@gmail.com)
 */ 

define(function(require) {
    gtest = gtest || {}
    gtest.debug = gtest.debug || {}
    var Action = require('er/Action');

    /**
     * Action defination, derived from er.Action
     */ 
    var MonitorAction = function() {
        Action.apply(this, arguments);
        gtest.debug.maction = this;
    };

    /**
     * specify model and view
     */ 
    MonitorAction.prototype.modelType = require('./MonitorModel');
    MonitorAction.prototype.viewType = require('./MonitorView');

    require('er/util').inherits(MonitorAction, Action);

    return MonitorAction;
});
