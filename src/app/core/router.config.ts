export const ROUTER_CONST = {
    REDIRECT:"/main/redirect",
    DASHBOARD: "/main/dashboard",
    BUILDING: "/main/building",
    BLOCK: {
        LIST: "/main/block/list",
        DETAIL: "/main/block/detail/"
    },
    APARTMENT:{
        LIST: "/main/apartment/list",
        DETAIL: (id)=>`/main/apartment/detail/${id}`
    },
    RESIDENT: {
        LIST: "/main/resident/list",
        DETAIL: (id)=>`/main/resident/detail/${id}`
    },
    VEHICLE: {
        LIST: "/main/vehicle/list",
        DETAIL: (id)=>`/main/vehicle/detail/${id}`
    },
    SERVICE: {
        LIST: "/main/service/list",
        DETAIL: (id)=>`/main/service/detail/${id}`
    },
    BILL: {
        LIST: "/main/bill/list",
        DETAIL: (id)=>`/main/bill/detail/${id}`
    },
    PAYMENT_METHOD: "/main/apartment",
    PROFILE: "/main/profile"
} 