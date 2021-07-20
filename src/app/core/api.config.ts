export const API = {
    START_SERVER: "/start-server",
    BLOCK: {
        GET_ALL: "/api/block",
        ADD: "/api/block",
        GET_ONE: (id) => `/api/block/${id}`,
        UPDATE: (id) => `/api/block/${id}`,
        DELETE: (id) => `/api/block/${id}`,
    },
    APARTMENT: {
        GET_ALL: "/api/apartment",
        ADD: "/api/apartment",
        GET_ONE: (id) => `/api/apartment/${id}`,
        UPDATE: (id) => `/api/apartment/${id}`,
        DELETE: (id) => `/api/apartment/${id}`,
        GET_NOT_HAVE_BILL: "/api/apartment/bill/not-create"
    },
    RESIDENT: {
        GET_ALL: "/api/resident",
        ADD: "/api/resident",
        GET_ONE: (id) => `/api/resident/${id}`,
        UPDATE: (id) => `/api/resident/${id}`,
        DELETE: (id) => `/api/resident/${id}`,
        DELETE_ACCOUNT: (id) => `/api/resident/deleteAccount/${id}`,
        CREATE_ACCOUNT: (id) => `/api/resident/createAccount/${id}`,
        RESET_PASSWORD: (id) => `/api/resident/resetPassword/${id}`
    },
    VEHICLE: {
        GET_ALL: "/api/vehicle",
        ADD: "/api/vehicle",
        GET_ONE: (id) => `/api/vehicle/${id}`,
        UPDATE: (id) => `/api/vehicle/${id}`,
        DELETE: (id) => `/api/vehicle/${id}`
    },
    RESIDENT_ACCOUNT: {
        GET_ALL: "/api/resident-account",
        ADD: (residentId) => `/api/resident-account/${residentId}`,
        GET_ONE: (id) => `/api/resident-account/${id}`,
        UPDATE: (id) => `/api/resident-account/${id}`,
        RESET_PASS: (residentId) => `/api/resident-account/resetPass/${residentId}`,
        DELETE: (id) => `/api/resident-account/${id}`,
    },
    SERVICE: {
        GET_ALL: "/api/service",
        ADD: "/api/service",
        GET_ONE: (id) => `/api/service/${id}`,
        UPDATE: (id) => `/api/service/${id}`,
        DELETE: (id) => `/api/service/${id}`
    },
    BILL: {
        GET_ALL: "/api/bill",
        ADD: "/api/bill",
        GET_ONE: (id) => `/api/bill/${id}`,
        UPDATE: (id) => `/api/bill/${id}`,
        DELETE: (id) => `/api/bill/${id}`,
        COST: "/api/bill/cost"
    },
    DASHBOARD: {
        GET_ALL: "/api/dashboard"
    },
    EMPLOYEE: {
        GET_ALL: "/api/employee",
        ADD: "/api/employee",
        GET_ONE: (id) => `/api/employee/${id}`,
        UPDATE: (id) => `/api/employee/${id}`,
        DELETE: (id) => `/api/employee/${id}`,
        LOGIN: "/api/employee/login"
    }
}