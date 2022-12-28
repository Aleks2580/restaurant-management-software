import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import style from "./UpcomingReservations.module.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await fetch("http://localhost:4000/reservations", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    setData(result.data);
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        width: 600,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 5}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                description={
                  <div className={style.data}>
                    <div className={style.date}>{item.date}</div>
                    <div className={style.time}>{item.time}</div>
                    <div className={style.name}>{item.name}</div>
                  </div>
                }
              />
              <div className={style.icons}>
                <EditOutlined className={style.edit} />
                <DeleteOutlined className={style.delete} />
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default App;
