/**
 * Created by xuming on 17/2/15.
 */
import React from 'react'
import {WhiteSpace,List, InputItem, NavBar,Button } from 'antd-mobile';
import './detail.less'


export  default  React.createClass({
    jumpToHome(){

        window.location.hash="/";
    },
    jumpBack(){

        window.location.hash="/detailList";
    },


    render() {


        return (
            <div>
                <NavBar leftContent="返回" mode="dark" onLeftClick={this.jumpBack}
                        rightContent={<Button type="primary"    style={{ fontSize: '0.32rem',marginLeft: '1rem'  }} onClick={this.jumpToHome}>首页</Button>}
                >商标详情</NavBar>






                <div className="img">
                    <img src={require('./zixun.jpg')} alt="Ballade" width="160" height="160"/>
                    <div className="desc">在此处添加对图像的描述</div>
                </div>

                <List renderHeader={() => ''}>
                    <InputItem
                        value="不可编辑"
                        editable={false}
                    >商标注册号:</InputItem>
                    <InputItem
                        value="不可编辑"
                        editable={false}
                    >申请人名称:</InputItem>
                    <InputItem
                        value="不可编辑"
                        editable={false}
                    >申请人日期:</InputItem>
                    <InputItem
                        value="不可编辑"
                        editable={false}
                    >初审公告日期:</InputItem>
                </List>

            </div>
        );
    },
});



