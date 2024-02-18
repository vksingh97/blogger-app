import React from 'react';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../store/userDetails/userDetailsSlice';

const HeaderContainer = styled.div`
  height: 80px;
  background-color: #001529;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #ffffff;
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const LogoutIcon = styled(LogoutOutlined)`
  font-size: 18px;
  margin-right: 5px;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const onLogout = () => {
    dispatch(updateUserDetails({}));
    localStorage.removeItem('userDetails');
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key='logout' onClick={onLogout}>
        <LogoutIcon />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer>
      <Logo>My Blog</Logo>
      <UserInfo style={{ cursor: 'pointer' }}>
        <UserName>{userDetails.username}</UserName>
        <Dropdown overlay={menu} trigger={['click']}>
          <UserOutlined
            style={{ fontSize: '24px', color: '#ffffff', cursor: 'pointer' }}
          />
        </Dropdown>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
