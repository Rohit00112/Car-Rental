type ReturnRents = {
  id: number;
  rentID: number;
  staffID: number;
  amount: number;
  rent: Rent;
  customer: User;
  staff: User;
  returnDate: string;
};
