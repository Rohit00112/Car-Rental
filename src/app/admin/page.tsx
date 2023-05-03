"use client";
import getMontlySales from "@/Services/MonthlySales/MonthlySales";
import { Container, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  const [option, setOption] = useState<any>(data);

  useEffect(() => {
    getMontlySales()
      .then((datas) => {
        const categories = Object.keys(datas);
        const data = Object.values(datas);
        const updatedOption = {
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: categories,
            },
          },
          series: [
            {
              data: data,
            },
          ],
        };
        setOption(updatedOption);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }, []);
  return (
    <>
      <Grid.Container
        css={{
          width: "95%",
          margin: "0 auto",
          "@xs": {
            width: "73%",
          },
        }}
      >
        <Container
          justify="space-between"
          alignItems="center"
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <Chart
            options={option.options}
            series={option.series}
            type="bar"
            width="1200"
          />
        </Container>
      </Grid.Container>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
