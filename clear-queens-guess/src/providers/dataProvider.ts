import type { DataProvider } from "@refinedev/core";
import axios from "../config/axios";


export const dataProvider: DataProvider = {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {

        const response = await axios(`${resource}/list`,{
            params:{
                page:pagination?.current,
                pageSize:pagination?.pageSize,
            }
        });

        console.log({response})
        return {
            data:response.data,
            total: 0, // We'll cover this in the next steps.
        };
    },
    getOne: () => {
        throw new Error("Not implemented");
    },
    update: () => {
        throw new Error("Not implemented");
    },
    create: () => {
        throw new Error("Not implemented");
    },
    deleteOne: () => {
        throw new Error("Not implemented");
    },
    getApiUrl: () => '',
    // Optional methods:
    /* ... */
};