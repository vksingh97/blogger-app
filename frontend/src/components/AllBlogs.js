import React from 'react';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';

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
  const truncateDescription = (description) => {
    const maxLength = 150;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };
  return (
    <div>
      <BlogPosts>
        {blogPosts.map((item) => (
          <CardContainer key={item._id}>
            <PostCard
              cover={
                <PostImage
                  alt='example'
                  src={
                    item.imageUrl
                      ? item.imageUrl
                      : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                  }
                />
              }
              actions={[
                <SettingOutlined key='setting' />,
                <EditOutlined key='edit' />,
                <EllipsisOutlined key='ellipsis' />,
              ]}
              onClick={() => setSelectedPost(item)}
            >
              <Meta
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
