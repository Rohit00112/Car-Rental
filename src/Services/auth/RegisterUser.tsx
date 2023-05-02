import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function RegisterUser(data: any) {
  try {
    const res = await apiInstance.post("/User/register", data);
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
