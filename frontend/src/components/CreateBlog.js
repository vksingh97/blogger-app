import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'; // Import ReactQuill
import styled from 'styled-components';

// const FormContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const Title = styled.h2`
//   margin-bottom: 20px;
// `;

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

const CreateBlog = () => {
  const [description, setDescription] = useState('');

  const handleChangeDescription = (value) => {
    setDescription(value);
  };
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

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
