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

const TabsContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const BodyContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const apiInstance = axios.create({
  baseURL: 'http://localhost:6001/',
});

const Body = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);

  const userDetails = useSelector((state) => state.userDetails);

  const getAllPosts = async () => {
    try {
      const posts = await apiInstance.get('/get-posts');
      setBlogPosts(posts.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    console.log(currentTab);
  }, [currentTab]);

  useEffect(() => {
    const userPosts = blogPosts.filter(
      (item) => item.authorId === userDetails.id
    );
    setUserBlogs(userPosts);
  }, [blogPosts, userDetails.id]);

  return (
    <>
      <TabsContainer>
        <Tabs
          defaultActiveKey='1'
          centered
          onChange={(key) => setCurrentTab(parseInt(key))}
        >
          <TabPane tab='All Posts' key='1' />
          <TabPane tab='Trending' key='2' />
          <TabPane tab='Favorite' key='3' />
          <TabPane tab='My Posts' key='4' />
        </Tabs>
      </TabsContainer>
      <BodyContainer>
        {currentTab === 1 && (
          <AllBlogs blogPosts={blogPosts} setSelectedPost={setSelectedPost} />
        )}
        {currentTab === 4 && (
          <AllBlogs blogPosts={userBlogs} setSelectedPost={setSelectedPost} />
        )}
      </BodyContainer>
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create Blog</div>}
        onClick={() => setCreateBlog(true)}
      />
      <Modal
        title='Create Blog'
        visible={createBlog}
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
              src={selectedPost.imageUrl || 'https://via.placeholder.com/150'}
              alt={selectedPost.title}
            />
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </>
        )}
      </Modal>
    </>
  );
};

export default Body;
