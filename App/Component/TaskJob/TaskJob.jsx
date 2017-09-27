import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button, Modal, Card, Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';

require('./TaskJob.less');

const TaskJobFormView = ({ showForm, modelName, dispatch }) => (
  <Modal
    title="任务编辑"
    visible={showForm}
    onOk={() => {}}
    onCancel={() => { dispatch(Actions.createCancelModelAction(modelName)); }}
  >
  11
  </Modal>
);

TaskJobFormView.propTypes = {
  showForm: PropTypes.bool,
  modelName: PropTypes.string,
  dispatch: PropTypes.func };
TaskJobFormView.defaultProps = {
  showForm: false,
  modelName: 'TaskJob',
  dispatch: Actions.defauleDispatcher,
};

const TableOperate = ({ buttons, modelName, btnSize, dispatch }) => (
  <div>
    {
      buttons.map(
        (btn) => {
          return (
            <Button type="primary" size={btnSize} onClick={() => { dispatch(Actions.createOpenModelAction(modelName)); }}>
              { btn.text }
            </Button>
          );
        },
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

const TaskJobForm = Form.create({})(TaskJobFormView);

class TaskJobTable extends Component {
  // static modelName='TaskJob';
  static propTypes = {
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
    const { dispatch } = this.props;
    const pageModelAction = Actions.createPageModelAction('TaskJob');
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
    alert('onSearch');
  }

  modelName = () => 'TaskJob'

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
          const act = Actions.createOpenShColAction(this.modelName(), visible);
          this.props.dispatch(act);
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
    ]
  )

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
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
    const pageModelAction = Actions.createPageModelAction(this.modelName(), pageWeb);
    dispatch(pageModelAction);
  }

  render() {
    const { tblSize, pageData, loading, pagination } = this.props;
    return (
      <Card title="任务管理">
        <TableOperate modelName={this.modelName()} {...this.props} />
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
          modelName={this.modelName()}
          {...this.props}
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
