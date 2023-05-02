"use client";
import React from "react";
import { Grid } from "@nextui-org/react";
import Cards from "@/Components/Cards/Cards";
import { useRouter } from "next/navigation";

export default function Page() {
  const carData = [
    {
      CarName: "Audi",
      Make: "Audi",
      CarModel: "A4",
      RegistrationNumber: "ABC123",
      Image:
        "https://th.bing.com/th/id/R.a23ef52b9f3272a5300f385dd21b554c?rik=nyaru8NJab2YAA&pid=ImgRaw&r=0",
    },
    {
      CarName: "BMW",
      Make: "BMW",
      CarModel: "X5",
      RegistrationNumber: "ABC123",
      Image:
        "https://th.bing.com/th/id/R.a23ef52b9f3272a5300f385dd21b554c?rik=nyaru8NJab2YAA&pid=ImgRaw&r=0",
    },
    {
      CarName: "Mercedes",
      Make: "Mercedes",
      CarModel: "C200",
      RegistrationNumber: "ABC123",
      Image:
        "https://th.bing.com/th/id/R.a23ef52b9f3272a5300f385dd21b554c?rik=nyaru8NJab2YAA&pid=ImgRaw&r=0",
    },
    {
      CarName: "Toyota",
      Make: "Toyota",
      CarModel: "Camry",
      RegistrationNumber: "ABC123",
      Image:
        "https://th.bing.com/th/id/R.a23ef52b9f3272a5300f385dd21b554c?rik=nyaru8NJab2YAA&pid=ImgRaw&r=0",
    },
  ];

  const router = useRouter();

  const handleCardPress = (car: any) => {};

  return (
    <Grid.Container gap={2} justify="flex-start">
      {carData.map((car) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={car.RegistrationNumber}>
          <Cards car={car} onCardPress={() => handleCardPress(car)} />
        </Grid>
      ))}
    </Grid.Container>
  );
}
