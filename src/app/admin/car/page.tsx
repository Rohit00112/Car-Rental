"use client";

import { API_URL_Image } from "@/Components/api/API";
import { DeleteIcon } from "@/Components/icons/DeleteIcon";
import { EditIcon } from "@/Components/icons/EditIcon";
import { EyeIcon } from "@/Components/icons/EyeIcon";
import addCar from "@/Services/car/AddCar";
import addOffer from "@/Services/car/AddOffer";
import getAllCars from "@/Services/car/CarService";
import deleteCar from "@/Services/car/DeleteCar";
import updateCar from "@/Services/car/EditCar";
import getAllRents from "@/Services/rent/GetAllRents";
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
import { useEffect, useState } from "react";
import { IoGiftOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Car = () => {
  const [addVisible, setAddVisible] = useState(false);
  const addHandler = () => setAddVisible(true);

  const [viewVisible, setViewVisible] = useState(false);
  const viewHandler = () => setViewVisible(true);

  const [editVisible, setEditVisible] = useState(false);
  const editHandler = () => setEditVisible(true);

  const [offerVisible, setOfferVisible] = useState(false);
  const offerHandler = () => setOfferVisible(true);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const deleteHandler = () => {
    setDeleteVisible(true);
  };

  const closeHandler = () => {
    setAddVisible(false);
    setEditVisible(false);
    setViewVisible(false);
    setDeleteVisible(false);
    setOfferVisible(false);
    console.log("closed");
  };

  const initialDetails: Car = {
    carId: 0,
    carName: "",
    image: "",
    price: 0,
    carModel: "",
    make: "",
    manufactureYear: 2023,
    registrationNumber: "",
    isAvailable: false,
  };

  const [addDetails, setAddDetails] = useState(initialDetails);
  const [selectedItem, setSelectedItem] = useState<Car>(initialDetails);
  const [title, setTitle] = useState("Cars");

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
    const newUpdateDetials = { ...selectedItem, [name]: value };
    if (name == "image") {
      newUpdateDetials.image = event.target.files[0];
    }
    if (newUpdateDetials != null) {
      setSelectedItem(newUpdateDetials);
    }
  };

  const [cars, setCars] = useState<Car[]>([]);

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

  // ------------------ offer ----------------
  const initialOffer = {
    message: "string",
    discountPercent: 0,
    publishedDate: new Date().toISOString(),
    expireDate: "",
  };

  const [offerDetails, setOfferDetails] = useState(initialOffer);

  const handleOfferDetials = (event: any) => {
    const { name, value } = event.target;
    let newOfferDetails = { ...offerDetails };
    if (name == "expireDate") {
      newOfferDetails.expireDate = new Date(value).toISOString();
    } else {
      newOfferDetails = { ...offerDetails, [name]: value };
    }
    setOfferDetails(newOfferDetails);
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
              {title}
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
          <Grid.Container gap={2} justify="flex-end">
            <Grid>
              <Button
                color="primary"
                auto
                size="sm"
                css={{ backgroundColor: "$accents9", color: "white" }}
                onPress={() => {
                  setTitle("All Cars");
                  getAllCars()
                    .then((cars: Car[]) => {
                      setCars(cars);
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                All Cars
              </Button>
            </Grid>
            <Grid>
              <Button
                color="secondary"
                auto
                size="sm"
                css={{ backgroundColor: "$accents9", color: "white" }}
                onPress={() => {
                  setTitle("Frequently Rented Cars");
                  getAllRents()
                    .then((rents: Rent[]) => {
                      const frequentlyRentedCar: Car[] = [];
                      rents.forEach((rent) => {
                        frequentlyRentedCar.push(rent.car);
                      });
                      setCars(frequentlyRentedCar);
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                Frequently Rented Cars
              </Button>
            </Grid>
            <Grid>
              <Button
                color="success"
                auto
                size="sm"
                css={{ backgroundColor: "$accents9", color: "white" }}
                onPress={() => {
                  setTitle("Never Rented Cars");
                  getAllCars()
                    .then((cars: Car[]) => {
                      getAllRents()
                        .then((rents: Rent[]) => {
                          const neverRentedCar: Car[] = [];
                          const allRentedCars: number[] = [];
                          rents.forEach((rent) => {
                            allRentedCars.push(rent.car.carId);
                          });
                          cars.forEach((car) => {
                            if (!allRentedCars.includes(car.carId)) {
                              neverRentedCar.push(car);
                            }
                          });
                          setCars(neverRentedCar);
                        })
                        .catch((e) => toast.error(e.message));
                    })
                    .catch((e) => toast.error(e.message));
                }}
              >
                Never Rented Cars
              </Button>
            </Grid>
          </Grid.Container>
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
              <Table.Column>Price</Table.Column>
              <Table.Column>Make</Table.Column>
              <Table.Column>Model</Table.Column>
              <Table.Column>Reg. No.</Table.Column>
              <Table.Column>Manufacture Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column css={{ width: "15%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {cars.map((item: Car) => {
                return (
                  <Table.Row key={item.carId}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={`${API_URL_Image}${item.image}`}
                        alt={item.carName}
                        objectFit="cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{item.carName}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.make}</Table.Cell>
                    <Table.Cell>{item.carModel}</Table.Cell>
                    <Table.Cell>{item.registrationNumber}</Table.Cell>
                    <Table.Cell>{item.manufactureYear}</Table.Cell>
                    <Table.Cell>
                      {
                        <Badge color={item.isAvailable ? "success" : "error"}>
                          {item.isAvailable ? "Available" : "Not Available"}
                        </Badge>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                          <Tooltip content="Publish Offer">
                            <Button
                              onPress={() => {
                                setSelectedItem(item);
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
                                setSelectedItem(item);
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
                          <Tooltip content="Edit Car">
                            <Button
                              onPress={() => {
                                setSelectedItem(item);
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
                            content="Delete Car"
                            color="error"
                            onProgress={() => console.log("Delete Car")}
                          >
                            <Button
                              onPress={() => {
                                setSelectedItem(item);
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
            name="model"
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
            label="Manufacturer Date"
            name="manufactureDate"
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
                  src={`${API_URL_Image}${selectedItem.image}`}
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
                  {selectedItem?.carName}
                </Text>
                <Spacer y={-2} />
                <Text h1 size={27}>
                  Rs. {selectedItem?.price}
                </Text>

                <Spacer y={-1} />
                <Text size={17}>
                  {selectedItem?.make}{" "}
                  <span
                    style={{
                      color: "#F5A524",
                      fontWeight: "900",
                    }}
                  >
                    |
                  </span>{" "}
                  {selectedItem?.carModel}{" "}
                  <span
                    style={{
                      color: "#F5A524",
                      fontWeight: "900",
                    }}
                  >
                    |
                  </span>{" "}
                  {selectedItem?.manufactureYear}
                </Text>
                <Spacer y={-1.5} />
                <Text size={17}>
                  Reg. No.: {selectedItem?.registrationNumber}
                </Text>
                <Text size={20}>
                  Pedona - Fashion & Sport Theme for WordPress. Modern clean
                  latest ecommerce woocommerce wordpress template. Online store
                  single product page web design inspiration.Pedona -
                </Text>
              </Card>
              <Badge
                disableOutline
                size="sm"
                color={selectedItem?.isAvailable ? "success" : "error"}
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
                {selectedItem?.isAvailable ? "Available" : "Not Available"}
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
            bordered
            label="Car Name"
            name="carName"
            value={selectedItem?.carName}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            underlined
            type="file"
            label="Image"
            // value={`${baseURL}${selectedItem?.image}`}
            name="image"
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Price"
            type="number"
            name="price"
            value={selectedItem?.price}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Model Name"
            name="model"
            value={selectedItem?.carModel}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Brand Name"
            name="make"
            value={selectedItem?.make}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            type="number"
            label="Manufacturer Date"
            name="manufactureDate"
            value={selectedItem?.manufactureYear}
            onChange={updateCarDetails}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Registration No. "
            name="registrationNumber"
            value={selectedItem?.registrationNumber}
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
              updateCar(selectedItem)
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
        <Modal.Body>Do you want to delete {selectedItem?.carName}</Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteCar(selectedItem?.carId ?? 0)
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
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for offer  */}
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
            value={selectedItem?.carName}
          />
          <Input
            size="lg"
            bordered
            label="Discount"
            type="number"
            name="discountPercent"
            onChange={handleOfferDetials}
          />
          <Input
            size="lg"
            bordered
            type="date"
            label="Ending Date"
            name="expireDate"
            onChange={handleOfferDetials}
          />
          <Input
            clearable
            size="lg"
            bordered
            label="Description"
            name="message"
            onChange={handleOfferDetials}
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
              addOffer({ ...offerDetails, carID: selectedItem.carId })
                .then((data) => {
                  toast.success("Offer Added Successfully");
                  setOfferDetails(initialOffer);
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
      <ToastContainer />
    </>
  );
};

export default Car;
