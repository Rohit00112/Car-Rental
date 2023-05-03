import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function approveDamageBill(id: number) {
  alert(JSON.stringify(id));
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");

    const res = await fetch(`https://localhost:5001/api/RepairBill/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
