"use client";

import { API_URL_Image } from "@/Components/api/API";
import getAllDamageRequests from "@/Services/Damage/AllDamageRequest";
import createRepairDamageBills from "@/Services/Damage/Damagebill";
import {
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
import { IoCloseSharp, IoReceiptOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DamageRequests = () => {
  const [addVisible, setAddVisible] = useState(false);
  const addHandler = () => setAddVisible(true);

  const closeHandler = () => {
    setAddVisible(false);

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
      .catch((e) => toast.error(e.description));
  };

  useEffect(() => {
    getDamageRequests();
    console.log(damages);
  }, []);

  // ------------------------------

  const [selectedItem, setSelectedItem] = useState<number>(0);

  const initialRepairBill: {
    damageRequestID: number;
    repairBillDescriptions: { description: string; price: number }[];
  } = {
    damageRequestID: selectedItem,
    repairBillDescriptions: [],
  };

  const initialBill: { description: string; price: number } = {
    description: "",
    price: 0,
  };

  const [billDetails, setBillDetails] = useState(initialBill);
  const [repairBills, setRepairBills] = useState(initialRepairBill);

  const handleDamageRepairBill = (event: any) => {
    const { name, value } = event.target;
    const newRepairBills = { ...billDetails, [name]: value };

    setBillDetails(newRepairBills);
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
                  <Table.Row key={item.damageRequestID}>
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
                        <Col css={{ d: "flex" }}>
                          <Tooltip
                            content="Generate Bill"
                            color="default"
                            onProgress={() => console.log("Bill Generated")}
                          >
                            <Button
                              onPress={() => {
                                setSelectedItem(item.damageRequestID);
                                addHandler();
                              }}
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

      {/* Modal for Description  */}
      <Modal
        width="30%"
        closeButton
        preventClose
        aria-labelledby="add"
        open={addVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Add Car
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            size="lg"
            bordered
            label="Message"
            name="description"
            value={billDetails.description}
            onChange={handleDamageRepairBill}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Price"
            type="number"
            name="price"
            value={billDetails.price}
            onChange={handleDamageRepairBill}
          />
          <Button
            auto
            css={{ backgroundColor: "#11181C" }}
            onPress={() => {
              console.log(repairBills);
              if (billDetails.description == "") {
                toast.error("Please Enter Message");
                return;
              }
              if (billDetails.price == 0) {
                toast.error("Please Enter Price");
                return;
              }
              repairBills.repairBillDescriptions.push(billDetails);
              setBillDetails(initialBill);
            }}
          >
            Add
          </Button>

          <Table
            aria-label="Example table with dynamic content"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>Message</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column width="5%">Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {repairBills.repairBillDescriptions.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{item.description}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onPress={() => {
                          const newRepairBillDescriptions = [
                            ...repairBills.repairBillDescriptions,
                          ];
                          newRepairBillDescriptions.splice(index, 1);
                          setRepairBills({
                            ...repairBills,
                            repairBillDescriptions: newRepairBillDescriptions,
                          });
                        }}
                        light
                        auto
                        color="error"
                        icon={<IoCloseSharp size={20} fill="currentColor" />}
                      ></Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            css={{ backgroundColor: "#11181C" }}
            onClick={() => {
              createRepairDamageBills({
                damageRequestID: selectedItem,
                repairBillDescriptions: repairBills.repairBillDescriptions,
              })
                .then(() => {
                  toast.success("Damage Bill Created Successfully");
                })
                .catch((error) => {
                  toast.error(`${error.description}`);
                });
            }}
          >
            Save
          </Button>
        </Modal.Footer>
        <ToastContainer />
      </Modal>
    </>
  );
};

export default DamageRequests;
