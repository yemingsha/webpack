import {ListView,Toast, NavBar, Icon,WhiteSpace,List} from 'antd-mobile';
import request from 'superagent';
import React from 'react';
import { hashHistory } from 'react-router';

import  './history_searchResult_inOneLittleCategory.less'




function MyBody(props) {
    return (
        <div className="am-list-body my-body" style={{   overflow: 'hidden'}}>
            <span style={{ display: 'none'}}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}




export  default  class History_searchResult_inOneLittleCategory  extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.dataSource = dataSource.cloneWithRows({}); //ListView

        this.littleData=[];
        this.pageIndex = 1;

        let littleCategoryItem=JSON.parse( localStorage.getItem('littleCategoryItem'));

        this.state = {
            dataSource: this.dataSource.cloneWithRows({}),
            //littleCategoryName:(this.props.location.state==null)? null:this.props.location.state.littleCategoryName,
            //findresultId:(this.props.location.state==null)? null:this.props.location.state.findresultId,
            //bigCategoryCode:(this.props.location.state==null)? null:this.props.location.state.bigCategoryCode,
            //totalPage:(this.props.location.state==null)? null:  Math.ceil(this.props.location.state.totalCounts/20),
            littleCategoryName:littleCategoryItem.clsname,
            findresultId:littleCategoryItem.findresultId,
            isLoading: true,
            bigCategoryCode:littleCategoryItem.clsid,
            totalPage: Math.ceil(littleCategoryItem.nums/20),
            hasMore:false,

        };


    }

    componentDidMount() {
        //// you can scroll to the specified position
        //// this.refs.lv.refs.listview.scrollTo(0, 200);
        //
        //// simulate initial Ajax
        //setTimeout(() => {
        //    this.genData();
        //    this.setState({
        //        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        //        isLoading: false,
        //    });
        //}, 600);

        this.loadData(this.pageIndex);


    }

    loadData(pageIndex){
        console.log('pageIndex=',pageIndex);


        Toast.loading('拼命加载中...', 0);
        let findresultId=this.state.findresultId;
        let bigCategoryCode=this.state.bigCategoryCode;
        let username=localStorage.getItem("username");

        let url="http://101.200.46.114:8088/trademark/getfindlist.do?fid="
            +findresultId+"&clsid="+bigCategoryCode+"&username="+username+"&token=***&totalpage="+pageIndex;
        console.log('url=',url);


        let mm=request
            .post(url)
            .end((err, response) => {
                Toast.hide();

              console.log('response=',response);

                if (err) {
                    console.log('err=',err);
                    Toast.fail(err.toString(), 1);

                    this.setState(
                        {
                            dataSource: this.dataSource.cloneWithRows({}),
                            isLoading:false,
                        });

                    return;
                }


                let responseText=JSON.parse( response.text);
                if (responseText.getCode == '0') {
                    let listData=responseText.getList;

                    for (let i=0; i<listData.length; i++){
                        this.littleData.push(listData[i]);
                    }

                    console.log('this.littleData=',this.littleData.length);
                    this.setState(
                        {
                            dataSource: this.dataSource.cloneWithRows(this.littleData),
                            isLoading:false,
                        }
                    );


                    //console.log('this.state.dataSource=',this.state.dataSource);

                }
                else {
                    Toast.fail(json.getMessage, 1);

                }
            });



    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);

        this.pageIndex++;

        console.log('pageIndex=',this.pageIndex, 'totalPage=',this.state.totalPage);

        if (this.pageIndex>this.state.totalPage)
        {
            //Toast.info('已经到底了' ,1);


            this.setState(
                {
                    hasMore:true,
                });

            return;

        }


        this.setState({ isLoading: true });
        this.loadData(this.pageIndex);

        //setTimeout(() => {
        //    this.genData(++pageIndex);
        //    this.setState({
        //        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        //        isLoading: false,
        //    });
        //}, 1000);
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
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 0,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            // console.log('rowData=', rowData);
            return (

            <List.Item extra={rowData.status==2?'已注册':'未注册'} align="top" thumb={rowData.imgurl} onClick={()=>this.jumpToetail(rowData.id)} multipleLine>
                {rowData.tradename+rowID} <List.Item.Brief>{rowData.registPerson}</List.Item.Brief>
            </List.Item>




            );
        };




        return (
            <div className="xm">

                    <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

                    <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                >{this.state.littleCategoryName}</NavBar>


            <div style={{ margin: '0 auto', width: '100%' }}>



                    <ListView ref="lv"
                              dataSource={this.state.dataSource}
                              renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                  {this.state.hasMore? '已经到底了':(   this.state.isLoading ? '加载中...' : '加载完毕')}
                </div>}

                              renderBodyComponent={() => <MyBody />}
                              renderRow={row}
                              renderSeparator={separator}
                              className="fortest"
                              style={{
                  height: document.documentElement.clientHeight ,
                  overflow: 'auto',
                  border: '1px solid #ddd',
                  margin: '0.1rem 0',
                }}
                              pageSize={4}
                              scrollRenderAheadDistance={500}
                              scrollEventThrottle={20}
                              onScroll={() => { console.log('scroll'); }}
                              onEndReached={this.onEndReached}
                              onEndReachedThreshold={10}//超过这个长度,就调用onend reached 函数
                    />
        </div>
       </div>

                );
    }
}

