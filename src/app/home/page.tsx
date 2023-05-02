"use client";
import React from "react";
import { Grid } from "@nextui-org/react";
import Cards from "@/Components/Cards/Cards";
import getAllCars from "@/Services/car/CarService";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [carData, setCarData] = React.useState<Car[]>([]);

  React.useEffect(() => {
    getAllCars().then((res) => {
      setCarData(res);
    });
  }, []);

  return (
    <Grid.Container gap={2} justify="flex-start">
      {carData?.map((car) => (
        <Grid xs={5} sm={6} md={4} lg={3} key={car.registrationNumber}>
          <Cards car={car} />
        </Grid>
      ))}
    </Grid.Container>
  );
}
