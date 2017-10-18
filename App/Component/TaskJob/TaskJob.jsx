import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table, Form, Button, Modal, Card, Input, InputNumber, Icon, Badge, Tag, Row, Col, DatePicker, Select, Menu, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';

require('./TaskJob.less');

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  style: { marginBottom: 5 },
};

const oneRowItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  style: { marginBottom: 5, marginLeft: '-10px' },
};


const TaskJobFormView = ({ form, showForm, selectIntervalType, iptSize, selectSize, onCancel }) => {
  const { getFieldDecorator } = form;
  return (
    <Modal
      title="任务编辑"
      visible={showForm}
      onOk={() => {}}
      onCancel={onCancel}
    >
      <Form >
        {getFieldDecorator('id', {
          rules: [{
          }],
        })(
          <Input type={'hidden'} />,
        )}
        <Row gutter={40}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="任务名">
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Please input your name',
                }],
              })(
                <Input placeholder="任务名" size={iptSize} />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="键值">
              {getFieldDecorator('taskJobKey', {
                rules: [{
                  required: true,
                  message: 'Please input your name',
                }],
              })(
                <Input placeholder="键值" size={iptSize} />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="开始">
              {getFieldDecorator('startAt', {
                rules: [{
                }],
              })(
                <DatePicker
                  disabledDate={(startValue)=> {}}
                  showTime
                  size={selectSize}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Start"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="结束">
              {getFieldDecorator('endAt', {
              })(
                <DatePicker
                  disabledDate={(endValue)=> {}}
                  showTime
                  size={selectSize}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="End"
                />,
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="间隔">
              {getFieldDecorator('intervalVal', {
                rules: [{
                  required: true,
                  message: 'Please input your name',
                }],
              })(
                <InputNumber placeholder="" size={iptSize} />,
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="间隔类型">
              {getFieldDecorator('intervalType', {
                rules: [{
                  required: true,
                }],
              })(
                <Select size={selectSize}>
                  { selectIntervalType.map(enumValue => (
                    <Select.Option value={enumValue.value}>{enumValue.text}</Select.Option>))
                  }
                </Select>,
              )}
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem {...oneRowItemLayout} label="描述">
              {getFieldDecorator('description', {
                rules: [{
                }],
              })(
                <Input type="textarea" placeholder="任务描述" />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

TaskJobFormView.propTypes = {
  showForm: PropTypes.bool,
  selectIntervalType: PropTypes.array,
  modelName: PropTypes.string,
  onCancel: PropTypes.func,
  iptSize: PropTypes.string,
  selectSize: PropTypes.string,
  form: PropTypes.object,
};
TaskJobFormView.defaultProps = {
  showForm: false,
  modelName: 'TaskJob',
  selectIntervalType: [],
  onCancel: Actions.defauleDispatcher,
  iptSize: null,
  selectSize: null,
  form: null,
};

const TableOperate = ({ buttons, modelName, btnSize, dispatch }) => (
  <div>
    {
      buttons.map(
        btn => (
          <Button type="primary" size={btnSize} onClick={() => { dispatch(Actions.createOpenModelAction(modelName)); }}>
            { btn.text }
          </Button>
        ),
      )
    }
  </div>
);
TableOperate.propTypes = {
  btnSize: PropTypes.string,
  buttons: PropTypes.array,
  modelName: PropTypes.string,
  dispatch: PropTypes.func };
TableOperate.defaultProps = {
  btnSize: null,
  buttons: [{ type: 'add', text: '新增' }],
  modelName: 'TaskJob',
  dispatch: Actions.defauleDispatcher,
};

const TaskJobForm = Form.create({
  onFieldsChange(props, changedFields) {
    // changedFields
    // 修改时与redux 绑定
    // const { modelName } = props;
    // props.dispatch(Actions.createResetModelAction(modelName));
  },
  mapPropsToFields(props) {
    const { formData } = props;
    const fieldsValue = {};
    _.keys(formData).forEach((key) => {
      const value = formData[key];
      if (_.has(value, 'value')) {
        fieldsValue[key] = { value: value.value };
      } else {
        fieldsValue[key] = { value };
      }
    });
    return fieldsValue;
  },
})(TaskJobFormView);

class TaskJobTable extends Component {
  static propTypes = {
    modelName: PropTypes.string,
    tblSize: PropTypes.string,
    dispatch: PropTypes.func,
    pageData: PropTypes.object,
    formData: PropTypes.object,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    showForm: PropTypes.bool,
    searchText: PropTypes.string,
    filtered: PropTypes.bool,
    colDropFilter: PropTypes.bool,
  };

  static defaultProps = {
    modelName: 'TaskJob',
    tblSize: null,
    dispatch: Actions.defauleDispatcher,
    pageData: null,
    formData: null,
    loading: false,
    pagination: null,
    showForm: false,
    searchText: '',
    filtered: false,
    colDropFilter: false,
  };

  componentDidMount() {
    const { dispatch, modelName } = this.props;
    const pageModelAction = Actions.createPageModelAction(modelName);
    const enumSelectAction = Actions.createTaskJobEnumsAction();
    dispatch(pageModelAction);
    dispatch(enumSelectAction);
  }

  componentDidUpdate(prevProps) {
    const { colDropFilter } = this.props;
    const { isComposing: wasColDropFilter } = prevProps;
    if (colDropFilter && !wasColDropFilter) {
      // () => { this.searchInput.focus(); };
    }
  }

  onSearch = () => {
    // alert('onSearch');
  }

  onCancel = () => {
    const { dispatch, modelName } = this.props;
    this.form.resetFields();
    dispatch(Actions.createCancelModelAction(modelName));
  }

  unscheduleTaskJob = (id) => {
    const { dispatch } = this.props;
    dispatch(Actions.unscheduleTaskJobAction(id));
  }

  scheduleTaskJob = (id) => {
    const { dispatch } = this.props;
    dispatch(Actions.scheduleTaskJobAction(id));
  }

  openExpand= (expanded, record) => {
    const { dispatch } = this.props;
    if (expanded) dispatch(Actions.latestTaskJobLogAction(record.id));
  }

  expandedRowRender = (record) => {
    const {taskJobLogMap } = this.props;
    // if(taskJobLogMap)
    console.log("taskJobLogMap is %o ",taskJobLogMap);
    const columns= [
      {
        title: '时次',
        dataIndex: 'fireTime',
        width: '15%',
      },
      {
        title: '开始',
        dataIndex: 'beginTime',
        width: '15%',
      },
      {
        title: '结束',
        dataIndex: 'finishTime',
        width: '15%',
      },
      {
        title: '状态',
        dataIndex: 'running',
        width: '10%',
        render: (text, recordLog) => {
          if (text) {
            return (<span><Badge status="processing" />执行中</span>);
          }
          if (recordLog.success) {
            return (<span><Badge status="success" />成功</span>);
          }
          return (<span><Badge status="error" />失败</span>);
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={taskJobLogMap[record.id]}
        pagination={false}
      />
    );
  }

  showEditForm = (id) => {
    const { dispatch, modelName } = this.props;
    // , formData
    dispatch(Actions.createShowEditModelAction(modelName, { id }));
    // .then(() => { console.log("formData:%o",formData);this.form.setFieldsValue(formData); });
  }

  columns= () => (
    [
      {
        title: '任务名称',
        dataIndex: 'name',
        width: '20%',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={(ele) => {
                this.searhInput = ele;
                if (this.props.colDropFilter && ele) { ele.focus(); }
              }}
              placeholder="Search name"
              value={this.props.searchText}
              onChange={(el) => {
                const act = Actions.createChgShColAction(
                  this.modelName(), el.target.value);
                this.props.dispatch(act);
              }}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>搜索</Button>
          </div>
        ),
        filterIcon: <Icon type="smile-o" style={{ color: this.props.filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: this.props.colDropFilter,
        onFilterDropdownVisibleChange: (visible) => {
          const act = Actions.createOpenShColAction(this.props.modelName, visible);
          this.props.dispatch(act);
          // .then(() => { console.log('thenthen'); });
        },
      },
      // {
      //   title: '编码',
      //   dataIndex: 'taskJobKey',
      //   width: '10%',
      // },
      {
        title: '开始',
        dataIndex: 'startAt',
        width: '15%',
      },
      {
        title: '结束',
        dataIndex: 'endAt',
        width: '15%',
      },
      {
        title: '间隔',
        width: '5%',
        dataIndex: 'intervalVal',
      },
      {
        title: '单位',
        width: '5%',
        dataIndex: 'intervalType.text',
      },
      {
        title: '状态',
        dataIndex: 'inSchd',
        width: '10%',
        render: (text, record) => {
          if (record.running) {
            return (<span><Badge status="processing" />执行中</span>);
          }
          if (text) {
            return (<span><Badge status="processing" />执行中</span>);
          }
          if (record.active && !text) {
            return (<span><Badge status="warning" />已过期</span>);
          }
          return (<span><Badge status="default" />未执行</span>);
        },
      },
      // {
      //   title: '是否激活',
      //   dataIndex: 'active',
      //   width: '5%',
      //   render: (text) => {
      //     if (text) {
      //       return (<Tag color="green">已激活</Tag>);
      //     }
      //     return (<Tag>未激活</Tag>);
      //   },
      // },
      {
        title: '下次执行时间',
        dataIndex: 'taskState.nextFireTime',
        width: '15%',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record, index) => {
          let actMenu = (
            <a
              onClick={
                () => {
                  this.scheduleTaskJob(record.id);
                }
              }
              role="button"
              tabIndex={index}
            >运行</a>);
          if (record.active) {
            // 已激活,任务中
            // if (record.inSchd) {
            // 停止功能
            actMenu = (
              <a
                onClick={
                  () => {
                    this.unscheduleTaskJob(record.id);
                  }
                }
                role="button"
                tabIndex={index}
              >
              取消
              </a>
            );
            // } else {
            //   // 重新激活,这里需要先修改定时规则
            //   actMenu = (
            //     <a
            //       onClick={
            //         () => {
            //           this.rescheduleTaskJob(record.id);
            //         }
            //       }
            //       role="button"
            //       tabIndex={index}
            //     >重新定时</a>);
            // }
          }
          const menu = (
            <Menu>
              <Menu.Item>
                <a onClick={() => { this.showEditForm(text); }} role="button" tabIndex={index} >修改</a>
              </Menu.Item>
              <Menu.Item>
                {actMenu}
              </Menu.Item>
            </Menu>
          );

          return (
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
               操作 <Icon type="down" />
              </a>
            </Dropdown>
          );
        },
      },
    ]
  )

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch, modelName } = this.props;
    const pager = this.state.pagination;
    if (pagination) {
      pager.pageSize = pagination.pageSize;
      pager.current = pagination.current;
    }
    const pageWeb = {
      pageSize: pager.pageSize,
      pageNum: pager.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    };
    const pageModelAction = Actions.createPageModelAction(modelName, pageWeb);
    dispatch(pageModelAction);
  }

  render() {
    const { tblSize, pageData, loading, pagination, modelName } = this.props;
    return (
      <Card title="任务管理">
        <TableOperate modelName={modelName} {...this.props} />
        <Table
          size={tblSize}
          columns={this.columns()}
          rowKey={record => record.id}
          dataSource={pageData.list}
          onChange={this.handleTableChange}
          loading={loading}
          pagination={pagination}
          onExpand={this.openExpand}
          expandedRowRender={this.expandedRowRender}
        />
        <TaskJobForm
          ref={(ele) => { this.form = ele; }}
          {...this.props}
          onCancel={this.onCancel}
        />
      </Card>
    );
  }
}

export default connect(state =>
  ({ ...state.taskJob, taskJobLogMap: state.taskJobLog.taskJobLogMap }))(TaskJobTable);
