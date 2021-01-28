import React, { useEffect, useState } from 'react';
import {
    Table, Input, Popconfirm, Form, Button, Modal, InputNumber, message,
} from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../config';
import './style.css';


const RowDataView = ({ optp, visible, onCancel }) => {

    return (
        <div key={optp._id}>
            <Modal
                visible={visible}
                title="User Data"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={onCancel}
            >
                <div>
                    <p>Name: <span>{optp.gridName}</span></p>
                    <p>Grid ID: <span>{optp.gridId}</span></p>
                    <p>Grid Area: <span>{optp.gridArea}</span></p>
                    <p>Status: <span>{optp.currentStatus}</span></p>


                </div>
            </Modal>
        </div>
    );
};
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Add A user"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        const info = {
                            gridName: values.gridName,
                            gridId: uuidv4(),
                            gridArea: values.gridArea,
                            currentStatus: 0,// currently grid is off
                        }
                        console.log({ info });
                        client.service('grids').create(info).then((res) => {
                            console.log(res);
                            onCreate(res);

                        }
                        ).catch(e => console.log({ e }));

                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="Add A Grid"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="gridName"
                    label="Grid Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Name Of Grid',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gridArea"
                    label="Grid Area"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Area Of Employee',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const AllGrids = () => {

    const { Search } = Input;
    const [visible, setVisible] = useState(false);
    const [visiblee, setVisiblee] = useState(false);
    const [userData, setUserData] = useState(null);
    const [data, setData] = useState(null);



    useEffect(() => {
        client.service('grids').find().then(res => {

            const employeeData = res.data;
            setData(employeeData)
        }).catch(err => {
            message.error(err.message);
        })
    }, []);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setData([values, ...data])
        setVisible(false);
    };
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record._id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            gridName: '',
            gridId: '',
            gridArea: '',
            ...record,
        });
        setEditingKey(record._id);
    };
    const handleDelete = (_id) => {
        console.log({ _id });
        client.service('grids').remove(_id);
        setData(data.filter(d => d._id !== _id));
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (_id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => _id === item._id);
            if (index > -1) {
                const item = newData[index];
                console.log({ row });
                client.service('grids').patch(_id, row).then((res) => {
                    console.log(res);
                }
                ).catch(e => console.log({ e }));
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'Grid Name',
            dataIndex: 'gridName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Grid Id',
            dataIndex: 'gridId',
            width: '15%',
            editable: false,
        },
        {
            title: 'Area',
            dataIndex: 'gridArea',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record._id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
            </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                    );
            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <a
                        href="javascript:;"
                        onClick={() => handleOnClickRow(record)}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        Details
                    </a>
                ) : null,
        },

    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'gridId' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleOnClickRow = (record) => {
        setUserData(record);
        setVisiblee(true);
    }
    return (
        <div>
            <div className='users-top-bar'>
                <Search placeholder="input search" enterButton
                    style={{
                        width: 300,

                    }} />
                <Button
                    onClick={() => {
                        setVisible(true);
                    }}
                    type="primary"
                >
                    Add a row
                </Button>
            </div>

            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
            <RowDataView
                optp={userData ? userData : {}}
                visible={visiblee}
                onCancel={() => {
                    setVisiblee(false);
                }}
            />
        </div >
    );
};
export default AllGrids;