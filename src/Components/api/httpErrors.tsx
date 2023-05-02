export const handleHttpError = (error: any) => {
  const data = error.response.data;

  if (!data.errors) throw new Error(data);
  if (data.errors.Email) throw new Error(data.errors.Email[0]);
  else if (data.errors.PhoneNumber) throw new Error(data.errors.PhoneNumber[0]);
  else if (data.errors.Image) throw new Error(data.errors.Image[0]);
  else if (data.errors.Password) throw new Error(data.errors.Password[0]);
  else if (data.errors.UserName) throw new Error(data.errors.UserName[0]);
  else if (data.errors.Address) throw new Error(data.errors.Address[0]);
  else if (data.errors.CarName) throw new Error(data.errors.CarName[0]);
  else if (data.errors.Price) throw new Error(data.errors.Price[0]);
  else if (data.errors.CarName) throw new Error(data.errors.CarName[0]);
  else if (data.errors.Price) throw new Error(data.errors.Price[0]);
  else if (data.errors.Make) throw new Error(data.errors.Make[0]);
  else if (data.errors.CarModel) throw new Error(data.errors.CarModel[0]);
  else if (data.errors.RegistrationNumber)
    throw new Error(data.errors.RegistrationNumber[0]);
  else if (data.errors.ManufactureYear)
    throw new Error(data.errors.ManufactureYear[0]);
  else if (data.errors.CurrentPassword)
    throw new Error(data.errors.CurrentPassword[0]);
  else if (data.errors.NewPassword) throw new Error(data.errors.NewPassword[0]);
  else if (data.errors.ConfirmPassword)
    throw new Error(data.errors.ConfirmPassword[0]);
  else if (data.errors.Discount)
    throw new Error(data.errors.DiscountPercent[0]);
  else if (data.errors.Message) throw new Error(data.errors.Message[0]);
  else if (data.errors.ExpiryDate) throw new Error(data.errors.ExpireDate[0]);
  else if (data.errors.offersDto) throw new Error("Please Enter Date");
  else if (data.errors.Message) throw new Error(data.error.Message[0]);
  else throw new Error("Something went wrong, please try again later");
};
