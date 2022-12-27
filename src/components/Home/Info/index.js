import { Col, Row, Statistic } from 'antd'
import React, { useContext, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { UserContext } from '../../../UserProvider';
import { json, NavLink } from 'react-router-dom';


const Info = () => {

  const {events , state, setState}= useContext(UserContext);


  console.log(events)
  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'Event_Name',
      key: 'Event_Name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Event Category',
      dataIndex: 'Event_Category',
      key: 'Event_Category',
    },
    {
      title: 'Event Date',
      dataIndex: 'Event_Date',
      key: 'address',
    },
     {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <NavLink  to="edit" onClick={()=>setState(record)}  >
            Edit 
          </NavLink>
          <NavLink>
          Delete
          </NavLink>

        
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div className='flex flex-col bg-[#5ecdaa] w-full h-screen text-white font-bold text-[30px] flex  items-center justify-center'>
      
      
        <h2 className='flex'>Manage your Events</h2>
        
        
    </div>
  )
}

export default Info
