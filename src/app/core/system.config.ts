
export const APARTMENT_REGISTED = '0';
export const APARTMENT_NOT_REGISTED = '1';
export const APARTMENT_TYPE_LIST = [
    {
        id: APARTMENT_REGISTED,
        text: 'Đã đăng ký'
    },
    {
        id: APARTMENT_NOT_REGISTED,
        text: 'Chưa đăng ký'
    }
]

export const RESIDENT_NORMAL = '0';
export const RESIDENT_OWNER = '1';
export const RESIDENT_TYPE_LIST = [
    {
        id: RESIDENT_OWNER,
        text: 'Chủ hộ'
    },{
        id: RESIDENT_NORMAL,
        text: 'Nhân khẩu'
    }
]

export const VEHICLE_NOT_APPROVE = '0';
export const VEHICLE_APPROVE = '1';
export const VEHICLE_STATUS_LIST = [
    {
        id: VEHICLE_NOT_APPROVE,
        text: 'Chưa duyệt'
    },{
        id: VEHICLE_APPROVE,
        text: 'Đã duyệt'
    }
]

export const VEHICLE_MOTORBIKE = 'MOTORBIKE';
export const VEHICLE_CAR = 'CAR';
export const VEHICLE_BYCIRCLE = 'BYCIRCLE';
export const VEHICLE_TYPE = [{ id: VEHICLE_BYCIRCLE, name: 'Xe đạp' }, { id: VEHICLE_MOTORBIKE, name: 'Xe máy' }, { id: VEHICLE_CAR, name: 'Ô tô' }];


export const STATUS_BILL_NOT_APPROVE = 'NOT_APPROVE';
export const STATUS_BILL_PENDING = 'PENDING';
export const STATUS_BILL_APPROVE = 'APPROVE';
export const STATUS_BILL_DENY = 'DENY';
export const STATUS_BILL_LIST = [
    {
        id: STATUS_BILL_NOT_APPROVE,
        name: 'Chưa thanh toán'
    },
    {
        id: STATUS_BILL_PENDING,
        name: 'Chờ duyệt'
    },
    {
        id: STATUS_BILL_APPROVE,
        name: 'Đã thanh toán'
    }
];
