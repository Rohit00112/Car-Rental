"use client";
import { Card, Button, Row, Text } from "@nextui-org/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGoogle } from "react-icons/fa";

export default function Footer() {
  return (
    <Card variant="flat" css={{ mw: "100%" }}>
      <Card.Footer>
        <Row
          css={{
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <FaFacebook size={30} />
          <FaTwitter size={30} />
          <FaLinkedin size={30} />
          <FaGoogle size={30} />

          <Text css={{ ml: "auto" }}>© 2021 Hajur ko Car Rental</Text>
          <Button
            size="sm"
            color="secondary"
            css={{
              ml: "auto",
            }}
          >
            Contact
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}
