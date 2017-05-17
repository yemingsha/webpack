/**
 * Created by xuming on 17/2/2.
 */
/**
 * Created by xuming on 17/2/2.
 */
import React from 'react';
import {Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import {WhiteSpace, NavBar, Icon ,List,Switch,Button,Checkbox,Flex} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;

class LittleCategory extends React.Component {

    constructor(props) {
        super(props);


        this.state={
            //showCategory:this.props.location.state.showCategory,
            item:this.props.location.state.item,
        }

        console.log('LittleCategory   this.props=======',this.props);
        console.log('LittleCategory   this.state=======',this.state);



    }


      selectSubmit=()=>{
        const {router} = this.props;

          //if (localStorage.getItem("selectedCategory")!=null){
              JSON.parse(localStorage.getItem("selectedCategory")).map(i=>{
                  if (i.typeID==this.state.item.typeID){
                      i=this.state.item;
                  }
              });
          //};


        let newShowCategory=[];
        let category_one_item={};



        //选中的小类
        let newLittleCategory=new Array();
        for (var index in this.state.item.littleCategory) {

            console.log(index,'=',this.state.item.littleCategory[index]);
            if (this.state.item.littleCategory[index].check==true)
                newLittleCategory.push({typeID:this.state.item.littleCategory[index].typeID, typeName:this.state.item.littleCategory[index].typeName, check:true});

        };
        console.log('newLittleCategory=',newLittleCategory);

        //拼出选择的小类
            category_one_item={typeID:this.state.item.typeID, typeName:this.state.item.typeName, littleCategory:newLittleCategory};

        console.log('category_one_item=',category_one_item);

        let haveSameNo=false;
          let selectedCategory=JSON.parse(localStorage.getItem("selectedCategory"));
        //if (localStorage.getItem("selectedCategory")!=null){
            for(var category of selectedCategory){
                if(category.typeID==category_one_item.typeID ){
                    haveSameNo=true;
                    if (category_one_item.littleCategory.length>0){
                        newShowCategory.push(category_one_item);

                    }
                }
                else{
                    newShowCategory.push(category);
                }
            };
        //}


        if (haveSameNo==false && category_one_item.littleCategory.length>0)
            newShowCategory.push(category_one_item);

        console.log("newShowCategory=",newShowCategory);








        //router.push({pathname:`/search`,state:{showCategory:newShowCategory}});

        localStorage.setItem("selectedCategory",JSON.stringify(newShowCategory));
          router.push({pathname:'/'});





    }



    checkBoxClick=(typeID, CheckboxId)=>{


        var littleCategoryItem=this.state.item.littleCategory.find(function (value, index, arr) {

            return value.typeID==typeID;

        });
        littleCategoryItem.check=!littleCategoryItem.check;

        //document.getElementById(CheckboxId).checked=littleCategoryItem.check;

    }

    onLeftClick=()=>{
        const path = '/category';
        hashHistory.push(path)
    }


    render() {


        return (
            <div>
                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>


                <NavBar  leftContent="返回" mode="dark" onLeftClick={() =>this.onLeftClick()}
                        //rightContent={[<Button key="113" inline size="small"  className="btn" type="primary" onClick={this.jumpback}>确定</Button>]}
                         rightContent={<Button type="primary"    style={{ fontSize: '0.32rem',marginLeft: '1rem'  }} onClick={this.selectSubmit}>确定</Button>}
                    >{this.state.item.typeName}</NavBar>


                <WhiteSpace/>
                <List  className="my-list">
                    {this.state.item.littleCategory.map(i=>(

                        <Checkbox.CheckboxItem key={i.typeID} defaultChecked={i.check} onChange={() => this.checkBoxClick(i.typeID)}>{i.typeName}</Checkbox.CheckboxItem>
                    ))}

                </List>
            </div>


        );
    }
}

export default LittleCategory;
