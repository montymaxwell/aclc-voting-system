import { ServerResponse } from "@/app/api/types";

declare type APIEndpoints = 'auth' | 'users' | 'party' | 'candidates' | 'images' | 'v1/voting'

// a poor man's attempt to an typed fetch api
function api(endpoint: APIEndpoints) {
    const fetchRequest = async(method: string, body?: string) => {
        return await fetch(`/api/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });
    }

    return {
        async get<Type>(body?: Type) {
            return await (await fetchRequest('GET', JSON.stringify(body))).json() as ServerResponse;
        },

        async post<Type>(body?: Type) {
            return await (await fetchRequest('POST', JSON.stringify(body))).json() as ServerResponse;
        },

        async delete<Type>(body?: Type) {
            return await (await fetchRequest('DELETE', JSON.stringify(body))).json() as ServerResponse;
        },

        async put<Type>(body?: Type) {
            return await (await fetchRequest('PUT', JSON.stringify(body))).json() as ServerResponse;
        }
    }
}

export default api