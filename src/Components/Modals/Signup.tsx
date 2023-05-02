import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import RegisterUser from "@/Services/auth/RegisterUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Login from "./Login";

export default function Signup() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const userDetail = {
    email: "",
    userName: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: null,
    document: null,
  };

  const [user, setUser] = React.useState(userDetail);

  const handleSubmit = () => {
    if (user.password === user.confirmPassword) {
      RegisterUser(user)
        .then((res: any) => {
          toast.success("User Registered Successfully");
          setTimeout(() => {
            setVisible(false);
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Password did not matched");
    }
  };

  return (
    <div>
      <Button auto shadow ghost color="error" onPress={handler}>
        SignUp
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <ToastContainer
          position="top-right"
          style={{
            marginLeft: "200px",
          }}
        />
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
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Username"
            contentLeft={<Mail fill="currentColor" />}
            name="userName"
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Address"
            contentLeft={<Mail fill="currentColor" />}
            name="address"
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Phone"
            contentLeft={<Mail fill="currentColor" />}
            name="phone"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            color="primary"
            placeholder="Confirm Password"
            size="lg"
            contentLeft={<Password fill="currentColor" />}
            name="confirmPassword"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
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
          <Button auto onPress={handleSubmit}>
            SignUp
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
