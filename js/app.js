'use strict';

/**
 *
 *----------Dragon be here!----------/
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛
 * 　　　　┃　　　┃神兽保佑
 * 　　　　┃　　　┃代码无BUG！
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　　　┣┓
 * 　　　　┃　　　　　　　┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 * ━━━━━━神兽出没━━━━━━by:CForce
 */

import React from 'react'
import {render} from 'react-dom'

var TreasureView = React.createClass({
    handleClick: function () {
        if (this.props.box) {
            if (this.state.boxState == "1") {
                var curDialog = $('#dialog' + this.props.box.preciousBoxId);
                curDialog.center();
                curDialog.show();
                $('.dialogCover').show();
                $('body').css({
                    "overflow-y":"hidden"
                });
            }
        } else {
            if (!this.props.energyAddr) {
                return;
            }

            if (isNaN(this.props.energyAddr)) {
                //网页链接
                window.location.href = this.props.energyAddr;
            } else {
                renderToCommunityChat4H5(this.props.energyAddr);
            }
        }
    },
    confirm: function () {
        this.cancel();
        showLoading();
        getPreBox(memberId, this.props.box.preciousBoxId, function (result) {
            console.log(result)
            hideLoading();
            this.setState({boxState: "2"});
        }.bind(this), function (msg) {
            hideLoading();
            drawToast(msg);
        });
    },
    getInitialState: function () {
        return {
            boxState: this.props.box ? this.props.box.state : "1"
        }
    },
    cancel: function () {
        var curDialog = $('#dialog' + this.props.box.preciousBoxId);
        curDialog.hide();
        $('.dialogCover').hide();
        $('body').css({
            "overflow-y":"auto"
        });
    },
    componentDidMount: function () {
        $('.div-shake-view').addClass('animated tada infinite');
    },
    render: function () {
        var boxImg = "img/feeder.png";
        var title = "加油站";
        var dialog;
        var isShake = false;

        if (this.props.box) {
            var state = parseInt(this.state.boxState);

            switch (state) {
                case 1:
                    isShake = true;
                    boxImg = "img/box/box-" + this.props.box.type + ".png";
                    dialog =
                        <TakeBoxDialog box={this.props.box} onCancel={this.cancel} onConfirm={this.confirm} ref="root"/>
                    break;
                case 2:
                    boxImg = "img/box/box-" + this.props.box.type + "-open.png";

                    break;
                case 3:
                    boxImg = "img/box/box-none.png";
                    break;
            }
            title = this.props.box.type + "天";
        }

        return (
            <div>
                {dialog}
                <div className="circle-bg" onClick={this.handleClick}>
                    <div className={isShake?"div-shake-view":""}>
                        <img className="treasure-box" src={boxImg}/>
                    </div>
                </div>
                <div className="treasure-title">{title}</div>
            </div>
        );
    }
});

var TakeBoxDialog = React.createClass({
    render: function () {
        var imgSrc = "img/box/box-open-" + this.props.box.type + ".png";
        return (
            <div>
                <div className="dialogCover"></div>
                <div id={"dialog"+this.props.box.preciousBoxId} className="dialog">
                    <div className="div-close-dialog">
                        <img className="img-close-dialog" src="img/close.png" onClick={this.props.onCancel}/>
                    </div>
                    <img className="img-box-open" src={imgSrc}/>
                    <div className="div-box-title">
                        恭喜您获得{this.props.box.score}云币
                    </div>
                    <div onClick={this.props.onConfirm}>
                        <input className="img-take-btn" type="button" value="领取奖励"/>
                    </div>
                </div>
            </div>
        );
    }
});

//头部视图
var HeadView = React.createClass({
    componentDidMount: function () {
        $('.div-feeder').addClass('animated bounceInRight');
    },
    render: function () {
        var preciousBoxList = this.props.data.preciousBoxList;
        return (
            <div className="div-level">

                <div className="div-head-view">
                    <table className="treasure-table">
                        <tbody>
                        <tr>
                            <td>
                                <TreasureView box={preciousBoxList?preciousBoxList[0]:""}/>
                            </td>
                            <td>
                                <TreasureView box={preciousBoxList?preciousBoxList[1]:""}/>
                            </td>
                            <td>
                                <TreasureView box={preciousBoxList?preciousBoxList[2]:""}/>
                            </td>
                        </tr>
                        </tbody>

                    </table>

                    <div className="div-feeder">
                        <TreasureView energyAddr={this.props.data.energyAddr}/>
                    </div>

                </div>
            </div>
        );
    }
});

