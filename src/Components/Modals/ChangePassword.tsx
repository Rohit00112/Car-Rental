"use client";

import changePassword from "@/Services/auth/ChangePassword";
import {
  Button,
  Card,
  Container,
  Input,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const initialPassword = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [passwordDetails, setPasswordDetails] = useState(initialPassword);

  const handlePasswordDetails = (event: any) => {
    const { name, value } = event.target;
    const newRegisterDetails = { ...passwordDetails, [name]: value };
    setPasswordDetails(newRegisterDetails);
  };

  useEffect(() => {
    setPasswordDetails(initialPassword);
  }, []);

  const router = useRouter();

  return (
    <>
      <Container
        css={{
          "@sm": {
            width: "30%",
          },
        }}
      >
        <Spacer y={2} />

        <Card css={{ padding: "2rem" }}>
          <Text
            size={24}
            weight="bold"
            css={{
              as: "center",
              mb: "20px",
            }}
          >
            Change Password
          </Text>

          <Spacer y={1} />
          <Input.Password
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Current Password"
            name="oldPassword"
            onChange={handlePasswordDetails}
          />
          <Spacer y={1} />
          <Input.Password
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="New Password"
            name="newPassword"
            onChange={handlePasswordDetails}
          />
          <Spacer y={1} />
          <Input.Password
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handlePasswordDetails}
          />
          <Spacer y={1.6} />
          <Button
            css={{ backgroundColor: "#11181C", color: "white" }}
            size="lg"
            flat
            onClick={() => {
              changePassword(passwordDetails)
                .then((data: any) => {
                  toast.success("Password Changed Successfully");
                  setPasswordDetails(initialPassword);
                })
                .catch((error: any) => {
                  toast.error(`${error.message}`);
                });
            }}
          >
            Change Password
          </Button>
        </Card>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
