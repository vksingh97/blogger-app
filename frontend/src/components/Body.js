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
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [favouritePosts, setFavouritePosts] = useState([]);
  const [favouriteBlogList, setFavouriteBlogList] = useState([]);

  const userDetails = useSelector((state) => state.userDetails);

  const getAllPosts = async () => {
    try {
      const posts = await apiInstance.get('/get-posts');
      getFavouritePostIds(userDetails.id);
      setBlogPosts(posts.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrendingData = async () => {
    try {
      const response = await apiInstance.get('/trending-posts');
      setTrendingPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavouritePostIds = async (userId) => {
    try {
      const response = await apiInstance.get(`/get-favourite-posts/${userId}`);
      setFavouritePosts(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [userDetails]);

  useEffect(() => {
    if (favouritePosts.length) {
      const favourite = blogPosts
        .map((item) => {
          if (favouritePosts.includes(item._id.toString())) {
            return item;
          }
          return null;
        })
        .filter((ele) => ele);
      setFavouriteBlogList(favourite);
    }
  }, [favouritePosts, blogPosts]);

  useEffect(() => {
    if (currentTab === 2) {
      fetchTrendingData();
    }
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
        {blogPosts.length > 0 && currentTab === 1 && (
          <AllBlogs
            blogPosts={blogPosts}
            setSelectedPost={setSelectedPost}
            favouritePosts={favouritePosts}
          />
        )}
        {trendingPosts.length > 0 && currentTab === 2 && (
          <AllBlogs
            blogPosts={trendingPosts}
            setSelectedPost={setSelectedPost}
            favouritePosts={favouritePosts}
          />
        )}
        {favouritePosts.length > 0 && currentTab === 3 && (
          <AllBlogs
            blogPosts={favouriteBlogList}
            setSelectedPost={setSelectedPost}
            favouritePosts={favouritePosts}
          />
        )}
        {userBlogs.length > 0 && currentTab === 4 && (
          <AllBlogs
            blogPosts={userBlogs}
            setSelectedPost={setSelectedPost}
            favouritePosts={favouritePosts}
          />
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
