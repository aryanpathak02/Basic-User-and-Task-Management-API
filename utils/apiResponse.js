const apiResponse = (res, statusCode, data = null, message = 'Success') => {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export default apiResponse;
