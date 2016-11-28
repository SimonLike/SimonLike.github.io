
var dataInfo = [];//菜单值

//初始化
$(document).ready(function(){
    // console.log(666);
});

$.getJSON("/backstage/sidebar.json", function (data) {
    dataInfo = data.data;
    var html = template('meun_list',data.data);
    $('#meunid').html('').append(html);
});

$('.sidebar li').click(function(){
    $(this).siblings().removeClass('btn_active');//移除同级元素的选中状态
    $(this).addClass('btn_active');//元素的选中状态
    
    var flag = $(this).attr('flag');
    var mn = new Array();
    if (flag==0) {
        mn= dataInfo;
    }else{
        for (var i = 0; i < dataInfo.length; i++) {
            if (dataInfo[i].type == flag) {
                mn.push(dataInfo[i]);
            } 
        }
    }
    console.log();
    var html = template('meun_list',mn);
    $('#meunid').html('').append(html);
})

$('#meunid').on('click','.list_box',function(){
    $('#loadhtml').load($(this).attr('url'));
})



