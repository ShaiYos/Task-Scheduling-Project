// Function to send a response to the client
export const serverResponse = (res, status = 200, message = '') => 
    res
        .status(status)      // Set the HTTP status code (default is 200)
        .json(message)       // Send the message as a JSON response
        .end();              // End the response process