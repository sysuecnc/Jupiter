/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * @file 翻页控件
 * @author shenbin
 */

define(
    function (require) {
        // required js
        require('./Select');

        var lib = require('./lib');
        var ui = require('./main');
        var helper = require('./controlHelper');
        var Control = require('./Control');

        /**
         * 获取控件主元素代码
         *
         * @inner
         * @param {Pager} pager Pager控件实例
         * @return {string} 拼接得到的html代码
         */
        function getMainHTML(pager) {
            var tpl = [
                '<div id="${pagerWrapperId}" class="${pagerWrapperClass}">',
                    '<div id="${selectWrapperId}" ',
                    'class="${selectWrapperClass}">',
                        '<span id="${labelId}" class="${labelClass}">',
                        '${labelText}</span>',
                        '<div data-ui="type:Select;childName:select;',
                        'id:${selectId};width:40;"></div>',
                    '</div>',
                    '<ul id="${mainId}" class="${mainClass}"></ul>',
                '</div>'
            ];

            return lib.format(
                tpl.join('\n'),
                {
                    pagerWrapperId: helper.getId(pager, 'pager-wrapper'),
                    pagerWrapperClass:
                        helper.getPartClasses(pager, pager.layout)[0],
                    selectWrapperId: helper.getId(pager, 'select-wrapper'),
                    selectWrapperClass:
                        helper.getPartClasses(
                            pager,
                            'select-wrapper'
                        ).join(' '),
                    labelId: helper.getId(pager, 'label'),
                    labelClass: helper.getPartClasses(pager, 'label').join(' '),
                    labelText: '每页显示',
                    selectId: helper.getId(pager, 'select'),
                    mainId: helper.getId(pager, 'main'),
                    mainClass:
                        helper.getPartClasses(pager, 'main').join(' ')
                }
            );
        }

        /**
         * 获取页码区域元素代码
         *
         * @inner
         * @param {Pager} pager Pager控件实例
         * @return {string} 拼接得到的html代码
         */
        function getPagerMainHTML(pager) {
            // 定义页码模板
            var plainTpl = '<li class="${className}" id="${id}"'
                + ' data-page="${page}">${text}</li>';
            var anchorTpl = '<li class="${className}" id="${id}">'
                + '<a href="${link}">${text}</a></li>';
            var omitTpl = '<li class="${className}">…</li>';

            /**
             * 根据模板拼接url
             *
             * @inner
             * @param {number} num 页码
             * @return {string} 拼接返回的url
             */
            function getUrlByTemplate(num) {
                return lib.format(
                    pager.urlTemplate,
                    {
                        page: num,
                        pageSize: pager.pageSize
                    }
                );
            }

            /**
             * 生成用于填充模板的对象
             *
             * @inner
             * @param {string} className 类名
             * @param {number=} num 页码
             * @param {number=} id 用于模板的id字段
             * @param {string=|number=} text 用于模板的text字段
             * @return {Object} 用于填充模板的对象
             */
            function getTplObj(className, num, id, text) {
                var obj = {
                    className: helper.getPartClasses(
                        pager,
                        className
                    ).join(' ')
                };

                if (arguments.length > 1) {
                    obj.link = getUrlByTemplate(num);
                    obj.id = helper.getId(pager, id);
                    obj.page = num;
                    obj.text = text;
                }

                return obj;
            }

            /**
             * 根据模板和填充对象格式化生成页面片段代码
             *
             * @inner
             * @param {Object} obj 用于填充模板的对象
             * @param {string=} tpl 页面片段模板
             * @return {string} 页面片段代码
             */
            function getSegmentHTML(obj, tpl) {
                if (!tpl) {
                    var templates = {
                        anchor: anchorTpl,
                        plain: plainTpl
                    };

                    // 由于pageType需要由外部指定，当指定的模板不存在时默认匹配anchor
                    tpl = templates[pager.pageType] || templates['anchor'];
                }
                
                return lib.format(tpl, obj);
            }

            /**
             * 将页面片段添加到html数组中
             *
             * @inner
             * @param {Object|number} obj Object或者page
             * @param {string=} tpl 可选模板
             */
            function addSegmentToHTML(obj, tpl) {
                if (typeof obj === 'number') {
                    obj = getTplObj(
                        'item',
                        obj,
                        'page-' + obj,
                        obj
                    );
                }
                var segment = getSegmentHTML(obj, tpl);

                html.push(segment);
            }

            var page = +pager.page;
            var backCount = +pager.backCount;
            var forwardCount = +pager.forwardCount;
            // 计算得到的总页码数
            var totalPage = Math.ceil(pager.count / pager.pageSize);
            // 数组html用于存储页码区域的元素代码
            var html = [];

            // 上一页
            if (page > 1) {
                var obj = getTplObj(
                    'item-extend',
                    page - 1,
                    'page-back',
                    pager.backText
                );
                addSegmentToHTML(obj);
            }

            // 前缀页码
            if (page > backCount + 1) {
                addSegmentToHTML(1);

                // 前缀...符号
                if (page > backCount + 2) {
                    var obj = getTplObj('item-omit');
                    addSegmentToHTML(obj, omitTpl);
                }
            }

            /*
             * 中间页码区
             */
            // 前置页码
            var len = page > backCount ? backCount : page - 1;
            for (var i = page - len; i < page; i++) {
                addSegmentToHTML(i);
            }

            // 当前页码
            var obj = getTplObj(
                'item-current',
                page,
                'page-' + page,
                page
            );
            addSegmentToHTML(obj, plainTpl);

            // 后置页码
            var len = totalPage - page > forwardCount
                ? forwardCount
                : totalPage - page;
            for (var i = page + 1; i < page + len + 1; i++) {
                addSegmentToHTML(i);
            }

            // 后缀页码
            if (page < totalPage - forwardCount) {
                // 后缀...符号
                if (page < totalPage - forwardCount - 1) {
                    var obj = getTplObj('item-omit');
                    addSegmentToHTML(obj, omitTpl);
                }

                addSegmentToHTML(totalPage);
            }

            // 下一页
            if (page < totalPage) {
                var obj = getTplObj(
                    'item-extend',
                    page + 1,
                    'page-forward',
                    pager.forwardText
                );
                addSegmentToHTML(obj);
            }

            return html.join('');
        }

        /**
         * 绘制页码区域部件
         * @inner
         * @param {Pager} pager Pager控件实例
         */
        function repaintPager(pager) {
            // 修正每页显示条数，每页显示不能为0
            var pageSize = pager.pageSize;
            pageSize = pageSize > 0 ? pageSize : 1;
            pager.pageSize = pageSize;
            // 将修正后的每页显示数量更新至Select控件
            pager.getChild('select').set('value', '' + pageSize);
            
            // 修正页码
            var totalPage = Math.ceil(pager.count / pageSize);
            var page = pager.page;
            page = page > totalPage ? totalPage : page;
            page = page > 0 ? page : 1;
            pager.page = page;

            // 渲染main元素页面结构
            var pagerMain = lib.g(helper.getId(pager, 'main'));
            pagerMain.innerHTML = getPagerMainHTML(pager);
        }

        /**
         * 绘制Pager控件布局结构
         *
         * @inner
         * @param {Pager} pager Pager控件实例
         * @param {string} style 布局样式
         */
        function repaintLayout(pager, style) {
            /**
             * 获取class的集合
             *
             * @param{...string} style 布局类型
             * @return{Array.<string>} 布局类型集合
             */
            function getClasses() {
                var classes = [];
                for (var i = 0, len = arguments.length; i < len; i++) {
                    classes.push(helper.getPartClasses(pager, arguments[i])[0]);
                }

                return classes;
            }

            var pagerWrapper = lib.g(helper.getId(pager, 'pager-wrapper'));
            lib.removeClasses(
                pagerWrapper,
                getClasses(
                    'alignLeft', 'alignLeftReversed',
                    'alignRight', 'alignRightReversed',
                    'distributed', 'distributedReversed'
                )
            );
            lib.addClass(pagerWrapper, helper.getPartClasses(pager, style)[0]);
        }

        /**
         * 页码点击事件触发
         *
         * @inner
         * @param {Pager} this Pager控件实例
         * @param {Event} e 事件对象
         */
        function pagerClick(e) {
            var target = e.target;
            var classes = helper.getPartClasses(this, 'item');
            var extendClasses = helper.getPartClasses(this, 'item-extend');
            var backId = helper.getId(this, 'page-back');
            var forwardId = helper.getId(this, 'page-forward');
            var page = +this.page;

            if (lib.hasClass(target, classes[0])
                || lib.hasClass(target, extendClasses[0])
            ) {
                if (target.id === backId) {
                    page--;
                }
                else if (target.id === forwardId) {
                    page++;
                }
                else {
                    page = +lib.getAttribute(target, 'data-page');
                }

                // 跳转至某页码
                this.set('page', page);
                // 触发页码变更事件
                // 保持向后兼容，待大版本再去除changepage事件
                this.fire('changepage');
                this.fire('pagechange');
            }
        }

        /**
         * 获取select的下拉控件的数据
         *
         * @inner
         * @param {Array.<number>} pageSizes 配置信息中的下拉数据
         * @return {Array.<Object>} 用于Select控件的datasource
         */
        function getPageSizes(pageSizes) {
            var datasource = [];
            for (var i = 0, len = pageSizes.length; i < len; i++) {
                var pageSize = pageSizes[i];
                datasource.push({
                    text: '' + pageSize,
                    value: '' + pageSize
                });
            }

            return datasource;
        }

        /**
         * 更新select控件的value
         *
         * @inner
         * @param {Pager} pager Pager控件实例
         * @param {Select} select Select控件实例
         */
        function changePageSize(pager, select) {
            var pageSize = parseInt(select.getValue(), 10);
            pager.pageSize = pageSize;

            // 重绘页码
            repaintPager(pager);
            // 触发每页显示变更的事件
            // 保持向后兼容，待大版本再去除changepagesize事件
            pager.fire('changepagesize');
            pager.fire('pagesizechange');
        }

        /**
         * 获取Select控件和label的父元素容器
         *
         * @param {Pager} pager Pager控件实例
         * @return {HTMLElement} Select控件和label的父元素
         */
        function getSelectWrapper(pager) {
            return lib.g(helper.getId(pager, 'select-wrapper'));
        }

        /**
         * 显示Select控件及对应的label元素
         *
         * @param {Pager} pager Pager控件实例
         */
        function showSelect(pager) {
            var selectWrapper = getSelectWrapper(pager);
            var clazz = helper.getPartClasses(pager, 'select-hidden')[0];
            // 检查是否处于隐藏状态，若是隐藏状态则显示该控件
            if (lib.hasClass(selectWrapper, clazz)) {
                lib.removeClass(selectWrapper, clazz);
            }
        }

        /**
         * 隐藏Select控件及对应的label元素
         *
         * @param {Pager} pager Pager控件实例
         */
        function hideSelect(pager) {
            var selectWrapper = getSelectWrapper(pager);
            var clazz = helper.getPartClasses(pager, 'select-hidden')[0];
            lib.addClass(selectWrapper, clazz);
        }

        /**
         * 翻页控件类
         * 
         * @constructor
         * @param {Object} options 初始化参数
         */
        function Pager(options) {
            Control.apply(this, arguments);
        }

        Pager.prototype = {
            /**
             * 控件类型
             * @type {string}
             */
            type: 'Pager',

            /**
             * 默认属性
             * @type {Object}
             */
            defaultProperties: {
                pageSizes: [15, 30, 50, 100],
                pageSize: 15
            },

            /**
             * 初始化参数
             *
             * @param {Object=} options 构造函数传入的参数
             * @override
             * @protected
             */
            initOptions: function (options) {
                var properties = {
                    pageType: 'anchor',
                    count: 0,
                    page: 1,
                    backCount: 3,
                    forwardCount: 3,
                    backText: '上一页',
                    forwardText: '下一页',
                    urlTemplate: '',
                    layout: 'alignLeft'
                };

                lib.extend(properties, this.defaultProperties, options);
                this.setProperties(properties);
            },

            /**
             * 初始化DOM结构
             *
             * @override
             * @protected
             */
            initStructure: function () {
                // 填充主元素代码
                this.main.innerHTML = getMainHTML(this);
                // 创建控件树
                this.initChildren(this.main);

                // 每页显示的select控件
                var select = this.getChild('select');
                select.on(
                    'change',
                    lib.curry(changePageSize, this, select)
                );
                // 当初始化pageSizes属性不存在或为空数组时，隐藏控件显示
                if (!this.pageSizes || this.pageSizes.length === 0) {
                    hideSelect(this);
                }
                else {
                    select.setProperties({
                        datasource: getPageSizes(this.pageSizes),
                        value: '' + this.pageSize
                    });
                }

                // pager主元素绑定事件
                var pagerMain = lib.g(helper.getId(this, 'main'));
                helper.addDOMEvent(this, pagerMain, 'click', pagerClick);
            },

            setProperties: function (properties) {
                var digitalProperties = [
                    'count', 'page', 'backCount',
                    'forwardCount', 'pageSize'
                ];

                for (var i = 0; i < digitalProperties.length; i++) {
                    var value = properties[digitalProperties[i]];
                    if (typeof value === 'string') {
                        properties[digitalProperties[i]] = +value;
                    }
                }

                Control.prototype.setProperties.apply(this, arguments);
            },

            /**
             * 重新绘制控件视图
             *
             * @override
             * @protected
             */
            repaint: helper.createRepaint(
                Control.prototype.repaint,
                {
                    name: 'pageSizes',
                    paint: function (pager, value) {
                        var select = pager.getChild('select');
                        // 当pageSizes属性不存在或为空数组时，隐藏控件显示
                        if (!value || value.length === 0) {
                            hideSelect(pager);
                        }
                        else {
                            select.setProperties({
                                datasource: getPageSizes(value),
                                value: '' + pager.pageSize
                            });
                            showSelect(pager);
                        }
                    }
                },
                {
                    name: 'layout',
                    paint: repaintLayout
                },
                {
                    name: [
                        'pageType', 'count', 'pageSize',
                        'page', 'backCount', 'forwardCount',
                        'backText', 'forwardText', 'urlTemplate'
                    ],
                    paint: repaintPager
                }
            )
        };

        lib.inherits(Pager, Control);
        ui.register(Pager);
        return Pager;
    }
);
