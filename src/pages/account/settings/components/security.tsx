/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-10 16:24:01
 */
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
};
class SecurityView extends Component {

  onFinishFailed(errorInfo: any){
    
  };
  
  render() {
    return (
      <> 
        <Form
          {...formItemLayout}
          name="basic"
          initialValues={{ remember: true }}
          onFinishFailed={this.onFinishFailed}
        >
        <Form.Item
         label="原始密码"
         name="password"
          rules={[{ required: true, message: '原始密码不能为空' }]}
        >
           <Input.Password />
        </Form.Item>

        <Form.Item
          label="新的密码"
          name="NewPassword"
          rules={[{ required: true, message: '新的密码不能为空' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="newPassword1"
          rules={[{ required: true, message: '请输入再次输入新的密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
      </>
    );
  }
}

export default SecurityView;
