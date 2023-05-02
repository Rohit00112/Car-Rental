import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function addDamageRequest(rent: any) {
  alert(JSON.stringify(rent));
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");
    const formData = new FormData();
    formData.append("CarID", rent.carID);
    formData.append("Image", rent.image);
    formData.append("Message", rent.message);

    const res = await apiInstance.post("/DamageRequest", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    alert(JSON.stringify(error.response.data));
    handleHttpError(error);
  }
}
