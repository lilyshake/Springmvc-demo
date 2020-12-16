var YellowPage = {
    tableId: "yellowPageTable",	//title表格id
    seItem: [],		//选中的条目
    table: null,
    layerIndex: -1,
    paramData: {},//搜索参数
    businessCondition: [] //业务类型
};

/**
 * 初始化表格的列
 */
function initColumn() {
    return [
        {field: 'selectItem', checkbox: true},
        {title: 'id',       field: 'id',         align: 'center', valign: 'middle', visible: false},
        {title: '公司名称', field: 'companyName',      align: 'center', valign: 'middle'},
        {title: '公司地址', field: 'companyAddress',     align: 'center', valign: 'middle'},
        {title: '业务类型', field: 'businessType',      align: 'center', valign: 'middle', formatter:function (value,row,indes) {
            var rst = [];
            if(value.indexOf(1) > -1 ){
                rst.push("咨询服务类");
            } if(value.indexOf(2) > -1 ){
                rst.push("仪器设备类");
            } if(value.indexOf(3) > -1 ){
                rst.push("检测监测类");
            } if(value.indexOf(4) > -1 ){
                rst.push("智慧环保类");
            }  if(value.indexOf(5) > -1 ){
                rst.push("工程治理类");
            }
            return rst;
            }},
        {title: '联系方式', field: 'companyContact',     align: 'center', valign: 'middle'},
        {title: '联系人', field: 'companyPerson', align: 'center', valign: 'middle', sortable: true}];
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
        content:  '/yellowPage/editYellowPage'
    });
    this.layerIndex = index;
};

/**
 * 点击编辑
 */
function edit() {
    var selected = $('#yellowPageTable').bootstrapTable('getSelections');
    if(selected.length == 0 || selected.length > 1 ){
        layer.alert('请选择一条记录编辑!');
    } else {
        var index = layer.open({
            type: 2,
            title: '修改',
            area: ['90%', '95%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content:  '/yellowPage/editYellowPage?id=' + selected[0].id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除黄页
 */
function del() {
    var ids = [];
    var selected = $('#yellowPageTable').bootstrapTable('getSelections');
    if(selected.length == 0) {
        layer.alert('请至少选择一条记录!');
    } else {
        for(var i=0; i<selected.length; i++) {
            ids.push(selected[i].id);
        }
        layer.confirm('确定要删除吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            var ajax = new $ax( "/yellowPage/deleteYellowPage?ids="+ids, function () {
                layer.msg('删除成功！');
                YellowPage.table.refresh();
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
YellowPage.search = function () {
    this.paramData  = {
        companyName:$("#companyName").val()
    };
    YellowPage.table.refresh({queryParams: this.paramData});
};

function selectCondition(item, value) {
    var that = YellowPage;
    that.businessCondition.push(value);
    YellowPage.businessCondition = bubbleSort(YellowPage.businessCondition);
    that.paramData  = {
        companyName:$("#companyName").val(),
        businessType: that.businessCondition + ""
    };
    $(item).addClass("active");
    $(item).attr("onclick", "removeCondition(this,'"+value+"')");
    that.table.refresh({query: that.paramData})
}

function removeCondition(item, value) {
    remove(value);
    YellowPage.businessCondition = bubbleSort(YellowPage.businessCondition);
    YellowPage.paramData  = {
        companyName:$("#companyName").val(),
        businessType: YellowPage.businessCondition + ""
    };
    $(item).removeClass("active");
    $(item).attr("onclick", "selectCondition(this,'"+value+"')");
    YellowPage.table.refresh({query: YellowPage.paramData})
}

function  remove(val) {
    var index = YellowPage.businessCondition.indexOf(val);
    if (index > -1) {
        YellowPage.businessCondition.splice(index, 1);
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
    var defaultColunms = initColumn();
    var table = new BSTable("yellowPageTable", "/yellowPage/getYellowPageList", defaultColunms);
    table.setPaginationType("client");
    YellowPage.table = table.init();
});
