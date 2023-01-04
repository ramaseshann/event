import { Button, Form, Input, Select } from "antd";
import React, { useContext, useEffect } from "react";
// import Typical from "react-typical";
import { listEvents } from "../../../Firebase/firebaseutils";
import { UserContext } from "../../../UserProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

const SectionHeader = () => {
  const { events, setEvents } = useContext(UserContext);
  const { Option } = Select;
  const [searchParams] = useSearchParams();


  const navigate = useNavigate();
  useEffect(() => {
    
    let editParams = {
      // select_category: searchParams.get("select_category") || "",
      // keyword: searchParams.get("keyword") || "",
    };
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      editParams[param] = value?value === "undefined"?"":value:"";

    }
   
    console.log({editParams},"params");
    listEvents(editParams).then((res) => setEvents(res));
  
  }, [searchParams]);
 

  const onFinish = (values) => {
    console.log(values);

    if (values.select_category || values.keyword) {
   
      navigate(
        `/?select_category=${values.select_category}&keyword=${(values.keyword || "").toLowerCase()}`
      );
      //listEvents(values).then((res) => setEvents(res));
    } else {
      navigate(`/`);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <section className="h-[550px] flex flex-col gap-10 justify-center mt-10  ">
      <div className="flex flex-col">
        <div className="text-[56px] text-bold items-center flex justify-center   ">
          Discover Events&nbsp;
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
          className="flex  gap-10"
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
          <Form.Item className=" " name="select_category">
            <Select placeholder="Select Category" className="">
              <Option value="Music">Music</Option>
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
          className=" flex justify-center"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              ype="primary"
              className="bg-[#5ecdaa] w-32   text-white  h-8 "
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
