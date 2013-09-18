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
        this.datasource = [
            {"switchlist": remote(ajaxConf.options['getSwitchList'].url,
                ajaxConf.options.getSwitchList)},
            {"buildinglist": remote(ajaxConf.options['getBuildingList'].url,
                ajaxConf.options.getBuildingList)},
        ];
    };
    require('er/util').inherits(MonitorModel, Model);
    return MonitorModel;
});
