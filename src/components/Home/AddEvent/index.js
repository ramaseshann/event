import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Upload,
} from "antd";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { getDownloadURL } from "firebase/storage";
import { UserContext } from "../../../UserProvider";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ label }) => {
  const { state,  user,  setChange } =
    useContext(UserContext);

  useEffect(() => {}, []);
  const [labels, setLabels] = useState(label);

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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

  const onFinish = async (values) => {
    let imageUrl = "";
    if (values.banner.length) {
      if (values.banner[0].url) {
        imageUrl = values.banner[0].url;
      } else {
        imageUrl = await fileUpload(values.banner[0].originFileObj);
      }
    }

    let array = values.Event_Name.split(" ").map(item => item.toLowerCase());
    array.push(values.Event_Name);
    let id;
    if (state.id) {
      id = state.id;
    } else {
      id = doc(collection(db, "Events")).id;
    }
    setDoc(doc(db, "Events", `${id}`), {
      id,
      Event_Name: values.Event_Name,
      Event_Place: values.Event_Place,
      Event_State: values.Event_State,
      Event_Category: values.Event_Category,
      Event_Date: dayjs(values.Event_Date).format("YYYY-MM-DD"),
      Event_Time: dayjs(values.Event_Time).format("HH:mm:ss"),
      Event_user: user.email,
      Event_search: array,
      Event_poster: imageUrl,
    });
    if (labels === "Edit Event") {
      setChange(true);
    }

    navigate("/myevents");
  };

  function onFinishFailed() {}

  const fileUpload = async (file, name = "test", path = "") => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);

      // 'file' comes from the Blob or File API
      return uploadBytes(storageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => downloadURL);
      });
    } catch (e) {
      return false;
    }
  };

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
                banner: state.Event_poster ? [{ url: state.Event_poster }] : [],
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
          name="banner"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={getFile}
          rules={[{ required: true, message: "Please select image!" }]}
        >
          <Upload maxCount={1} action="/upload.do" listType="picture-card">
            <div>
              {/* <PlusOutlined /> */}
              <div style={{ marginTop: 8 }}>Select</div>
            </div>
          </Upload>
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
