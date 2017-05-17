/**
 * Created by xuming on 17/2/13.
 */
import React  from 'react';
import {List,Toast, NavBar, Icon,WhiteSpace} from 'antd-mobile';
import request from 'superagent';
import { hashHistory } from 'react-router';



export  default  class History_SearchBigCategory_List extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            list:JSON.parse( localStorage.getItem("history_searchResoult_groupby_littleCategory")).getList,
            history_search_brand_totalCount:JSON.parse( localStorage.getItem("history_searchResoult_groupby_littleCategory")).allnum,
            picUrl:localStorage.getItem("picUrl"),
        };
        console.log("picUrl",this.state.picUrl);


    }


    //跳到小类搜索列表
    jumpTo_History_SearchLittleCategory_List(item){
        localStorage.setItem('littleCategoryItem',JSON.stringify(item));
        const {router} = this.props;
        router.push({pathname:'/history_searchResult_inOneLittleCategory',state:{}});


        // Toast.loading('搜索中...', 0);
       // let url="http://101.200.46.114:8088/trademark/getfindlist.do?fid="
       //     +findresultId+"&clsid="+bigCategoryCode+"&username="+localStorage.getItem("username")+"&token=***&totalpage=1";

        //let mm=request
        //    .post(url)
        //    .end((err, response) => {
        //        Toast.hide();
        //
        //        console.log('response=',response);
        //
        //        if (err) {
        //            console.log('err=',err);
        //            Toast.fail(err.toString(), 1);
        //            return;
        //        }
        //
        //
        //        let responseText=JSON.parse( response.text);
        //        if (responseText.getCode == '0') {
        //            localStorage.setItem("history_oneLittleCategory_result",JSON.stringify(responseText));
        //            //hashHistory.push('/history_SearchLittleCategory_List');
        //            //hashHistory.push('/history_searchResult_inOneLittleCategory');
        //
        //            const {router} = this.props;
        //            router.push({pathname:'/history_searchResult_inOneLittleCategory',state:{findresultId:findresultId, bigCategoryCode:bigCategoryCode}});
        //
        //        }
        //        else {
        //            Toast.fail(json.getMessage, 1);
        //
        //        }
        //    });


    }

    jumpBack(){

        window.location.hash="/history_Search";
    }

    render() {



        return (
            <div>
                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                >检索历史:按小类统计</NavBar>


                <List renderHeader={() => "共有"+this.state.history_search_brand_totalCount+"条"} className="my-list">
                    {
                        this.state.list.map
                        (item=>
                            (
                                <List.Item
                                    arrow="horizontal"
                                    //thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                    thumb={this.state.picUrl}
                                    extra={""+item.nums+"条"}
                                    multipleLine
                                    onClick={()=>this.jumpTo_History_SearchLittleCategory_List( item)}
                                >
                                    {item.clsname}
                                </List.Item>
                            )//end item
                        )//end map
                    }
                </List>
            </div>
        )
    }

}