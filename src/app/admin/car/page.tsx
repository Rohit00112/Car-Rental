"use client";

import { API_URL_Image } from "@/Components/api/API";
import { DeleteIcon } from "@/Components/icons/DeleteIcon";
import { EditIcon } from "@/Components/icons/EditIcon";
import { EyeIcon } from "@/Components/icons/EyeIcon";
import addCar from "@/Services/car/AddCar";
import getAllCars from "@/Services/car/CarService";
import deleteCar from "@/Services/car/DeleteCar";
import updateCar from "@/Services/car/EditCar";
import {
  Badge,
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoGiftOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import addOffer from "@/Services/car/AddOffer";

const Car = () => {
  const [addVisible, setAddVisible] = useState(false);
  const addHandler = () => setAddVisible(true);

  const [viewVisible, setViewVisible] = useState(false);
  const viewHandler = () => setViewVisible(true);

  const [editVisible, setEditVisible] = useState(false);
  const editHandler = () => setEditVisible(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const deleteHandler = () => setDeleteVisible(true);

  const [offerVisible, setOfferVisible] = useState(false);
  const offerHandler = () => setOfferVisible(true);

  const closeHandler = () => {
    setAddVisible(false);
    setEditVisible(false);
    setViewVisible(false);
    setDeleteVisible(false);
    setOfferVisible(false);
  };

  const router = useRouter();

  const initialDetails: Car = {
    carId: 0,
    carName: "",
    image: "",
    price: 0,
    make: "",
    carModel: "",
    manufactureYear: 0,
    registrationNumber: "",
    isAvailable: true,
  };

  const initialOffer: Offer = {
    carID: 0,
    message: "",
    discount: 0,
    expiryDate: "",
  };

  const [offerDetail, setOfferDetail] = useState<Offer>(initialOffer);
  const handleOfferDetails = (event: any) => {
    const { name, value } = event.target;
    const newOfferDetails = { ...offerDetail, [name]: value };
    setOfferDetail(newOfferDetails);
  };

  const [selectedCar, setSelectedCar] = useState<Car>(initialDetails);

  const [addDetails, setAddDetails] = useState(initialDetails);

  const handleAddDetails = (event: any) => {
    const { name, value } = event.target;
    const newAddDetials = { ...addDetails, [name]: value };
    if (name == "image") {
      newAddDetials.image = event.target.files[0];
    }
    setAddDetails(newAddDetials);
  };

  const updateCarDetails = (event: any) => {
    const { name, value } = event.target;
    const newUpdateDetials = { ...selectedCar, [name]: value };
    if (name == "image") {
      newUpdateDetials.image = event.target.files[0];
    }
    if (newUpdateDetials != null) {
      setSelectedCar(newUpdateDetials);
    }
  };

  const [cars, setCars] = useState<any>([]);

  const getCars = () => {
    getAllCars()
      .then((cars: Car[]) => {
        setCars(cars);
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    getCars();
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
              Cars
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
              onPress={addHandler}
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
              <Table.Column>Car Name</Table.Column>
              <Table.Column>Image</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Make</Table.Column>
              <Table.Column>Car Model</Table.Column>
              <Table.Column>Manufacture Year</Table.Column>
              <Table.Column>Registration Number</Table.Column>
              <Table.Column>Availability</Table.Column>
              <Table.Column css={{ width: "15%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {cars.map((car: any) => (
                <Table.Row key={car.id}>
                  <Table.Cell>{car.carName}</Table.Cell>
                  <Table.Cell>
                    <Image
                      src={`${API_URL_Image}${car.image}`}
                      width={100}
                      height={100}
                      alt="car image"
                    />
                  </Table.Cell>
                  <Table.Cell>{car.price}</Table.Cell>
                  <Table.Cell>{car.make}</Table.Cell>
                  <Table.Cell>{car.carModel}</Table.Cell>
                  <Table.Cell>{car.manufactureYear}</Table.Cell>

                  <Table.Cell>{car.registrationNumber}</Table.Cell>
                  <Table.Cell>
                    <Badge color={car.isAvailable ? "success" : "error"}>
                      {car.isAvailable ? "Available" : "Not Available"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Offer">
                          <Button
                            onPress={() => {
                              setSelectedCar(car);
                              offerHandler();
                            }}
                            light
                            auto
                            color="warning"
                            icon={<IoGiftOutline size={20} fill="#979797" />}
                          ></Button>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Details">
                          <Button
                            onPress={() => {
                              setSelectedCar(car);
                              viewHandler();
                            }}
                            light
                            auto
                            color="warning"
                            icon={<EyeIcon size={20} fill="#979797" />}
                          ></Button>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Edit user">
                          <Button
                            onPress={() => {
                              setSelectedCar(car);
                              editHandler();
                            }}
                            light
                            auto
                            color="secondary"
                            icon={<EditIcon size={20} fill="#979797" />}
                          ></Button>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip
                          content="Delete user"
                          color="error"
                          onClick={() => console.log("Delete user")}
                        >
                          <Button
                            onPress={() => {
                              setSelectedCar(car);
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
              ))}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              color="primary"
              align="center"
              rowsPerPage={3}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Container>
      </Grid.Container>

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
            Add Car
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            size="lg"
            bordered
            label="Car Name"
            name="carName"
            onChange={handleAddDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Image"
            name="image"
            onChange={handleAddDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Price"
            type="number"
            name="price"
            onChange={handleAddDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Model Name"
            name="carModel"
            onChange={handleAddDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Brand Name"
            name="make"
            onChange={handleAddDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            type="number"
            label="Manufacturer Year"
            name="manufactureYear"
            onChange={handleAddDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Registration No. "
            name="registrationNumber"
            onChange={handleAddDetails}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            css={{ backgroundColor: "#11181C" }}
            onClick={() => {
              addCar(addDetails)
                .then((data: any) => {
                  toast.success("Car Added Successfully");
                  setAddDetails(initialDetails);
                  closeHandler();
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
                  src="https://nextui.org/images/fruit-4.jpeg"
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
                <Text size={65} h1>
                  Toyota
                </Text>
                <Spacer y={-2} />
                <Text h1 size={27}>
                  Rs. 3500
                </Text>

                <Spacer y={-1} />
                <Text size={17}>
                  Tesla{" "}
                  <span
                    style={{
                      color: "#F5A524",
                      fontWeight: "900",
                    }}
                  >
                    |
                  </span>{" "}
                  Model 3{" "}
                  <span
                    style={{
                      color: "#F5A524",
                      fontWeight: "900",
                    }}
                  >
                    |
                  </span>{" "}
                  23 April, 2023
                </Text>
                <Spacer y={-1.5} />
                <Text size={17}>Reg. No.: Ko 1 kha 2001</Text>
                <Text size={20}>
                  Pedona - Fashion & Sport Theme for WordPress. Modern clean
                  latest ecommerce woocommerce wordpress template. Online store
                  single product page web design inspiration.Pedona -
                </Text>
              </Card>
              <Badge
                disableOutline
                size="sm"
                color="success"
                css={{
                  position: "absolute",
                  top: "0px",
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  letterSpacing: "1px",
                }}
              >
                Available
              </Badge>
            </Grid>
          </Grid.Container>
        </Modal.Body>
      </Modal>

      {/* Modal for Edit  */}
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="edit"
        open={editVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Edit Car
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Image"
            onChange={updateCarDetails}
            name="image"
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Name"
            name="carName"
            value={selectedCar?.carName}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Model Name"
            name="carModel"
            value={selectedCar?.carModel}
            onChange={updateCarDetails}
          />

          <Input
            clearable
            size="lg"
            bordered
            label="Manufacturer"
            name="manufactureYear"
            value={selectedCar?.manufactureYear}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Registration No. "
            name="registrationNumber"
            value={selectedCar?.registrationNumber}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Price"
            type="number"
            name="price"
            value={selectedCar?.price}
            onChange={updateCarDetails}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            css={{ backgroundColor: "#11181C" }}
            onClick={() => {
              updateCar(selectedCar)
                .then((data) => {
                  toast.success("Car Added Successfully");
                  getCars();
                  setAddDetails(initialDetails);
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
          {`Do you want to delete 
          ${selectedCar?.carName}`}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteCar(selectedCar?.carId ?? 0)
                .then(() => {
                  getAllCars()
                    .then((cars: Car[]) => {
                      setCars(cars);
                    })
                    .catch((e) => toast.error(e.message));
                  toast.success("Car Deleted Successfully");
                })
                .catch((error) => {
                  toast.error(`${error.message}`);
                });
              setDeleteVisible(false);
            }}
            css={{ backgroundColor: "#11181C" }}
            onClick={() => {}}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        width="25%"
        closeButton
        preventClose
        aria-labelledby="edit"
        open={offerVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Car Offer
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            size="lg"
            bordered
            readOnly
            label="Car Name"
            name="carName"
            value={selectedCar?.carName}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Discount"
            name="discount"
            onChange={handleOfferDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Description"
            name="message"
            onChange={handleOfferDetails}
          />
          <Input
            clearable
            size="lg"
            type="date"
            bordered
            label="End Date"
            name="expiryDate"
            onChange={(e) => {
              setOfferDetail({
                ...offerDetail,
                expiryDate: new Date(e.target.value).toISOString(),
              });
            }}
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
              addOffer({ ...offerDetail, carID: selectedCar.carId })
                .then((data) => {
                  toast.success("Offer added successfully");
                  setOfferDetail(initialOffer);
                })
                .catch((error) => toast.error(`${error.message}`));
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Car;
