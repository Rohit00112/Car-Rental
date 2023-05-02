import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function cancelRent(id: number) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await apiInstance(`/Rent/cancel/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
