const uploadRun = () => {
  Office.context.document.getFileAsync(Office.FileType.Compressed, { sliceSize: 100000 }, function (result) {
    if (result.status == Office.AsyncResultStatus.Succeeded) {
      var myFile = result.value;
      var state = {
        file: myFile,
        counter: 0,
        sliceCount: myFile.sliceCount,
        fileName: "",
        result: true,
        code: "",
        msg: "",
      };
      updateStatus("Getting file of " + myFile.size + " bytes");
      getSlice(state);
    } else {
      updateStatus(result.status);
    }
  });
};
const getSlice = (state) => {
  state.file.getSliceAsync(state.counter, function (result) {
    if (result.status == Office.AsyncResultStatus.Succeeded) {
      updateStatus("Sending piece " + (state.counter + 1) + " of " + state.sliceCount);
      sendSlice(result.value, state);
    } else if (result.status == Office.AsyncResultStatus.Failed) {
      updateStatus(
        "sliceCounter: " +
          state.counter +
          ".ERROR happened. ErrorCode: " +
          result.error.code +
          ".ErrorMessage:" +
          result.error.message
      );
    } else {
      updateStatus(result.status);
    }
  });
};

const sendSlice = (slice, state) => {
  var data = slice.data;

  // If the slice contains data, create an HTTP request.
  if (data) {
    // Encode the slice data, a byte array, as a Base64 string.
    // NOTE: The implementation of myEncodeBase64(input) function isn't
    // included with this example. For information about Base64 encoding with
    // JavaScript, see https://developer.mozilla.org/docs/Web/JavaScript/Base64_encoding_and_decoding.
    var fileData = myEncodeBase64(data);

    // Create a new HTTP request. You need to send the request
    // to a webpage that can receive a post.
    var request = new XMLHttpRequest();

    // Create a handler function to update the status
    // when the request has been sent.
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        updateStatus("Sent " + slice.size + " bytes.");
        state.counter++;

        if (state.counter < state.sliceCount) {
          getSlice(state);
        } else {
          closeFile(state);
        }
      }
    };

    request.open("POST", "[Your receiving page or service]");
    request.setRequestHeader("Slice-Number", slice.index);

    // Send the file as the body of an HTTP POST
    // request to the web server.
    request.send(fileData);
  }
};

const closeFile = (state) => {
  // Close the file when you're done with it.
  state.file.closeAsync(function (result) {
    // If the result returns as a success, the
    // file has been successfully closed.
    if (result.status == "succeeded") {
      updateStatus("File closed.");
    } else {
      updateStatus("File couldn't be closed.");
    }
  });
};

const updateStatus = (message) => {
  console.log(message);
};
