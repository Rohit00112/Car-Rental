"use client";

import { API_URL_Image } from "@/Components/api/API";
import approveDamageBill from "@/Services/damagebill/ApproveDamageBill";
import getAllDamageBills from "@/Services/damagebill/DamageBills";
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
import { IoCheckmarkSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DamageBills = () => {
  const [statusVisible, setStatusVisible] = useState(false);
  const statusHandler = () => setStatusVisible(true);

  const closeHandler = () => {
    setStatusVisible(false);
  };
  //   -------------------------- damage requests -------------------------

  const [damageBills, setDamageBills] = useState<DamageBills[]>([]);
  const [selectedItem, setSelectedItem] = useState<DamageBills>();

  const getDamageRequests = () => {
    getAllDamageBills()
      .then((data: DamageBills[]) => {
        setDamageBills(data);
        console.log(data);
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    getDamageRequests();
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
              Bills
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
              <Table.Column>Total Price</Table.Column>
              <Table.Column>Approved By</Table.Column>
              <Table.Column>Bill Status</Table.Column>
              <Table.Column css={{ width: "8%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {damageBills.map((item: DamageBills) => {
                return (
                  <Table.Row key={item.repairBillID}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={`${API_URL_Image}${item.damageRequest.car.image}`}
                        alt={item?.damageRequest.car.carName}
                        objectFit="cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{item?.damageRequest.car.carName}</Table.Cell>
                    <Table.Cell>
                      {new Date(item.totalPrice).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>
                      {!item?.staff ? "Not Yet" : item?.staff.userName}
                    </Table.Cell>
                    <Table.Cell>
                      {
                        <Badge color={item.paid ? "success" : "error"}>
                          {item.paid ? "Paid" : "Not Paid"}
                        </Badge>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                          {item.paid ? (
                            ""
                          ) : (
                            <Tooltip
                              content="Generate Bill"
                              color="default"
                              onProgress={() => console.log("Bill Generated")}
                            >
                              <Button
                                onPress={() => {
                                  alert(JSON.stringify(item));
                                  setSelectedItem(item);
                                  setStatusVisible(true);
                                }}
                                light
                                auto
                                color="default"
                                icon={
                                  <IoCheckmarkSharp
                                    size={20}
                                    fill="currentColor"
                                  />
                                }
                              ></Button>
                            </Tooltip>
                          )}
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
            Change Status
          </Text>
        </Modal.Header>
        <Modal.Body>Do you want to approve bill?</Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              approveDamageBill(selectedItem?.repairBillID ?? 0)
                .then(() => {
                  getDamageRequests();
                  toast.success("Bill Approved Successfully");
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
    </>
  );
};

export default DamageBills;
