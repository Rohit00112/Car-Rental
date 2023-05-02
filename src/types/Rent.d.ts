type Rent = {
  rentID: number;
  carID: number;
  customerID: number;
  staffID: number;
  rentDate: string;
  returnDate: string;
  car: Car;
  status: number;
  image: string;
  lastLogin: string;
  accessToken: string;
  roleName: string;
  customer: User?;
  staff: User?;
  isReturned: boolean;
};
