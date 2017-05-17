/**
 * Created by xuming on 17/2/13.
 */
import React  from 'react';
import {List,Toast, NavBar, Icon,WhiteSpace} from 'antd-mobile';
import request from 'superagent';
import { hashHistory } from 'react-router';



export  default  class History_SearchLittleCategory_List extends React.Component{

    constructor(props) {
        super(props);

        this.state={
        };


    }


    //跳到小类搜索列表
    jumpToetail(brandId){

        // window.location.hash="/history_SearchLittleCategory_List";
        Toast.loading('搜索中...', 0);

        let mm=request
            .post("http://101.200.46.114:8088/trademark/getfindinfo.do?id="+brandId+"&token=***")
            .end((err, response) => {
                Toast.hide();

                console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.fail(err.toString(), 1);
                    return;
                }



                let responseText=JSON.parse( response.text);
                if (responseText.getCode == '0') {
                    localStorage.setItem("brandDetail",JSON.stringify(responseText));
                    hashHistory.push('/history_Search_Detail');
                   // hashHistory.push('/history_searchResult_inOneLittleCategory');

                }
                else {
                    Toast.fail(json.getMessage, 1);

                }
            });


    }

    jumpBack(){

        window.location.hash="/history_SearchBigCategory_List";
    }

    render() {


        let searchResult=JSON.parse( localStorage.getItem("history_oneLittleCategory_result"));
        let bigClassName=searchResult.bigclassname;
        let littleClassName=searchResult.smallclassname;
        let list=searchResult.getList;

        return (
            <div>
                <WhiteSpace size="xl" />

                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                >{bigClassName}</NavBar>


                <List renderHeader={() => "小类名称:"+littleClassName+""} className="my-list">
                    {

                        list.map
                        (item=>
                            (
                                <List.Item
                                    arrow="horizontal"
                                    //thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                    thumb={item.imgurl}
                                    extra={item.status==2?"已注册":"注册中"}
                                    multipleLine
                                    onClick={()=>this.jumpToetail(item.id)}
                                >
                                    {item.tradename}
                                    <List.Item.Brief>{item.registPerson}</List.Item.Brief>
                                </List.Item>
                            )//end item
                        )//end map
                    }
                </List>
            </div>
        )
    }

}