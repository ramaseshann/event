import { Button, Form, Input, Select } from "antd";
import Search from "antd/es/transfer/search";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Typical from "react-typical";
import { db } from "../../../Firebase/firebase";
import { UserContext } from "../../../UserProvider";

const SectionHeader = () => {
  const [label, setLabel] = useState("Explore");
  const { events, setEvents } = useContext(UserContext);
  const { Option } = Select;


  useEffect(()=>{
    listEvents();

  },[])

  const onFinish = (values) => {
    console.log("Success:", values);
    listEvents(values);
//     async function getEvents() {
//       const eventsof = collection(db, "Events");
//       const EventSnapshot = await getDocs(eventsof);
//       const eventList = EventSnapshot.docs.map((doc) => doc.data());
//       const nextToken = EventSnapshot.docs[EventSnapshot.docs.length - 1];
//       console.log(eventList, "nthai");
//       setEvents(eventList);
//       console.log("jinnnnn");
//     }

//     async function getdetails() {
//       const eventsof = collection(db, "Events");
//       const q = query(
//         eventsof,
//         where("Event_Category", "==", `${values.select_category}`)
//       );
//       const querySnapshot = await getDocs(q);
//       const userlist = querySnapshot.docs.map((doc) => doc.data());
//       const EventSnapshot = await getDocs(eventsof);
//       setEvents(userlist);
//     }

//     if (values.select_category === "All_events" && values.keyword === "") {
//       getEvents();
//     } else if (
//       values.select_category !== "All-events" &&
//       values.keyword !== ""
//     ) {
//       getdetails();
//     } else {
//     }
   };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const listEvents = async (values={}) => {
    let eventsof = collection(db, "Events");
    let EventSnapshot;
    let quer;
    if (values.select_category && values.keyword) {
      quer = query(
        eventsof,
        where("Event_Category", "==", `${values.select_category}`),
        where("Event_search", "array-contains", `${values.keyword}`)
      );
      EventSnapshot = await getDocs(quer);
    } else if (values.select_category && !values.keyword) {
      quer = query(
        eventsof,
        where("Event_Category", "==", `${values.select_category}`)
      );
      EventSnapshot = await getDocs(quer);
    } else if (!values.select_category && values.keyword) {
      quer = query(
        eventsof,
        where("Event_search", "array-contains", `${values.keyword}`)
      );
      EventSnapshot = await getDocs(quer);
    } else {
      EventSnapshot = await getDocs(eventsof);
    }
    console.log(EventSnapshot);
    const userlist = EventSnapshot.docs.map((doc) => doc.data());
    
     setEvents(userlist);
  };

  return (
    <section className="h-[550px] flex flex-col gap-10 justify-center mt-10  ">
      <div className="flex flex-col">
        <div className="text-[56px] text-bold items-center flex justify-center   ">
          Discover &nbsp;
          <Typical
            loop={Infinity}
            wrapper="b"
            steps={["Events", 4000, "200M+ Events", 6000]}
          />
        </div>
        <p className="flex justify-center text-[36px] text-bold">
          Happening in your city
        </p>
      </div>
      <p className="flex  justify-center text-gray-600">
        20M People Exploring Events every month
      </p>
      <div className="flex justify-center">
        <Form
          className="flex "
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className=" w-80"
            name="select_category"
           
          >
            <Select placeholder="Select Category" className="">
              <Option value="music">Music</Option>
              <Option value="Dance">Dance</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Entertainment">Entertainment</Option>
              <Option value="yoga">yoga</Option>
              <Option value={null}>All</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="keyword"
            rules={[
              {
                required: false,
                message: "Please input your keyword!",
              },
            ]}
          >
            <Input className="w-60" placeholder="Search by keyword" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              ype="primary"
              className="bg-[#5ecdaa] text-white  w-32 h-10 "
            >
              Explore
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default SectionHeader;
