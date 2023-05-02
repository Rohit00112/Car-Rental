import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function getAllCars() {
  try {
    const res = await apiInstance.get("/Car");
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
