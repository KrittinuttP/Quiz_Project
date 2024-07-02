import axios from "axios";

const CAMPAGIN_API = import.meta.env.VITE_APP_CAMPAGIN_URL;

export const ListBiz = async (data?: any) =>
    await axios.get(`${NEWMODEL_API}/dropdownlists/bizs`, {
    });

export const ListModel = async (data?: any) => {
    const params = {
        biz: data?.biz,
    };
    const response = await axios.get(`${NEWMODEL_API}/dropdownlists/models`, { params })
    return response.data;
}

export const ListLine = async (data?: any) => {
    const params = {
        biz: data?.biz,
        model: data?.model
    };
    const response = await axios.get(`${NEWMODEL_API}/dropdownlists/lines`, { params });
    return response.data;

}

export const ListBuild = async (data?: any) => {
    const params = {
        biz: data?.biz,
        model: data?.model
    };
    const response = await axios.get(`${NEWMODEL_API}/dropdownlists/builds`, { params });
    return response.data;
}

export const ListProcess = async (data?: any) => {
    const response = await axios.get(`${NEWMODEL_API}/dropdownlists/processlevels`);
    return response.data;
}



export const reportprogress = async (data?: any) => {
    const params = {
        biz: data?.biz,
        model: data?.model,
        line: data?.line,
        build: data?.build,
        process: data?.process,
        date_from: data?.startDate,
        date_to: data?.endDate,
    };
    // Make the GET request with parameters
    const response = await axios.get(`${NEWMODEL_API}/reportprogress`, { params })
    return response.data;
}