//星星视图
var StarView = React.createClass({
    render: function () {
        var start1, start2, start3;
        start1 = "img/star/star-none.png";
        start2 = "img/star/star-none.png";
        start3 = "img/star/star-none.png";
        var divName;
        if (this.props.starNum) {

            divName = "div-star-view";
            var arr = this.props.starNum.split("/");
            var floatValue = arr[0] / arr[1];
            if (floatValue >= (1 / 6)) {
                start1 = "img/star/star-half.png";
            }
            if (floatValue >= (2 / 6)) {
                start1 = "img/star/star-full.png";
            }
            if (floatValue >= (3 / 6)) {
                start2 = "img/star/star-half.png";
            }
            if (floatValue >= (4 / 6)) {
                start2 = "img/star/star-full.png";
            }
            if (floatValue >= (5 / 6)) {
                start3 = "img/star/star-half.png";
            }
            if (floatValue >= (6 / 6)) {
                start3 = "img/star/star-full.png";
            }
        } else {
            divName = "div-hidden";
        }
        return (
            <div className={divName}>
                <img className="img-star img-star-left" src={start1}/>
                <img className="img-star img-star-middle" src={start2}/>
                <img className="img-star img-star-right" src={start3}/>
            </div>
        );
    }
});

//关卡视图
var RankView = React.createClass({

    handleClick: function () {
        if (this.props.exam && this.props.exam.state == "3") {
            var examId = this.props.exam.examId;
            var answerSec = this.props.exam.answerSec;
            var questionCount = this.props.exam.questionCount;

            renderToPlay4H5(examId, answerSec, questionCount, prompt)
        }
    },

    componentDidMount: function () {
        $('.img-light').addClass('animated fadeIn infinite');
        $('.div-rank-view').addClass('animated zoomIn');
        if(this.props.exam && this.props.exam.state == "3"){
            $('body').animate({scrollTop: $('.img-light').offset().top-300}, 800);
        }
    },
    render: function () {
        var dayImg, numImg, divId, numType, numStyle, lightStyle;

        dayImg = "img/day-play/day-lock.png";
        numType = "num-unable";
        lightStyle = "div-hidden";

        if (this.props.numType == 0) {
            numStyle = "div-rank-num-left";
        } else if (this.props.numType == 1) {
            numStyle = "div-rank-num-bot-left";
        } else if (this.props.numType == 2) {
            numStyle = "div-rank-num-bottom";
        } else if (this.props.numType == 3) {
            numStyle = "div-rank-num-bot-right";
        } else if (this.props.numType == 4) {
            numStyle = "div-rank-num-right";
        }

        var starNum = "";
        if (this.props.exam) {
            starNum = this.props.exam.join;
            divId = "div-day" + this.props.exam.levelNo;
            if (this.props.exam.state == "1") {
                dayImg = "img/day-play/day-unlock.png";
            } else if (this.props.exam.state == "2") {
                dayImg = "img/day-play/day-miss.png";
            } else if (this.props.exam.state == "3") {
                dayImg = "img/day-play/day-play.png";
                lightStyle = "img-light";
            }
            if (this.props.exam.state != "4") {
                numType = "num-able";
            }
        }
        numImg = "img/" + numType + "/" + this.props.exam.levelNo + ".png";

        return (
            <div className="div-rank-view" id={divId} onClick={this.handleClick}>
                <StarView starNum={starNum}/>
                <img id="imgLightId" className={lightStyle} src="img/day-play/day-light.png"/>
                <div className="div-rank-day-view">
                    <img className="img-day" src={dayImg}/>
                </div>
                <div className={numStyle}>
                    <img className="img-day-num" src={numImg}/>
                </div>

            </div>
        );
    }
});

