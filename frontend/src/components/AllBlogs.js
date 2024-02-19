import React from 'react';
import {
  EditOutlined,
  StarOutlined,
  LikeOutlined,
  DeleteOutlined,
  LikeTwoTone,
} from '@ant-design/icons';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:6001/',
});

const { Meta } = Card;

const BlogPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PostImage = styled.img`
  width: 100%;
`;

const CardContainer = styled.div`
  margin: 20px;
`;

const PostCard = styled(Card)`
  width: 500px;
  margin-bottom: 20px;
`;

const AllBlogs = ({ blogPosts, setSelectedPost }) => {
  const userDetails = useSelector((state) => state.userDetails);

  const truncateDescription = (description) => {
    const maxLength = 150;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const updatePostLike = async ({ postId, like }) => {
    console.log('inside');
    const response = await apiInstance.post(`/posts/${postId}/like`, {
      userId: userDetails.id,
      like,
    });

    console.log('response', response);
  };

  return (
    <div>
      <BlogPosts>
        {blogPosts.map((item) => (
          <CardContainer key={item._id}>
            <PostCard
              cover={
                <PostImage
                  onClick={() => setSelectedPost(item)}
                  alt='example'
                  src={
                    item.imageUrl
                      ? item.imageUrl
                      : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                  }
                />
              }
              actions={[
                item.authorId === userDetails.id ? (
                  <EditOutlined
                    key='edit'
                    onClick={() => console.log('Edit')}
                  />
                ) : item.likedBy.includes(userDetails.id) ? (
                  <LikeTwoTone
                    key='liked'
                    onClick={() =>
                      updatePostLike({
                        postId: item._id,
                        like: false,
                      })
                    }
                  />
                ) : (
                  <LikeOutlined
                    key='like'
                    onClick={() =>
                      updatePostLike({
                        postId: item._id,
                        like: true,
                      })
                    }
                  />
                ),
                item.authorId === userDetails.id ? (
                  <DeleteOutlined key='delete' />
                ) : (
                  <StarOutlined key='favourite' />
                ),
              ]}
            >
              <Meta
                onClick={() => setSelectedPost(item)}
                avatar={
                  <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />
                }
                title={item.title}
                description={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateDescription(item.content),
                    }}
                  />
                }
              />
            </PostCard>
          </CardContainer>
        ))}
      </BlogPosts>
    </div>
  );
};

export default AllBlogs;
