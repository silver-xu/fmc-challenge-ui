import React from "react";
import {
  Descriptions,
  Card,
  Tag,
  Table,
  Switch,
  Progress,
  Skeleton,
  Empty,
} from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { supplierQuery } from "../queries/supplierQuery";
import { Supplier, Service } from "../types/supplier";
import { cardStyles, numericStyles, centreAlign } from "./Common.styles";

const columns = [
  {
    title: "Date Due",
    dataIndex: "dateDue",
    key: "dateDue",
  },
  {
    title: "Date Completed",
    dataIndex: "dateCompleted",
    key: "dateCompleted",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
  },
  {
    title: "Service Report Provided",
    dataIndex: "serviceReportProvided",
    key: "serviceReportProvided",
    render: (serviceReportProvided: boolean) => (
      <Switch defaultChecked={serviceReportProvided} disabled />
    ),
  },
];

export const SupplierDetails = () => {
  let { id } = useParams();

  const { error, data } = useQuery(supplierQuery, {
    variables: { id },
  });

  const supplier = data?.supplier as Supplier;

  return (
    <Card title={supplier && supplier.name} style={cardStyles}>
      {supplier ? (
        <Descriptions
          bordered
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 }}
        >
          <Descriptions.Item span={2} label="Internal Id">
            {supplier.id}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Number">
            {supplier.number}
          </Descriptions.Item>
          <Descriptions.Item label="Services" span={2}>
            {supplier.services.map((service: Service) => {
              const color = service.length > 8 ? "geekblue" : "green";
              return <Tag color={color}>{service}</Tag>;
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Rating" span={2}>
            <div style={numericStyles}>{supplier.rating}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Received Message">
            <div style={numericStyles}>{supplier.numOfReceivedMessages}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Sent Message">
            <div style={numericStyles}>{supplier.numOfSentMessages}</div>
          </Descriptions.Item>
          <Descriptions.Item label="Reply Ratio">
            <div style={centreAlign}>
              <Progress
                type="circle"
                percent={Math.round(
                  (supplier.numOfSentMessages /
                    supplier.numOfReceivedMessages) *
                    100
                )}
                width={80}
              />
            </div>
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Work Orders">
            <Table columns={columns} dataSource={supplier.workOrders} />
          </Descriptions.Item>
        </Descriptions>
      ) : error ? (
        <Empty />
      ) : (
        <Skeleton active />
      )}
    </Card>
  );
};
