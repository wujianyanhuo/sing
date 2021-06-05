// 点击按钮，播放音乐
var audio = document.getElementsByTagName("audio")[0];
var play = document.getElementsByClassName("play")[0];
var pause = document.getElementsByClassName("pause")[0];
// 走过的黄色部分
var wp_processBar = document.getElementById("wp_processBar");
//黄点点
var wp_processBtn=document.getElementsByClassName("wp_processBtn")[0];
//时间框
var wp_time = document.getElementsByClassName("time")[0];
play.onclick = ()=>{
    play.style.display="none";
    pause.style.display = "inline";
    //进度条
    var duration =parseInt(audio.duration);
    audio.play();
    var id = setInterval(function(){
        //听过的部分变为黄色
        var time = audio.currentTime.toFixed(0);
        var width = Math.ceil(time/duration*250) ;
        wp_processBar.style.width= width +"px";
        //黄色的点
        wp_processBtn.style.left = width+"px";
        //显示播放时长
        var second = parseInt(time/60);
        if(second<10)
            second = "0"+second;
        minute = time%60;
        if(minute<10)
            minute = "0"+minute;
        wp_time.innerHTML=second +":" + minute;
    },1000);
}
pause.onclick= ()=>{
    audio.pause();
    play.style.display="inline";
    pause.style.display = "none";
}
//静音
var voice = document.getElementsByClassName("voice")[0];
voice.onclick= ()=>{
    if(audio.volume!=0.0)
        audio.volume=0.0;
    else
        audio.volume=1;
}

//提价评论
//新建评论单元函数
function create_com_unit(can){
    var com_out = document.getElementById("com_out");
    let com_unit = document.createElement("div");
    com_unit.classList.add("com_unit");
    com_out.appendChild(com_unit);
    let com_img = document.createElement("div");
    com_img.classList.add("com_img");
    com_unit.appendChild(com_img);
    let com_p = document.createElement("div");
    com_p.classList.add("com_p");
    com_unit.appendChild(com_p);
    let com_name = document.createElement("p");
    com_name.classList.add("com_name");
    com_p.appendChild(com_name);
    let com_content = document.createElement("p");
    com_content.classList.add("com_content");
    com_p.appendChild(com_content);
    let com_time = document.createElement("p");
    com_time.classList.add("com_time");
    com_p.appendChild(com_time);
    
    let comString= localStorage[`Id${can}`];
    let comObj = JSON.parse(comString);
    com_name.innerHTML = comObj.name;
    com_content.innerHTML=comObj.com_nent;
    com_time.innerHTML=date(comObj.com_time);
}

var btn = document.getElementById("btn");
var text = document.getElementsByTagName("textarea")[0];
btn.onclick=()=>{
    var comId = localStorage.length+1;
    let time = Date.now();
    let content = text.value;
    let objCom = {
        name:"郭子仪",
        com_nent:content,
        com_time:time
    }
    let comString = JSON.stringify(objCom);
    localStorage[`Id${comId}`] = comString;
    create_com_unit(localStorage.length);


}
//时间戳转换函数
function date(data) {
    var date = new Date(data)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s;
  }

//分页效果实现
function Page(){
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");
    var page4 = document.getElementById("page4");
    var page5 = document.getElementById("page5");
    
    var length = localStorage.length;
    var page_yu = length%3;
    var page_count;
    if(page_yu==0)
        page_count=parseInt(length/3);
    else
        page_count=parseInt(length/3)+1;
    page5.innerHTML=page_count;
    // 只有一页
    if(page_count==1);
        page1.style.display="inline-block";
    //2页
    if(page_count==2){
        page1.style.display="inline-block";
        page2.style.display="inline-block";
    }
    //3页
    if(page_count==3){
        page1.style.display="inline-block";
        page2.style.display="inline-block";
        page3.style.display="inline-block";
    }
    //4页
    if(page_count==4){
        page1.style.display="inline-block";
        page2.style.display="inline-block";
        page3.style.display="inline-block";
        page4.style.display="inline-block";
    }
    //5页
    if(page_count==5){
        page1.style.display="inline-block";
        page2.style.display="inline-block";
        page3.style.display="inline-block";
        page4.style.display="inline-block";
        page5.style.display="inline-block";
    }
}
window.onload=()=>{
    var com_out = document.getElementById("com_out");
    let i = localStorage.length;
    if(i ==0){
    }
    else{
        for(var a=1;a<i+1;a++){
            create_com_unit(a);
        }
    }
    let length = localStorage.length;
    var p2 = document.getElementById("p2");
    p2.innerHTML= length+"条评论";
    Page();
}
