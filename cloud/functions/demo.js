Parse.Cloud.define("demoFunction", async (request) => {

    const { params, headers, log, message } = request;

    console.log(request)
});