"use client";
import { Button, Card, Col, Spacer, Text } from "@nextui-org/react";
import { API_URL_Image } from "../api/API";
import { IoEye } from "react-icons/io5";
import Link from "next/link";

export default function Cards(props: { car: Car }) {
  const { car } = props;
  return (
    <Card isPressable isHoverable>
      <Card.Image
        src={`${API_URL_Image}${car.image}`}
        objectFit="cover"
        width="100%"
        height="200px"
        alt="Card Image"
      />
      <Card.Footer>
        <Text h4>
          Name: {car.carName}
          <br />
          Model: {car.carModel}
        </Text>
        <Spacer y={1} />
        <Button
          auto
          color="primary"
          icon={<IoEye />}
          css={{
            marginLeft: "auto",
          }}
        >
          <Link
            href={`/home/${car.carId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            View
          </Link>
        </Button>
      </Card.Footer>
    </Card>
  );
}
