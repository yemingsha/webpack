import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import {NavBar,Popover, WhiteSpace,ActionSheet,SearchBar,Radio ,Icon, TextareaItem, Accordion, List, InputItem, Flex, Button} from 'antd-mobile';
import request from 'superagent';
import { hashHistory } from 'react-router';

import Toast from 'antd-mobile/lib/toast';


const RadioGroup = Radio.Group;
const RadioItem = Radio.RadioItem;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
const onMaskClose = () => {
    console.log('onMaskClose');
    // also support Promise
    // return new Promise((resolve) => {
    //   console.log('1000ms 后关闭');
    //   setTimeout(resolve, 1000);
    // });
}

const loginMessage='亲,用之前,请登录';




let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    }
}


export default class Search extends React.Component {

    constructor(props) {
        super(props);

       // username=15380822424&inputtxt=&pic=pn_1491807236710.jpg&staus=01&bigclass=&smallclass=0101&token=***';



        this.state={
            //showCategory:(this.props.location.state==null)? null:this.props.location.state.showCategory,
            value:'0',
            //username:(this.props.location.state==null)?null:this.props.location.state.username,
            token:'',
        };



        //if (this.state.username!=null){
        //    localStorage.setItem("username", this.state.username);
        //}



        //第一次登陆,localStorage.getItem("selectedCategory")的值是null
        if (localStorage.getItem("selectedCategory")==null) {
            localStorage.setItem("selectedCategory","[]");

        }
        else{
            //在littleCategory.jsx里面,把selectedCategory的初始值,设置成"[]"

        };

        document.addEventListener("jpush.setTagsWithAlias", this.onTagsWithAlias, false);
        document.addEventListener("deviceready", this.onDeviceReady, false);
        document.addEventListener("jpush.openNotification", this.onOpenNotification, false);
        document.addEventListener("jpush.receiveNotification", this.onReceiveNotification, false);
        document.addEventListener("jpush.receiveMessage", this.onReceiveMessage, false);
        document.addEventListener("jpush.backgroundNotification", this.onBackgroundNotification, false)


    }


    /*推送***********************/
    onDeviceReady =()=> {
        console.log("JPushPlugin:Device ready!");
        try {
            window.plugins.jPushPlugin.init();
            //window.setTimeout(getRegistrationID, 1000);
            if (device.platform != "Android") {
                window.plugins.jPushPlugin.setDebugModeFromIos();
                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
            } else {
                window.plugins.jPushPlugin.setDebugMode(true);
                window.plugins.jPushPlugin.setStatisticsOpen(true);
            }
        } catch (exception) {
            console.log(exception);
        }
    };


    //getRegistrationID = ()=> {
    //    window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
    //};

    onGetRegistrationID =(data)=> {
        try {
            console.log("JPushPlugin:registrationID is " + data);

            if (data.length == 0) {
                //var t1 = window.setTimeout(getRegistrationID, 1000);
            }
            console.log("registrationId=",data);

        } catch (exception) {
            console.log(exception);
        }
    };

    onTagsWithAlias = (event)=> {
        try {
            console.log("onTagsWithAlias");
            let result = "result code:" + event.resultCode + " ";
            result += "tags:" + event.tags + " ";
            result += "alias:" + event.alias + " ";
            alert("onTagsWithAlias 标签设置好了:"+result);

        } catch (exception) {
            console.log(exception);
        }
    };

