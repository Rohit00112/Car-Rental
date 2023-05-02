import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function approveRent(id: number) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await fetch(`https://localhost:5001/api/rent/approve/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.json();
  } catch (error: any) {
    alert(error);
    handleHttpError(error);
  }
}
