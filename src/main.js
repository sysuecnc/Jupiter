/**
 * @file global initial
 * @author NO.39(lykling.lyk@gmail.com)
 */ 
define(function(require) {
    gtest.er = require('er');
    gtest.Action = require('er/Action');
    gtest.View = require('er/View');
    gtest.Model = require('er/Model');
    gtest.erutil = require('er/util');
    gtest.events = require('er/events');
    gtest.erajax = require('er/ajax');
    gtest.Deferred = require('er/Deferred');
    gtest.erconfig = require('er/config');
    gtest.locator = require('er/locator');
    gtest.router = require('er/router');
    gtest.controller = require('er/controller');
    gtest.esui = require('esui');
    gtest.Sidebar = require('esui/Sidebar');
    gtest.Tree = require('esui/Tree');
    gtest.TreeStrategy = require('esui/TreeStrategy');
    gtest.comconfig = require('common/config');
    gtest.erconfig.indexURL = '/overview/index/';
    gtest.monitor = require('monitor/init');
    gtest.er.start();
});
