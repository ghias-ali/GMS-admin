import React, { useState, useEffect } from "react";
import { CheckCircleFilled, CloseSquareFilled } from "@ant-design/icons";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  message,
  Modal,
  InputNumber,
  Button,
  Pagination,
} from "antd";
import { client } from "../../config";

import "./style.css";
import "antd/dist/antd.css";

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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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

const PendingRequestes = () => {
  const [visiblee, setVisiblee] = useState(false);
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  const [form] = Form.useForm();
  const [data, setData] = useState(null);

  const handleDelete = (_id) => {
    client.service("pending-requestes").remove(_id);

    setData(data.filter((d) => d._id !== _id));
  };
  const handleIconClick = (_id) => {
    console.log("cliked");
    const row = { status: 1 };
    client
      .service("pending-requestes")
      .patch(_id, row)
      .then((res) => {
        console.log(res);
        client
          .service("accepted-requestes")
          .create(res)
          .then((res) => {
            console.log(res);
            setData(data.filter((d) => d._id !== res._id));
          })
          .catch((e) => console.log({ e }));
      })
      .catch((e) => console.log({ e }));
  };
  const handleIconCross = (_id) => {
    console.log("cliked");
    const row = { status: 2 };
    client
      .service("pending-requestes")
      .patch(_id, row)
      .then((res) => {
        console.log(res);
        client
          .service("rejected-requestes")
          .create(res)
          .then((res) => {
            console.log(res);
            setData(data.filter((d) => d._id !== res._id));
          })
          .catch((e) => console.log({ e }));
      })
      .catch((e) => console.log({ e }));
  };

  useEffect(() => {
    client
      .service("pending-requestes")
      .find({
        query: {
          $skip: skip,
          status: 0,
        },
      })
      .then((res) => {
        setData(res.data);
        setRefresh(false);
        setTotal(res.total);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, [refresh, skip]);
  const columns = [
    {
      title: " Grid Name",
      dataIndex: ["gridInfo", "gridName"],
      width: "15%",
    },
    {
      title: "Employee Name",
      dataIndex: ["userInfo", "name"],
      width: "15%",
    },
    {
      title: "Grid-Area",
      dataIndex: ["gridInfo", "gridArea"],
      width: "25%",
    },
    {
      title: "Accept Request",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) =>
        data.length >= 1 ? (
          <CheckCircleFilled
            style={{
              color: "green",
              height: "100%",
              width: "100%",
              fontSize: "24px",
            }}
            onClick={() => handleIconClick(record._id)}
          />
        ) : null,
    },
    {
      title: "Reject Request",
      dataIndex: "operation",
      width: "20%",
      render: (_, record) =>
        data.length >= 1 ? (
          <CloseSquareFilled
            style={{
              color: "red",
              height: "100%",
              width: "100%",
              fontSize: "24px",
            }}
            onClick={() => handleIconCross(record._id)}
          />
        ) : null,
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "operation",
      dataIndex: "operation",
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
        inputType: col.dataIndex === "emplyeeName" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const handleOnClickRow = (record) => {
    setUserData(record);
    setVisiblee(true);
  };
  return (
    <div>
      <Button
        onClick={() => {
          setRefresh(true);
          setSkip(0);
        }}
        type="primary"
        style={{ marginRight: "10px" }}
      >
        Refresh
      </Button>
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
              setSkip((e - 1) * 10);
            },
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
    </div>
  );
};
export default PendingRequestes;
