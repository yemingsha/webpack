/**
 * Created by xuming on 17/2/15.
 */
import React from 'react'
import {WhiteSpace,List, InputItem, NavBar,Button } from 'antd-mobile';
import './history_Search_Detail.less'


export  default  React.createClass({
    jumpToHome(){

        window.location.hash="/";
    },
    jumpBack(){

        //window.location.hash="/history_SearchLittleCategory_List";
        window.location.hash="history_searchResult_inOneLittleCategory";

    },


    render() {

        let brandDetail=JSON.parse( localStorage.getItem("brandDetail"));
        let state=brandDetail.status==2?"已注册":"注册中";
        let brandName=brandDetail.tradename;
        let littleCategoryName=brandDetail.classname;
        let finishDate=brandDetail.reqFinishDate;
        let registPerson=brandDetail.registPerson;
        let startDate=brandDetail.reqStartDate;
        let picUrl=brandDetail.imgurl;
        let registCode=brandDetail.registCode;


        return (
            <div>
                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>


                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                        rightContent={<Button type="primary"
                        style={{ fontSize: '0.32rem',marginLeft: '1rem'  }}
                        onClick={this.jumpToHome}>首页</Button>}
                >商标详情</NavBar>


                <div className="img">
                    <img style={{ margin: 5 }} src={picUrl} alt="Ballade" width="360" height="360"/>
                </div>

                <List renderHeader={() => '商标信息'} className="my-list">
                    < List.Item extra={state}>商标状态:</List.Item>
                    < List.Item extra={brandName}>商标名称:</List.Item>
                    < List.Item extra={littleCategoryName}>所属小类:</List.Item>
                    < List.Item extra={finishDate}>申请开始日期:</List.Item>
                    < List.Item extra={startDate}>申请结束日期:</List.Item>
                    < List.Item extra={registPerson}>注册人:</List.Item>
                    < List.Item extra={registCode}>注册码:</List.Item>

                </List>

            </div>
        );
    },
});



