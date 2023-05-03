type DamageRequest = {
  damageRequestID: number;
  carID: number;
  image: string;
  message: string;
  car: Car;
  requestDate: string;
  user: User;
};
