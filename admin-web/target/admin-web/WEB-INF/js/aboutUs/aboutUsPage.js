/**
 * 初始化对话框
 */
var AboutUsPage = {
    table: null,
    AboutUsData: {},
    layerIndex: -1
};

/**
 * 清除数据
 */
AboutUsPage.clearData = function () {
    this.AboutUsData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
AboutUsPage.set = function (key, val) {
    this.AboutUsData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 收集数据
 */
AboutUsPage.collectData = function () {
    this.set('id').set('companyName').set('companyAddress').set('companyContact').set('companyMail').set('companyWebsite').set('companyBriefIntroduce').set('companyIntroduce').set('logo');
}

AboutUsPage.save = function() {
    this.checkMail(); // 检验邮箱
    this.collectData();
    var ajax = new $ax("/aboutUs/saveAboutUs", function (res) {
        if(res.message == 'success') {
            layer.msg("编辑成功!");
        }
    }, function (data) {
        layer.alert("保存失败，请联系管理员!" );
    });
    ajax.set(this.AboutUsData);
    ajax.start();
}

AboutUsPage.checkMail = function() {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    var obj = document.getElementById("companyMail"); //要验证的对象
    if(obj.value === ""){ //输入不能为空
        layer.alert("请输入邮箱!");
        return false;
    }
    if(!reg.test(obj.value)){ //正则验证不通过，格式不对
        alert("请输入正确的邮箱!");
        return false;
    }
}

$(function () {
    // 初始化缩略图上传
    var avatarUp = new $WebUpload("logo");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
