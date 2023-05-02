"use client";

import { API_URL_Image } from "@/Components/api/API";
import getAllDamageRequests from "@/Services/Damage/AllDamageRequest";
import {
  Button,
  Col,
  Container,
  Grid,
  Image,
  Row,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoReceiptOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DamageRequests = () => {
  const [statusVisible, setStatusVisible] = useState(false);
  const statusHandler = () => setStatusVisible(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const deleteHandler = () => {
    setDeleteVisible(true);
  };

  const closeHandler = () => {
    setDeleteVisible(false);
    setStatusVisible(false);
    console.log("closed");
  };

  //   -------------------------- damage requests -------------------------

  const [damages, setDamages] = useState<DamageRequest[]>([]);

  const getDamageRequests = () => {
    getAllDamageRequests()
      .then((data: DamageRequest[]) => {
        setDamages(data);
        console.log(data);
      })
      .catch((e: any) => toast.error(e.message));
  };

  useEffect(() => {
    getDamageRequests();
    console.log(damages);
    // console.log(offers);
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
              Damage Request
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
              <Table.Column>Date</Table.Column>
              <Table.Column>Message</Table.Column>
              <Table.Column css={{ width: "8%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {damages.map((item: DamageRequest) => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={`${API_URL_Image}${item.image}`}
                        alt={item?.car.carName}
                        objectFit="cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{item?.car.carName}</Table.Cell>
                    <Table.Cell>
                      {new Date(item.requestDate).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>{item?.message}</Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        {/* {item.status == 0 && (
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Change Status">
                              <Button
                                onPress={() => {
                                  setSelectedRent(item);
                                  statusHandler();
                                }}
                                light
                                auto
                                color="warning"
                                icon={
                                  <IoRepeatOutline size={20} color="#979797" />
                                }
                              ></Button>
                            </Tooltip>
                          </Col>
                        )} */}
                        <Col css={{ d: "flex" }}>
                          <Tooltip
                            content="Generate Bill"
                            color="default"
                            onProgress={() => console.log("Bill Generated")}
                          >
                            <Button
                              //   onPress={() => {
                              //     setSelectedRent(item);
                              //     deleteHandler();
                              //   }}
                              light
                              auto
                              color="default"
                              icon={
                                <IoReceiptOutline
                                  size={20}
                                  fill="currentColor"
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

      {/* Modal for delete */}
      {/* <Modal
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
        <Modal.Body>
          Do you want to delete {selectedRent?.customer?.userName}'s Rent
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteRent(selectedRent?.id ?? 0)
                .then(() => {
                  getRents();
                  toast.success("Rent Deleted Successfully");
                })
                .catch((error) => {
                  toast.error(`${error.message}`);
                });
              setDeleteVisible(false);
            }}
            css={{ backgroundColor: "#11181C" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Modal for change status */}
      {/* <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="edit"
        open={statusVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Change Status
          </Text>
        </Modal.Header>
        <Modal.Body>
          Do you want to change status of {selectedRent?.customer?.userName}'s
          Rent
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              approveRent(selectedRent?.id ?? 0)
                .then(() => {
                  getRents();
                  toast.success("Rent Approved Successfully");
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
      </Modal> */}
    </>
  );
};

export default DamageRequests;
