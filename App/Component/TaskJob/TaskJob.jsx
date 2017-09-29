import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button, Modal, Card, Input, Icon, Badge, Tag } from 'antd';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';

require('./TaskJob.less');

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskJobFormView = ({ form, showForm, iptSize, onCancel }) => {
  const { getFieldDecorator } = form;
  return (
    <Modal
      title="任务编辑"
      visible={showForm}
      onOk={() => {}}
      onCancel={onCancel}
    >
      <Form layout={'inline'}>
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
        <FormItem {...formItemLayout} label="关键字">
          {getFieldDecorator('taskJobKey', {
            rules: [{
              required: true,
              message: 'Please input your name',
            }],
          })(
            <Input placeholder="" size={iptSize} />,
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

TaskJobFormView.propTypes = {
  showForm: PropTypes.bool,
  modelName: PropTypes.string,
  onCancel: PropTypes.func,
  iptSize: PropTypes.string,
  form: PropTypes.object,
};
TaskJobFormView.defaultProps = {
  showForm: false,
  modelName: 'TaskJob',
  onCancel: Actions.defauleDispatcher,
  iptSize: '',
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
    if (formData) {
      Object.keys(formData).forEach((key) => {
        fieldsValue[key] = { value: formData[key] };
      });
    }
    return fieldsValue;
  },
})(TaskJobFormView);

class TaskJobTable extends Component {
  // static modelName='TaskJob';
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
    dispatch(pageModelAction);
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
      {
        title: '任务描述',
        dataIndex: 'description',
      },
      {
        title: '状态',
        dataIndex: 'inSchd',
        render: (text, record) => {
          if (text) {
            return (<span><Badge status="processing" />计划执行中</span>);
          }
          if (record.active && !text) {
            return (<span><Badge status="warning" />计划已失效</span>);
          }
          return (<span><Badge status="default" />计划未设置</span>);
        },
      },
      {
        title: '是否激活',
        dataIndex: 'active',
        render: (text) => {
          if (text) {
            return (<Tag color="green">已激活</Tag>);
          }
          return (<Tag>未激活</Tag>);
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record, index) =>
          (
            <div>
              <a >激活 </a>
              &nbsp;&nbsp;
              <a onClick={() => { this.showEditForm(text); }} role="button" tabIndex={index} >修改</a>
            </div>
          ),
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


function mapStateToProps(state) {
  return { ...state.taskJob };
  // return {
  //   pageData: state.taskJob ? state.taskJob.pageData : [],
  //   formData: state.taskJob ? state.taskJob.formData : {},
  //   loading: state.taskJob ? state.taskJob.loading : false,
  //   pagination: state.taskJob ? state.pagination : null,
  //   showForm: state.taskJob ? state.taskJob.showForm : false,
  //   searchText: state.taskJob ? state.taskJob.searchText : '',
  //   filtered: state.taskJob ? state.taskJob.filtered : false,
  //   colDropFilter: state.taskJob ? state.taskJob.colDropFilter : false,
  // };
}
export default connect(mapStateToProps)(TaskJobTable);