import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function addCar(data: any) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");
    const formData = new FormData();
    formData.append("CarName", data.carName);
    formData.append("Image", data.image);
    formData.append("Price", data.price);
    formData.append("Make", data.make);
    formData.append("CarModel", data.carModel);
    formData.append("ManufactureYear", data.manufactureYear);
    formData.append("RegistrationNumber", data.registrationNumber);

    const res = await apiInstance.post("/Car", formData, {
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
