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
import { Navigate, useNavigate } from "react-router-dom";

const AddEvent = ({ label }) => {
  const { state, setState, user, events, change, setChange } =
    useContext(UserContext);
  console.log(state);
  useEffect(() => {}, []);
  const [labels, setLabels] = useState(label);
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
    Event_User: "",
    Event_Search: [],
  });

  useEffect(() => {}, [labels]);

  let navigate = useNavigate();

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

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(dayjs(values.Event_Time).format("HH:mm"));
    let array = values.Event_Name.split(" ");
    array.push(values.Event_Name);

    setDoc(doc(db, "Events", `${values.Event_Name}`), {
      Event_Name: values.Event_Name,
      Event_Place: values.Event_Place,
      Event_State: values.Event_State,
      Event_Category: values.Event_Category,
      Event_Date: dayjs(values.Event_Date).format("YYYY-MM-DD"),
      Event_Time: dayjs(values.Event_Time).format("HH:mm:ss"),
      Event_user: user.email,
      Event_search: array,
    });
    if (labels === "Edit Event") {
      setChange(true);
    }

    navigate("/myevents");
  };

  function onFinishFailed() {}

  return (
    <div className="flex  flex-col justify-center items-center h-screen gap-10">
      <h4 className="flex w-[800px]  ml-24 items-center text-[60px] justify-center">
        {label}
      </h4>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={
          label === "Edit Event"
            ? {
                remember: true,
                Event_Name: state.Event_Name,
                Event_Place: state.Event_Place,
                Event_State: state.Event_State,
                Event_Category: state.Event_Category,
                Event_Date: dayjs(state.Event_Date, "YYYY-MM-DD"),
                Event_Time: dayjs(state.Event_Time, "HH:mm:ss"),
              }
            : ""
        }
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
              message: "Please input Event Name!",
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
              message: "Please input your Event State!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Event Place"
          name="Event_Place"
          rules={[
            {
              required: true,
              message: "Please input Event Place!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Event Category" name="Event_Category">
          <Select>
            <Select.Option value="Music">Music</Select.Option>
            <Select.Option value="Dance">Dance</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="Sports">Sports</Select.Option>
            <Select.Option value="yoga">Yoga</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="Event_Date" label="Event Date" {...config}>
          <DatePicker format="YYYY-MM-DD " />
        </Form.Item>

        <Form.Item name="Event_Time" label="Event Time">
          <TimePicker className="" />
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
