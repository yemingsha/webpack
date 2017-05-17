/**
 * Created by xuming on 17/2/2.
 */
import React from 'react';
import { NavBar, Icon ,List, WhiteSpace} from 'antd-mobile';
import { hashHistory } from 'react-router';



const category=require('./category.json');


export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //showCategory:this.props.location.state==undefined? []:this.props.location.state.showCategory
        }

        // console.log('category   this.props=======',this.props);
        // console.log('category   this.props.children=======',this.props.children);
        //
         console.log('category   this.state=======',category);
    }


    jumpToLittleCategory=(typeID)=>{
        const {router} = this.props;
        // var v = e.target.parentElement.parentElement.getAttribute("value");
        // router.push({pathname:'/littleCategory',state:{categoryNo:v, categoryName:e.target.textContent}});

        // this.props.history.pushState({categoryNo:"wwsw"}, "/littleCategory");

        category.map(item=> {
            if (item.typeID == typeID) {

                router.push({pathname:'/littleCategory',state:{item:item,}});
                //router.push({pathname:'/littleCategory',state:{showCategory:this.state.showCategory, item:item,}});
                //hashHistory.push('/littleCategory');

                return;
            }

        });

    }

    onLeftClick=()=>{
        const path = '/';
        hashHistory.push(path)
    }

    //在 组件卸载的生命周期里面, 把在组件外部定义的变量 设置为 null, 这样JS的垃圾回收机制就会把 组件外部定义的变量 回收. 而不造成 内存泄露
    componentWillUnmount(){
        // category=null;
    }


    render() {
        return (
            <div>
                <div  />
                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

                <NavBar leftContent="返回" mode="dark" onLeftClick={() =>this.onLeftClick()}


                ></NavBar>

                <WhiteSpace  />

                <List  className="my-list">
                    {category.map(i=>(
                        <List.Item  key={i.typeID} arrow="horizontal" value={i.typeID} onClick={()=>this.jumpToLittleCategory(i.typeID)}>
                            {i.typeName}
                        </List.Item>

                    ))}


                </List>
            </div>


        );
    }
}


