import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    Table, Input, Popconfirm, Form, Button, Modal, InputNumber,
} from 'antd';
import './style.css';
import "antd/dist/antd.css";
let count = 0;
const originData = [];
for (let i = 0; i < 6; i++) {
    originData.push({
        key: i.toString(),
        gridName: `Edrward ${i}`,
        emplyeeName: `Ghias ${i}`,
        gridArea: `London Park no. ${i}`,

    });
    count++;
}
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


    const [form] = Form.useForm();
    const [data, setData] = useState(originData);


    const handleDelete = (key) => {
        setData(data.filter(d => d.key !== key));
    };
    const columns = [
        {
            title: ' SR no',
            dataIndex: 'key',
            width: '5%',
        },
        {
            title: ' Grid Name',
            dataIndex: 'gridName',
            width: '15%',
        },
        {
            title: 'Employee Name',
            dataIndex: 'emplyeeName',
            width: '15%',
        },
        {
            title: 'Grid-Area',
            dataIndex: 'gridArea',
            width: '40%',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
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