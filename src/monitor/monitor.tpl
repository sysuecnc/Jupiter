<!-- target: monitorInfosTabItem -->
<li class"monitor-infos-tabitem ${infoClass}" infoid="${infoId}" title="${infoTitle}" act="clickInfosTab">
    <div>
    </div>
    <div class="info-name">${infoName}</div>
</li>

<!-- target: monitorInfos -->
<div data-ui="type:Tab; id:switch-content-tab; orientation:horizontal">
    <ul class="monitor-infos-tab">
    </ul>
    <div class="monitor-infos-tabcontainer">
        <div class="monitor-infos-body"></body>
    </div>
</div>

<!-- target: monitorMain -->
<div class="monitor-container">
    <div id="monitor-side-wrapper" class="monitor-side-wrapper">
        <div data-ui="type:Sidebar;id:monitor-side;mode:fixed">
            <div>${sidebarName}</div>
            <div class="sidebar-tree">
                <div class="panel-content" data-ui="type:Tree;id:switch-tree"></div>
            </div>
        </div>
    </div>
    <div id="monitor-main" class="monitor-main">
        <div id="monitor-content-wrapper" class="switch-content"></div>
        <!-- import: monitorInfos -->
    </div>
    <div id="monitor-toolbar" class="monitor-toolbar">
    </div>
</div>
