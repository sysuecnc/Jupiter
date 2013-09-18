/**
 * @file monitor view
 * @author NO.39(lykling.lyk@gmail.com)
 */ 

define(function(require) {
    require('er/tpl!monitor/monitor.tpl');
    var View = require('er/View');

    /**
     * View defination, derived from er.View
     */ 
    var MonitorView = function() {
        View.apply(this, arguments);
    };

    /**
     * specify template and container
     */ 
    MonitorView.prototype.template = 'monitorMain';
    MonitorView.prototype.container = 'container-main';

    MonitorView.prototype.enterDocument = function() {
        require('esui').init(document.getElementById(this.container));
    }
    require('er/util').inherits(MonitorView, View);

    return MonitorView;
});
