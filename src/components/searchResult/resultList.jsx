/**
 * Created by xuming on 17/2/13.
 */
import React  from 'react';
import {List,NavBar, Icon} from 'antd-mobile';




var searchResultData=
    [{no:'4',name:'多行标题文字，文字可能比较长、文字可能比较长、直接折行' , number:'相似9条'},
    {no:'0', name:'多行标题文字，文字可能比较长、文字可能比较长、直接折行' , number:'相似9条'},
    {no:'1', name:'多行标题文字，文字可能比较长、文字可能比较长、直接折行' , number:'相似9条'},
    {no:'2', name:'多行标题文字，文字可能比较长、文字可能比较长、直接折行' , number:'相似9条'},
    {no:'3', name:'多行标题文字，文字可能比较长、文字可能比较长、直接折行' , number:'相似9条'}];



export  default  class ResultList extends React.Component{

    jumpToDetailList(){

        window.location.hash="/detailList";
        console.log('this',this);

    }

    jumpBack(){

        window.location.hash="/search";
    }

    render() {



        return (
            <div>
                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                >检索结果</NavBar>



                <List renderHeader={() => '供查出35条相似信息'} className="my-list">

                    {
                        searchResultData.map(item=>(
                             <List.Item arrow="horizontal" key={item.no} extra={item.number} multipleLine
                                           onClick={this.jumpToDetailList}  wrap>
                                {item.name}
                            </List.Item>

                    //         <List.Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine wrap>
                    //{item.name} <List.Item.Brief>副标题</List.Item.Brief>
                    //    </List.Item>
                        )

                        )

                    }

                </List>
            </div>
        )
    }

}