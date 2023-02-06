import { Button, Table, Tooltip } from 'antd';
import Input from 'antd/lib/input/Input';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLogs } from '../actions/logAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { SearchOutlined } from "@ant-design/icons";
import './LogScreen.css';

// Table Headers
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Employee Id',
    dataIndex: 'employee_id',
    sorter: true,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button className='m-1'
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
          <Button className='m-1'
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.employee_id && record.employee_id.includes(value);
    },
  },
  {
    title: 'Employee Name',
    dataIndex: 'employee_name',
    sorter: true,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button className='m-1'
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
          <Button className='m-1'
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.employee_name && record.employee_name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'Employee Email',
    dataIndex: 'employee_email',
    sorter: true,
  },
  {
    title: 'Ip Address',
    dataIndex: 'ip_address',
  },
  {
    title: 'App Name',
    dataIndex: 'app_name',
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button className='m-1'
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
          <Button className='m-1'
            onClick={() => {
              setSelectedKeys([]);
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.app_name && record.app_name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'App Role',
    dataIndex: 'app_role',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    filters: [
      {
        text: 'Enabled',
        value: '1',
      },
      {
        text: 'Disabled',
        value: '0',
      },
    ],
    onFilter: (value, record) => record.action && record.action.indexOf(value) === 0,
    render(text, record) {
      return (
        text && (text === '1' ? "Enabled" : (text === '0' ? 'Disabled' : ''))
      )
    }
  },
  {
    title: 'Data Request',
    dataIndex: 'data_request',
    width: '10%',
    onCell: () => {
       return {
          style: {
             whiteSpace: 'nowrap',
             maxWidth: 150,
          }
       }
    },
    render: (text) => (
       <Tooltip title={text}>
          <div style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>{text}</div>
       </Tooltip>
    )
  },
  {
    title: 'Data response',
    dataIndex: 'data_response',
    width: '10%',
    onCell: () => {
       return {
          style: {
             whiteSpace: 'nowrap',
             maxWidth: 150,
          }
       }
    },
    render: (text) => (
       <Tooltip title={text}>
          <div style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>{text}</div>
       </Tooltip>
    )
  },
  {
    title: 'Request Status',
    dataIndex: 'request_status',
    filters: [
      {
        text: 'True',
        value: true,
      },
      {
        text: 'False',
        value: false,
      },
    ],
    onFilter: (value, record) => record.request_status && record.request_status.indexOf(value) === 0,
    render(text, record) {
      return (
        text ? "Success" : 'False'
      )
    }
  },
  {
    title: 'Request Message',
    dataIndex: 'request_message',
  },
  {
    title: 'User',
    dataIndex: ['user', 'name']
  },
  {
    title: 'created At',
    dataIndex: 'createdAt',
  },
];

const LogScreen = () => {
  //React hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const logsInfo = useSelector(state => state.logsInfo);
  const { loading, error, logDetails, pagination } = logsInfo;
  const items = logDetails && logDetails.items;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getLogs({ pagination }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Dispatch Call to Handle Table Change
  const handleTableChange = (newPagination, filters, sorter) => {
    dispatch(getLogs({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    }));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {logDetails &&
        <div className='responsive'>
          <Table style={{ padding: '25px 50px 0px 50px' }} rowKey={(items) => items.id} onChange={handleTableChange} pagination={pagination} loading={loading} columns={columns} dataSource={items} />
        </div>
      }
    </>
  );
};

export default LogScreen;