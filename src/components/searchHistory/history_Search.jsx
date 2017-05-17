import { RefreshControl, ListView } from 'antd-mobile';
import React  from 'react';
import {List,NavBar, Icon, Toast, WhiteSpace,SwipeAction} from 'antd-mobile';
import request from 'superagent';
import { hashHistory } from 'react-router';
import './history_Search.less'



export  default  class History_Search extends React.Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.dataSource = dataSource.cloneWithRows({}); //ListView


        this.state = {
            dataSource: this.dataSource.cloneWithRows({}),
            refreshing: false,
            count:0,
        };
    }

    componentDidMount() {
        this.loadData();


    }


    loadData(){


        Toast.loading('拼命加载中...', 0);

        let username=localStorage.getItem("username");
        let url="http://101.200.46.114:8088/trademark/getsearchRecord.do?username="+username+"&token=***";
        console.log("搜索历史的发送请求信息:url=",url);

        let mm=request
            .post(url)
            .end((err, response) => {
                Toast.hide();

                console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.fail(err.message, 3);

                    this.setState(
                        {
                            dataSource: this.dataSource.cloneWithRows({}),
                            refreshing: false,
                        });

                    return;
                }


                let responseText=JSON.parse( response.text);
                if (responseText.getCode == '0') {
                    let listData=responseText.getList;

                    let  arr=[];

                    for (let i=0; i<listData.length; i++){
                        arr.push(listData[i]);
                    }

                    this.setState(
                        {
                            dataSource: this.dataSource.cloneWithRows(arr),
                            refreshing: false,
                            count:arr.length,
                        }
                    );


                }
                else {
                    Toast.fail(json.getMessage, 1);

                }
            });



    }



    onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {

            this.loadData();


        }, 1000);
    };
    onScroll = () => {
        console.log('sss');
    };



    jumpBack(){

        localStorage.setItem("history_search_list","[]");
        window.location.hash="/";
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


    delete(item, index){
        //console.log("删除之前 list=",this.state.list);

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
                    //this.state.list.splice(index, 1);
                    //
                    //console.log("删除的item =",item);
                    //console.log("删除之后 list=",this.state.list);
                    //
                    //this.setState({list: this.state.list});
                    //localStorage.setItem("history_search_list",JSON.stringify(this.state.list));
                    this.loadData();

                }
                else {
                    Toast.info(responseText.getMessage, 2);
                }
            });

    }



    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
          backgroundColor: '#F5F5F9',
          height: 0,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
            />
        );
        const row = (rowData, sectionID, rowID) => {

            return (
                <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[

                                        {
                                          text: '删除',
                                          onPress: () => this.delete( rowData, rowID),
                                          style: { backgroundColor: '#F4333C', color: 'white' },
                                        },
                                      ]}

                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                >
                    <List.Item
                        arrow="horizontal"
                        thumb={"http://101.200.46.114:8088/show/img/temp/img/"+rowData.pic}
                        multipleLine
                        onClick={()=>this.jumpTo_history_SearchBigCategory_List(rowData.recordId,"http://101.200.46.114:8088/show/img/temp/img/"+rowData.pic)}
                    >
                        {rowData.findtime} <List.Item.Brief>{rowData.findcan}</List.Item.Brief>
                    </List.Item>

                </SwipeAction>




            );//end return
        };//end row
        return (
            <div>
            <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

            <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}>检索历史:{this.state.count}条记录</NavBar>


            <ListView
                dataSource={this.state.dataSource}
                renderRow={row}
                renderSeparator={separator}
                initialListSize={300}
                pageSize={5}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                onScroll={this.onScroll}
                style={{
          height: document.documentElement.clientHeight,
          border: '1px solid #ddd',
          margin: '0 0',
        }}
                scrollerOptions={{ scrollbars: true }}
                refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
            />

                </div>
        );
    }
}
