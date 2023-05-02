"use client";

import { API_URL_Image } from "@/Components/api/API";
import { DeleteIcon } from "@/Components/icons/DeleteIcon";
import { EyeIcon } from "@/Components/icons/EyeIcon";
import deleteCustomer from "@/Services/customer/DeleteCustomer";
import getAllCustomer from "@/Services/customer/GetAllCustomer";
import getAllRents from "@/Services/rent/GetAllRents";
import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Image,
  Input,
  Modal,
  Row,
  Spacer,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customer = () => {
  const [addVisible, setAddVisible] = useState(false);
  const addHandler = () => setAddVisible(true);

  const [viewVisible, setViewVisible] = useState(false);
  const viewHandler = () => setViewVisible(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const deleteHandler = () => {
    setDeleteVisible(true);
  };

  const closeHandler = () => {
    setAddVisible(false);
    setViewVisible(false);
    setDeleteVisible(false);
    console.log("closed");
  };

  const initialCustomerDetails: User = {
    userName: "",
    email: "",
    password: "",
    address: "",
    phone: 0,
    document: "",
    image: "",
    lastLogin: "",
    id: 0,
    role: 0,
    accessToken: "",
    roleName: "",
  };

  const [addCustomer, setAddCustomer] = useState(initialCustomerDetails);

  const handleCustomerDetails = (event: any) => {
    const { name, value } = event.target;
    const newCustomerDetails = { ...addCustomer, [name]: value };
    if (name == "image") {
      newCustomerDetails.image = event.target.files[0];
    } else if (name == "document") {
      newCustomerDetails.document = event.target.files[0];
    }
    setAddCustomer(newCustomerDetails);
  };

  const [customers, setCustomers] = useState<User[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<User>();

  const [type, setType] = useState(0);
  const [title, setTitle] = useState("All Customer");

  const getCustomers = () => {
    getAllCustomer()
      .then((data: []) => {
        setCustomers(data);
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    getCustomers();
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
              {title}
            </Text>
          </Grid>
          <Grid
            justify="space-between"
            alignItems="center"
            css={{ width: "auto", display: "flex", gap: "1rem" }}
          >
            {type == 0 ? (
              <Button
                auto
                flat
                css={{ backgroundColor: "$accents9", color: "white" }}
                onClick={() => {
                  setType(0);
                  setTitle("All Customers");
                  getAllCustomer()
                    .then((data: []) => {
                      setCustomers(data);
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                All
              </Button>
            ) : (
              <Button
                auto
                bordered
                css={{ color: "$accent9", borderColor: "$accents9" }}
                onClick={() => {
                  setType(0);
                  setTitle("All Customers");
                  getAllCustomer()
                    .then((data: []) => {
                      setCustomers(data);
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                All
              </Button>
            )}

            {type == 1 ? (
              <Button
                auto
                css={{ backgroundColor: "$accents9", color: "white" }}
                onPress={() => {
                  setType(1);
                  setTitle("Active Customers");

                  getAllRents()
                    .then((rents: Rent[]) => {
                      const activeUser: User[] = [];
                      rents.forEach((rent) => {
                        activeUser.push(
                          rent.customer ?? initialCustomerDetails
                        );
                      });
                      setCustomers(activeUser);
                    })
                    .catch((error) => {
                      toast.error(`${error.message}`);
                    });
                }}
              >
                Active
              </Button>
            ) : (
              <Button
                auto
                bordered
                css={{ color: "$accent9", borderColor: "$accents9" }}
                onPress={() => {
                  setType(1);
                  setTitle("Active Customers");

                  getAllRents()
                    .then((rents: Rent[]) => {
                      const activeUser: User[] = [];
                      rents.forEach((rent) => {
                        activeUser.push(
                          rent.customer ?? initialCustomerDetails
                        );
                      });
                      setCustomers(activeUser);
                    })
                    .catch((error) => {
                      toast.error(`${error.message}`);
                    });
                }}
              >
                Active
              </Button>
            )}

            {type == 2 ? (
              <Button
                auto
                css={{ backgroundColor: "$accents9", color: "white" }}
                onPress={() => {
                  setTitle("Offline Customers");
                  setType(2);
                  getAllCustomer()
                    .then((data: User[]) => {
                      const inactiveUser: User[] = [];
                      const currentDate = new Date();
                      data.forEach((item: User) => {
                        const threeMonthsAgo = new Date();
                        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                        const lastLoginDate = new Date(item.lastLogin);
                        if (lastLoginDate <= threeMonthsAgo) {
                          inactiveUser.push(item);
                        }
                      });
                      setCustomers(inactiveUser);
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                Offline
              </Button>
            ) : (
              <Button
                auto
                bordered
                css={{ color: "$accent9", borderColor: "$accents9" }}
                onPress={() => {
                  setTitle("Offline Customers");
                  setType(2);
                  getAllCustomer()
                    .then((data: User[]) => {
                      const inactiveUser: User[] = [];
                      const currentDate = new Date();
                      data.forEach((item: User) => {
                        const threeMonthsAgo = new Date();
                        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                        const lastLoginDate = new Date(item.lastLogin);
                        if (lastLoginDate <= threeMonthsAgo) {
                          inactiveUser.push(item);
                        }
                      });
                      setCustomers(inactiveUser);
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                Offline
              </Button>
            )}
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
              <Table.Column css={{ width: "7%" }}> </Table.Column>
              <Table.Column>NAME</Table.Column>
              <Table.Column>Address</Table.Column>
              <Table.Column>Phone</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column css={{ width: "10%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {customers.map((item: User) => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={
                          item?.image == ""
                            ? "/default.jpg"
                            : API_URL_Image + item?.image
                        }
                        alt={item.image}
                        objectFit="cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{item.userName}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                          <Tooltip content="Details">
                            <Button
                              light
                              auto
                              color="warning"
                              icon={<EyeIcon size={20} fill="#979797" />}
                              onPress={() => {
                                setSelectedCustomer(item);
                                viewHandler();
                              }}
                            ></Button>
                          </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                          <Tooltip
                            content="Delete car"
                            color="error"
                            onProgress={() => console.log("Delete car")}
                          >
                            <Button
                              light
                              auto
                              color="error"
                              icon={<DeleteIcon size={20} fill="#FF0080" />}
                              onPress={() => {
                                setSelectedCustomer(item);
                                deleteHandler();
                              }}
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

      {/* Modal for Add  */}
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="add"
        open={addVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Add Staff
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            size="lg"
            bordered
            label="Name"
            name="userName"
            onChange={handleCustomerDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Address"
            name="address"
            onChange={handleCustomerDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            type="number"
            label="Phone Number"
            name="phoneNumber"
            onChange={handleCustomerDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Email"
            name="email"
            type="email"
            required
            onChange={handleCustomerDetails}
          />
          <Input.Password
            size="lg"
            bordered
            label="Password"
            name="password"
            onChange={handleCustomerDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Profile"
            name="image"
            onChange={handleCustomerDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Document"
            name="document"
            onChange={handleCustomerDetails}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            css={{ backgroundColor: "#11181C" }}
            // onPress={() => {
            //   addStaffServices(addStaff)
            //     .then(() => {
            //       getStaffs();
            //       setAddStaff(initialStaffDetails);
            //       closeHandler();
            //       toast.success("Staff Added Successfully");
            //     })
            //     .catch((error) => {
            //       toast.error(`${error.message}`);
            //     });
            // }}
          >
            Save
          </Button>
        </Modal.Footer>
        <ToastContainer />
      </Modal>

      {/* Modal for View  */}
      <Modal
        width="50%"
        aria-labelledby="view"
        open={viewVisible}
        onClose={closeHandler}
        noPadding
      >
        <Modal.Body>
          <Grid.Container
            direction="row"
            xs={12}
            css={{
              color: "$text",
            }}
          >
            <Grid xs={6}>
              <Card
                variant="flat"
                css={{
                  borderRadius: "0px",
                }}
              >
                <Image
                  width="100%"
                  height={600}
                  //   src={`${baseURL}${selectedCustomer?.image}`}
                  src={
                    selectedCustomer?.image == ""
                      ? "/default.jpg"
                      : API_URL_Image + selectedCustomer?.image
                  }
                  alt="Default Image"
                  objectFit="cover"
                />
              </Card>
            </Grid>
            <Grid xs={4.8}>
              <Card
                css={{
                  backgroundColor: "transparent",
                  paddingLeft: "2rem",
                }}
              >
                <Spacer y={3} />

                <Text size={35} h1>
                  {selectedCustomer?.userName}
                </Text>
                <Text>
                  Email:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {selectedCustomer?.email}
                  </span>{" "}
                </Text>
                <Spacer y={-1.5} />
                <Text>
                  Phone:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {selectedCustomer?.phone}
                  </span>{" "}
                </Text>
                <Spacer y={-1.5} />
                <Text>
                  Address:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {selectedCustomer?.address}
                  </span>{" "}
                </Text>
                <Spacer y={-1.5} />
              </Card>
            </Grid>
          </Grid.Container>
        </Modal.Body>
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
        <Modal.Body>
          Do you want to delete {selectedCustomer?.userName}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteCustomer(selectedCustomer?.id ?? 0)
                .then(() => {
                  getCustomers();
                  toast.success("Customer Deleted Successfully");
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
      <ToastContainer />
    </>
  );
};

export default Customer;
