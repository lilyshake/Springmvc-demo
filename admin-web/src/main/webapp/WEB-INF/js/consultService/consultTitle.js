/**
 * 初始化部门详情对话框
 */
var ConsultTitle = {
    table: null,
    ConsultTitleData: {},
    layerIndex: -1,
    saveTitleFlag: -1,
};

/**
 * 清除数据
 */
ConsultTitle.clearData = function () {
    this.ConsultTitleData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ConsultTitle.set = function (key, val) {
    this.ConsultTitleData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 关闭此对话框
 */
ConsultTitle.close = function () {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

/**
 * 收集数据
 */
ConsultTitle.collectData = function () {
    this.set('id').set('title').set('icon').set('remark');
}

/**
 * 保存
 */
ConsultTitle.save = function () {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax("/consultService/saveConsultServiceTitle", function (res) {
        if (res.message == "exists") {
            layer.alert('标题已存在，请重新命名。');
            return;
        } else {
            layer.msg('编辑成功！');
            console.log(res.object);
            $("#id").val(res.object);

        }
    }, function (res) {
        layer.msg('修改失败！');
    });
    ajax.set(this.ConsultTitleData);
    ajax.start();
}

ConsultTitle.add = function () {
    if ($("#id").val() == "") { // 新增时 需要先增加title 才能添加内容 按钮设置灰色
        layer.alert('请先添加服务名称!');
        return;
    } else {
        var index = layer.open({
            type: 2,
            title: '添加',
            area: ['90%', '95%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: '/consultService/consultContentPage?titleId=' + $("#id").val()
        });
        this.layerIndex = index;
    }
}

ConsultTitle.edit = function () {
    if ($("#id").val() == "") { // 新增时 需要先增加title 才能添加内容 按钮设置灰色
        layer.alert('请先添加服务名称!');
        return;
    } else {
        var selected = $('#consultContentTable').bootstrapTable('getSelections');
        if(selected.length == 0 || selected.length > 1) {
            layer.alert('请选择一条记录!');
        } else {
            var index = layer.open({
                type: 2,
                title: '编辑',
                area: ['90%', '95%'], //宽高
                fix: false, //不固定
                maxmin: true,
                content:  '/consultService/consultContentPage?id=' + selected[0].id + '&titleId=' + $("#id").val()
            });
            this.layerIndex = index;
        }
    }
}

ConsultTitle.del = function () {
    if ($("#id").val() == "") { // 新增时 需要先增加title 才能添加内容 按钮设置灰色
        layer.alert('请先添加服务名称!');
        return;
    } else {
        var ids = [];
        var selected = $('#consultContentTable').bootstrapTable('getSelections');
        if (selected.length == 0) {
            layer.alert('请至少选择一条记录!');
        } else {
            for (var i = 0; i < selected.length; i++) {
                ids.push(selected[i].id);
            }
            var operation = function () {
                var ajax = new $ax(Feng.ctxPath + "/consultService/deleteContent?ids=" + ids, function () {
                    layer.msg('删除成功！');
                    ConsultTitle.table.refresh();
                }, function (data) {
                    layer.alert('删除失败,请联系管理员!');
                });
                ajax.start();
            };
            Feng.confirm("是否确认删除?", operation);
        }
    }
}

/**
 * 初始化表格的列 内容
 */
function initColumn() {
    return [
        {field: 'selectItem', checkbox: true},
        {title: 'id',       field: 'id',         align: 'center', valign: 'middle', visible: false},
        {title: '服务id', field: 'titleId',      align: 'center', valign: 'middle',visible: false},
        {title: '内容', field: 'question',     align: 'center', valign: 'middle'}];
};

ConsultTitle.tableReflash = function() {
    var data = {titleId:$("#id").val() }
    ConsultTitle.table.refresh({queryParams : data});
}

$(function() {
    //初始化内容tabke
    var defaultColunms = initColumn();
    var table = new BSTable("consultContentTable", "/consultService/getConsultServiceContentList?titleId=" +$("#id").val() , defaultColunms);
    table.setPaginationType("client");
    ConsultTitle.table = table.init();

    // 初始化缩略图上传
    var avatarUp = new $WebUpload("icon");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
