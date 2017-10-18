import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table, Form, Button, Modal, Card, Input, InputNumber, Icon, Badge, Tag, Row, Col, DatePicker, Select, Menu, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';

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
  modelName: 'TaskJobLog',
  dispatch: Actions.defauleDispatcher,
};

class TaskJobLogTable extends Component {
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
    modelName: 'TaskJobLog',
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
    // const enumSelectAction = Actions.createTaskJobLogEnumsAction();
    dispatch(pageModelAction);
    // dispatch(enumSelectAction);
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
        width: '15%',
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
        dataIndex: 'success',
        width: '10%',
        render: (text) => {
          if (text) {
            return (<span><Badge status="success" />成功</span>);
          }
          return (<span><Badge status="error" />失败</span>);
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: () => {
          return (<a>查看详情</a>);
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
      <Card title="任务日志">
        <Table
          size={tblSize}
          columns={this.columns()}
          rowKey={record => record.id}
          dataSource={pageData.list}
          onChange={this.handleTableChange}
          loading={loading}
          pagination={pagination}
        />
      </Card>
    );
  }
}

export default connect(state => ({ ...state.taskJobLog }))(TaskJobLogTable);
