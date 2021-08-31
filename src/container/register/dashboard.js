import React, { useState, useEffect } from 'react';
import { Statistic, Card, Row, Col, message } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { client } from '../../config';

function Dashboard() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    client
      .service('grids')
      .find()
      .then((res) => {
        const employeeData = res.data;
        setdata(employeeData);
        console.log(res.data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className='site-statistic-demo-card'>
        <Row gutter={16}>
          {data.map((user) => (
            <Col style={{ marginBottom: '10px' }} span={12}>
              <Card>
                <Statistic
                  title={user.gridName.toUpperCase()}
                  value={user.gridArea.toUpperCase()}
                />
                {user.currentStatus === 0 ? (
                  <DownCircleOutlined
                    style={{ fontSize: '24px', color: 'red' }}
                  />
                ) : (
                  <UpCircleOutlined
                    style={{ fontSize: '24px', color: 'green' }}
                  />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
