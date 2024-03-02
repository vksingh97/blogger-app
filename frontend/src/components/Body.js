/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; // Import keyframes and css
import { Tabs, Modal, FloatButton, Typography, Tooltip } from 'antd';
import { PlusOutlined, OpenAIOutlined, OpenAIFilled } from '@ant-design/icons';
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

const ModalContent = styled.div`
  padding: 20px;
`;
console.log(process.env.REACT_APP_API_BASE_URL);
const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
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
  const [userLikedPost, setUserLikedPost] = useState([]);
  const [summarize, setSummarize] = useState(false);
  const [postSummary, setPostSummary] = useState('');
  const [modalTab, setModalTab] = useState('1');
  const [editPost, setEditPost] = useState(false);
  const [selectedEditingPost, setSelectedEditingPost] = useState(null);
  const [description, setDescription] = useState('');

  const handleChangeDescription = (value) => {
    setDescription(value);
  };

  const userDetails = useSelector((state) => state.userDetails);

  const getAllPosts = async () => {
    try {
      const posts = await apiInstance.get(
        '/get-posts',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        },
        {
          withCredentials: true,
        }
      );
      setBlogPosts(posts.data.data);
      getFavouritePostIds(userDetails.id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrendingData = async () => {
    try {
      const response = await apiInstance.get(
        '/trending-posts',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        },
        {
          withCredentials: true,
        }
      );
      setTrendingPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavouritePostIds = async (userId) => {
    try {
      const response = await apiInstance.get(
        `/get-favourite-posts/${userId}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        },
        {
          withCredentials: true,
        }
      );
      setFavouritePosts(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getSummary = async () => {
    try {
      const response = await apiInstance.post(
        '/summarise',
        {
          postContent: selectedPost.content,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        },
        {
          withCredentials: true,
        }
      );
      setPostSummary(response.data.data.promptResponse);
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
    const liked = blogPosts
      .map((item) => {
        if (item.likedBy.includes(userDetails.id)) {
          return item._id;
        }
        return null;
      })
      .filter((ele) => ele);
    setUserLikedPost(liked);
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

  useEffect(() => {
    if (summarize === true) {
      getSummary();
    }
  }, [summarize]);

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
            selectedPost={selectedPost}
            favouritePosts={favouritePosts}
            setUserLikedPost={setUserLikedPost}
            userLikedPost={userLikedPost}
            setFavouritePosts={setFavouritePosts}
            summarize={summarize}
            setSummarize={setSummarize}
            editPost={editPost}
            setEditPost={setEditPost}
            setSelectedEditingPost={setSelectedEditingPost}
            selectedEditingPost={selectedEditingPost}
          />
        )}
        {trendingPosts.length > 0 && currentTab === 2 && (
          <AllBlogs
            blogPosts={trendingPosts}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
            favouritePosts={favouritePosts}
            setUserLikedPost={setUserLikedPost}
            userLikedPost={userLikedPost}
            setFavouritePosts={setFavouritePosts}
            summarize={summarize}
            setSummarize={setSummarize}
            editPost={editPost}
            setEditPost={setEditPost}
            setSelectedEditingPost={setSelectedEditingPost}
            selectedEditingPost={selectedEditingPost}
          />
        )}
        {favouritePosts.length > 0 && currentTab === 3 && (
          <AllBlogs
            blogPosts={favouriteBlogList}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            favouritePosts={favouritePosts}
            setUserLikedPost={setUserLikedPost}
            userLikedPost={userLikedPost}
            setFavouritePosts={setFavouritePosts}
            summarize={summarize}
            setSummarize={setSummarize}
            editPost={editPost}
            setEditPost={setEditPost}
            setSelectedEditingPost={setSelectedEditingPost}
            selectedEditingPost={selectedEditingPost}
          />
        )}
        {userBlogs.length > 0 && currentTab === 4 && (
          <AllBlogs
            blogPosts={userBlogs}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
            favouritePosts={favouritePosts}
            setUserLikedPost={setUserLikedPost}
            userLikedPost={userLikedPost}
            setFavouritePosts={setFavouritePosts}
            summarize={summarize}
            setSummarize={setSummarize}
            editPost={editPost}
            setEditPost={setEditPost}
            setSelectedEditingPost={setSelectedEditingPost}
            selectedEditingPost={selectedEditingPost}
          />
        )}
      </BodyContainer>
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create Blog</div>}
        onClick={() => {
          setCreateBlog(true);
          setEditPost(false);
          setSelectedEditingPost(null);
        }}
      />
      <Modal
        title='Create Blog'
        visible={createBlog || editPost}
        footer={null}
        onCancel={() => {
          setCreateBlog(false);
          setEditPost(false);
        }}
      >
        <CreateBlog
          editPost={editPost}
          setEditPost={setEditPost}
          setSelectedEditingPost={setSelectedEditingPost}
          selectedEditingPost={selectedEditingPost}
          onClose={() => {
            setCreateBlog(false);
            setEditPost(false);
            setSelectedEditingPost(null);
          }}
          description={description}
          handleChangeDescription={handleChangeDescription}
        />
      </Modal>
      {selectedPost && (
        <Modal
          title={
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {postSummary !== '' ? (
                <Tabs
                  defaultActiveKey='1'
                  activeKey={modalTab}
                  onChange={(key) => setModalTab(key)}
                >
                  <Tabs.TabPane tab='View Post' key='1'></Tabs.TabPane>
                  <Tabs.TabPane tab='View Summary' key='2'></Tabs.TabPane>
                </Tabs>
              ) : !summarize ? (
                <div style={{ display: 'flex' }}>
                  <Tooltip title='Summarize this post'>
                    <OpenAIOutlined
                      onClick={() => setSummarize(true)}
                      style={{
                        fontSize: '30px',
                        margin: '0px 0px 0px 5px',
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                </div>
              ) : (
                summarize &&
                postSummary === '' && (
                  <div>
                    <Tooltip title='Summarizing'>
                      <OpenAIFilled
                        spin
                        color='#0f52b4'
                        style={{
                          fontSize: '30px',
                          margin: '0px 0px 0px 5px',
                          cursor: 'pointer',
                        }}
                      />
                    </Tooltip>
                  </div>
                )
              )}
            </div>
          }
          visible={selectedPost !== null}
          onCancel={() => {
            setSummarize(false);
            setSelectedPost(null);
            setSummarize(false);
            setPostSummary('');
          }}
          footer={null}
        >
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            {selectedPost ? selectedPost.title : ''}
          </Typography.Title>
          <ModalContent>
            <PostImage
              src={selectedPost.imageUrl || 'https://via.placeholder.com/150'}
              alt={selectedPost.title}
            />
            {!summarize || modalTab === '1' ? (
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            ) : (
              <div>{postSummary}</div>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Body;
