auto.waitFor()
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}



function get_img(params) {
	// 请求截图
	if(!requestScreenCapture()){
		toast("请求截图失败");
		exit();
	}
	sleep(100)//这个延时最少要40,
	var all_img=className("android.widget.Image").find()
	// log(all_img.length)
	if(all_img.length == 3){
		var img_bounds = all_img[0].bounds()
		var img_base = images.captureScreen()
		var img_split = images.clip(img_base,img_bounds.left,img_bounds.top,img_bounds.width(),img_bounds.height())
		return img_split
	}
}
//


/**
 * 
 * @param {img} img 
 */
function get_check(img){
	var image_data=images.toBase64(img)
	datas = {
		"softwareId":12296,
		"softwareSecret":"tAg9HWTEA41V8aV491SElIStFuad4EjkhPWAt6s4",
		"username":'xiajixiang',
		"password":'LZxia032536',
		"captchaData":image_data,
		"captchaType":1310,
	}
	for (let index = 0; index < 10; index++) {
		var res = http.postJson("https://v2-api.jsdama.com/upload",data=datas)
		try {
			var result = res.body.json().data.recognition
			break
		} catch (error) {
			toastLog('本次请求错误,重试次数:'+index);
			sleep(2000)
			if (index>10) {
				toastLog('超时,请联系作者,程序退出');
				exit()
			}
		}
		
	}
	var result_split=result.split("|")
	var result_x1 =  result_split[0].split(",")[0]
	var result_x2 =  result_split[1].split(",")[0]
	var green  = text("tag-bar").className("android.widget.Image").findOne()
	var y = green.bounds().centerY()
	// log(result_x1)
	// log(result_x2)

	return {x1:result_x1,
			y1:y+random(-4,4),
			x2:result_x2,
			y2:y+random(-4,4)
		}
}

function check_ok(){
	var coordinates= get_check(get_img())
	swipe(coordinates.x1,coordinates.y1,coordinates.x2,coordinates.y2,random(1000,2000))

}

function main(){



}

function test(){


}