function myBrowser(){
    var userAgent = navigator.userAgent; //取得瀏覽器的userAgent字串
    // var isOpera = userAgent.indexOf("Opera") > -1;
    if (userAgent.indexOf("Chrome") > -1){
	  return "Chrome";
	}
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判斷是否Safari瀏覽器
    else
    {
       return userAgent;
    }
}
	
	
//以下是呼叫上面的函式
var mb = myBrowser();

// document.write(navigator.userAgent);

if ("Chrome" == mb) {
    alert("我是 Chrome");
}

if ("Safari" == mb) {
    alert("我是 Safari");
}