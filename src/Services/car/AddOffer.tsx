import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function addOffer(data: any) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");
    const res = await apiInstance.post("/Offer", data, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
