export const sendErrorResponse = (res, error, fallbackMessage) => {
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || fallbackMessage
    });
};
