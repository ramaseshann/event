import { Button, Form, Input, Select } from "antd";
import React, { useContext, useEffect} from "react";
// import Typical from "react-typical";
import { listEvents } from "../../../Firebase/firebaseutils";
import { UserContext } from "../../../UserProvider";

const SectionHeader = () => {
  
  const { events, setEvents } = useContext(UserContext);
  const { Option } = Select;

  useEffect(() => {
    listEvents().then((res) => setEvents(res));
  }, []);

  const onFinish = (values) => {
   
    listEvents(values).then((res) => setEvents(res));
  };
  const onFinishFailed = (errorInfo) => {
    
  };


  return (
    <section className="h-[550px] flex flex-col gap-10 justify-center mt-10  ">
      <div className="flex flex-col">
        <div className="text-[56px] text-bold items-center flex justify-center   ">
          Discover  Events&nbsp;
          {/* <Typical
            loop={Infinity}
            wrapper="b"
            steps={["Events", 4000, "200M+ Events", 6000]}
          /> */}
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
          <Form.Item className=" w-80" name="select_category">
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