    searchHistoryRequest=()=>{
        console.log("searchHistoryRequest");
        let url="http://101.200.46.114:8088/trademark/getsearchRecord.do?username="+ localStorage.getItem("username")+"&token=***";
        console.log("搜索历史的发送请求信息:url=",url);

        let mm=request
            .post(url)
            .end((err, response) => {
                Toast.hide();


                console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.info('搜索出错', 2);
                    return;
                }


                let responseText=JSON.parse(response.text);
                if (responseText.getCode=='0') {

                    //localStorage.setItem("history_search_list","[]");
                    localStorage.setItem("history_search_list",JSON.stringify(responseText.getList));
                    hashHistory.push('/history_Search');
                    //const {router} = this.props;
                    //router.push({pathname:'/history_Search',state:{list:responseText.getList}});
                }
                else{
                    Toast.info(responseText.getMessage, 2);
                }
            });


    }

    //点击通知启动或唤醒应用程序时会出发触发该事件
    onOpenNotification = (event)=> {
        try {
            Toast.loading('拼命加载中...', 0);

            var alertContent;
            if (device.platform == "Android") {
                alertContent = event.alert;
            } else {
                alertContent = event.aps.alert;
            }

            //alert("onOpenNotification1: " +  alertContent);
            //alert("onOpenNotification2: " +  event.getCode+","+event.recordId+ ","+event.getMessage+ ","+event.username);


            console.log('onOpenNotification0:',alertContent);
            console.log('onOpenNotification1:', event.getCode,"=",event.getMessage,"=",event.recordId,"=",event.username);

            this.searchHistoryRequest();

        } catch (exception) {
            console.log("JPushPlugin:onOpenNotification" + exception);
        }
    };

    //应用程序处于前台时收到推送会触发该事件
    onReceiveNotification = (event) =>{
        try {

            var alertContent;
            if (device.platform == "Android") {
                alertContent = event.alert;
            } else {
                alertContent = event.aps.alert;
            }
            //alert("onReceiveNotification0:" +alertContent);
            //alert("onReceiveNotification1: " +  event.getCode+","+event.recordId+ ","+event.getMessage+ ","+event.username);

            console.log('onReceiveNotification0:',alertContent);
            console.log('onReceiveNotification1:', event.getCode,"=",event.getMessage,"=",event.recordId,"=",event.username);


            Toast.info('您的搜索已有结果,请在搜索历史中查看.', 2);



        } catch (exception) {
            console.log(exception)
        }
    };


    onBackgroundNotification = (event) =>{
        var alertContent;
        alertContent = event.aps.alert;
        alert("onBackgroundNotification:" + alertContent);
        console.log('onBackgroundNotification :',alertContent);

    }


    //获取自定义消息内容
    onReceiveMessage = (event)=> {
        try {
            var message;
            var otherMessage;
            if (device.platform == "Android") {
                message = event.message;
            } else {
                message = event.content;
            }

            alert("onReceiveMessage:" + message);

            console.log('onReceiveMessage:',message);


        } catch (exception) {
            alert("获取自定义消息内容出错1:"+exception );
            alert("获取自定义消息内容出错2:"+exception .toString());

            console.log("JPushPlugin:onReceiveMessage-->" + exception);
        }
    };


    setTag=()=>{

        try {

            window.plugins.jPushPlugin.setTagsWithAlias(["15380822424"],"153");

        } catch (exception) {
            console.log(exception);
            Toast.info(e.message,3);
        }
    }

