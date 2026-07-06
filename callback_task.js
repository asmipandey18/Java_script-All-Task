// Callback Function
function printDateTime(name) {
    console.log("Name : " + name);
    console.log("Date & Time : " + new Date());
}

// Function to perform operation
function myOperation(interval, exitTime, callback, name) {

    // Get current time in milliseconds
    let startTime = Date.now();

    // Copy milliseconds to another variable
    let printTime = startTime;

    // While loop
    while (true) {

        let currentTime = Date.now();

        // Print every interval
        if (currentTime - printTime >= interval) {

            callback(name);

            printTime = currentTime;
        }

        // Exit after exitTime
        if (currentTime - startTime >= exitTime) {

            console.log("Program Stopped After 2 Minutes");
            break;
        }
    }
}

// Function Call
myOperation(10000,120000,printDateTime,"Asmi Pandey"  
);