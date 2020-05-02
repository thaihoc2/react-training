import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Ticket } from '../../models/ticket';
import { fetchData } from '../../datasource/fetch-data';
import { useHistory } from 'react-router-dom';

export default function CreateTicket(props: any) {
    const [saveState, setSaveState] = useState<{
        body: string;
    } | null>(null);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (!saveState) {
                return;
            }
            try {
                const data = await fetchData('http://localhost:3004/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: saveState.body,
                });
                if (data) {
                    history.push('/');
                }
            } catch (e) {
                // log error
                console.log(e);
            }
        })();
    }, [saveState]);


    function onFinish(args: any) {
        // convert date time to number.
        var ticket = {
            ...args,
            requestedDate: new Date(args.requestedDate).getTime(),
            latestUpdate: new Date(args.latestUpdate).getTime(),
        }
        setSaveState({
            body: JSON.stringify(ticket),
        });
    }

    function onFinishFailed(...args: any) {
        // log error
        console.log(args);
    }

    const onBack = () => {
        history.push('/');
    };

    const defaultTicket = {
        status: 'Active'
    }

    return (
        <div>
            <h3 className='ticket-title'>Create new ticket</h3>
            <FormEdit initialValues={defaultTicket as Ticket} onFinish={onFinish} onFinishFailed={onFinishFailed} onBack={onBack} />
        </div>);
}


interface FormEditProps {
    initialValues: Ticket;
    onFinish: (formValue: any) => void;
    onFinishFailed: (error: any) => void;
    onBack: () => void;
}

export function FormEdit(props: FormEditProps) {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };


    function onBack() {
        props.onBack();
    }

    return (
        <Form
            {...layout}
            name='basic'
            form={form}
            initialValues={props.initialValues}
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
        >
            <Form.Item
                label='Subject'
                name='subject'
                rules={[{ required: true, message: 'Please input the subject' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label='RequestedDate' name='requestedDate'
                rules={[{ required: true, message: 'Please input the Requested Date' }]}>
                <DatePicker />
            </Form.Item>

            <Form.Item label='Latest Update' name='latestUpdate'
                rules={[{ required: true, message: 'Please input the Latest Update' }]}>
                <DatePicker />
            </Form.Item>

            <Form.Item label="Status" name="status">
                <Select>
                    <Select.Option value="Active">Active</Select.Option>
                    <Select.Option value="Resolved">Resolved</Select.Option>
                    <Select.Option value="Paused">Paused</Select.Option>
                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label='Description' name='description'>
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>

                <Button type='primary' htmlType='button' onClick={onBack}>
                    Back
                </Button>
            </Form.Item>
        </Form>
    );
}
