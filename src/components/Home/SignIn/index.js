import React, { useContext } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../../UserProvider";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  signInAuthUserWithEmailAndPassword,
} from "../../../Firebase/firebase";

const SignIn = () => {
  const { checkAuthentication, user } = useContext(UserContext);
  let navigate = useNavigate();
  const onFinish = async (values) => {};

  const onSubmit = (values) => {
    signInAuthUserWithEmailAndPassword(values.Email, values.password)
      .then((userCredential) => {
        checkAuthentication();
        navigate("/");
        message.success("Successfully signed in");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const onFinishFailed = () => {};

  return (
    <div className="flex flex-col gap-10 border-2   items-center  h-screen pt-60 pl-40">
      <h6 className=" flex w-[800px] ml-24 items-center text-[60px]">
        Sign in
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
            Email: "",
            password: "",
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
            className=""
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="w-80   " />
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
      <section className="border-2 ">
        New to evento?
        <Link to="/signup">
          <span className="pl-4 cursor-pointer">Sign Up</span>
        </Link>
      </section>
    </div>
  );
};

export default SignIn;
