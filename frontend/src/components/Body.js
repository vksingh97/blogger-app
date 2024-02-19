/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Tabs, Modal, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateBlog from './CreateBlog';
import AllBlogs from './AllBlogs';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const PostImage = styled.img`
  width: 100%;
`;

const BodyContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const apiInstance = axios.create({
  baseURL: 'http://localhost:6001/',
});

const Body = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);

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
    const userPosts = blogPosts
      .map((item) => {
        if (item.authorId === userDetails.id) {
          return item;
        }
      })
      .filter((ele) => ele);
    setUserBlogs(userPosts);
  }, [blogPosts]);

  useEffect(() => {
    getAllPosts();
  }, [apiInstance]);

  return (
    <BodyContainer>
      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='All Posts' key='1'>
          <AllBlogs blogPosts={blogPosts} setSelectedPost={setSelectedPost} />
        </TabPane>
        <TabPane tab='Trending' key='2'>
          {/* Trending posts content */}
        </TabPane>
        <TabPane tab='Favorite' key='3'>
          {/* Favorite posts content */}
        </TabPane>
        <TabPane tab='My Posts' key='4'>
          <AllBlogs blogPosts={userBlogs} setSelectedPost={setSelectedPost} />
        </TabPane>
      </Tabs>

      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create Blog</div>}
        onClick={() => setCreateBlog(true)}
      />
      <Modal
        title='Basic Modal'
        open={createBlog}
        onOk={() => setCreateBlog(false)}
        onCancel={() => setCreateBlog(false)}
      >
        <CreateBlog />
      </Modal>
      <Modal
        title={selectedPost ? selectedPost.title : ''}
        visible={selectedPost !== null}
        onCancel={() => setSelectedPost(null)}
        footer={null}
      >
        {selectedPost && (
          <>
            <PostImage
              src={
                selectedPost.imageUrl
                  ? selectedPost.imageUrl
                  : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              }
              alt={selectedPost.title}
            />
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </>
        )}
      </Modal>
    </BodyContainer>
  );
};

export default Body;
