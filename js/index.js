
var dataInfo = [];//菜单值

//初始化
$(document).ready(function(){
    // console.log(666);
});

angular.module('myapp',['ngRoute'])
/*
 *平级controller传值处理
 *@param $on
 *@param $broadcast
 */
.run(function($rootScope){
    $rootScope.$on('dataEmit',function(event,data){//接收传值
        $rootScope.$broadcast('dataBroadcast',data);//发布传值
    });

    $rootScope.$on('dataDetailEmit',function(event,data){//接收传值
        $rootScope.$broadcast('dataDetailBroadcast',data);//发布传值
    });
})

.controller('appctl',function($scope,$http){

    /*
     * 左边模块 iOS html
     */
    $scope.leftinfo = [{name:'所有', index:0},{name:'iOS', index:1},{name:'HTML', index:2}];
    setTimeout(function() {
        $('#side0').addClass('btn_active');//元素的选中状态
    }, 60);
    $scope.sideDeatil = function (code) {
        $('#side'+code).siblings().removeClass('btn_active');//移除同级元素的选中状态
        $('#side'+code).addClass('btn_active');//元素的选中状态
        $scope.$emit('dataEmit',$scope.leftinfo[code]);//传值其他controller
    };

    /*
     * 菜单列表
     */
     $http.get("backstage/sidebar.php")//读取本地数据
    .success(function (response) {
        console.log(response);
        $scope.names = response.data;
        dataInfo = $scope.names ;
    });
    //菜单列表点击事件
    $scope.joinDetail = function(index){
        console.log($scope.names[index- 1]);
        $scope.$emit('dataDetailEmit',$scope.names[index-1].url);//传值其他controller
    }
     
    $scope.$on('dataBroadcast',function(event,data){//接收其他controller传值
        $('#menu_title').text(data.name);
        if (data.index !=0) {
            var arr = new Array();
            for (var i = 0; i < dataInfo.length; i++) {
                if (dataInfo[i].type == data.index) {
                    arr.push(dataInfo[i]);
                }
            }  
            $scope.names = arr;
        }else{
            $scope.names = dataInfo;
        }
    })

    //小屏时 显示菜单列表
    $scope.showMeun = function(){
        $('.left_meun').show();
        // $scope.isShow = false;
        console.log('$scope.names');
    }
})

/*
 * 左边模块 iOS html
 */
// .controller('leftctl', function($scope) {
//     $scope.leftinfo = [{name:'所有', index:0},{name:'iOS', index:1},{name:'HTML', index:2}];
//     setTimeout(function() {
//         $('#side0').addClass('btn_active');//元素的选中状态
//     }, 60);
//     $scope.sideDeatil = function (code) {
//         $('#side'+code).siblings().removeClass('btn_active');//移除同级元素的选中状态
//         $('#side'+code).addClass('btn_active');//元素的选中状态
//         $scope.$emit('dataEmit',$scope.leftinfo[code]);//传值其他controller
//     };
// })
 /*
 * 菜单列表
 */
// .controller('sidebarctl', function($scope, $http) {
//     $http.get("backstage/sidebar.php")//读取本地数据
//     .success(function (response) {
//         $scope.names = response.data;
//         dataInfo = $scope.names ;
//     });
//     //菜单列表点击事件
//     $scope.joinDetail = function(index){
//         console.log($scope.names[index- 1]);
//         $scope.$emit('dataDetailEmit',$scope.names[index-1].url);//传值其他controller
//     }
     
//     $scope.$on('dataBroadcast',function(event,data){//接收其他controller传值
//         $('#menu_title').text(data.name);
//         if (data.index !=0) {
//             var arr = new Array();
//             for (var i = 0; i < dataInfo.length; i++) {
//                 if (dataInfo[i].type == data.index) {
//                     arr.push(dataInfo[i]);
//                 }
//             }  
//             $scope.names = arr;
//         }else{
//             $scope.names = dataInfo;
//         }
//     })
// })
/*
 * 内容显示
 */
// .controller('contentctl', function ($scope, $route) { 
//     $scope.$route = $route;
//     $scope.showMeun = function(){
//         // $('.left_meun').show();
//         $scope.isHide = false;
//         console.log('$scope.names');
//     }
// })
/*
 * 路由点击事件
 */
.config(['$routeProvider', function($routeProvider){
        // $('.left_meun').hide();

    $routeProvider

    .when('/JavaScriptCore',{
        templateUrl:'html/JavaScriptCore.html'
      
    })
    .when('/Mac_OS_Fis3',{
        templateUrl:'html/Mac_OS_Fis3.html'
    })
    .when('/delegate_block_notification',{
        templateUrl:'html/delegate_block_notification.html'
    })
    .when('/IOS_hong',{
        templateUrl:'html/IOS_hong.html'
    })
    .when('/color_location',{
        templateUrl:'html/color_location.html'
    })
    .when('/moreButton_Color',{
        templateUrl:'html/moreButton_Color.html'
    })
    .when('/tableview_select',{
        templateUrl:'html/tableview_select.html'
    })
    .otherwise({
        redirectTo:'/'

    });

}]).run(function() { // instance-injector      运行代码块
　　　　// This is an example of a run block.
　　　　// You can have as many of these as you want.
　　　　// You can only inject instances (not Providers)
　　　　// into the run blocks

        console.log(11);

　　});



