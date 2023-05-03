"use client";

import { API_URL_Image } from "@/Components/api/API";
import getCarDetails from "@/Services/car/CarDetails";
import rentalRequest from "@/Services/rent/RentRequest";
import {
  Badge,
  Button,
  Card,
  Grid,
  Image,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarDetails = (id: any) => {
  const router = useRouter();
  const route = () => router.push("");

  const [confirmVisible, setConfirmVisible] = useState(false);
  const confirmHandler = () => {
    setConfirmVisible(true);
  };

  const closeHandler = () => {
    setConfirmVisible(false);
  };

  const [car, setCar] = useState<Car>();
  const [errorMessage, setErrorMessage] = useState("Initial error message");

  useEffect(() => {
    getCarDetails(id.params.id)
      .then((car: Car) => {
        setCar(car);
      })
      .catch((e: any) => setErrorMessage(e.message));
  }, []);

  return (
    <>
      <Card>
        <Badge
          color="success"
          variant="flat"
          size="lg"
          css={{ position: "absolute", zIndex: 1, top: 5, right: 10 }}
        >
          {car?.isAvailable ? "Available" : "Not Available"}
        </Badge>
        <Grid.Container gap={3} justify="center">
          <Grid xs={6} direction="column" css={{ paddingLeft: "3rem" }}>
            <Text b size={78} weight="bold">
              {car?.carName}
            </Text>
            <Spacer y={0.5} />

            <Text size={17} b css={{ paddingLeft: "1rem" }}>
              {car?.make}
              <span
                style={{
                  color: "#F5A524",
                  fontWeight: "900",
                }}
              >
                {" "}
                |{" "}
              </span>
              {car?.carModel}
              <span
                style={{
                  color: "#F5A524",
                  fontWeight: "900",
                }}
              >
                {" "}
                |{" "}
              </span>
              {car?.manufactureYear}
            </Text>
            <Spacer y={0.5} />
            <Text size={17} b css={{ paddingLeft: "1rem" }}>
              Reg No: {car?.registrationNumber}
            </Text>
            <Spacer y={-1.5} />
            <Text size={40} weight="bold" css={{ paddingLeft: "1rem" }}>
              Rs. {car?.price}
              <Spacer x={0.5} />
            </Text>
            <Spacer y={-3} />
            <Text size={17} css={{ paddingLeft: "1rem" }}>
              Discount: Rs. 350
            </Text>
            <Spacer y={-1} />
            <Text size={18} css={{ paddingLeft: "1rem" }}>
              THis car name is {car?.carName} and it is{" "}
              {car?.isAvailable ? "Available" : "Not Available"}. It is a{" "}
              {car?.make} {car?.carModel} manufactured in {car?.manufactureYear}
            </Text>
            <Spacer y={2} />
            <Grid.Container direction="row">
              <Button
                flat
                size="lg"
                css={{
                  backgroundColor: "#11181C",
                  color: "white",
                }}
                onPress={() => {
                  const user = localStorage.getItem("User");
                  if (user == null) {
                    toast.error("Please Login to Rent a Car");
                    setTimeout(() => {
                      router.push("/auth/login");
                    }, 2000);
                  } else {
                    setConfirmVisible(true);
                  }
                }}
              >
                Rent
              </Button>
            </Grid.Container>
            <Spacer y={1} />
          </Grid>
          <Grid xs={6}>
            <Card variant="flat">
              <Image
                width="100%"
                height="100%"
                src={`${API_URL_Image}${car?.image}`}
                alt="Default Image"
                objectFit="cover"
              />
            </Card>
          </Grid>
        </Grid.Container>
      </Card>
      {/* Modal for confirmation */}
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="edit"
        open={confirmVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Confirm Rent
          </Text>
        </Modal.Header>
        <Modal.Body>Do you want to rent {car?.carName}</Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              rentalRequest({ carID: car?.carId ?? 0 })
                .then((data) => {
                  toast.success(`${car?.carName} Rented Successfully`);
                  setConfirmVisible(false);
                })
                .catch((error) => {
                  toast.error(`${error.message}`);
                });
            }}
            css={{ backgroundColor: "#11181C" }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CarDetails;
