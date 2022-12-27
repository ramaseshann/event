import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Space, Statistic, Table } from "antd";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../UserProvider";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

const Myevent = () => {
  const { events, state, setState, setEvents, user, change } =
    useContext(UserContext);
  const [deleted, setDeleted] = useState(false);

  async function getdetails() {
    const eventsof = collection(db, "Events");
    const q = query(eventsof, where("Event_user", "==", `${user.email}`));
    const querySnapshot = await getDocs(q);
    const userlist = querySnapshot.docs.map((doc) => doc.data());
    console.log(userlist, "`12345666");
    const EventSnapshot = await getDocs(eventsof);
    const eventList = EventSnapshot.docs.map((doc) => doc.data());

    setEvents(userlist);
  }

  useEffect(() => {
    if(user)
    getdetails();
  }, [change,user]);

  async function handleDelete(e, record) {
    await deleteDoc(doc(db, "Events", `${record.Event_Name}`));
 
    getdetails();
  }

  const columns = [
    {
      title: "Event Name",
      dataIndex: "Event_Name",
      key: "Event_Name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Event Category",
      dataIndex: "Event_Category",
      key: "Event_Category",
    },
    {
      title: "Event Date",
      dataIndex: "Event_Date",
      key: "address",
    },
    {
      title: "Event Time",
      dataIndex: "Event_Time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to="edit" onClick={() => setState(record)}>
            Edit
          </NavLink>
          <NavLink onClick={(e) => handleDelete(e, record)}>Delete</NavLink>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[900px]">
        <Table columns={columns} dataSource={events} />
      </div>
    </div>
  );
};

export default Myevent;
