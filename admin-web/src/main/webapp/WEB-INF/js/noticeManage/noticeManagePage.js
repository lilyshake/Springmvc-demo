var NoticeManagePage = {
    tableId: "noticeManageTable",	//title表格id
    seItem: [],		//选中的条目
    table: null,
    layerIndex: -1,
    paramData: {
        noticeName: $("#noticiName").val(),
        beginTime: $("#beginTime").val(),
        endTime: $("#endTime").val(),
        createUser: $("#createUser").val()
    }//搜索参数
};

/**
 * 初始化表格的列 内容
 */
function initColumn() {
    return [
        {field: 'selectItem', checkbox: true},
        {title: 'id', field: 'id', align: 'center', valign: 'middle', visible: false},
        {title: '公告名称', field: 'noticeName', align: 'center', valign: 'middle'},
        {title: '公告类型', field: 'noticeType', align: 'center', valign: 'middle'},
        {title: '发布时间', field: 'createTime', align: 'center', valign: 'middle', sortable: true},
        {title: '发布人', field: 'createUser', align: 'center', valign: 'middle', sortable: true}];
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
        content: '/noticeManage/editNoticeManage'
    });
    this.layerIndex = index;
};

/**
 * 点击编辑
 */
function edit() {
    var selected = $('#noticeManageTable').bootstrapTable('getSelections');
    if (selected.length == 0 || selected.length > 1) {
        layer.alert('请选择一条记录编辑!');
    } else {
        var index = layer.open({
            type: 2,
            title: '修改',
            area: ['90%', '95%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: '/noticeManage/editNoticeManage?id=' + selected[0].id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除标题
 */
function del() {
    var ids = [];
    var selected = $('#noticeManageTable').bootstrapTable('getSelections');
    if (selected.length == 0) {
        layer.alert('请至少选择一条记录!');
    } else {
        for (var i = 0; i < selected.length; i++) {
            ids.push(selected[i].id);
        }
        layer.confirm('确定要删除吗？？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var ajax = new $ax("/noticeManage//deleteNotice?ids=" + ids, function () {
                layer.msg('删除成功！');
                NoticeManagePage.table.refresh();
            }, function (data) {
                layer.alert('删除失败,请联系管理员!');
            });
            ajax.start();
        }, function(){

        });
    }
};

/**
 * 查询列表
 */
NoticeManagePage.search = function () {
    this.paramData = {
        noticeName: $("#noticeName").val(),
        //noticeType:$("#noticeType").val(),
        beginTime: $("#beginTime").val(),
        endTime: $("#endTime").val(),
        createUserParam: $("#createUser").val()
    };
    NoticeManagePage.table.refresh({query: this.paramData});
};

$(function () {
    var defaultColunms = initColumn();
    var table = new BSTable("noticeManageTable", "/noticeManage/getNoticeList", defaultColunms);
    table.setPaginationType("client");
    NoticeManagePage.table = table.init();
});
