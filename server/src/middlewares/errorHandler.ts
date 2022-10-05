const errorHandler = (err: any, _req: any, res: any, _next: Function) => {
    const statusCode = res.statusCode? res.statusCode : 500
    
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
}

export {}
module.exports = {errorHandler};