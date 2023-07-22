import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  {
    value: 0,
    label: 'Private',
  },
  {
    value: 1,
    label: 'Public',
  },
];

const Category = [
  {
    value: 0,
    label: 'Film & Animation',
  },
  {
    value: 1,
    label: 'Autos & Vehicles',
  },
  {
    value: 2,
    label: 'Music',
  },
  {
    value: 3,
    label: 'Pets & Animals',
  },
  {
    value: 4,
    label: 'Sports',
  },
];

const UploadVideoPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [categories, setCategories] = useState('Film & Animation');
  const [filePath, setFilePath] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangePrivacy = (event) => {
    setPrivacy(event.target.value);
  };

  const handleChangeCategories = (event) => {
    setCategories(event.target.value);
  };

  const goBack = () => {
    navigate('/mshome')
  }
  const onSubmit = (event) => {
    event.preventDefault();

    if (!userInfo) {
      toast.error('Sign in first!');
      return;
    }

    if (
      title === '' ||
      description === '' ||
      categories === '' ||
      filePath === '' ||
      duration === '' ||
      thumbnail === ''
    ) {
      toast.error('Fill in all fields before submitting!');
      return;
    }

    const variables = {
      user: userInfo.name,
      title: title,
      description: description,
      privacy: privacy,
      filePath: filePath,
      category: categories,
      duration: duration['fileDuration'],
      thumbnail: thumbnail,
    };

    axios
      .post('/api/video/uploadVideo', variables)
      .then((response) => {
        if (response.data.success) {
          toast.success('Video uploaded successfully!');
          navigate('/mshome');
        } else {
          toast.error('Failed to upload video');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while uploading the video');
      });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    formData.append('file', files[0]);
    axios
      .post('/api/video/uploadfiles', formData, config)
      .then((response) => {
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };
          setFilePath(response.data.filePath);

          // Create the thumbnail to display the uploaded video
          axios
            .post('/api/video/thumbnail', variable)
            .then((response) => {
              if (response.data.success) {
                setDuration(response.data);
                setThumbnail(response.data.thumbsFilePath);
              } else {
                toast.error('Failed to create the thumbnail');
              }
            })
            .catch((error) => {
              toast.error('An error occurred while creating the thumbnail');
            });
        } else {
          toast.error('Video failed to save on the server');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while uploading the video file');
      });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: 'black' }}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit} className='shadow p-5'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid rgb(37, 141, 252)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: '3rem', color: 'rgb(37, 141, 252)' }} />
              </div>
            )}
          </Dropzone>

          {thumbnail !== '' && (
            <div>
              <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
            </div>
          )}
        </div>

        <br /><br />
        <label style={{ color: 'rgb(179, 179, 179)' }}>Title</label>
        <Input
          onChange={handleChangeTitle}
          value={title}
        />
        <br /><br />
        <label style={{ color: 'rgb(179, 179, 179)' }}>Description</label>
        <TextArea
          onChange={handleChangeDescription}
          value={description}
        />
        <br /><br />

        <label style={{ color: 'rgb(179, 179, 179)' }}>Privacy Level</label><br />
        <select style={{ position: 'center', top: '100%', left: '0', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }} onChange={handleChangePrivacy}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <label style={{ color: 'rgb(179, 179, 179)' }}>Category</label><br />
        <select style={{ position: 'center', top: '100%', left: '0', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', padding: '10px' }} onChange={handleChangeCategories}>
          {Category.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>
        <br /><br />

        <div style={{ display: 'flex', justifyContent: 'space-evenly', width:'50%', margin:'auto' }}>
          <Button type="primary" size="large" onClick={onSubmit}>
            Submit
          </Button>
          <Button type="primary" className='bg-danger' size="large" onClick={goBack}>
            GoBack
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
