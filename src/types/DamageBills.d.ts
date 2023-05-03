type DamageBills = {
  repairBillID: number;
  createdAt: string;
  totalPrice: number;
  damageRequestID: number;
  staffID: number;
  paid: boolean;
  staff: User;
  damageRequest: DamageRequest;
};
