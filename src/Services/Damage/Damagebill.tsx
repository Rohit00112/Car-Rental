import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function createDamageBillDetails(data: any) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await apiInstance.post("/RepairBillDescription", data, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    alert(JSON.stringify(error.response.data));
    handleHttpError(error);
  }
}
