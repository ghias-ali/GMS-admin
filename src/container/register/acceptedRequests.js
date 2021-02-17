import React, { useState, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    Table, Input, Popconfirm, Form, message, Modal, InputNumber, Button, pagination
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

const AcceptedRequestes = () => {

    const [visiblee, setVisiblee] = useState(false);
    const [userData, setUserData] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);




    const [form] = Form.useForm();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (refresh) {
            client.service('accepted-requestes').find({
                query: {
                    $skip: skip,
                }
            }).then(res => {
                setData(res.data);
                setRefresh(false);
                setTotal(res.total);
            }).catch(err => {
                message.error(err.message);
            })
        }

    }, [refresh, skip]);
    const handleRevoke = (_id) => {

        const row = { status: 0 }
        client.service('pending-requestes').patch(_id, row).then((res) => {
            console.log(res);
            client.service('accepted-requestes').remove(_id);
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
            width: '25%',
        },
        {
            title: 'Accepted By',
            dataIndex: ['acceptedBy', 'name'],
            width: '30%',
        },
        {
            title: 'Revoke Accesss',
            dataIndex: 'operation',
            width: '25%',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to Revoke?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => handleRevoke(record._id)}>
                        <a style={{ color: 'red' }}>Revoke Access</a>
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
                    setSkip(0);
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
                    pagination={{
                        total,
                        onChange: (e) => {
                            setSkip((e - 1) * 10)
                        }
                    }}

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
export default AcceptedRequestes;