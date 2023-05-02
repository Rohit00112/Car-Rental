import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function getCarDetails(id: any) {
  try {
    const res = await apiInstance.get(`/Car/${id}`);
    alert(res.data);
    return res.data;
  } catch (error: any) {
    alert(error);
    handleHttpError(error);
  }
}
