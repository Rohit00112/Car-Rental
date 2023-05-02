import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";
import axios from "axios";

export default async function deleteCustomer(id: number) {
  try {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    const res = await apiInstance.delete(`/deletecustomer/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
