import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class TaskJobEditor extends React.Component {
  handleSubmit = () => {
    alert(1);
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <Row type="flex" justify="center" align="top" gutter={2}>
        <Col span={22}>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="TaskKey" />,
              )}
            </FormItem>
            <FormItem >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="Description" />,
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(TaskJobEditor);
