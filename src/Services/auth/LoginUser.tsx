import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function LoginUser(data: any) {
  try {
    const res = await apiInstance.post("/User/login", data);

    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
