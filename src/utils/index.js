function myBrowser(){
    //判斷Chrome或是safari瀏覽器
    var userAgent = navigator.userAgent; //取得瀏覽器的userAgent字串

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

function computer(){
    //判斷Mac或是Windows
    var agent = navigator.userAgent.toLowerCase();
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);

    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        //your code
        alert("這是windows32位系统");
    }
    if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        //your code
        alert("這是windows64位系统");
    }
    if(isMac){
        //your code
        alert("這是mac系统");
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

computer();