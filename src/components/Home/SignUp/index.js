import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase/firebase";

const SignUp = () => {
  let navigate = useNavigate();
  const onSubmit = (values) => {
    createUserWithEmailAndPassword(auth, values.Email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;

        navigate("/signin");
      })
      .catch((error) => {
        message.error(error.message);
      });

    navigate("/signin");
  };
  const onFinishFailed = (errorInfo) => {
    
  };

  return (
    <div className="flex flex-1 w-full">
      <div className="flex flex-col gap-10 border-2   items-center  h-screen pt-60 pl-40">
        <h6 className=" flex w-[800px] ml-24 items-center text-[60px]">
          Sign Up
        </h6>
        <div className="flex  w-[800px] items-center  ">
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
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="w-80" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="w-80" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="default" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
