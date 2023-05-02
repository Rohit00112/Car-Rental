import React from "react";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoginUser from "@/Services/auth/LoginUser";

export default function Login() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      LoginUser(data)
        .then((res: any) => {
          toast.success("Login Successful");
          localStorage.setItem("User", JSON.stringify(res));

          if (res.role === 0) {
            window.location.href = "/admin/dashboard";
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (ex: any) {
      toast.error(ex.message);
    }
  };

  return (
    <div>
      <Button auto shadow ghost color="error" onPress={handler}>
        Login
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <ToastContainer position="top-right" />

        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to {""}
            <Text b size={18}>
              Mero Car Rental
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={login}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
