import React, { useState, useEffect } from 'react'
import { Ticket } from '../../models/ticket';
import { fetchData } from '../../datasource/fetch-data';
import { Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';

export default function TicketDetail(props: any) {

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const history = useHistory();

  function backtoHome() {
    history.goBack();
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3004/tickets/' + props.match.params.id);
        setTicket(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <>
      <div>
        <Form name="validate_other" {...formItemLayout}>
          <Form.Item label="Id">
            <span className="ant-form-text">{ticket?.id}</span>
          </Form.Item>
          <Form.Item label="Subject">
            <span className="ant-form-text">{ticket?.subject}</span>
          </Form.Item>
          <Form.Item label="Requested Date">
            <span className="ant-form-text">{ticket?.requestedDate}</span>
          </Form.Item>
          <Form.Item label="Latest Update">
            <span className="ant-form-text">{ticket?.latestUpdate}</span>
          </Form.Item>
          <Form.Item label="Status">
            <span className="ant-form-text">{ticket?.status}</span>
          </Form.Item>
          <Form.Item label="Description">
            <span className="ant-form-text">{ticket?.id}</span>
          </Form.Item>
        </Form>

        <Button type='primary' onClick={backtoHome}>
          Back
        </Button>
      </div>
    </>
  );
}