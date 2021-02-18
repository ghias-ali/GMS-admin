import React, { useState, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    Table, Input, Popconfirm, Form, message, Modal, InputNumber, Button,
} from 'antd';
import './style.css';
import "antd/dist/antd.css";
import { client } from '../../config';


const RowDataView = ({ optp, visible, onCancel }) => {

    return (
        <div key={optp.key}>
            <Modal
                visible={visible}
                title="User Data"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={onCancel}
            >
                <div>

                    {optp.key}
                    <br />
                    {optp.gridName}
                    <br />
                    {optp.emplyeeName}
                    <br />
                    {optp.gridArea}

                </div>
            </Modal>
        </div>
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

const RejectedRequestes = () => {

    const [visiblee, setVisiblee] = useState(false);
    const [userData, setUserData] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [skip, setSkip] = useState(0);



    const [form] = Form.useForm();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (refresh) {
            client.service('rejected-requestes').find({
                query: {
                    status: 2,
                }
            }).then(res => {
                const employeeData = res.data;
                setData(employeeData);
                setRefresh(false);
                console.log(res);
            }).catch(err => {
                message.error(err.message);
            })
        }

    }, [refresh]);
    const handleDelete = (_id) => {

        const row = { status: 0 }
        client.service('pending-requestes').patch(_id, row).then((res) => {
            console.log(res);
            client.service('rejected-requestes').remove(_id);
            setData(data.filter(d => d._id !== _id));
        }
        ).catch(e => console.log({ e }));
    };
    const columns = [
        {
            title: ' Grid Name',
            dataIndex: ['gridInfo', 'gridName'],
            width: '15%',
        },
        {
            title: 'Employee Name',
            dataIndex: ['userInfo', 'name'],
            width: '15%',
        },
        {
            title: 'Grid-Area',
            dataIndex: ['gridInfo', 'gridArea'],
            width: '40%',
        },
        {
            title: 'Rejected By',
            dataIndex: ['rejectedBy', 'name'],
            width: '40%',
        },
        {
            title: 'Delete',
            dataIndex: 'operation',
            width: '20%',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to Delete?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => handleDelete(record._id)}>
                        <a style={{ color: 'red' }}>Delete</a>
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
                inputType: col.dataIndex === 'emplyeeName' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    const handleOnClickRow = (record) => {
        setUserData(record);
        setVisiblee(true);
    }
    return (
        <div>
            <Button
                onClick={() => {
                    setRefresh(true);
                }}
                type="primary"
                style={{ marginRight: '10px' }}>
                Refresh</Button>

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

                />
            </Form>
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
export default RejectedRequestes;