import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";
import axios from "axios";

export default async function getAllRentalReturn() {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await apiInstance.get("/RentalReturn/all", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    alert(JSON.stringify(error));
    handleHttpError(error);
  }
}
