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
        var esui = require('esui');
        var Tree = require('esui/Tree');
        var TreeStrategy = require('esui/TreeStrategy');
        switchtree = esui.get('switch-tree');
        var datasource = {
            id: 'ecampus',
            text: 'ECampus',
            children: [],
        };
        var bdlist = this.model.get('building_list');
        var sglist = this.model.get('switch_grouped_list');
        for (i = 0, len = bdlist.length; i < len; ++i) {
            bchildren = {
                id: 'building-' + bdlist[i].buildingid,
                text: bdlist[i].cnname + '(' + bdlist[i].buildingname + ')',
                children: [],
            };
            sslist = sglist[bdlist[i].buildingid]
            for (j = 0, slen = sslist.length; j < slen; ++j) {
                bchildren.children.push({
                    id: 'switch-' + sslist[j].switchid,
                    text: sslist[j].systemname,
                });
            }
            datasource.children.push(bchildren);
        }
        gtest.ctls = esui.init(document.getElementById(this.container), {
            properties: {
                'switch-tree': {
                    datasource: datasource,
                    strategy: new TreeStrategy(),
                    selectMode: 'single',
                }
            }
        });
    }
    require('er/util').inherits(MonitorView, View);

    return MonitorView;
});
