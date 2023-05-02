"use client";

import { API_URL_Image } from "@/Components/api/API";
import { DeleteIcon } from "@/Components/icons/DeleteIcon";
import { EyeIcon } from "@/Components/icons/EyeIcon";
import addStaffServices from "@/Services/staff/AddStaff";
import deleteStaff from "@/Services/staff/DeleteStaff";
import getAllStaff from "@/Services/staff/GetAllStaff";
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

const Car = () => {
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

  // ------------------------------------------------------------------------------------------------------------

  const initialStaffDetails = {
    userName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    document: "",
    image: "",
  };

  const [addStaff, setAddStaff] = useState(initialStaffDetails);

  const handleStaffDetails = (event: any) => {
    const { name, value } = event.target;
    const newStaffDetails = { ...addStaff, [name]: value };
    if (name == "image") {
      newStaffDetails.image = event.target.files[0];
    } else if (name == "document") {
      newStaffDetails.document = event.target.files[0];
    }
    setAddStaff(newStaffDetails);
  };

  const [staffs, setStaffs] = useState<User[]>([]);

  const [selectedStaff, setSelectedStaff] = useState<User>();

  const getStaffs = () => {
    getAllStaff()
      .then((staff: []) => {
        setStaffs(staff);
      })
      .catch((e: any) => toast.error(e.message));
  };

  useEffect(() => {
    getStaffs();
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
              Staff
            </Text>
          </Grid>
          <Link href="#" style={{ textDecoration: "none" }}>
            <Button
              flat
              css={{
                backgroundColor: "#11181C",
                height: "$15",
                color: "white",
              }}
              onPress={() => {
                setAddStaff(initialStaffDetails);
                addHandler();
              }}
            >
              Add
            </Button>
          </Link>
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
              <Table.Column>Address</Table.Column>
              <Table.Column>Phone</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column css={{ width: "15%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {staffs.map((item: User) => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={`${API_URL_Image}${item.image}`}
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
                                setSelectedStaff(item);
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
                                setSelectedStaff(item);
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
            onChange={handleStaffDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Address"
            name="address"
            onChange={handleStaffDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            type="number"
            label="Phone Number"
            name="phone"
            onChange={handleStaffDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Email"
            name="email"
            type="email"
            required
            onChange={handleStaffDetails}
          />
          <Input.Password
            size="lg"
            bordered
            label="Password"
            name="password"
            onChange={handleStaffDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Profile"
            name="image"
            onChange={handleStaffDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Document"
            name="document"
            onChange={handleStaffDetails}
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
              addStaffServices(addStaff)
                .then(() => {
                  getStaffs();
                  setAddStaff(initialStaffDetails);
                  closeHandler();
                  toast.success("Staff Added Successfully");
                })
                .catch((error: any) => {
                  toast.error(`${error.message}`);
                });
            }}
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
                  src={`${API_URL_Image}${selectedStaff?.image}`}
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
                  {selectedStaff?.userName}
                </Text>
                <Text>
                  Email:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {selectedStaff?.email}
                  </span>{" "}
                </Text>
                <Spacer y={-1.5} />
                <Text>
                  Phone:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {selectedStaff?.phone}
                  </span>{" "}
                </Text>
                <Spacer y={-1.5} />
                <Text>
                  Address:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                    {selectedStaff?.address}
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
          Do you want to delete `{selectedStaff?.userName}`?
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteStaff(selectedStaff?.id ?? 0)
                .then(() => {
                  getStaffs();
                  toast.success("Staff Deleted Successfully");
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

export default Car;
