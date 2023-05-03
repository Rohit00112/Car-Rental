import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function getMontlySales() {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await apiInstance.get("/RentalReturn/monthly/sales", {
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
