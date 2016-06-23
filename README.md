##  XQuick.js  ##


# 链式写法 #

      X('#filecontent').click(function(){
      X(this).
      addclass('slidein splash').
	  fadeout('20').
      setattr('w','2').
      getattr('w',function(value){
           console.log(value);
        });

       });


# jsonp函数 #

方法：X().jsonp(option);

	 * 作用：jsonp跨域http请求
	 * @param {object}  参数为对象集
	 * @return 无
	 * var option={
	 * url:'',//jsonp 请求地址
	 * data:'', //传输的参数集
	 * callback:'', //回调参数名
	 * success:functon(e){},//成功回调函数
	 * fail:function(e){}//成功回调函数，错误回调函数
	 * }
	 
	 例子如下：
	 X().jsonp({
        url: "http://api.xiaoxialicai.com/index.php?__=oauth/sendInvalidcode&__VIEW__=jsonp", //请求地址        
             
        data: { phone: "13564202021"，password:'12345'},        //请求参数        
        callback: "jsonp",
        success: function (data) {
		console.log(data.code);
            // 此处放成功后执行的代码        
        },
        fail: function (status) {
            // 此处放失败后执行的代码        
        }
    });
	 

  以上方法需要修复bug:
  

1. 时间戳
1. 延迟时间自定义

# ajax函数 #

方法：X().ajax(option);

     作用：jsonp跨域http请求
	  @param {object}  参数为对象集
	 * @return 无
	 * var option={
	 * url:'',//jsonp 请求地址
	 * data:'', //传输的参数集
	 * callback:'', //回调参数名
	 * success:functon(e){},//成功回调函数
	 * fail:function(e){}//成功回调函数，错误回调函数
	 * 例子：
       /*ajax({
           url: "./TestXHR.aspx",   //请求地址        
           type: "POST",        //请求方式        
           data: { name: "super", age: 20 },//请求参数        
           dataType: "json",
           success: function (response, xml) {
            // 此处放成功后执行的代码        
           },
            fail: function (status) {
            // 此处放失败后执行的代码        
            }
           });



# ready函数 #


方法：X().ready(function(){});
	
	 * 作用：在DOM 元素加载完毕时候执行，在 window.onload方法之前
	 * @param {object}  参数为方法
	 * @return 无
	 * 例子：
	  X().ready(function(){
      alert(12);
     });

说明：以上方法支持IE

# window.onload 方法 #

方法：X(function(){});//相当于onload
      
     X(this).setCookietime('hj','2344','5s');
     * 作用：相当于onload
	 * @param {function}  参数为方法
	 * @return 无
	 * 例子：
	 X(function(){
          X(this).setCookietime('hj','2344','5s');
      });

# addclass函数 #


方法：X('#id').addclass('classname');
	
	 * 作用：增加css样式类
	 * @param {string}  参数为字符串
	 * @return 当前dom元素对象
	 * 例子：
	  X('#tel').click(function(){
	   X(this).addclass('w');
    });


# click函数 #


方法：X('#id').click(function(){});
	
	 * 作用：增加css样式类名称
	 * @param {string}  参数为字符串
	 * @return 当前dom元素对象
	 * 例子：
	  X('#tel').click(function(){
	   alert('ko');      
     });


# each函数 #


方法：X().each(objectarray,function(index,object){});
	
	 * 作用：遍历所有数组
	 * @param {objectarray,callbackfn}  参数为字符串
	 * @return 当前dom元素对象
	 * 例子：
	  X().click(X('img'),function(index,o){
	   console.log(index);    
           if (index==2)  {  X(o).attr('scr')}
     });


# val函数 #


方法：X(dom).val();
	
	 * 作用：获取或设置当前input中value值
	 * @param {string}  参数为字符串
	 * @return value值
	 * 例子：
	  X('input').val();
	   X('input').val('请输入手机号码');



# attr函数 #


方法：X(dom).attr();
	
	 * 作用：获取或设置当前dom 的自定义属性
	 * @param {string}  参数为字符串
	 * @return value值
	 * 例子：
	  X('input').attr('data');
	   X('input').attr('data','123');


# removeattr函数 #

方法：X(dom).removeattr();
	
	 * 作用：删除指定的属性
	 * @param {string}  参数为字符串
	 * @return value值
	 * 例子：
	  X('input').removeattr('data');
	


# show函数 #

方法：X(dom).show();
	
	 * 作用：显示dom
	 * @param {}  
	 * @return value值
	 * 例子：
	  X('#file').show();

# hide函数 #

方法：X(dom).show();
	
	 * 作用：隐藏dom
	 * @param {}  
	 * @return 当前dom
	 * 例子：
	  X('#file').hide();

# focus函数 #

方法：X(dom).focus(function（）{});
	
	 * 作用:监听focus 时间
	 * @param {callback}  
	 * @return 当前dom
	 * 例子：
	  X('#file').focus(function(){
            X(this).val();
      //执行你自己的动作
     });


# blur函数 #

方法：X(dom).blur(function（）{});
	
	 * 作用:监听blur 时间
	 * @param {callback}  
	 * @return 当前dom
	 * 例子：
	  X('#file').blur(function(){
            X(this).val();
      //执行你自己的动作
     });

# fadein函数 #

方法：X(dom).fadein(speed,opacity);
	
	 * 作用:淡入
	 * @param {callback}  
	 * @return 当前dom
	 * 例子：
	  X('#file').fadein('300');


# fadeout函数 #

方法：X(dom).fadeout(speed,opacity);
	
	 * 作用:淡出
	 * @param {callback}  
	 * @return 当前dom
	 * 例子：
	  X('#file').fadeout('300');

