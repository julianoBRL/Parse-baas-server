Parse.Cloud.job("DemoJob", (request) =>  {

    // params: passed in the job call
    // headers: from the request that triggered the job
    // log: the ParseServer logger passed in the request
    // message: a function to update the status message of the job object

    const { params, headers, log, message } = request;
    console.log(request)
    message("I just started");
    return doSomethingVeryLong(request);

});