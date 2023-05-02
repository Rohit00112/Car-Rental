import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function returnRent(id: number) {
  alert(id);
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");
    const res = await apiInstance.post(
      "/RentalReturn",
      { RentID: id },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
