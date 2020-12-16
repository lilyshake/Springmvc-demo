/**
 * 初始化部门详情对话框
 */
var EditNoticeManage = {
    table: null,
    NoticeManageData: {},
    layerIndex: -1
};

/**
 * 清除数据
 */
EditNoticeManage.clearData = function () {
    this.NoticeManageData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
EditNoticeManage.set = function (key, val) {
    this.NoticeManageData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 关闭此对话框
 */
EditNoticeManage.close = function () {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

/**
 * 收集数据
 */
EditNoticeManage.collectData = function () {
    this.set('id').set('noticeType').set('noticeName');
}

EditNoticeManage.save = function() {

    this.collectData();
    this.NoticeManageData["content"] = CKEDITOR.instances.content.getData();
    var ajax = new $ax("/noticeManage/saveNoticeManage", function (res) {
        if(res.message == 'success') {
            layer.msg("编辑成功!");
            window.parent.NoticeManagePage.table.refresh();
            EditNoticeManage.close();
        }
    }, function (data) {
        layer.alert("保存失败，请联系管理员!" );
    });
    ajax.set(this.NoticeManageData);
    ajax.start();
}

$(function () {

});
