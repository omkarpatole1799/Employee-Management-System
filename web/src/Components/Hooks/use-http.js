const useHttp = (requestData) => {
    const { url, method, headers, body } = requestData;

    const sendRequest = async () => {
        try {
            const res = await fetch(
                url,
                method ? method : "GET",
                headers ? headers : {},
                body ? JSON.stringify(body) : null
            );
            if (!res.ok) {
                throw new Error("request failed");
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err.message || "Something went wrong");
        }
    };

    return {
        sendRequest,
    };
};

export default useHttp;
