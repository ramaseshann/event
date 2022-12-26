import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  TimePicker,
  Upload,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { DatePickerProps } from "antd";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { UploadOutlined } from "@ant-design/icons";
import { db, storage } from "../../../Firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { UserContext } from "../../../UserProvider";
import { async } from "@firebase/util";

const AddEvent = ({ label }) => {
  const { state, setState } = useContext(UserContext);

  useEffect(() => {}, []);

  const [time, setTime] = useState(moment(Date.now()).format("HH:mm"));
  const [dates, setDates] = useState("");
  const [file, setFile] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [event, setEvent] = useState({
    Event_Name: "",
    Event_State: "",
    Event_Place: "",
    Event_Category: "",
    Event_Date: "",
    Event_Time: "",
    Event_poster: "",
  });

  const dateFormat = "YYYY-MM-DD";
  const monthFormat = "YYYY/MM";

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedOption(value);
  };

  const onChange = (date, dateString) => {
    console.log(date);
    setEvent({
      ...event,
      Event_Date: dateString,
    });
    console.log(dateString);
  };

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  // async function onSubmit(fieldsValue) {
  //   console.log(fieldsValue);

  //   setEvent({
  //     ...event,
  //     Event_Name: fieldsValue.Event_Name,
  //     Event_Place: fieldsValue.Event_Place,
  //     Event_State: fieldsValue.Event_State,
  //     Event_Category: selectedOption,
  //     Event_poster: imgUrl,
  //   });

  //   setDoc(doc(db, "Events", `${fieldsValue.Event_Name}`), {
  //     ...event,
  //     Event_Name: fieldsValue.Event_Name,
  //     Event_Place: fieldsValue.Event_Place,
  //     Event_State: fieldsValue.Event_State,
  //     Event_Category: selectedOption,
  //     Event_poster: imgUrl,
  //   })
  //     .then(() => {
  //       console.log("doc added");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  
  const onFinish = async(values) => {
    console.log('Success:', values);
   
  
    
  }

  function onFinishFailed() {}

  return (
    <div className="flex  flex-col justify-center items-center h-screen gap-10">
      <h4 className="flex w-[800px]  ml-24 items-center text-[60px] justify-center">
      AddEvent
      </h4>
      <Form
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
        label="Event Name"
        name="Event_Name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Event State"
        name="Event_State"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Event District"
        name="Event_District"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Event Category" name="Event_Category">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
      
        <Form.Item name="Event_Date" label="Event Date" {...config}>
        <DatePicker  format="YYYY-MM-DD " />
      </Form.Item>
     
      <Form.Item name="Event_Time" label="Event Date" {...config}>
        <TimePicker format="HH:mm " />
      </Form.Item>  


      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit" className="bg-yellow-600">
          Submit
        </Button>
      </Form.Item>
      </Form>

    </div>
  );
};

export default AddEvent;
