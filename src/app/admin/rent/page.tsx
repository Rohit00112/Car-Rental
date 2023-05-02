"use client";

import { API_URL_Image } from "@/Components/api/API";
import { DeleteIcon } from "@/Components/icons/DeleteIcon";
import approveRent from "@/Services/rent/ApproveRent";
import deleteRent from "@/Services/rent/DeleteRent";
import getAllRents from "@/Services/rent/GetAllRents";
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
import { IoRepeatOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rent = () => {
  const [statusVisible, setStatusVisible] = useState(false);
  const statusHandler = () => setStatusVisible(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const deleteHandler = () => {
    setDeleteVisible(true);
  };

  const closeHandler = () => {
    setDeleteVisible(false);
    setStatusVisible(false);
  };

  const [rents, setRents] = useState<Rent[]>([]);

  const [selectedRent, setSelectedRent] = useState<Rent>();

  const getRents = () => {
    getAllRents()
      .then((data: Rent[]) => {
        setRents(data);
      })
      .catch((e: any) => toast.error(e.message));
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
              Rent
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
                    <Table.Cell>{item.car.carName}</Table.Cell>
                    <Table.Cell>{item.customer?.userName}</Table.Cell>
                    <Table.Cell>{item.rentDate}</Table.Cell>
                    <Table.Cell>{item.returnDate}</Table.Cell>
                    <Table.Cell>
                      {
                        <Badge color={item.status ? "success" : "error"}>
                          {item.status ? "Accepted" : "Pending"}
                        </Badge>
                      }
                    </Table.Cell>
                    <Table.Cell>{item.staff?.userName ?? "Not yet"}</Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
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
                        <Col css={{ d: "flex" }}>
                          <Tooltip
                            content="Delete Car"
                            color="error"
                            onProgress={() => console.log("Delete Car")}
                          >
                            <Button
                              onPress={() => {
                                setSelectedRent(item);
                                deleteHandler();
                              }}
                              light
                              auto
                              color="error"
                              icon={<DeleteIcon size={20} fill="#FF0080" />}
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
        <Modal.Body>
          Do you want to delete {selectedRent?.customer?.userName} Rent
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteRent(selectedRent?.rentID ?? 0)
                .then(() => {
                  getRents();
                  toast.success("Rent Deleted Successfully");
                })
                .catch((error: any) => {
                  toast.error(`${error.message}`);
                });
              setDeleteVisible(false);
            }}
            css={{ backgroundColor: "#11181C" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

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
            Change Status
          </Text>
        </Modal.Header>
        <Modal.Body>
          Do you want to change status of {selectedRent?.customer?.userName}
          Rent
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              approveRent(selectedRent?.rentID ?? 0)
                .then(() => {
                  getRents();
                  toast.success("Rent Approved Successfully");
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
    </>
  );
};

export default Rent;
