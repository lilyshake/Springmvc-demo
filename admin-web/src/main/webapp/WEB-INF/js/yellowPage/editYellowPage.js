/**
 * 初始化对话框
 */
var EditYellowPage = {
    table: null,
    YellowPageData: {},
    layerIndex: -1,
    businessType: []
};
/**
 * 清除数据
 */
EditYellowPage.clearData = function () {
    this.YellowPageData = {};
}
/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
EditYellowPage.set = function (key, val) {
    this.YellowPageData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 关闭此对话框
 */
EditYellowPage.close = function () {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

/**
 * 收集数据
 */
EditYellowPage.collectData = function () {
    this.set('id').set('companyName').set('companyAddress').set('companyContact').set('companyPerson').set('logo').set('score').set('companyIntroduce');
}

EditYellowPage.save = function() {
    if(EditYellowPage.businessType.length == 0) {
        layer.msg("请选择业务类型")
        return;
    } else {
        this.collectData();
        EditYellowPage.businessType =  bubbleSort(EditYellowPage.businessType);
        EditYellowPage.YellowPageData["businessType"] = EditYellowPage.businessType + "";

        var ajax = new $ax("/yellowPage/saveYellowPage", function (res) {
            if(res.message == 'success') {
                layer.msg("编辑成功!");
                window.parent.YellowPage.table.refresh();
                EditYellowPage.close();
            }
        }, function (data) {
            layer.alert("保存失败，请联系管理员!" );
        });
        ajax.set(EditYellowPage.YellowPageData);
        ajax.start();
    }
}

function addItem(item, value){
    EditYellowPage.businessType.push(value);
    $(item).addClass("active")
    $(item).attr("onclick", "removeItem(this,'"+value+"')");
}

function removeItem(item,value) {
    remove(value);
    $(item).attr("onclick", "addItem(this,'"+value+"')");
    $(item).removeClass("active");
}

function  remove(val) {
    var index = EditYellowPage.businessType.indexOf(val);
    if (index > -1) {
        EditYellowPage.businessType.splice(index, 1);
        console.log("业务类型："+EditYellowPage.businessType)
    }
};

function bubbleSort(arr) { // 冒泡排序
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

$(function () {
    // 初始化缩略图上传
    var avatarUp = new $WebUpload("logo");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();

    if($("#id").val() != "") { //根据后台的值设定所选项的样式
        var value = $("#typeValue").val().split(",");
        EditYellowPage.businessType = value;
        if(value.includes('1')) {
            document.getElementById("a1").setAttribute("onclick","removeItem(this,'1')");
            document.getElementById("a1").setAttribute("class","active");
        } if(value.includes('2') ) {
            document.getElementById("a2").setAttribute("onclick","removeItem(this,'2')");
            document.getElementById("a2").setAttribute("class","active");
        } if(value.includes('3')) {
            document.getElementById("a3").setAttribute("onclick","removeItem(this,'3')");
            document.getElementById("a3").setAttribute("class","active");
        } if(value.includes('4')) {
            document.getElementById("a4").setAttribute("onclick","removeItem(this,'4')")
            document.getElementById("a4").setAttribute("class","active");
        } if(value.includes('5')) {
            document.getElementById("a5").setAttribute("onclick","removeItem(this,'5')");
            document.getElementById("a5").setAttribute("class","active");
        }
    }
});

