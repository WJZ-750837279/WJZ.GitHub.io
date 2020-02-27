var list = document.getElementById('list');
            var boxs = document.getElementsByClassName('box');

            //删除节点函数
            function removeNode(node){
                node.parentNode.removeChild(node);
            }
            //事件代理
            for(var i=0 ;i<boxs.length;i++){
                boxs[i].onclick = function(e){
                    e = e||window.event;
                    var el = e.srcElement || e.target;
                    switch (el.className) {
                        case 'close':removeNode(el.parentNode);break;
                    }
                }
            }
//点赞分享
            function praiseBox(box,el){//box为所触发元素el的最外层父容器
                var praiseElement = box.getElementsByClassName('praise-total')[0];
                var oldTotal = parseInt(praiseElement.getAttribute('total'));
                var txt = el.innerHTML;
                var newTotal = 0;
                if(txt == '赞'){
                    newTotal = oldTotal + 1;
                    praiseElement.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal +'个人觉得很赞';
                    el.innerHTML = '取消赞';
                }else{
                    newTotal = oldTotal - 1;
                    praiseElement.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
                    el.innerHTML = '赞';
                }
                praiseElement.setAttribute('total',newTotal);
                praiseElement.style.display = (newTotal == 0) ? 'none': 'block';
            }
            //事件代理
            for(var i=0 ;i<boxs.length;i++){
                boxs[i].onclick = function(e){
                    e = e||window.event;
                    var el = e.srcElement || e.target;
                    switch (el.className) {
                        case 'close':removeNode(el.parentNode);break;
                        case 'praise':praiseBox(el.parentNode.parentNode.parentNode,el);
                    }
                }
            }
//输入框
                var textarea = boxs[i].getElementsByTagName('textarea')[0];
                textarea.onfocus = function(){
                    this.parentNode.className = 'text-box text-box-on';
                    this.value = (this.value == '评论...') ? '':this.value;
                }
                textarea.onblur = function(){
                    if(this.value == ''){
                        this.parentNode.className = 'text-box';
                        this.value = '评论...';
                    }
                }
textarea.onblur = function(){
                    var me = this;//因为有定时器所以先将this存放于变量中
                    timer = setTimeout(function(){
                        if(me.value == ''){
                            me.parentNode.className = 'text-box';
                            me.value = '评论...';
                        }
                    },500);
                }
                textarea.onkeyup = function(){
                    var len = this.value.length;
                    var p = this.parentNode;
                    var btn = p.children[1];
                    var word = p.children[2];
                    if(len == 0 || len > 140){
                        btn.className = 'btn btn-off';
                    }else{
                        btn.className = 'btn';
                    }
                    word.innerHTML = len + '/140';
                }
//发表评论
            function replayBox(box){
                var textarea = box.getElementsByTagName('textarea')[0];
                var list = box.getElementsByClassName('comment-list')[0];
                var div = document.createElement('div');
                div.className = 'comment-box clearfix';
                div.setAttribute('user','self');
                var html = ' <img src="images/my.jpg"  class="myhead" alt="" />'+
                        '<div class="comment-content">'+
                        '<p class="comment-text"><span class="user">我：</span>'+textarea.value+'</p>'+
                        '<p class="comment-time">'+
                        getTime()+
                        '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>'+
                        '<a href="javascript:;" class="comment-operate">删除</a>'+
                        '</p>'+
                        '</div>';
                div.innerHTML = html;
                list.appendChild(div);
                textarea.value = '';
                textarea.onblur();
                function getTime(){
                    var t = new Date();
                    var y = t.getFullYear();
                    var m = t.getMonth() + 1;//月份是从0开始
                    var d = t.getDay();
                    var h = t.getHours();
                    var mi = t.getMinutes();
                    m = m>10 ? m: '0' + m;
                    d = d>10 ? d: '0' + d;
                    h = h>10 ? h: '0' + h;
                    mi = mi>10 ?mi: '0' +mi;
                    return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
                }
            }
//点赞回复
            function praiseReplay(el){
                var oldTotal = parseInt(el.getAttribute('total'));
                var my = parseInt(el.getAttribute('my'));
                var newTotal = 0;
                if(my == 0){
                    newTotal = oldTotal + 1;
                    el.setAttribute('total',newTotal);
                    el.setAttribute('my',1);
                    el.innerHTML = newTotal + '取消赞';
                }else{
                    newTotal = oldTotal - 1;
                    el.setAttribute('total',newTotal);
                    el.setAttribute('my',0);
                    el.innerHTML = (newTotal == 0) ? '' : newTotal + '赞';
                }
                el.style.display = (newTotal == 0) ? '' : 'inline-block';
            }
//操作回复
            function operateReply(el){
                var commentBox = el.parentNode.parentNode.parentNode;//评论的容器
                var box = commentBox.parentNode.parentNode.parentNode;//该条分享的容器
                var textarea = box.getElementsByTagName('textarea')[0];
                var user = commentBox.getElementsByClassName('user')[0];
                var txt = el.innerHTML;
                if(txt == '回复'){
                    textarea.onfocus();
                    textarea.value = '回复' + user.innerHTML;
                    textarea.onkeyup();
                }
                else{
                    removeNode(el.parentNode.parentNode.parentNode);
                }
            }