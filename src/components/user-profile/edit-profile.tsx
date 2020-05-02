import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Profile } from '../../models/profile';
import { fetchData } from '../../datasource/fetch-data';
import { useHistory } from 'react-router-dom';

export default function EditProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saveState, setSaveState] = useState<{
    id: string;
    body: string;
  } | null>(null);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3004/profile');
        setProfile(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!saveState) {
        return;
      }
      try {
        const data = await fetchData('http://localhost:3004/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: saveState.body,
        });
        console.log(data);
        if (data) {
          history.push('/');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [saveState]);


  function onFinish(args: any) {
    console.log(args);

    setSaveState({
      id: profile!.id,
      body: JSON.stringify(args),
    });
  }

  function onFinishFailed(...args: any) {
    console.log(args);

  }
  function onBack() {
    history.push('/');
  }

  return (
    <>
      <div>Edit Profile</div>
      {profile ? (
        <div>
          <FormEdit
            initialValues={profile}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onBack={onBack}
          />
        </div>
      ) : (
          <p>Loading...</p>
        )}
    </>
  );
}

export { EditProfile };

interface FormEditProps {
  initialValues: Profile;
  onFinish: (formValue: any) => void;
  onBack: () => void;
  onFinishFailed: (error: any) => void;
}
function FormEdit(props: FormEditProps) {

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 14,
    },
  };

  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }

  function onBack() {
    props.onBack();
  }

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={props.initialValues}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Title' name='title'>
        <Input />
      </Form.Item>

      <Form.Item label='Role' name='roles'>
        <Select
          mode="multiple"
          placeholder="Please select"
          onChange={handleChange}
          defaultValue={props.initialValues.roles}
          style={{ width: '100%' }}
        >
          <Select.Option value='Developer'>Developer</Select.Option>
          <Select.Option value='Technical Architect'>Technical Architect</Select.Option>
          <Select.Option value='QC'>QC</Select.Option>
          <Select.Option value='QA'>QA</Select.Option>
          <Select.Option value='Project Manager'>Project Manager</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label='Email' name='email'>
        <Input />
      </Form.Item>

      <Form.Item label='Phone' name='phone'>
        <Input />
      </Form.Item>


      <Form.Item label='Bio' name='bio'>
        <Input />
      </Form.Item>

      <Form.Item label='Avartar' name='avatar'>
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button type='primary' htmlType='button' onClick={onBack}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
}
