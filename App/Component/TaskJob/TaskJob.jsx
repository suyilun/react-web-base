import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button, Modal, Card, Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';

require('./TaskJob.less');

const TaskJobFormView = ({ visible, modelName, dispatch }) => (
  <Modal
    title="任务编辑"
    visible={visible}
    onOk={() => {}}
    onCancel={() => { dispatch(Actions.createCancelModelAction(modelName)); }}
  >
  11
  </Modal>
);

TaskJobFormView.propTypes = { visible: PropTypes.bool,
  modelName: PropTypes.string,
  dispatch: PropTypes.func };
TaskJobFormView.defaultProps = { visible: false,
  modelName: 'TaskJob',
  dispatch: Actions.defauleDispatcher,
};

const TableOperate = ({ buttons, modelName, dispatch }) => (
  <div>
    {
      buttons.map(
        (btn) => {
          return (
            <Button type="primary" onClick={() => { dispatch(Actions.createOpenModelAction(modelName)); }}>
              { btn.text }
            </Button>
          );
        },
      )
    }
  </div>
);
TableOperate.propTypes = { buttons: PropTypes.array,
  modelName: PropTypes.string,
  dispatch: PropTypes.func };
TableOperate.defaultProps = { buttons: [{ type: 'add', text: '新增' }],
  modelName: 'TaskJob',
  dispatch: Actions.defauleDispatcher,
};

const TaskJobForm = Form.create({})(TaskJobFormView);

class TaskJobTable extends Component {
  static modelName='TaskJob';
  static propTypes = {
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
    console.log('componentDidMount');
  }

  componentDidUpdate(prevProps) {
    const { colDropFilter } = this.props;
    const { isComposing: wasColDropFilter } = prevProps;
    if (colDropFilter && !wasColDropFilter) {
      // const { callback } = this.props;
      // callback.call(this);
      // () => { this.searchInput.focus(); };
    }
  }


  onSearch = () => {
    alert('onSearch');
  }

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
    const pageModelAction = Actions.createPageModelAction('TaskJob', pageWeb);
    dispatch(pageModelAction);
  }

  render() {
    const { dispatch, pageData, loading, pagination, showForm, searchText,
      filtered, colDropFilter, formData,
    } = this.props;
    const columns = [];
    columns.push(
      {
        title: '任务名称',
        dataIndex: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={(ele) => {
                this.searhInput = ele;
                if (colDropFilter && ele) { ele.focus(); }
              }}
              placeholder="Search name"
              value={searchText}
              onChange={() => {}}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>搜索</Button>
          </div>
        ),
        filterIcon: <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible: colDropFilter,
        onFilterDropdownVisibleChange: (visible) => {
          dispatch(Actions.createOpenSearchColumnAction(TaskJobTable.modelName,
            visible)).then(() => {
            console.log('$$$$$$$$$$ %o', this.searchInput);
            // this.searchInput.focus();
          }).catch((e) => { console.log(e); });
        },
      },
    );
    columns.push(
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
    );
    return (
      <Card>
        <TableOperate modelName={'TaskJob'} dispatch={dispatch} />
        <Table
          size="middle"
          columns={columns}
          rowKey={record => record.id}
          dataSource={pageData.list}
          onChange={this.handleTableChange}
          loading={loading}
          pagination={pagination}
        />
        <TaskJobForm
          visible={showForm}
          modelName={'TaskJob'}
          dispatch={dispatch}
          formData={formData}
        />
        showForm:{showForm ? 'true' : 'false'},
        colDropFilter:  {colDropFilter ? 'true' : 'false'}
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
