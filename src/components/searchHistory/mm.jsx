/**
 * Created by xuming on 17/2/13.
 */
import React  from 'react';
import {List,NavBar, Icon, Toast, WhiteSpace,SwipeAction} from 'antd-mobile';
import request from 'superagent';
import { hashHistory } from 'react-router';
import './history_Search.less';






export  default  class History_Search extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            list:JSON.parse( localStorage.getItem("history_search_list")),


        };


    }


    //跳转到下一页:大类搜索结果页
    jumpTo_history_SearchBigCategory_List(recordId,picUrl){
        //window.location.hash="/history_SearchBigCategory_List";

        Toast.loading('搜索中...', 0);
        let url="http://101.200.46.114:8088/trademark/getRecord.do?token=***&recordId="+recordId;

        let mm=request
            .post(url)
            .end((err, response) => {
                Toast.hide();

                console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.info(err.toString(), 1);
                    return;
                }

                let responseText=JSON.parse( response.text);
                if (responseText.getCode == '0') {
                    localStorage.setItem("history_searchResoult_groupby_littleCategory",JSON.stringify( responseText));
                    localStorage.setItem("picUrl",picUrl);
                    hashHistory.push('/history_SearchBigCategory_List');
                }
                else {
                    Toast.info(responseText.getMessage, 2);
                }
            });

    }

    jumpBack(){

        localStorage.setItem("history_search_list","[]");
        window.location.hash="/";
    }

    delete(item, index){
        console.log("delete")
        console.log("删除之前 list=",this.state.list);

        let username=localStorage.getItem("username");
        let url="http://101.200.46.114:8088/trademark/delRecord.do?username="+username+"&token=***&del="+item.recordId;
        let mm=request
            .post(url)
            .end((err, response) => {
                Toast.hide();

                console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.info(err.toString(), 1);
                    return;
                }

                let responseText=JSON.parse( response.text);
                if (responseText.getCode == '0') {
                    this.state.list.splice(index, 1);

                    console.log("删除的item =",item);
                    console.log("删除之后 list=",this.state.list);

                    this.setState({list: this.state.list});
                    localStorage.setItem("history_search_list",JSON.stringify(this.state.list));

                }
                else {
                    Toast.info(responseText.getMessage, 2);
                }
            });

    }

    render() {
        //let list=         JSON.parse( localStorage.getItem("history_search_list"));

        return (
            <div>
                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                >检索历史</NavBar>


                <List renderHeader={() => "共有"+this.state.list.length+"次搜索记录"} className="my-list">

                    {

                        this.state.list.map
                        ( (item,index,input)=>
                            (

                                <SwipeAction
                                    style={{ backgroundColor: 'gray' }}
                                    autoClose
                                    right={[

                                        {
                                          text: '删除',
                                          onPress: () => this.delete( item, index),
                                          style: { backgroundColor: '#F4333C', color: 'white' },
                                        },
                                      ]}

                                    onOpen={() => console.log('global open')}
                                    onClose={() => console.log('global close')}
                                >
                                    <List.Item
                                        arrow="horizontal"
                                        //thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                        thumb={"http://101.200.46.114:8088/show/img/temp/img/"+item.pic}
                                        multipleLine
                                        onClick={()=>this.jumpTo_history_SearchBigCategory_List(item.recordId, "http://101.200.46.114:8088/show/img/temp/img/"+item.pic)}
                                    >
                                        {item.findtime} <List.Item.Brief>{item.findcan}</List.Item.Brief>
                                    </List.Item>

                                </SwipeAction>

                            )//end item
                        )//end map
                    }

                </List>

            </div>
        )
    }

}