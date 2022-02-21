export class Offer {
  offerType: string;
  offerAmount: number;
  offerTime: Date;
}

export class Recharge {
  vehicleRegNo: string;
  gatewayName: string;
  offerID: number;
  amount: number;
  date: Date;
}

export class RechargeInfo {
  offerID: number;
  gatewayName: string;
  amount: number;
}

export class DueInfo {
  vehicleRegNo: string;
  boothName: string;
  dueAmount: number;
  date: Date;
}

export class Route {
  boothID: number;
  posX: number;
  posY: number;
  location: string;
}

export class User {
  username: string;
  email: string;
  balance: number;
}

export class Home_Get {
  userdata: User;
  offers: Offer[];
}

export class Login_Post {
  vehicle: string;
  password: string;
}
