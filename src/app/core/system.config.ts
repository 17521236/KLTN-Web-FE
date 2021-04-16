
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