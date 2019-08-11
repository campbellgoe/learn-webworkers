self.importScripts('complex.js');
onmessage = function(e) {
  console.log('Message received from main script');
  const workerResult = complex(e.data);
  console.log('Posting message back to main script');
  postMessage(workerResult);
};
