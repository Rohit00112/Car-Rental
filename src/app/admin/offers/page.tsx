"use client";

import { API_URL_Image } from "@/Components/api/API";
import { DeleteIcon } from "@/Components/icons/DeleteIcon";
import deleteOffer from "@/Services/offer/DeleteOffer";
import getAllOffers from "@/Services/offer/GetAllOffers";
import {
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Offers = () => {
  const route = useRouter();

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

  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer>();

  const getOffer = () => {
    getAllOffers()
      .then((data: Offer[]) => {
        setOffers(data);
        console.log(data);
      })
      .catch((e: any) => toast.error(e.message));
  };

  useEffect(() => {
    getOffer();
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
              Offers
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
              <Table.Column>Offerd Discount</Table.Column>
              <Table.Column>Start Date</Table.Column>
              <Table.Column>Expier Date</Table.Column>
              <Table.Column>Message</Table.Column>
              <Table.Column css={{ width: "5%" }}>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {offers.map((item: Offer) => {
                return (
                  <Table.Row key={item.carID}>
                    <Table.Cell>
                      <Image
                        width={50}
                        height={50}
                        src={
                          item.car == null
                            ? "/default.jpg"
                            : `${API_URL_Image}${item.car.image}`
                        }
                        alt="car"
                        objectFit="cover"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {item.car == null ? "NOCARNAME" : item.car.carName}
                    </Table.Cell>
                    <Table.Cell>{item.discount}</Table.Cell>
                    <Table.Cell>{item.publishedDate}</Table.Cell>
                    <Table.Cell>{item.expiryDate}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <Row justify="flex-end" align="center">
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
                                setSelectedOffer(item);
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
          Do you want to delete offer of {selectedOffer?.car.carName}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button
            auto
            onPress={() => {
              deleteOffer(selectedOffer?.id ?? 0)
                .then(() => {
                  getOffer();
                  toast.success("Offer Deleted Successfully");
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

export default Offers;
