import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function addStaffServices(data: any) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");
    const formData = new FormData();
    formData.append("UserName", data.userName);
    formData.append("Email", data.email);
    formData.append("Address", data.address);
    formData.append("Phone", data.phone);
    formData.append("Password", data.password);
    formData.append("Image", data.image);
    formData.append("Document", data.document);

    const res = await apiInstance.post("/User/addstaff", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    handleHttpError(error);
  }
}
