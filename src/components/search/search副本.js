import React from 'react';
import ReactDOM from 'react-dom';

// import 'antd-mobile/lib/button/style/index.css';
// import Button from 'antd-mobile/lib/button';
// import 'antd-mobile/lib/list-view/style/index.css';
// import ListView from 'antd-mobile/lib/list-view';

//import Misc from './components/Misc';
//import Carousel from './components/Carousel';
//import Form from './components/Form';
//import RefreshControl from './components/RefreshControl';
//import Modal from './components/Modal';
//import Popup from './components/Popup';
import './search.less';


import {Popover, WhiteSpace,ActionSheet, Toast,SearchBar,Radio ,Icon, TextareaItem, Accordion, List, InputItem, Flex, Button} from 'antd-mobile';

const RadioGroup = Radio.Group;
const RadioItem = Radio.RadioItem;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    }
}

const onMaskClose = () => {
    console.log('onMaskClose');
    // also support Promise
    // return new Promise((resolve) => {
    //   console.log('1000ms 后关闭');
    //   setTimeout(resolve, 1000);
    // });
}

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        // this.selectCategory= this.selectCategory.bind(this);


        this.state={
            showCategory:(this.props.location.state==undefined)? []:this.props.location.state.showCategory,
            value:'0',
            showCategoryList:false,


        };


        console.log('1 this.state.showCategoryList',this.state.showCategoryList);
        console.log('1 this.state.showCategory=',this.state.showCategory);


        if (this.state.showCategory.length==0) {
            this.state.showCategoryList=false;
        }
        else {

            this.state.showCategoryList = true;
        }

    }


    selectCategory(){
        const {router} = this.props;
        router.push({pathname:'/category',state:{showCategory:this.state.showCategory}});
    }

    search() {
        window.location.hash="/resultList";

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
        alert('success')

        var smallImage = document.getElementById('getImageLocal');

        smallImage.style.display = '';
        //在使用base64编码的时候需要使用这样的前缀
        smallImage.src =  imageURI;
    }

    //所有获取图片失败都回调此函数
    onLoadImageFail=(message)=> {
        alert('fail');
        navigator.notification.alert("拍照失败2，原因：" + message, null, "警告");
    }



    //弹出图片蒙版
    popImg=()=>{

        console.log('popImg');
        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }

        return <Popover mask
                        visible={this.state.visible}
                        overlay={[
            (<Popover.Item key="4" value="scan" icon={<Icon type={require('./../img/zixun.jpg')} size="xs" />} data-seed="logId">扫一扫</Popover.Item>),
            (<Popover.Item key="5" value="special" icon={<Icon type={require('./../img/zixun.jpg')} size="xs" />} style={{ whiteSpace: 'nowrap' }}>我的二维码</Popover.Item>),
            (<Popover.Item key="6" value="button ct" icon={<Icon type={require('./../img/zixun.jpg')} size="xs" />}>
              <span style={{ marginRight: 5 }}>帮助</span>
            </Popover.Item>),
          ]}
                        popupAlign={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [offsetX, 15],
          }}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.onSelect}
        >
            <div style={{
            height: '100%',
            padding: '0 0.3rem',
            marginRight: '-0.3rem',
            display: 'flex',
            alignItems: 'center',
          }}
            >
                <Icon type="ellipsis" />
            </div>
        </Popover>
    }


    render() {
        const items = [{id: '1'}, {id: 'header'}];


        return (

            <div style={{ margin: '0 15px' , background: 'rgb(244,244,244)'}}>

                <WhiteSpace size="xl" /><WhiteSpace size="xl" />
                <List >
                    <InputItem
                        placeholder="请输入"
                        data-seed="logId"
                    >关键词:</InputItem>
                </List>

                <WhiteSpace size="sm" />
                <list>
                    <InputItem
                        extra={<img  onClick={this.showActionSheet.bind(this)} src="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" />}
                    >上传照片:</InputItem>
                </list>

                <WhiteSpace size="sm" />
                <div style={{ textAlign:'center'}} onclick={this.popImg}>

                    <img src={require('./../img/zixun.jpg')} id="getImageLocal" style={{display:'',  width: '120px',height: '120px'}}/>
                </div>

                <Button style={{  }} className="btn" type="primary" onClick={this.popImg}>搜索</Button>



                <WhiteSpace size="sm" />
                <list>
                    <List.Item> {
                        <Flex>
                            <Flex.Item style={{marginRight:60}}>
                                商标状态:
                            </Flex.Item>

                            <Flex.Item>
                                <Radio className="my-radio" checked={this.state.value===0} value="0" onChange={(e) =>this.onChange(0)}>全部商标</Radio>
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


                {this.state.showCategoryList && <div id="categoryList" style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion accordion openAnimation={{}} style={{padding: '0.2rem', borderTop: 0,borderBottom: 0}}>

                        {this.state.showCategory.map(i=>(
                            <Accordion.Panel header={i.name} key={i.no}>
                                <List style={{borderTop: 0,borderBottom: 0}}>
                                    {i.littleCategory.map(function(obj){

                                        if(obj.check==true){

                                            return <List.Item  key={obj.no}  style={{ color: '#ccc',  fontSize: '0.09rem'}}>{obj.name}</List.Item>

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


        );
    }
};



