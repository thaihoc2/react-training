import React, { useEffect, useState } from 'react'
import { Ticket } from '../../models/ticket';
import { fetchData } from '../../datasource/fetch-data';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';


export function TicketList() {
  const history = useHistory();

  function viewDetails(id: any) {
    history.push('/ticket-detail/' + id);
  }

  const columns: ColumnProps<Ticket>[] = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'subject',
      title: 'SUBJECT',
      dataIndex: 'subject',
    }
    ,
    {
      key: 'requestedDate',
      title: 'REQUESTED DATE',
      dataIndex: 'requestedDate',
      render: (_, record) => {
        return Moment(new Date(record.requestedDate)).format('MMM Do YYYY');
      },
    }
    ,
    {
      key: 'latestUpdate',
      title: 'LATEST UPDATE',
      dataIndex: 'latestUpdate',
      render: (_, record) => {
        return Moment(new Date(record.latestUpdate)).format('MMM Do YYYY');
      },
    }
    ,
    {
      key: 'status',
      title: 'STATUS',
      dataIndex: 'status',
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'Open',
      width: '10%',
      render: (_, record) => {
        return (
          <Button type='primary' onClick={() => viewDetails(record.id)}>
            Open
          </Button>
        );
      },
    },
  ];



  const [tickets, setTickets] = useState<Ticket[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3004/tickets');
        setTickets(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      <Table<Ticket> columns={columns} rowKey="id" dataSource={tickets as Ticket[]} />
    </div>
  );
}