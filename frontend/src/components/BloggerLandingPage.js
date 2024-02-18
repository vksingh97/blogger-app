import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const BloggerLandingPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BloggerLandingPage = ({ userDetails }) => {
  return (
    <BloggerLandingPageContainer>
      <Header />
      <Body />
    </BloggerLandingPageContainer>
  );
};

export default BloggerLandingPage;
