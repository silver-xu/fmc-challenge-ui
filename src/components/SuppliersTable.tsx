import React, { useState } from "react";
import { Table, Tag, Card, Skeleton, Empty } from "antd";
import "antd/dist/antd.css";

import { useQuery } from "@apollo/react-hooks";
import { pagedSuppliersQuery } from "../queries/pagedSuppliersQuery";
import { Service } from "../types/supplier";
import { cardStyles } from "./Common.styles";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: any) => (
      <Link to={`/supplier/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Services",
    key: "services",
    dataIndex: "services",
    render: (services: Service[]) => (
      <span>
        {services.map((service) => {
          const color = service.length > 8 ? "geekblue" : "green";
          return (
            <Tag color={color} key={service}>
              {service.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
];

export const SuppliersTable = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { error, data } = useQuery(pagedSuppliersQuery, {
    variables: {
      offset: (pageIndex - 1) * pageSize,
      pageSize,
    },
  });

  const pagedSuppliers = data?.pagedSuppliers;

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPageIndex(page);
    setPageSize(pageSize || 10);
  };

  return (
    <Card title="Suppliers Dashboard" style={cardStyles}>
      {pagedSuppliers ? (
        <Table
          columns={columns}
          dataSource={pagedSuppliers.suppliers}
          pagination={{
            total: pagedSuppliers.total,
            pageSize,
            current: pageIndex,
            onChange: handlePaginationChange,
          }}
        />
      ) : error ? (
        <Empty />
      ) : (
        <Skeleton active />
      )}
    </Card>
  );
};
