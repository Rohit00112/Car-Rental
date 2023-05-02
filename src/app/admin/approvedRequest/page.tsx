"use client";

import {
  Badge,
  Button,
  Col,
  Container,
  Grid,
  Image,
  Modal,
  Row,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoReturnDownBackOutline } from "react-icons/io5";
import getAllRents from "@/Services/rent/GetAllRents";
import { API_URL_Image } from "@/Components/api/API";
import returnRent from "@/Services/rent/ReturnRent";

const Rent = () => {
  const [statusVisible, setStatusVisible] = useState(false);
  const statusHandler = () => setStatusVisible(true);

  const closeHandler = () => {
    setStatusVisible(false);
    console.log("closed");
  };

  //   -------------------------- rents -------------------------

  const initialRent: Rent = {
    rentID: 0,
    carID: 0,
    customerID: 0,
    staffID: 0,
    rentDate: "",
    returnDate: "",
    car: {
      carId: 0,
      carName: "",
      image: "",
      price: 0,
      make: "",
      carModel: "",
      registrationNumber: "",
      manufactureYear: 0,
      isAvailable: false,
    },
    status: 0,
    image: "",
    lastLogin: "",
    accessToken: "",
    roleName: "",
    customer: null,
    staff: null,
    isReturned: false,
  };

  const [rents, setRents] = useState<Rent[]>([]);

  const [selectedRent, setSelectedRent] = useState<Rent>(initialRent);

  const getRents = () => {
    getAllRents()
      .then((data: Rent[]) => {
        const approvedData: Rent[] = [];
        data.forEach((item) => {
          if (item.status == 1 && !item.isReturned) approvedData.push(item);
        });
        setRents(approvedData);
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    getRents();
  }, []);

  return (
    <>
      <Grid.Container>
        <Container
          justify="space-between"
          alignItems="center"
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid justify="space-between" alignItems="center">
            <Link href="#"></Link>
            <Text size={40} weight="bold">
              Approved Rents
            </Text>
          </Grid>
        </Container>
        <Container>
          <Table
            bordered
            shadow={false}
            color="warning"
            aria-label="Example pagination table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>Image</Table.Column>
              <Table.Column>NAME</Table.Column>
              <Table.Column>Rent By</Table.Column>
              <Table.Column>Rent Date</Table.Column>
              <Table.Column>Return Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Accepted By</Table.Column>
              <Table.Column css={{ width: "8%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {rents.map((item: Rent) => {
                return (
                  <Table.Row key={item.rentID}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={`${API_URL_Image}${item.car.image}`}
                        alt={item.car.carName}
                        objectFit="cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{item.customer?.userName}</Table.Cell>
                    <Table.Cell>
                      {item.customer?.userName ?? "Not yet"}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(item.rentDate).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(item.returnDate).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>
                      {
                        <Badge
                          color={
                            item.status == 0
                              ? "warning"
                              : item.status == 1
                              ? "success"
                              : "error"
                          }
                        >
                          {item.status == 0
                            ? "Pending"
                            : item.status == 1
                            ? "Approved"
                            : "Canceled"}
                        </Badge>
                      }
                    </Table.Cell>
                    <Table.Cell>{item.staff?.userName ?? "Not yet"}</Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                          <Tooltip
                            content="Return Rent"
                            color="default"
                            onProgress={() => console.log("Delete Car")}
                          >
                            <Button
                              onPress={() => {
                                setSelectedRent(item);
                                statusHandler();
                              }}
                              light
                              auto
                              color="default"
                              icon={
                                <IoReturnDownBackOutline
                                  size={25}
                                  fill="default"
                                />
                              }
                            ></Button>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
      </Grid.Container>

      {/* Modal for change status */}
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="edit"
        open={statusVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Return Rent
          </Text>
        </Modal.Header>
        <Modal.Body>
          Do you want to return rent of {selectedRent?.customer?.userName}
          Rent
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              returnRent(selectedRent?.rentID ?? 0)
                .then((data) => {
                  getRents();
                  toast.success("Returned Successfully");
                  setStatusVisible(false);
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
        <ToastContainer />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Rent;
