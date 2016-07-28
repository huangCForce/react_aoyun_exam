

var sUserAgent = navigator.userAgent.toLowerCase();
var isIphoneOs = sUserAgent.match(/iphone os/i) == "1iphone os";
var isAndroid = sUserAgent.match(/android/i) == "1android";

var REQUEST_URL =  "/manage/exam";				//请求地址
var FUNCTION_CODE_EXAM_MAIN = 1341;				//答题首页
var FUNCTION_CODE_GET_PREBOX = 1349;			//领取宝盒

var memberId, moduleId;

$(function(){
	memberId = getQueryString("memberId");
	moduleId = getQueryString("moduleId");
});


function renderToRule4H5(ruleUrl){
	if (isIphoneOs) { //IOS
		var localUrl = "renderToRule4H5://requestAction?moduleId="+moduleId+"&ruleUrl="+ruleUrl ;
		loadURL4IOS(localUrl);
	} else if(isAndroid) { //Android
		window.webActivity.renderToRule4H5(moduleId, ruleUrl);
	} else {
		console.error("error");
	}
}

function renderToPlay4H5(examId, answerSec, questionCount, prompt){
	if (isIphoneOs) { //IOS
		var localUrl = "renderToPlay4H5://requestAction?examId="+examId+"&answerSec="+answerSec+"&questionCount="+questionCount+"&prompt="+prompt ;
		loadURL4IOS(localUrl);
	} else if(isAndroid) { //Android
		window.webActivity.renderToPlay4H5(examId, answerSec, questionCount, prompt);
	} else {
		console.error("error");
	}
}

function renderToCommunityChat4H5(themeId){
	if (isIphoneOs) { //IOS
		var localUrl = "renderToCommunityChat4H5://requestAction?themeId="+themeId ;
		loadURL4IOS(localUrl);
	} else if(isAndroid) { //Android
		window.webActivity.renderToCommunityChat4H5(themeId);
	} else {
		console.error("error");
	}
}

function getMainExam(memberId, moduleId, callback, failed) {
	requestCallback = callback;
	failedCallback = failed;
	if (!memberId)
		memberId = getQueryString("memberId");
	if (!moduleId)
		moduleId = getQueryString("moduleId");
	var params = {
		memberId:memberId,
		moduleId:moduleId
	};

	if (isIphoneOs) { //IOS
		var localUrl = "request4H5://requestAction?url="+REQUEST_URL+"&functionCode="+FUNCTION_CODE_EXAM_MAIN+"&params="+JSON.stringify(params) ;
		loadURL4IOS(localUrl);
	} else if(isAndroid) { //Android
		window.webActivity.request4H5(REQUEST_URL, FUNCTION_CODE_EXAM_MAIN, JSON.stringify(params));
	} else {
		console.error("request from pc, this is a simulate data");
		setTimeout(function () {
			showResult(resultOne)
		}, 2000);
	}
}

function getPreBox(memberId, preciousBoxId, callback, failed) {
	requestCallback = callback;
	failedCallback = failed;
	if (!memberId)
		memberId = getQueryString("memberId");
	var params = {
		memberId:memberId,
		preciousBoxId:preciousBoxId
	};
	if (isIphoneOs) { //IOS
		var localUrl = "request4H5://requestAction?url="+REQUEST_URL+"&functionCode="+FUNCTION_CODE_GET_PREBOX+"&params="+JSON.stringify(params) ;
		loadURL4IOS(localUrl);
	} else if(isAndroid) { //Android
		window.webActivity.request4H5(REQUEST_URL, FUNCTION_CODE_GET_PREBOX, JSON.stringify(params));
	} else {
		console.error("request from pc, this is a simulate data");
		setTimeout(function () {
			showResult(resultTwo)
		}, 2000);
	}
}

var requestCallback ;
var failedCallback ;
function showResult(result){

	var jsonobj = eval(result);
	var code = parseInt(jsonobj.functionCode);
	switch(code){
		case FUNCTION_CODE_EXAM_MAIN:
			if (jsonobj.status == "1") {

				if (isIphoneOs){
					requestCallback(jsonobj.data);
				} else if(isAndroid) {
					var bean = eval("("+jsonobj.data+")");
					requestCallback(bean);
				} else {
					requestCallback(jsonobj.data);
				}

			} else {
				failedCallback(jsonobj.errorMsg);
			}
			break;
		case FUNCTION_CODE_GET_PREBOX:
			if (jsonobj.status == "1") {
				if (isIphoneOs){
					requestCallback(jsonobj.data);
				} else if(isAndroid) {
					bean = eval("("+jsonobj.data+")");
					requestCallback(bean);
				} else {
					requestCallback(jsonobj.data);
				}

			} else {
				failedCallback(jsonobj.errorMsg);
			}
			break;
		default:
			break;
	}
}

function loadURL4IOS(url) {
	var iFrame;
	iFrame = document.createElement("iframe");
	iFrame.setAttribute("src", url);
	iFrame.setAttribute("style", "display:none;");
	iFrame.setAttribute("height", "0px");
	iFrame.setAttribute("width", "0px");
	iFrame.setAttribute("frameborder", "0");
	document.body.appendChild(iFrame);
	// 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
	iFrame.parentNode.removeChild(iFrame);
	iFrame = null;
}

function showLoading(){
	$('.la-ball-pulse').center();
	$('.loading').show();
}

function hideLoading(){
	$('.loading').hide();
}

/**
 * 获取url传入的值
 * @param name
 * @returns {null}
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

var resultTwo= {
	"data": "",
	"errorMsg": "err",
	"status": "1",
	"functionCode":"1349"
};

var resultOne = {
	"data": {
		"rule": "/upload/game/20160617/1466133039752.jpg",
		"energyAddr": "62",
		"prompt":"/upload/game/20160615/1465959838991.png",
		"preciousBoxList": [
			{
				"preciousBoxId":"1",
				"type":"5",
				"state":"1",
				"score":"100"
			},
			{
				"preciousBoxId":"2",
				"type":"10",
				"state":"2",
				"score":"500"
			},
			{
				"preciousBoxId":"3",
				"type":"15",
				"state":"3",
				"score":"1000"
			}

		],
		"examList": [
			{
				"levelNo":"1",
				"examId":"1",
				"state":"1",
				"join":"5/5",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"2",
				"examId":"2",
				"state":"2",
				"join":"3/5",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"3",
				"examId":"3",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"4",
				"examId":"4",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"5",
				"examId":"5",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"6",
				"examId":"6",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"7",
				"examId":"7",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"8",
				"examId":"8",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"9",
				"examId":"9",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"10",
				"examId":"10",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"11",
				"examId":"11",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"12",
				"examId":"12",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"13",
				"examId":"13",
				"state":"3",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"14",
				"examId":"14",
				"state":"4",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"15",
				"examId":"15",
				"state":"4",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"16",
				"examId":"16",
				"state":"4",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			},
			{
				"levelNo":"17",
				"examId":"17",
				"state":"2",
				"join":"",
				"answerSec":"10",
				"questionCount":"5"
			}
		]
	},
	"errorMsg": "",
	"status": "1",
	"functionCode":"1341"
};