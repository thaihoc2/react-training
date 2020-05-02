import React, { useState, useEffect } from 'react';
import { Profile } from '../../models/profile';
import { UserProfile } from '../user-profile/user-profile';
import { fetchData } from '../../datasource/fetch-data';
import { MetricBox } from '../ticket/metric-box';
import { TicketList } from '../ticket/ticket-list';
import { Analysis } from '../../models/analysis';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const history = useHistory();
  function createTicket() {
    history.push('/create-ticket');
  }
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

  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3004/analysis');
        setAnalysis(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  
  return (
    <div className="content">
      <div className="left-container">
        <div className='top box-container'>
          {
              analysis.map((item) => {
                return (
                <MetricBox 
                  key={item.id}
                  analysis= {item} />
                );
            })
          }
        </div>
        <div>
        <Button type='primary' onClick={createTicket}>
          Create new ticket
        </Button>
        </div>
        <div className='datatable'>
          <TicketList/>
        </div>
      </div>

      <div className='profile'>
        <h3>Profile</h3>
        {profile ? <UserProfile profile={profile} /> : null}
      </div>
    </div>
  );
}
