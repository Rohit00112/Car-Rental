import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function rentalRequest(data: any) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await apiInstance.post("/rent", data, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    // const res = await axios.post(`${baseURL}/api/user/register`, data);
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
