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
    }
}