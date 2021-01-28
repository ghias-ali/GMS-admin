import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import AcceptedRequestes from './acceptedRequests'
import RejectedRequestes from './rejectedRequestes'
import PendingRequestes from './pendingRequestes'
import "antd/dist/antd.css";


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const RequestedGrids = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Pending Requestes" key="1">
            <PendingRequestes />
        </TabPane>
        <TabPane tab="Accepted Requests" key="2">
            <AcceptedRequestes />
        </TabPane>
        <TabPane tab="Rejected Requests" key="3">
            <RejectedRequestes />
        </TabPane>


    </Tabs>
);
export default RequestedGrids;
