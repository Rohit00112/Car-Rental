import { apiInstance } from "@/Components/api/API";
import { handleHttpError } from "@/Components/api/httpErrors";

export default async function updateCar(car: Car) {
  try {
    const user = JSON.parse(localStorage.getItem("User") ?? "");
    const formData = new FormData();
    formData.append("CarName", car.carName);
    formData.append("Image", car.image);
    formData.append("Price", car.price.toString());
    formData.append("Make", car.make);
    formData.append("CarModel", car.carModel);
    formData.append("RegistrationNumber", car.registrationNumber);
    formData.append("ManufactureYear", car.manufactureYear.toString());

    const res = await apiInstance.put(`/Car/${car.carId}`, formData, {
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
