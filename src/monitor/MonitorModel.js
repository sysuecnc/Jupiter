/**
 * @file monitor main Model
 * @author NO.39(lykling.lyk@gmail.com)
 */ 

define(function(require) {
    var Model = require('er/Model');

    /**
     * Model defination, derived from er.Model
     */ 
    var MonitorModel = function() {
        Model.apply(this, arguments);
        var ajaxConf = require('common/config').ajax;
        var remote = require('er/datasource').remote;
        var erajaxopt = require('common/config').erajax.options;
        var util = require('common/util');
        this.set('sidebarName', '设备');
        this.datasource = [
            {
                "switch_grouped_list": function() {
                    /* return function() { */
                        var rsp = {};
                        function cbk(response) {
                            rsp = response;
                        }
                        var option = util.optionMix(
                            ajaxConf.options['getGroupedSwitchList'],
                            {
                                success: function(response) {
                                    /* console.log(response); */
                                    cbk(response);
                                },
                                async: false,
                            }
                        );
                        baidu.ajax(option);
                        return rsp;
                    /* }; */
                },
            },
            {
                "switch_list": function() {
                    /* return function() { */
                        var rsp = {};
                        function cbk(response) {
                            rsp = response;
                        }
                        var option = util.optionMix(
                            ajaxConf.options['getSwitchList'],
                            {
                                success: function(response) {
                                    /* console.log(response); */
                                    cbk(response);
                                },
                                async: false,
                            }
                        );
                        baidu.ajax(option);
                        return rsp;
                    /* }; */
                },
            },
            {
                "building_list": function() {
                    /* return function() { */
                        var rsp = {};
                        function cbk(response) {
                            rsp = response;
                        }
                        var option = util.optionMix(
                            ajaxConf.options['getBuildingList'],
                            {
                                success: function(response) {
                                    /* console.log(response); */
                                    cbk(response);
                                },
                                async: false,
                            }
                        );
                        baidu.ajax(option);
                        return rsp;
                    /* }; */
                },
            },
            {
                "sgl": remote(erajaxopt.getGroupedSwitchList.url,
                        erajaxopt.getGroupedSwitchList),
            },
            {
                "sl": remote(erajaxopt.getSwitchList.url,
                        erajaxopt.getSwitchList),
            },
            {
                "bl": remote(erajaxopt.getBuildingList.url,
                        erajaxopt.getBuildingList),
            },
        ];
    };
    require('er/util').inherits(MonitorModel, Model);
    return MonitorModel;
});
