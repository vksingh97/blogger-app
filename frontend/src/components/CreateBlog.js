import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'; // Import ReactQuill
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CustomReactQuill = styled(ReactQuill)`
  .ql-toolbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .ql-container {
    height: 300px; /* Adjust height as needed */
  }
`;

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const CreateBlog = ({
  onClose,
  selectedPost,
  setEditPost,
  editPost,
  selectedEditingPost,
  description,
  handleChangeDescription,
}) => {
  console.log(selectedPost);
  const userDetails = useSelector((state) => state.userDetails);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('content', values.description);
    formData.append('author', userDetails.username);
    formData.append('authorId', userDetails.id);

    if (values.upload && values.upload.length > 0) {
      formData.append('file', values.upload[0].originFileObj);
    }

    if (!editPost) {
      console.log('1', formData);
      await apiInstance.post('/create-blog', formData, {
        withCredentials: true,
      });
    } else {
      console.log('2', selectedEditingPost, formData);
      await apiInstance.put(`/edit-post/${selectedEditingPost._id}`, formData, {
        withCredentials: true,
      });
    }
    setEditPost(null);
    onClose();
  };

  useEffect(() => {
    console.log(editPost);
  }, [editPost]);

  return (
    <Form
      name='basic'
      initialValues={
        editPost && {
          title: selectedEditingPost.title,
          description: selectedEditingPost.content,
        }
          ? {
              title: selectedEditingPost.title,
              description: selectedEditingPost.content,
            }
          : {}
      }
      onFinish={(e) => onFinish(e, editPost)}
      layout='vertical'
    >
      <Form.Item
        label='Title'
        name='title'
        rules={[{ required: true, message: 'Please enter the title!' }]}
      >
        <Input size='large' />
      </Form.Item>

      <Form.Item
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Please enter the description!' }]}
      >
        <CustomReactQuill
          value={description}
          onChange={handleChangeDescription}
          placeholder='Write something...'
          modules={modules}
          formats={formats}
        />
      </Form.Item>

      <Form.Item
        label='Upload Image'
        name='upload'
        valuePropName='fileList'
        getValueFromEvent={(e) => {
          console.log('Upload event:', e);
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
        extra='Select an image to upload'
      >
        <Upload name='logo' action='/upload.do' listType='picture'>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
