import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function deleteCar(carID: number) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    if (user == "") throw new Error("Login first before deleting car.");

    const res = await apiInstance.delete("/Car/" + carID, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
