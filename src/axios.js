import axios from "axios";
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
const baseURL = `${window.location.protocol}//${window.location.hostname}:8000/api/`;
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
const axiosIns = axios.create({
    baseURL: baseURL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    },
});

let access_token = localStorage.getItem(ACCESS_TOKEN);
if (access_token) {
    axiosInstance.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${access_token}`;
} else {
    delete axiosInstance.defaults.headers.common["Authorization"];
}

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // check header config
        // get Token from authorization
        access_token = localStorage.getItem(ACCESS_TOKEN);
        if (access_token) {
            if (!config.headers.common.Authorization) {
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${access_token}`;
                config.headers.common.Authorization = `Bearer ${access_token}`;
            }

            // Get token from header Authorization
            const token = config.headers.common.Authorization.split(" ")[1];
            // decrypt token by atob function
            const tokenParts = JSON.parse(atob(token.split(".")[1]));
            config.headers.post["accept"] = "application/json";

            // exp date in token is expressed in seconds, while now() returns milliseconds:
            const now = Math.ceil(Date.now() / 1000);

            // if token is expired
            if (tokenParts.exp < now) {
                console.log("access token expired", tokenParts.exp < now);
                const refreshBody = JSON.stringify({
                    refresh: window.localStorage.getItem(REFRESH_TOKEN),
                });

                await axiosIns
                    .post("/token/refresh/", refreshBody)
                    .then((response) => {
                        localStorage.setItem(ACCESS_TOKEN, response.data.access);

                        const accessToken = response.data.access;
                        axiosInstance.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${accessToken}`;

                        config.headers.Authorization = `Bearer ${accessToken}`;
                        return config;
                    })
                    .catch((error) => {
                        localStorage.removeItem(REFRESH_TOKEN);
                        localStorage.removeItem(ACCESS_TOKEN);

                    });
            }
        } else {
            delete axiosInstance.defaults.headers.common["Authorization"];
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;