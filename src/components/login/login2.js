import { List, InputItem, WhiteSpace, Button ,Flex} from 'antd-mobile';
import { createForm } from 'rc-form';
import React, { Component, PropTypes } from 'react';
import './login.less'
import { hashHistory } from 'react-router';

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

class Login extends Component{


    login= ()=> {
        const path = '/search';
        hashHistory.push(path)
    };

    handleSubmit= (e) => {
        e.preventDefault();
        let n = this.props.form.getFieldsValue().username;
        let p = this.props.form.getFieldsValue().password;
        if (n === 'ilovejasonbai' && p === 'ilovejasonbai') {
            // 表单的路由处理
            hashHistory.push('/search');
        } else {
            this.openNotificationWithIcon('info');
        }
    };

    onSubmit= (e) => {

        e.preventDefault();
        this.props.form.submit((callback) => {

            this.props.form.validateFields((error, values) => {
                if (!error) {
                    console.log('ok', values);
                    // hashHistory.push('/search');

                } else {
                    console.log('error', error, values);
                }
                callback();
            });

        });
    };
    // 返回一个弹框对象，提示用户名和密码
    openNotificationWithIcon=(type) => {
        return notification[type]({
            message: '用户名&密码',
            description: '都是：ilovejasonbai',
            duration: 6
        })
    };


    render() {
        const { getFieldProps } = this.props.form;
        const { form } = this.props;
        return (
            <div className="big-kuang">

                <h1 style={{font:'1rem', textAlign:'center'}}>商标检索系统</h1>

                <form >
                    <List renderHeader={() => ''}>

                        <InputItem
                            {...getFieldProps('inputtitle2')}
                            placeholder="请输入手机号"
                        >
                            <div
                                style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)' , backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }}/>
                        </InputItem>
                    </List>

                    <List renderHeader={() => ''}>

                        <InputItem
                            {...getFieldProps('inputtitle1')}
                            placeholder="请输入密码"
                        >
                            <div
                                style={{ backgroundImage:   'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)' , backgroundSize: 'cover', height: '0.44rem', width: '0.44rem' }}/>
                        </InputItem>


                    </List>




                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>
                    <WhiteSpace size="lg"/>


                    <div className="flex-container">


                        <Flex justify="between">
                            <Button className="btn" type="primary" style={{width:'2rem'}}
                                    onClick={this.onSubmit}>登陆</Button>
                            <Button className="btn" type="primary" style={{width:'2rem'}}>注册</Button>
                        </Flex>

                    </div>
                </form>

            </div>
        );
    }
}

Login = createForm()(Login);
export default Login;