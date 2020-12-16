layui.use('table', function () {
    var table = layui.table;
    var util = layui.util;
    table.render({
        elem: '#usertable'
        , url: '/log/showAllLogList'
        , method: 'get'
        , initSort: {
            field: 'opreatorTime'
            , type: 'desc'
        }
        , parseData: function (res) {
            return {
                "code": 0
                , "msg": ""
                , "count": res.length
                , "data": res
            }
        }
        , cellMinWidth: 100
        , cols: [[
            {field: 'id', title: 'ID', width: 80, align: "center", hide: "true", sort: true}
            , {field: 'operatorName', title: '操作人', width: 120, align: "center"}
            , {
                field: 'opreatorTime', title: '操作时间', width: 200, align: "center", sort: true, templet: function (d) {
                    return util.toDateString(d.opreatorTime, "yyyy-MM-dd HH:mm:ss");
                }
            }
            , {field: 'operationType', title: '操作类型', width: 120, align: "center"}
            , {field: 'operationDetail', title: '操作细节', align: "center"}
        ]]
    });
});