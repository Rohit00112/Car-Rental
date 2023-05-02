import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function deleteStaff(id: number) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await apiInstance.delete(`/User/removestaff/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
