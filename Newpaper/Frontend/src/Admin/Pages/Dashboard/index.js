import {
  UserOutlined,
  EyeOutlined, 
  FileTextOutlined
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const staticData = {
  views: [
    { article: "Article 1", month: "January", views: 1200 },
    { article: "Article 2", month: "January", views: 1100 },
    { article: "Article 3", month: "February", views: 900 },
    { article: "Article 4", month: "February", views: 1300 },
    { article: "Article 5", month: "March", views: 1500 },
    
  ]
};

function Dashboard() {
  const [totalViews, setTotalViews] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const data = staticData;

    setTotalViews(data.views.reduce((acc, item) => acc + item.views, 0));
    setTotalUsers(75);  // static value, can be adjusted as needed
    setTotalArticles(12); // total articles based on the static data
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <EyeOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total views"}
          value={totalViews}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total users"}
          value={totalUsers}
        />
        <DashboardCard
          icon={
            <FileTextOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total articles"}
          value={totalArticles}
        />
      </Space>
      <Space>
        <TopArticles />
        <ViewsChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={title}
          value={value}
          valueStyle={{ fontSize: '32px' }} // Adjust font size here
        />
      </Space>
    </Card>
  );
}

function TopArticles() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = staticData.views.sort((a, b) => b.views - a.views).slice(0, 10);
    setDataSource(data);
    setLoading(false);
  }, []);

  return (
    <>
      <Typography.Text>Top 5 Articles by Views</Typography.Text>
      <Table
        columns={[
          {
            title: "Article",
            dataIndex: "article",
          },
          {
            title: "Views",
            dataIndex: "views",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function ViewsChart() {
  const [viewsData, setViewsData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const data = staticData.views;
    const groupedData = data.reduce((acc, item) => {
      acc[item.month] = (acc[item.month] || 0) + item.views;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const dataValues = Object.values(groupedData);

    const dataSource = {
      labels,
      datasets: [
        {
          label: "Views",
          data: dataValues,
          backgroundColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };

    setViewsData(dataSource);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Monthly Article Views",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={viewsData} />
    </Card>
  );
}

export default Dashboard;
