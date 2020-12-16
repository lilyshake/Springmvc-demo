/**
 * 初始化部门详情对话框
 */
var ConsultContent = {
    table: null,
    ConsultContentData: {},
    layerIndex: -1
};

/**
 * 清除数据
 */
ConsultContent.clearData = function () {
    this.ConsultContentData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ConsultContent.set = function (key, val) {
    this.ConsultContentData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 关闭此对话框
 */
ConsultContent.close = function () {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

/**
 * 收集数据
 */
ConsultContent.collectData = function () {
    this.set('id').set('titleId').set('question');
}

ConsultContent.save = function() {

    this.collectData();
    this.ConsultContentData["content"] = CKEDITOR.instances.content.getData();
    var ajax = new $ax("/consultService/saveContent", function (res) {
        if(res.message == 'success') {
            layer.msg("编辑成功!");
            window.parent.ConsultTitle.tableReflash();
            ConsultContent.close();
        }
    }, function (data) {
        layer.alert("保存失败，请联系管理员!" );
    });
    ajax.set(this.ConsultContentData);
    ajax.start();
}

$(function () {

});
