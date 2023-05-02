"use client";

import { API_URL_Image } from "@/Components/api/API";
import addDamageRequest from "@/Services/Damage/AddDamageRequest";
import cancelRent from "@/Services/rent/CancelRent";
import getAllRents from "@/Services/rent/GetAllRents";
import {
  Badge,
  Button,
  Col,
  Container,
  Grid,
  Image,
  Input,
  Modal,
  Row,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCarCrash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rent = () => {
  const [damageVisible, setDamaageVisible] = useState(false);
  const damageHandler = () => setDamaageVisible(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const deleteHandler = () => {
    setDeleteVisible(true);
  };

  const closeHandler = () => {
    setDeleteVisible(false);
    setDamaageVisible(false);
    console.log("closed");
  };

  //   -------------------------- rents -------------------------

  const [rents, setRents] = useState<Rent[]>([]);

  const [selectedRent, setSelectedRent] = useState<Rent>();

  const getRents = () => {
    getAllRents()
      .then((data: Rent[]) => {
        setRents(data);
        console.log(data);
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    getRents();
    // console.log(offers);
  }, []);

  //  ------------------ damage request ------------------------

  const initialDamageDetails = {
    carID: 0,
    message: "",
    image: "",
  };

  const [damageDetails, setDamageDetails] = useState(initialDamageDetails);

  const handleDamageDetails = (event: any) => {
    const { name, value } = event.target;
    const newDamageDetials = { ...damageDetails, [name]: value };
    if (name == "image") {
      newDamageDetials.image = event.target.files[0];
    }
    setDamageDetails(newDamageDetials);
  };

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
              My Rents
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
                    <Table.Cell>{item.car.carName}</Table.Cell>
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
                        {!item.isReturned && item.status == 1 ? (
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Damage Request"
                              color="default"
                              onProgress={() => console.log("Cancel Rent")}
                            >
                              <Button
                                onPress={() => {
                                  setSelectedRent(item);
                                  damageHandler();
                                }}
                                light
                                auto
                                color="default"
                                icon={<FaCarCrash size={25} fill="default" />}
                              ></Button>
                            </Tooltip>
                          </Col>
                        ) : (
                          ""
                        )}
                        {item.status != 2 && (
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Cancel Rent"
                              color="error"
                              onProgress={() => console.log("Cancel Rent")}
                            >
                              <Button
                                onPress={() => {
                                  setSelectedRent(item);
                                  deleteHandler();
                                }}
                                light
                                auto
                                color="error"
                                icon={<IoCloseSharp size={25} fill="#FF0080" />}
                              ></Button>
                            </Tooltip>
                          </Col>
                        )}
                      </Row>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
      </Grid.Container>

      {/* Modal for Damange Request  */}
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="add"
        open={damageVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Add Car
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            size="lg"
            bordered
            readOnly
            label="Car Name"
            name="carID"
            value={selectedRent?.car.carName}
            onChange={handleDamageDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Image"
            name="image"
            onChange={handleDamageDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Message"
            name="message"
            onChange={handleDamageDetails}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            css={{ backgroundColor: "#11181C" }}
            onPress={() => {
              addDamageRequest({ ...damageDetails, carID: selectedRent?.carID })
                .then((data) => {
                  toast.success("Request Sent Successfully");
                  getRents();
                  setDamageDetails(initialDamageDetails);
                  closeHandler();
                })
                .catch((error) => {
                  toast.error(`${error.message}`);
                });
            }}
          >
            Save
          </Button>
        </Modal.Footer>
        <ToastContainer />
      </Modal>

      {/* Modal for delete */}
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="edit"
        open={deleteVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Delete Car
          </Text>
        </Modal.Header>
        <Modal.Body>Do you want to cancel your Rent</Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              cancelRent(selectedRent?.rentID ?? 0)
                .then(() => {
                  getRents();
                  toast.success("Rent Canceled Successfully");
                })
                .catch((error: any) => {
                  toast.error(`${error.message}`);
                });
              setDeleteVisible(false);
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
