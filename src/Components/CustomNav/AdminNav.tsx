"use client";
import { Avatar, Dropdown, Navbar, Switch, Text } from "@nextui-org/react";
import React, { useState } from "react";
import Login from "../Modals/Login";
import Signup from "../Modals/Signup";
import { useTheme as useNextThemes } from "next-themes";
import { useTheme as useNextUITheme } from "@nextui-org/react";
import { SunIcon } from "../Icons/SunIcon";
import { MoonIcon } from "../Icons/MoonIcon";
import { Layout } from "./Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomNav() {
  const { setTheme } = useNextThemes();
  const { isDark } = useNextUITheme();
  const [activeLink, setActiveLink] = useState("/home");

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
  };

  const collapseItems = ["Home", "Rent", "Login", "Signup"];

  const navItems = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      name: "Car",
      link: "/admin/car",
    },
    {
      name: "Staff",
      link: "/admin/staff",
    },
    {
      name: "Offer",
      link: "/admin/offers",
    },
    {
      name: "Rent",
      link: "/admin/rent",
    },
    {
      name: "Damage",
      link: "/admin/damageRequest",
    },
    {
      name: "Rent History",
      link: "/admin/rentHistory",
    },
    {
      name: "Approved Request",
      link: "/admin/approvedRequest",
    },
    {
      name: "Customer",
      link: "/admin/customer",
    },
    {
      name: "Repair Bill",
      link: "/admin/damageBill",
    },
  ];

  const router = useRouter();

  return (
    <Layout>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="Hamro Car Rental"
              width={150}
              height={150}
              style={{
                marginBottom: "8px",
              }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="highlight-rounded">
          {navItems.map((item, index) => (
            <Navbar.Item
              key={index}
              isActive={activeLink === item.link}
              onClick={() => handleLinkClick(item.link)}
            >
              <Link
                color="inherit"
                style={{
                  marginTop: "20px",
                }}
                href={item.link}
              >
                {item.name}
              </Link>
            </Navbar.Item>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Login />
          </Navbar.Item>
          <Navbar.Item>
            <Signup />
          </Navbar.Item>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="warning"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="warning"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {JSON.parse(localStorage.getItem("User")!).userName}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                <span onClick={() => router.push("/admin/changePassword")}>
                  Change Password
                </span>
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
              <Dropdown.Item key="theme" withDivider>
                <Switch
                  size="xl"
                  iconOn={<SunIcon filled />}
                  iconOff={<MoonIcon filled />}
                  checked={isDark}
                  onChange={(e) =>
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item}>
              <Link
                color="inherit"
                style={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}