/***************** 推送 end ***********/


    onLeftClick(){

    //发布的时候,这句要放开
    window.plugins.jPushPlugin.setTags([]);


    localStorage.clear();
    hashHistory.push('/login');


    }


    searchHistory=()=>{


        if(localStorage.getItem("username")==null){
            Toast.info(loginMessage, 2);
            hashHistory.push('/login');
            return;

        }

        Toast.loading('拼命加载中...', 0);

        let url="http://101.200.46.114:8088/trademark/getsearchRecord.do?username="+ localStorage.getItem("username")+"&token=***";
        //let url="http://101.200.46.114:8088/trademark/getsearchRecord.do?username=13404144827&token=***";
        let mm=request
            .post(url)
            .end((err, response) => {
                Toast.hide();

                console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.info('搜索出错', 2);
                    return;
                }


                let responseText=JSON.parse(response.text);
                if (responseText.getCode=='0') {

                    //localStorage.setItem("history_search_list","[]");
                    localStorage.setItem("history_search_list",JSON.stringify(responseText.getList));
                    hashHistory.push('/history_Search');
                    //const {router} = this.props;
                    //router.push({pathname:'/history_Search',state:{list:responseText.getList}});
                }
                else{
                    Toast.info(responseText.getMessage, 2);
                }
            });
        console.log(url);
        console.log("搜索历史的发送请求信息:mm=",mm);


    }


    selectCategory(){
        //const {router} = this.props;
        //router.push({pathname:'/category',state:{showCategory:this.state.showCategory}});
        hashHistory.push('/category');


    }





    search=()=> {

        console.log("this.state=",this.state);
        //let n = this.props.form.getFieldsValue().user.replace(/\s+/g,"");
        //let p = this.props.form.getFieldsValue().password;
        //let url=`http://101.200.46.114:8088/trademark/login.do?username=`+n+`&password=`+p;
        //let url='http://101.200.46.114:8088/trademark/getsearchpic.do?username=15380822424&inputtxt=&pic=pn_1491807236710.jpg&status=01&bigclass=01&smallclass=0101&token=***';
        let username=localStorage.getItem("username");
        if (username==null) {
            Toast.info(loginMessage, 2);
            hashHistory.push('/login');
            return;

        }
        let picName_In_Server=localStorage.getItem("picName_In_Server");
        let selectedCategory=localStorage.getItem("selectedCategory");
        selectedCategory=JSON.parse(selectedCategory);

        if (picName_In_Server==null){
            Toast.info('没有上传图片', 1);
            return;
        }

        if (selectedCategory.length==0){
            Toast.info('没有选择商标类别', 1);
            return;
        }

        let categoryStr="";
        for( let i = 0; i < selectedCategory.length; i++) {
            let  item =selectedCategory[i];
            let big_typeId=item.typeID;
            if (i==0) {
                categoryStr += "bigclass=" + big_typeId;
            }else{
                categoryStr += "&bigclass=" + big_typeId;
            }



            let littelCategoryArr=item.littleCategory;
            let littleCategoryStr="";
            for( let j = 0; j < littelCategoryArr.length; j++) {
                let item =littelCategoryArr[j];
                let little_typeId=item.typeID;
                if (j!=littelCategoryArr.length-1){
                    littleCategoryStr+=little_typeId+"~";

                }
                else{
                    littleCategoryStr+=little_typeId;
                }
            }//end for

            if (littleCategoryStr!=""){
                categoryStr+="&smallclass="+littleCategoryStr;
            }
        }//end for

        console.log(categoryStr);

        let url='http://101.200.46.114:8088/trademark/getsearchpic.do?username='
            +username+'&inputtxt=&pic='+picName_In_Server
            +'&staus=01&'+categoryStr +'&token=***';
        console.log('搜索的url=',url);

        Toast.loading('搜索中...', 0);

        fetch(url, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(response=> {
                Toast.hide();
                console.log('response=',response);
                if (response.ok) {

                    return response.json();
                } else {
                    Toast.info('搜索出错', 1);
                    throw new Error();
                }
            })
            .then(json=> {
                json=eval(json);

                if (json.getCode==0) {
                    //hashHistory.push('/resultList');

                    Toast.info(json.getMessage, 2);
                    console.log('json=',json.getMessage);
                    //alert("json="+json.getMessage);

                } else {
                    Toast.info(json.getMessage, 2);
                    //throw new Error(json.msg);
                }
            })
            //.catch(e=>console.error(e));
        .catch(function (error) {
            Toast.info('本次请求失败', 2);

            console.log('搜索请求失败Request failed', error);

        });

    }

    onChange(radioValue) {

        this.setState({
            value:radioValue,
        });
    }

    onClickChooseImg=()=>{

        console.log('onClickChooseImg');
    }




    showActionSheet =() => {
        const BUTTONS = ['操作一', '操作二', '操作三', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                // title: '标题',
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
                if (buttonIndex==0){
                    //拍照并显示在屏幕
                    navigator.camera.getPicture(this.onLoadImageSuccess, this.onLoadImageFail,
                        {destinationType: Camera.DestinationType.FILE_URI});

                }
                else if (buttonIndex==1){
                    navigator.camera.getPicture(this.onLoadImageSuccess(), this.onLoadImageFail, {
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                        allowEdit: true
                    });
                }
                else if (buttonIndex==2){
                    //拍照并显示在屏幕
                    navigator.camera.getPicture(this.onLoadImageSuccess, this.onLoadImageFail,
                        {destinationType: Camera.DestinationType.FILE_URI});

                }
            });
    }


    //本地图片选择成功后回调此函数
    onLoadImageSuccess=(imageURI) =>{


        var smallImage = document.getElementById('getImageLocal');

        smallImage.style.display = '';
        //在使用base64编码的时候需要使用这样的前缀
        smallImage.src =  imageURI;
    }

    //所有获取图片失败都回调此函数
    onLoadImageFail=(message)=> {

        navigator.notification.alert("拍照失败2，原因：" + message, null, "警告");
    }




    ////弹出图片蒙版
    //popImg=()=>{
    //
    //    console.log('popImg');
    //    let offsetX = -10; // just for pc demo
    //    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    //        offsetX = -26;
    //    }
    //
    //    return <Popover mask
    //                    visible={this.state.visible}
    //                    overlay={[
    //        (<Popover.Item key="4" value="scan" icon={<Icon type={require('./../img/zixun.jpg')} size="xs" />} data-seed="logId">扫一扫</Popover.Item>),
    //        (<Popover.Item key="5" value="special" icon={<Icon type={require('./../img/zixun.jpg')} size="xs" />} style={{ whiteSpace: 'nowrap' }}>我的二维码</Popover.Item>),
    //        (<Popover.Item key="6" value="button ct" icon={<Icon type={require('./../img/zixun.jpg')} size="xs" />}>
    //          <span style={{ marginRight: 5 }}>帮助</span>
    //        </Popover.Item>),
    //      ]}
    //                    popupAlign={{
    //        overflow: { adjustY: 0, adjustX: 0 },
    //        offset: [offsetX, 15],
    //      }}
    //                    onVisibleChange={this.handleVisibleChange}
    //                    onSelect={this.onSelect}
    //    >
    //        <div style={{
    //        height: '100%',
    //        padding: '0 0.3rem',
    //        marginRight: '-0.3rem',
    //        display: 'flex',
    //        alignItems: 'center',
    //      }}
    //        >
    //            <Icon type="ellipsis" />
    //        </div>
    //    </Popover>
    //}
    //


    //压缩上传
    uploadImg=()=>{




        //this. setpicUrl({"getMessage":"上传成功","getCode":"0","geturl":"http://101.200.46.114:8088/show/img/temp/img/pn_1491902969755.jpg"}
       // );

        if(localStorage.getItem("username")==null){
            Toast.info(loginMessage, 2);
            hashHistory.push('/login');
            return;

        }

        document.getElementById("choose").click();
    }


    //选择文件的回调
    fileSelected=(e)=>{

 console.log('在上传------------');

     //   Toast.loading('图片类型识别中', 0);



        // var file = fileObj.files['0'];
        var _self = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        //如果点了取消
        if(file==null){
            return;
        }

        //如果图片大小为0
        if(file.size==0){
            Toast.info('请上传有内容的图片',2);
            return;
        }

        let fileType=file.name.split('.')[1];
        if(fileType!='jpg' && fileType!='jpeg' && fileType!='JPG'&& fileType!='bmp' && fileType!='BMP' && fileType!='png' && fileType!='PNG')
        {
            Toast.info('请上传jpg/png/bmp格式的图片',2);
            return;
        }




        //
        //Toast.loading('正在识别图片方向……',1,
        //    () => {

               let date = (new Date()).getTime(); //得到毫秒数
                console.log('data1=',date);
                Toast.loading('正在上传中……',0);


                EXIF.getData(file, function () {

                    let Orientation = EXIF.getTag(this, 'Orientation');

                  //  Toast.hide();

                    //  alert('Orientation  ='+Orientation);


                    let date2 = (new Date()).getTime(); //得到毫秒数
                    console.log('data2=',date2);
                    if(date2>date){
                        console.log('date2大',date2-date);
                    }
                    else{
                        console.log('date1大');
                    }


                    //Toast.loading('图片压缩中……',1,
                    //
                    //    () => {

                            //开始压缩
                            reader.readAsDataURL(file);

                            reader.onload = function() {
                                var result = this.result;
                                //document.getElementById("getImageLocal").src=result;
                                var img = new Image();
                                img.src = result;




//          图片加载完毕之后进行压缩，然后上传
                                if (img.complete) {
                                    compressAndUpload();
                                } else {
                                    img.onload = compressAndUpload;
                                }



                                //    使用canvas对大图片进行压缩
                                function compressAndUpload() {

                                  //  Toast.loading('图片压缩中……',0);






                                    //    用于压缩图片的canvas
                                    let canvas = document.createElement("canvas");
                                    let ctx = canvas.getContext('2d');
                                    //    瓦片canvas
                                    let tCanvas = document.createElement("canvas");



                                    let initSize = img.src.length;



                                    //电脑端宽付宽,高赋高,ios端,高宽要相反.
                                    //var width = img.width;
                                    //var height = img.height;
                                    let width = img.height;
                                    let height = img.width;
                                    let ratio;
                                    let ndata ;


                                    //如果图片大于6百万像素，计算压缩比并将大小压至600万以下
                                    ratio=width * height /600000;
                                    if (ratio  > 1) {
                                        ratio = Math.sqrt(ratio);
                                        width /= ratio;
                                        height /= ratio;

                                        canvas.width = width;
                                        canvas.height = height;
                                        ctx.fillStyle = "#fff";
                                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                                        if(Orientation==6){
                                            //旋转画布

                                            ctx.save();//保存状态
                                            ctx.translate(width / 2, height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
                                            ctx.rotate(90 * Math.PI / 180);//把画布旋转90度
                                            // 执行Canvas的drawImage语句
                                            ctx.drawImage(img, -height/2, -width /2,  height, width);//把图片绘制在画布translate之前的中心点，
                                            ctx.restore();//恢复状态

                                        }
                                        else  if(Orientation==3){

                                            canvas.width = height;
                                            canvas.height = width;
                                            ctx.fillStyle = "#fff";
                                            ctx.fillRect(0, 0, canvas.width, canvas.height);


                                            //旋转画布

                                            ctx.save();//保存状态
                                            ctx.translate(canvas.width / 2, canvas.height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
                                            ctx.rotate(180 * Math.PI / 180);//把画布旋转180度
                                            // 执行Canvas的drawImage语句
                                            ctx.drawImage(img, -canvas.width / 2 ,-canvas.height/2 ,canvas.width,canvas.height);//把图片绘制在画布translate之前的中心点，
                                            //           (x,y            宽,高)
                                            ctx.restore();//恢复状态



                                        }
                                        else
                                        {

                                            ctx.drawImage(img, 0, 0, width, height);

                                        }

                                        ndata = canvas.toDataURL('image/jpeg');



                                    }
                                    //如果图片小于6百万像素，
                                    else {
                                        canvas.width = width;
                                        canvas.height = height;

                                        if(Orientation==6){
                                            //旋转画布

                                            ctx.save();//保存状态
                                            ctx.translate(width / 2, height / 2);//设置画布上的(0,0)位置，也就是旋转的中心点
                                            ctx.rotate(90 * Math.PI / 180);//把画布旋转90度
                                            // 执行Canvas的drawImage语句
                                            ctx.drawImage(img, -height/2, -width /2,  height, width);//把图片绘制在画布translate之前的中心点，
                                            ctx.restore();//恢复状态

                                        }
                                        else{
                                            //不对图片进行操作
                                            ndata=img.src;
                                            console.log('ndata：' + ndata.length);


                                        }



                                    }


                                    console.log('压缩前：' + initSize);
                                    console.log('压缩后：' + ndata.length);
                                    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                                    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;





                                   // Toast.hide();
                                    //压缩完成,开始上传

                                    ndata = ndata.split(',')[1];
                                    ndata = window.atob(ndata);
                                    var ia = new Uint8Array(ndata.length);
                                    for (var i = 0; i < ndata.length; i++) {
                                        ia[i] = ndata.charCodeAt(i);
                                    };
                                    //canvas.toDataURL 返回的默认格式就是 image/png
                                    var blob = new Blob([ia], {
                                        type: "image/jpeg",
                                        //name:"出库列表.jpg"
                                    });


                                   // Toast.loading('图片上传中...', 0);
                                    //Toast.loading('图片上传中...', 1,() => {
                                        let sendImg=request
                                            //.post("http://192.168.1.101:9090/erp/attachment.action?method:uploadFileNew")
                                            .post("http://101.200.46.114:8088/trademark/postimg.do")
                                            //.field('upload_preset', 'bmzjbxoq')
                                            .field('username', localStorage.getItem("username"))
                                            .attach('file', blob)
                                            ;

                                        console.log('sendImg=',sendImg);
                                        //response.text={"getMessage":"上传成功","getCode":"0","geturl":"http://101.200.46.114:8088/show/img/temp/img/pn_1491902969755.jpg"}
                                        sendImg.end((err, response) => {
                                            console.log('err=',err);
                                            console.log('response=',response);
                                            //alert("上传图片的返回="+response.text)

                                            Toast.hide();

                                            if (err) {
                                                console.error(err);
                                                Toast.fail('上传失败'+err.message, 1);
                                                return;
                                            }

                                            try {
                                                if (JSON.parse(response.text).getCode == 0) {
                                                    //取出传回的图片的服务器端名称
                                                    _self.setPicUrl(response.text);
                                                    let picUrl_search = JSON.parse(response.text).geturl;
                                                    localStorage.setItem("picUrl_search", picUrl_search);
                                                    document.getElementById("getImageLocal").src = picUrl_search;


                                                    Toast.info('上传成功', 1);

                                                }
                                                else {
                                                    Toast.info('上传失败', 1);

                                                }
                                            }catch (e){
                                                Toast.info(e.message,1);

                                            }




                                        });


                                        img = null;


                                    //}
                                    //);//end 图片上传










                                }

                            }




                    //    }
                    //
                    //);//end 图片压缩中






                });//end  EXIF.getData


        //    }
        //
        //);//end 正在识别图片方向





    }

    setPicUrl=(response_text)=>{

        let mm=JSON.parse(response_text);
        console.log('mm==',mm.geturl);
        let url=mm.geturl;

        let begin=url.indexOf("pn_");
        if(begin> 0 )
        {
            console.log('begin==',begin);
        }

        let end =url.indexOf(".jpg");
        if(end> 0 )
        {
            console.log('end ==',end);
        }

        let uu=url.substring(45, end+4);
        console.log('picUrl_search=',url);

        localStorage.setItem("picUrl_search", url);
        localStorage.setItem("picName_In_Server", uu);



        //this.setState({
        //    picUrl:uu,
        //});
        //
        //
        //
        ////alert("截取的图片的名字="+uu);
        //var that = this;
        //this.setState({picUrl:uu,}, function () {
        //    console.log('this.state.picUrl=',that.state.picUrl);
        //});



    }


    //lg:15
    //xl:20.99
    //8.99

    render() {
        const items = [{id: '1'}, {id: 'header'}];

        var myData = require('./category.json');

        return (

            <div className="xm">


                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

                <NavBar  iconName="null" leftContent="注销" mode="dark" onLeftClick={() =>this.onLeftClick()}
                         rightContent={<Button type="primary"    style={{ fontSize: '0.32rem' }} onClick={this.searchHistory}>搜索历史</Button>}
                ></NavBar>


                <div className="search" style={{ margin: '0 15px' , background: 'rgb(244,244,244)'}}>
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    <List >
                        <InputItem
                            placeholder="请输入"
                            data-seed="logId"
                        >关键词:</InputItem>
                    </List>



                    <WhiteSpace size="sm" />
                    <div style={{ textAlign:'center'}} onclick={this.popImg}>

                        <img src={localStorage.getItem("picUrl_search")==null?require('./../img/zixun.jpg'):localStorage.getItem("picUrl_search")} id="getImageLocal" style={{display:'',  width: '240px',height: '240px'}}/>
                    </div>


                    <input type="file" accept="image/*"   onChange={(e)=>this.fileSelected(e)} style={{display:'none'}} id="choose"  multiple/>
                    <Button className="btn" icon="" onClick={this.uploadImg}>图片上传</Button>



                    <WhiteSpace size="sm" />
                    <list>
                        <List.Item> {
                            <Flex>
                                <Flex.Item style={{marginRight:60}}>
                                    商标状态:
                                </Flex.Item>

                                <Flex.Item>
                                    <Radio className="my-radio" checked={this.state.value===0} value="0" onChange={(e) =>this.onChange(0)}>全部</Radio>
                                </Flex.Item>

                                <Flex.Item>
                                    <Radio  className="my-radio" checked={this.state.value===1} value="1" onChange={(e) =>this.onChange(1)}>已注册</Radio>
                                </Flex.Item>

                                <Flex.Item>
                                    <Radio  className="my-radio" checked={this.state.value===2} value="2" onChange={(e) =>this.onChange(2)}>注册中</Radio>
                                </Flex.Item>

                            </Flex>
                        }
                        </List.Item>
                    </list>


                    <WhiteSpace size="sm" />
                    <Button className="btn" data-seed="logId" onClick={this.selectCategory.bind(this)}>选择分类</Button>


                    { JSON.parse(localStorage.getItem("selectedCategory")).length>0
                    && <div id="categoryList" className="my_little" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Accordion accordion openAnimation={{}} style={{padding: '0.2rem', borderTop: 0,borderBottom: 0}}>

                            {JSON.parse(localStorage.getItem("selectedCategory")).map(i=>(
                                <Accordion.Panel header={i.typeName} key={i.typeID}>
                                    <List style={{borderTop: 0,borderBottom: 0}}>
                                        {i.littleCategory.map(function(obj){

                                            if(obj.check==true){

                                                return <List.Item  key={obj.typeID}  style={{ color: '#ccc',  fontSize: '0.09rem'}}>{obj.typeName}</List.Item>

                                            }
                                        })}
                                    </List>
                                </Accordion.Panel>
                            ))}
                        </Accordion>


                    </div>
                    }

                    <WhiteSpace size="sm" />
                    <Button style={{  }} className="btn" type="primary" onClick={this.search}>搜索</Button>

    </div>

            </div>


        );
    }
};



