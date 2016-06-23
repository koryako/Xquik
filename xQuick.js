(function () {
    var global = this;
    if (typeof X === 'undefined') {
        //写一个类似Jquery的$方法
        global.X = function (vArg) {
            return new xQuick(vArg);
        }
    }



    function xQuick(vArg) {
        this.elements = []; //用来保存选中的数组
        this.shan=false;

        switch (typeof vArg) {
            case "function":
                bindEvent(window, "load", vArg);
                break;
            case "string":
                switch (vArg.charAt(0)) {
                    case "#": //id选择器
                        var obj = document.getElementById(vArg.substring(1));
                        this.elements.push(obj);
                        break;
                    case ".": //类选择器
                        this.elements = getElementsByClassName(document, vArg.substring(1));
                        break;
                    default: //标签选择器
                        this.elements = document.getElementsByTagName(vArg);
                        break;
                }
                break;
            case "object":
                this.elements.push(vArg);
                break;
        }
    }
    //下面来通过原型的方法给xQuick对象添加各种方法:
    xQuick.prototype = {
        click: function (fn) {
            var i = 0;
            for (i = 0; i < this.elements.length; i++) {
                bindEvent(this.elements[i], "click", fn);
            }
            i = null; //通过js的作用域我们知道,这时候i还有值的,i = this.elements.length;,所以我们需要手动释放i;
            //为了实现jquery的链式操作,我们需要返回当前对象

            return this;
        },
        val: function (value) {
            if (value == undefined) {
                return this.elements[0].value;
            } else {
                this.elements[0].value = value;
            }
        },
        remove: function (_element) {
            if (_element == undefined) {
                var _ele = this.elements[0];
            } else {
                var _ele = _element;
            }
            var _parentElement = _ele.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(_ele);
            }
        },
        html: function (value) {
            if (value == undefined) {
                return this.elements[0].innerHTML;
            } else {
                this.elements[0].innerHTML = value;
            }
        },
        text: function (value) {
            if (value == undefined) {
                return this.elements[0].innerText;
            } else {
                this.elements[0].innerText = value;
            }
        },
        childen: function () {
            return this.elements[0].childNodes;
        },
        removeattr: function (name) {
            this.elements[0].removeAttribute(name);
        },
        attr: function (name, value) {
            if (arguments.length == 2) { //传两个参数的时候,设置属性

                this.setattr(name, value);
                return this;
            } else {
                var v;
                this.getattr(name, function (value) {
                    v = value;
                });
                return v;
            }
        },

        each: function (object, fn) {
            for (var i = 0; i < object.elements.length; i++) {
                fn(i, object.elements[i]);
            }
        },


        eachin: function (object, callback, args) {
            //该方法有三个参数:进行操作的对象obj，进行操作的函数fn，函数的参数args
            var name, i = 0,
                length = object.length;
            if (args) {
                if (length == undefined) {
                    for (name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(object[i++], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (length == undefined) {
                    for (name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
                    /*object[0]取得jQuery对象中的第一个DOM元素，通过for循环，
                     得到遍历整个jQuery对象中对应的每个DOM元素，通过 callback.call( value,i,value);
                     将callback的this对象指向value对象，并且传递两个参数,i表示索引值，value表示DOM元素；
                     其中callback是类似于 function(index, elem) { ... } 的方法。
                     所以就得到 $("...").each(function(index, elem){ ... });*/

                }
            }
            return object;
        },
        show: function () {
            this.css('display', 'block');
            return this;
        },
        hide: function () {
            this.css('display', 'none');
            return this;
        },
        focus: function (fn) {
            var i = 0;
            for (i = 0; i < this.elements.length; i++) {
                bindEvent(this.elements[i], "focus", fn);
            }
            i = null; //通过js的作用域我们知道,这时候i还有值的,i = this.elements.length;,所以我们需要手动释放i;
            //为了实现jquery的链式操作,我们需要返回当前对象

            return this;
        },
        blur: function (fn) {
            var i = 0;
            for (i = 0; i < this.elements.length; i++) {
                bindEvent(this.elements[i], "blur", fn);
            }
            i = null; //通过js的作用域我们知道,这时候i还有值的,i = this.elements.length;,所以我们需要手动释放i;
            //为了实现jquery的链式操作,我们需要返回当前对象

            return this;
        },
        fadein: function (speed, opacity) {
            for (var i = 0; i < this.elements.length; i++) {
                fadeIn(this.elements[i], speed, opacity);
            }
            return this;
        },
        fadeout: function (speed, opacity) {
            for (var i = 0; i < this.elements.length; i++) {
                fadeOut(this.elements[i], speed, opacity);
            }
            return this;
        },
        on: function (eventname, func) {
            var i = 0;
            for (i = 0; i < this.elements.length; i++) {
                addEventHandler(this.elements[i], eventname, func);
            }
            i = null; //通过js的作用域我们知道,这时候i还有值的,i = this.elements.length;,所以我们需要手动释放i;
            return this;
        }, 　　hover: function (fnOver, fnOut) { //hover有bug

            var i = 0;
            for (i = 0; i < this.elements.length; i++) {
                if (fnOver) {
                    bindEvent(this.elements[i], "mouseover", fnOver);
                }
                if (fnOut) {
                    bindEvent(this.elements[i], "mouseout", fnOut);
                }
            }
            return this;
        },
        addclass: function (cls) {
            for (var i = 0; i < this.elements.length; i++) {
                addClass(this.elements[i], cls);
            }
            return this;
        },
        removeclass: function (cls) {
            for (var i = 0; i < this.elements.length; i++) {
                removeClass(this.elements[i], cls);
            }
            return this;
        },
        toggleclass: function (cls) {
            for (var i = 0; i < this.elements.length; i++) {
                toggleClass(this.elements[i], cls);
            }
            return this;
        },
        setattr: function (name, value) {
            for (var i = 0; i < this.elements.length; i++) {
                setAttr(this.elements[i], name, value);
            }
            return this;
        },
        getattr: function (name, call) {
            var value = new Array();
            for (var i = 0; i < this.elements.length; i++) {
                value.push(getAttr(this.elements[i], name));
            }
            if (value.length == 1) {
                call(value[0]);
            } else {
                call(value);
            }
            return this;
        },
        css: function (attr, value) {
            if (arguments.length == 2) { //传两个参数的时候,设置样式　　　　　

                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style[attr] = value;
                }
            }
            else { //传进来一个参数.又分两种情况,一种是字符串,一种是json的形式

                if (typeof attr == "string") {
                    return getStyle(this.elements[0], attr)
                }
                else { //以json的形式传进来的

                    for (var i = 0; i < this.elements.length; i++) {
                        for (var a in attr) {
                            this.elements[i].style[a] = attr[a];
                        }
                    }
                    return this;
                }
            }
        },
        setCookie: function (name, value, domain) //设置cookies
        {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; domain=" + domain + "; path=/";

        },
        getCookie: function (name) {
            var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },
        delCookie: function (name) //暂未使用, 默认1200秒过期，无需手动删除
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        },

        //如果需要设定自定义过期时间
        //那么把上面的setCookie　函数换成下面这个函数就ok;

        setCookietime: function (name, value, time) {
            var strsec = getsec(time);
            var exp = new Date();
            exp.setTime(exp.getTime() + time * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        ajax: function (options) {
            options = options || {};
            options.type = (options.type || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            var params = formatParams(options.data);
            //创建 - 非IE6 - 第一步
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else {
                //IE6及其以下版本浏览器
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            //接收 - 第三步
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.fail && options.fail(status);
                    }
                }
            }

            //连接 和 发送 - 第二步
            if (options.type == "GET") {
                xhr.open("GET", options.url + "?" + params, true);
                xhr.send(null);
            } else if (options.type == "POST") {
                xhr.open("POST", options.url, true);
                //设置表单提交时的内容类型
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        },
        jsonp: function (options) {
            options = options || {};
            if (!options.url || !options.callback) {
                throw new Error("参数不合法");
            }

            //创建 script 标签并加入到页面中
            var callbackName = ('jsonp_' + Math.random()).replace(".", "");
            var oHead = document.getElementsByTagName('head')[0];
            options.data[options.callback] = callbackName;
            var params = formatParams(options.data);
            var oS = document.createElement('script');
            oHead.appendChild(oS);

            //创建jsonp回调函数
            window[callbackName] = function (json) {
                oHead.removeChild(oS);
                clearTimeout(oS.timer);
                window[callbackName] = null;
                options.success && options.success(json);
            };

            if (options.url.match(/(&)/i)) {
                oS.src = options.url + '&' + params;
            } else {
                //发送请求
                oS.src = options.url + '?' + params;
            }
            //超时处理
            if (options.time) {
                oS.timer = setTimeout(function () {
                    window[callbackName] = null;
                    oHead.removeChild(oS);
                    options.fail && options.fail({
                        message: "超时"
                    });
                }, time);
            }
        },
        ready: function (readyFn) {
            //非IE浏览器
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function () {
                    readyFn && readyFn();
                }, false);
            } else {
                //方案1和2  哪个快用哪一个
                var bReady = false;
                //方案1
                document.attachEvent('onreadystatechange', function () {
                    if (bReady) {
                        return;
                    }
                    if (document.readyState == 'complete' || document.readyState == "interactive") {
                        bReady = true;
                        readyFn && readyFn();
                    };
                });

                //方案2
                //jquery也会担心doScroll会在iframe内失效，此处是判断当前页是否被放在了iframe里                if (!window.frameElement) {
                setTimeout(checkDoScroll, 1);
            }

            function checkDoScroll() {
                try {
                    document.documentElement.doScroll("left");
                    if (bReady) {
                        return;
                    }
                    bReady = true;
                    readyFn && readyFn();
                } catch (e) {
                    // 不断检查 doScroll 是否可用 - DOM结构是否加载完成
                    setTimeout(checkDoScroll, 1);
                }
            };
        },

        extend: function (name, fn) { //xQuick 插件扩展

            xQuick.prototype[name] = fn;
        }, //
    };

    function getAttr(obj, sName) {

        return obj.getAttribute(sName);

    }

    /*
     * addEventListener:监听Dom元素的事件
     *
     * target：监听对象
     * type：监听函数类型，如click,mouseover
     * func：监听函数
     */
    function addEventHandler(target, type, func) {

        type = type.trim();
        var eventname = type.split(' ');
        for (var i = 0; i < eventname.length; i++) {
            if (target.addEventListener) {
                //监听IE9，谷歌和火狐
                target.addEventListener(eventname[i], func, false);
            } else if (target.attachEvent) {
                target.attachEvent("on" + eventname[i], func);
            } else {
                target["on" + eventname[i]] = func;
            }
        }

    }
    /*
     * removeEventHandler:移除Dom元素的事件
     *
     * target：监听对象
     * type：监听函数类型，如click,mouseover
     * func：监听函数
     */

    function removeEventHandler(target, type, func) {
        if (target.removeEventListener) {
            //监听IE9，谷歌和火狐
            target.removeEventListener(type, func, false);
        } else if (target.detachEvent) {
            target.detachEvent("on" + type, func);
        } else {
            delete target["on" + type];
        }
    }



    function setAttr(obj, sName, vValue) {
        if (getAttr(obj, sName) == undefined) {

            obj.sName = ""
            obj.setAttribute(sName, vValue);
        } else {
            obj.setAttribute(sName, vValue);
        }
    }

    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(obj, cls) {


        if (!hasClass(obj, cls)) {
            obj.className = obj.className.trim();
            //if (obj.className.split(' ').length<2)//没有空格

            obj.className += " " + cls;
        }
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');


            obj.className = obj.className.replace(reg, ' ');
            obj.className = obj.className.trim();
        }
    }

    function toggleClass(obj, cls) {
        if (hasClass(obj, cls)) {
            removeClass(obj, cls);
        } else {
            addClass(obj, cls);
        }
    }


    function fadeOut(elem, speed, opacity) {
        /*
         * 参数说明
         * elem==>需要淡入的元素
         * speed==>淡入速度,正整数(可选)
         * opacity==>淡入到指定的透明度,0~100(可选)
         */

        if (!this.shan){
        speed = speed || 20;
        opacity = opacity || 0;
        //初始化透明度变化值为0


        var val = 100;
        //循环将透明值以5递减,即淡出效果
        (function () {
            SetOpacity(elem, val);
            val -= 5;
            if (val >= opacity) {
                this.shan=true;
                setTimeout(arguments.callee, speed);
            } else if (val < 0) {
                this.shan=false;
                //元素透明度为0后隐藏元素
                elem.style.display = 'none';
            }
        })();

      }
    }

    function fadeIn(elem, speed, opacity) {
        /*
         * 参数说明
         * elem==>需要淡入的元素
         * speed==>淡入速度,正整数(可选)
         * opacity==>淡入到指定的透明度,0~100(可选)
         */
        if (!this.shan) {

            speed = speed || 20;
            opacity = opacity || 100;
            //显示元素,并将元素值为0透明度(不可见)
            elem.style.display = 'block';
            this.shan=false;
            SetOpacity(elem, 0);
            //初始化透明度变化值为0
            var val = 0;
            //循环将透明值以5递增,即淡入效果
            (function () {
                SetOpacity(elem, val);
                val += 5;
                if (val <= opacity) {
                    this.shan=true;
                    setTimeout(arguments.callee, speed)
                }
            })();

        }
    }

    function SetOpacity(ev, v) {
        ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
    }


    function getElementsByClassName(o, c) {
        var obj = [];
        var l = o.getElementsByTagName('*');
        // var c = s.substr(1);
        for (var i = 0; i < l.length; i++)
            if (l[i].className.search('\\b' + c + '\\b') != -1) obj.push(l[i]);

        return obj;
    }


    function bindEvent(obj, ev, fn) { //相当于可以创造多个事件委托

        if (obj.addEventListener) {
            obj.addEventListener(ev, function (e) {
                if (!fn.call(obj)) { //当方法具有返回值的时候.

                    e.cancelBubble = true; //阻止冒泡

                    e.preventDefault(); //阻止默认事件

                }
            }, false);
        }
        else { //低版本的IE用的是attchEvent;

            obj.attachEvent('on' + ev, function () {
                if (!fn.call(obj)) {
                    event.cancelBubble = true; //阻止冒泡

                    return false; //阻止默认事件

                }
            })
        }
    }
    //获取样式

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    function getsec(str) {
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        } else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    }

    //格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
    }



    //hasChildNodes()：返回一个布尔值，指示元素是否有子元素；


    /*document.createElement(tagName)：文档对象上的createElement方法可以创建由tagName指定的元素，如果以串div作为方法参数，就会生成一个div元素；
     document.createTextNode(text)：文档对象的createTextNode方法会创建一个包含静态文本的节点；
     <element>.appendChild(childNode)：appendChild方法将指定的节点增加到当前元素的子节点列表（作为一个新的子节点）。例如，可以增加一个option元素，作为select元素的子节点；
     <element>.getAttriture(name)：这些方法分别获得和设置元素中name属性的值；
     <element>.setAttritube(name,value)：这些方法分别获得和设置元素中name属性的值；
     <element>.insertBefore(newNode,targetNode)：这个方法将节点newNode作为当前元素的子节点插到targetNode元素前面；
     <element>.removeAttribute(name)：这个方法从元素中删除属性name；
     <element>.removeChild(childNode)：这个方法从元素中删除子元素childNode；
     <element>.replaceChild(newNode,oldNode)：这个方法将节点oldNode替换为节点newNode；
     <element>.hasChildnodes()：这个方法返回一个布尔值，指定元素是否有子元素；


     childNodes：返回当前元素所有子元素的数组；
     firstChild：返回当前元素的第一个下级子元素；
     lastChild：返回当前元素的最后一个子元素；
     nextSibling：返回紧跟在当前元素后面的元素；
     noedValue：指定表示元素值的读/写属性；
     parentNode：返回元素的父节点；
     previousSibling：返回紧邻当前元素之前的元素；


     1)创建节点：除了可以使用createElement创建元素，也可以使用createTextNode创建文本节点.

     document.body指向的是<body>元素;document.documentElement则指向<html>元素

     //创建节点

     var createNode = document.createElement("div");

     var createTextNode = document.createTextNode("hello world");

     createNode.appendChild(createTextNode);

     document.body.appendChild(createNode);

     document.documentElement.appendChild(createNode);

     2)插入节点：可以使用appendChild，insertBefore，insertBefore接收两个参数，第一个是插入的节点，第二个是参照节点，如insertBefore(a,b)，则a会插入在b的前面


     //插入节点

     var createNode = document.createElement("div");

     var createTextNode = document.createTextNode("hello world");

     createNode.appendChild(createTextNode);

     var div1 = document.getElementById("div1");

     document.body.insertBefore(createNode,div1);


     3)替换和删除元素，从replaceChild和removeChild的字面意思看，就是删除子节点，因此调用者，需要包含子节点div1，不然调用会报错。返回的节点是替换的或删除的元素，被替换/删除的元素仍然存在，但document中已经没有他们的位置了。


     //替换元素

     var replaceChild = document.body.replaceChild(createNode,div1);


     //删除元素

     var removeChild = document.body.removeChild(div1);

     4)节点的属性：

     firstChild:第一个子节点

     lastChild:最后一个子节点

     childNodes:子节点集合，获取其中子节点可以someNode.childNodes[index]或者someNode.childNodes.item(index)
     nextSibling:下一个兄弟节点

     previousSibling：上一个兄弟节点

     parentNode：父节点

     <ul id="ul"><li>sdsssssss</li><li>qqqq</li><li>wwww</li><li>eeee</li></ul>


     复制代码

     //节点属性

     var ul = document.getElementById("ul");

     var firstChild = ul.firstChild;

     console.log(firstChild.innerHTML);

     var lastChild = ul.lastChild;

     console.log(lastChild.innerHTML);

     var length = ul.childNodes.length;

     console.log(length);

     var secondChild = ul.childNodes.item(1);

     console.log(secondChild.innerHTML);

     var forthChild = ul.childNodes.item(2).nextSibling;

     console.log(forthChild.innerHTML);

     var thridChild = forthChild.previousSibling;

     console.log(thridChild.innerHTML);

     var parentNode = forthChild.parentNode;

     console.log(parentNode.innerHTML);

     复制代码


     5) 文档片段，好处在于减少dom的渲染次数，可以优化性能。

     复制代码

     //文本片段

     var fragment = document.createDocumentFragment();

     var ul = document.getElementById("ul");

     var li = null;

     for (var i = 4; i >= 0; i--) {

     li = document.createElement("li");

     li.appendChild(document.createTextNode("item "+i));

     fragment.appendChild(li);

     }

     ul.appendChild(fragment);

     复制代码


     6）克隆元素

     someNode.cloneNode(true):深度克隆，会复制节点及整个子节点

     someNode.cloneNode(false):浅克隆，会复制节点，但不复制子节点

     //克隆

     var clone = ul.cloneNode(true);

     document.body.appendChild(clone);



     注意：

     1、childNodes.length存在跨浏览器的问题

     可以看到有关列表的html片段没有用


     <ul id="ul">

     <li>sdsssssss</li>

     <li>qqqq</li>

     <li>wwww</li>

     <li>eeee</li>

     </ul>

     这种书写格式而是使用没有换行的格式书写，是因为在不同的浏览器中，获取ul.childNodes.length的结果有差异：

     在ie中，ul.childNodes.length不会计算li之间的换行空格，从而得到数值为4

     在ff、chrome,safari中，会有包含li之间的空白符的5个文本节点，因此ul.childNodes.length为9

     若要解决跨浏览器问题，可以将li之间的换行去掉，改成一行书写格式。


     2、cloneNode存在跨浏览器的问题

     在IE中，通过cloneNode方法复制的元素，会复制事件处理程序，比如，var b = a.cloneNode(true).若a存在click,mouseover等事件监听，则b也会拥有这些事件监听。

     在ff,chrome,safari中，通过cloneNode方法复制的元素，只会复制特性，其他一切都不会复制

     因此，若要解决跨浏览器问题，在复制前，最好先移除事件处理程序。

     */

})();