import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

const LandingPageContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <LandingPageContainer>
      <Title>Welcome to Blogger App</Title>
      <ButtonContainer>
        <Button type='primary' onClick={handleLogin}>
          Login
        </Button>
        <Button type='primary' onClick={handleRegister}>
          Register
        </Button>
      </ButtonContainer>
    </LandingPageContainer>
  );
};

export default LandingPage;
