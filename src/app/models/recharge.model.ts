export class Recharge {
    constructor(
        public user: string,
        public userPay: string,
        public amount: number,
        public time?: string,
        public checkPay?: boolean,
        public _id?: string
    ) {}
}