var LevelOne = React.createClass({

    render: function () {
        var data = this.props.data.examList;
        return (
            <div>
                <div className="div-level">
                    <div className="div-level-one-view">
                    </div>
                </div>
                <div className="div-level">
                    <div className="div-level-35-view">
                        <img className="level-background" src="img/level-bg/level-1.png"/>
                        <table className="table-match-parent">
                            <tbody>
                            <tr>
                                <td>
                                    <RankView numType="2" exam={data?data[0]:""}/>
                                </td>
                                <td>
                                    <RankView numType="2" exam={data?data[1]:""}/>
                                </td>
                                <td>
                                    <RankView numType="4" exam={data?data[2]:""}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

var LevelTwo = React.createClass({
    render: function () {
        var data = this.props.data.examList;
        return (
            <div className="div-level">
                <div className="div-level-60-view">
                    <img className="level-background" src="img/level-bg/level-2.png"/>
                    <table className="table-match-parent">
                        <tbody>
                        <tr>
                            <td id="level2-td-1" rowSpan="2">
                                <RankView numType="2" exam={data?data[4]:""}/>
                            </td>
                            <td id="level2-td-2" colSpan="2">
                                <RankView numType="4" exam={data?data[3]:""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="table-match-parent">
                        <tbody>
                        <tr>
                            <td id="level2-td-3"></td>
                            <td id="level2-td-3"></td>
                            <td id="level2-td-3">
                                <RankView numType="2" exam={data?data[5]:""}/>
                            </td>
                            <td id="level2-td-4">
                                <RankView numType="2" exam={data?data[6]:""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

var LevelThree = React.createClass({
    render: function () {
        var data = this.props.data.examList;
        return (
            <div className="div-level">
                <div className="div-level-40-view">
                    <img className="level-background" src="img/level-bg/level-3.png"/>
                    <table className="table-match-parent">
                        <tbody>
                        <tr>
                            <td>
                                <RankView numType="2" exam={data?data[8]:""}/>
                            </td>
                            <td>
                                <RankView numType="2" exam={data?data[7]:""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

var LevelFour = React.createClass({
    render: function () {
        var data = this.props.data.examList;
        return (
            <div className="div-level">
                <div className="div-level-40-view">
                    <img className="level-background" src="img/level-bg/level-4.png"/>
                    <table className="table-match-parent">
                        <tbody>
                        <tr>
                            <td>
                                <RankView numType="3" exam={data?data[11]:""}/>
                            </td>
                            <td>
                                <RankView numType="2" exam={data?data[9]:""}/>
                            </td>
                            <td>
                                <RankView numType="2" exam={data?data[10]:""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

var LevelFive = React.createClass({
    render: function () {
        var data = this.props.data.examList;
        return (
            <div className="div-level">
                <div className="div-level-60-view">
                    <img className="level-background" src="img/level-bg/level-5.png"/>
                    <table className="table-match-parent">
                        <tbody>
                        <tr>
                            <td>
                                <RankView numType="4" exam={data?data[13]:""}/>
                            </td>
                            <td>
                                <RankView numType="4" exam={data?data[12]:""}/>
                            </td>
                            <td>
                                <RankView numType="2" exam={data?data[14]:""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

var LevelSix = React.createClass({
    render: function () {
        var data = this.props.data.examList;
        return (
            <div className="div-level">
                <div className="div-level-40-view">
                    <img className="level-background" src="img/level-bg/level-6.png"/>
                    <table className="table-match-parent">
                        <tbody>
                        <tr>
                            <td>
                                <RankView numType="3" exam={data?data[15]:""}/>
                            </td>
                            <td>
                                <RankView numType="4" exam={data?data[16]:""}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

var RootView = React.createClass({
    InitData: function () {
        getMainExam(memberId, moduleId, function (result) {
            prompt = result.prompt;
            this.setState({examInfo: result});
            this.setState({loading: false});
            if (result.rule) {
                renderToRule4H5(result.rule);
            }
        }.bind(this), function (msg) {
            drawToast(msg);
            hideLoading();
        });
    },

    componentDidMount: function () {
        this.InitData();

    },
    getInitialState: function () {
        return {
            loading: true,
            examInfo: {}
        }
    },
    render: function () {
        if (this.state.loading) {
            showLoading();
            return (
                <div>
                </div>
            )
        } else {
            hideLoading();
            return (
                <div>
                    <HeadView data={this.state.examInfo}/>
                    <LevelOne data={this.state.examInfo}/>
                    <LevelTwo data={this.state.examInfo}/>
                    <LevelThree data={this.state.examInfo}/>
                    <LevelFour data={this.state.examInfo}/>
                    <LevelFive data={this.state.examInfo}/>
                    <LevelSix data={this.state.examInfo}/>

                </div>
            );
        }

    }
});

var prompt;

render(<RootView />, document.getElementById('community'));
