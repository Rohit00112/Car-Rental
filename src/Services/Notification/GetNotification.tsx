import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function getAllNotification() {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    if (user == "") throw new Error("Please login first.");

    const res = await apiInstance.get("/notification", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
