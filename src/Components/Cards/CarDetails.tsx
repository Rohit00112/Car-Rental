"use client";

import { Badge, Card, Grid, Image } from "@nextui-org/react";
import { useState } from "react";

const CarDetails = ({ id }: any) => {
  const [car, setCar] = useState<any>(null);

  return (
    <Card>
      <Badge color="success" variant={"bordered"} size={"lg"}>
        Available
      </Badge>
      <Grid.Container gap={2}>
        <Grid xs={24} sm={24} md={24} lg={24} xl={24}>
          <h1>{car?.name}</h1>
        </Grid>
        <Grid xs={24} sm={24} md={24} lg={24} xl={24}>
          <h2>{car?.model}</h2>
        </Grid>
        <Grid xs={24} sm={24} md={24} lg={24} xl={24}>
          <h3>{car?.year}</h3>
        </Grid>
        <Grid xs={24} sm={24} md={24} lg={24} xl={24}>
          <h4>{car?.price}</h4>
        </Grid>
        <Grid xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card>
            <Image src={car?.image} width={300} height={300} alt="car image" />
          </Card>
        </Grid>
      </Grid.Container>
    </Card>
  );
};
