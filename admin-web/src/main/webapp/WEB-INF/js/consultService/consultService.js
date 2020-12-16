var ConsultService = {
    tableId: "consultTitleTable",	//title表格id
    seItem: [],		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列 内容
 */
function initColumn() {
    return [
        {field: 'selectItem', checkbox: true},
        {title: 'id', field: 'id', align: 'center', valign: 'middle', visible: false},
        {title: '服务名称', field: 'title', align: 'center', valign: 'middle'},
        {title: '服务说明', field: 'remark', align: 'center', valign: 'middle'},
        {
            title: '状态', field: 'state', align: 'center', valign: 'middle', sortable: true,
            formatter: function (value, row, index) {
                if (value == 0) {
                    return "已启用"
                } else {
                    return "已禁用"
                }
            }
        },
        {title: '应用上线时间', field: 'createTime', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 点击新增
 */
function add() {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['90%', '95%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: '/consultService/consultTitlePage',
        cancel: function(){
            ConsultService.table.refresh();
        }
    });
    this.layerIndex = index;
};

/**
 * 点击编辑
 */
function edit() {
    var selected = $('#consultTitleTable').bootstrapTable('getSelections');
    if (selected.length == 0 || selected.length > 1) {
        layer.alert('请选择一条记录编辑!');
    } else {
        var index = layer.open({
            type: 2,
            title: '修改',
            area: ['90%', '95%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: '/consultService/consultTitlePage?id=' + selected[0].id,
            cancel: function(){
                ConsultService.table.refresh();
            }
        });
        this.layerIndex = index;
    }
};

/**
 * 删除标题
 */
function del() {
    var ids = [];
    var selected = $('#consultTitleTable').bootstrapTable('getSelections');
    if (selected.length == 0) {
        layer.alert('请至少选择一条记录!');
    } else {
        for (var i = 0; i < selected.length; i++) {
            ids.push(selected[i].id);
        }
        layer.confirm('确定要删除吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var ajax = new $ax("/consultService/deleteConsultServiceTitle?ids="+ids, function () {
                layer.msg('删除成功！');
                ConsultService.table.refresh();
            }, function (data) {
                layer.alert('删除失败,请联系管理员!');
            });
            ajax.start();
        }, function(){

        });
    }
};

/**
 * 启用项目
 */
function startUp() {
    var selected = $('#consultTitleTable').bootstrapTable('getSelections');
    if (selected.length == 0 || selected.length > 1) {
        layer.alert("请选择一条记录！");
    } else {
        if (selected[0].state == 0) {
            layer.msg("请勿重复启用应用！");
            return;
        } else {
            var data = {
                id: selected[0].id,
                state: 0
            }
            var ajax = new $ax(Feng.ctxPath + "/consultService/updateTitleState", function (res) {
                if (res.message == "success") {
                    layer.msg("启用成功!");
                    ConsultService.table.refresh();
                }
            }, function (data) {
                layer.alert("启用失败,请联系管理员!");
            });
            ajax.set(data);
            ajax.start();
        }
    }
};

/**
 * 禁用服务
 */
function ban() {
    var selected = $('#consultTitleTable').bootstrapTable('getSelections');
    if (selected.length == 0 || selected.length > 1) {
        layer.alert("请选择一条记录！");
    } else {
        if (selected[0].state == 1) {
            layer.msg("请勿重复禁用应用！");
            return;
        } else {
            var data = {
                id: selected[0].id,
                state: 1
            }
            var ajax = new $ax(Feng.ctxPath + "/consultService/updateTitleState", function (res) {
                if (res.message == "success") {
                    layer.msg("禁用成功!");
                    ConsultService.table.refresh();
                }
            }, function (data) {
                layer.alert("禁用失败,请联系管理员!");
            });
            ajax.set(data);
            ajax.start();
        }
    }
};

$(function () {
    var defaultColunms = initColumn();
    var table = new BSTable("consultTitleTable", "/consultService/getConsultServiceTitleList", defaultColunms);
    table.setPaginationType("client");
    ConsultService.table = table.init();
});
