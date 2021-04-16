export const API = {
    BLOCK: {
        GET_ALL: "/api/block",
        ADD: "/api/block",
        GET_ONE: (id)=>`/api/block/${id}`,
        UPDATE: (id)=>`/api/block/${id}`
    },
    APARTMENT:{
        GET_ALL: "/api/apartment",
        ADD: "/api/apartment",
        GET_ONE: (id)=>`/api/apartment/${id}`,
        UPDATE: (id)=>`/api/apartment/${id}`
    },
    RESIDENT:{
        GET_ALL: "/api/resident",
        ADD: "/api/resident",
        GET_ONE: (id)=>`/api/resident/${id}`,
        UPDATE: (id)=>`/api/resident/${id}`
    },
    VEHICLE:{
        GET_ALL: "/api/vehicle",
        ADD: "/api/vehicle",
        GET_ONE: (id)=>`/api/vehicle/${id}`,
        UPDATE: (id)=>`/api/vehicle/${id}`
    },
    RESIDENT_ACCOUNT:{
        GET_ALL: "/api/resident-account",
        ADD: (residentId)=>`/api/resident-account/${residentId}`,
        GET_ONE: (id)=>`/api/resident-account/${id}`,
        UPDATE: (id)=>`/api/resident-account/${id}`,
        RESET_PASS:(residentId)=>`/api/resident-account/resetPass/${residentId}`,
        DELETE:(id)=>`/api/resident-account/${id}`,
    }
}