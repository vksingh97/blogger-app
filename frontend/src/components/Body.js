/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Avatar, Card, FloatButton, Modal } from 'antd';
import CreateBlog from './CreateBlog';

const { Meta } = Card;

const BodyContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const BlogPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  margin: 50px;
`;

const apiInstance = axios.create({
  baseURL: 'http://localhost:6001/',
});

const Body = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);
  const getAllPosts = async () => {
    await apiInstance
      .get('/get-posts')
      .then((posts) => {
        console.log(posts);
        setBlogPosts(posts.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllPosts();
  }, [apiInstance]);
  return (
    <BodyContainer>
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create Blog</div>}
        onClick={() => setCreateBlog(true)}
      />
      <BlogPosts>
        {blogPosts.map((item) => (
          <CardContainer>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt='example'
                  src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                />
              }
              actions={[
                <SettingOutlined key='setting' />,
                <EditOutlined key='edit' />,
                <EllipsisOutlined key='ellipsis' />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />
                }
                title={item.title}
                description={item.content}
              />
            </Card>
          </CardContainer>
        ))}
      </BlogPosts>
      <Modal
        title='Basic Modal'
        open={createBlog}
        onOk={() => setCreateBlog(false)}
        onCancel={() => setCreateBlog(false)}
      >
        <CreateBlog />
      </Modal>
    </BodyContainer>
  );
};

export default Body;
