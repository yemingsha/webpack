/**
 * Created by xuming on 17/3/24.
 */
/**
 * Created by xuming on 17/3/23.
 */
import {Radio, NavBar, Toast,List, InputItem, WhiteSpace, Button ,Flex} from 'antd-mobile';
import { createForm } from 'rc-form';
import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import  './fogetPasswordPhone.less'

const PlaceHolder = props => (
    <div style={{
        backgroundColor: '#ebebef',
        color: '#bbb',
        textAlign: 'center',
        height: '0.6rem',
        lineHeight: '0.6rem',
        width: '100%',
    }} {...props}
    >Item</div>
);



const Phone = React.createClass({
    propTypes: {
        form: PropTypes.object,
    },

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const errors = getFieldError('phone');
        return (<div >
            <div>

                <List renderHeader={() => ''}>

                    <InputItem
                        {...getFieldProps('phone',{
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号'
                                },
                                {
                                    type: 'string',
                                    min: 11,
                                    message: '电话要是11位数字',
                                },
                            ],
                            validateTrigger: null,
                        })}
                        type="phone"
                        placeholder="请输入手机号"
                    >
                        <div
                            style={{ backgroundImage:   'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)' , backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }}/>
                    </InputItem>

                </List>

            </div>
            <div >
                {(errors) ? errors.join(',') : null}
            </div>
            <div >
                {isFieldValidating('user') ? 'validating' : null}
            </div>
        </div>);
    },
});


class FogetPasswordPhone extends Component{

    static propTypes = {
        form: PropTypes.object,
    };




    sendRequest=()=> {
        let phone = this.props.form.getFieldsValue().phone.replace(/\s+/g,"");;
        let urlStr='http://101.200.46.114:8088/trademark/getmessage.do?username='+phone;

        console.log('urlStr=',urlStr);
        fetch(urlStr, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
            .then(response=> {
                Toast.hide();
                console.log('response=',response);
                Toast.hide();
                if (response.ok) {
                    Toast.info('验证码已发送', 1);
                    const {router} = this.props;
                    router.push({pathname:'/fogetPasswordOther',state:{phone:phone}});

                    return ;
                } else {
                    Toast.fail('获取验证码失败', 1);
                    throw new Error();
                }
            })
            .catch(e=>{
                Toast.hide();
                console.error(e);
            });
    }



    onSubmit= (e) => {

        e.preventDefault();
        this.props.form.submit((callback) => {

            this.props.form.validateFields((error, values) => {
                if (!error) {
                    Toast.loading('加载中...', 0);
                    this.sendRequest();
                    //const {router} = this.props;
                    //router.push({pathname:'/registeOther',state:{phone:values.phone}});
                } else {
                    console.log('error', error, values);
                }
                callback();
            });

        });
    };

    onLeftClick=()=>{
        hashHistory.push('/login')
    }


    render() {
        const { getFieldProps } = this.props.form;
        const { form } = this.props;
        return (

            <div className="xm">
                <WhiteSpace size="xl" style={{ background: 'rgb(34,140,240)'}}/>

                <NavBar leftContent="返回" mode="dark" onLeftClick={() =>this.onLeftClick()}

                >密码设置第一步</NavBar>

                <div style={{margin:' 5% 10%' }}>

                    <form >
                        <Phone form={ form }/>


                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>




                        <Button className="btn" type="primary"
                                onClick={this.onSubmit}>获取短信码</Button>
                    </form>

                </div>
            </div>
        );
    }
}

FogetPasswordPhone = createForm()(FogetPasswordPhone);
export default FogetPasswordPhone;