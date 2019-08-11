const FakeWorker = function() {
  this.data = null;
  this.postMessage = data => {
    this.data = data;
    //begin complex tsk
    console.log('Fake Message received from main script');
    //var workerResult = 'Result: ' + (data[0] + ', ' + data[1]);
    const workerResult = complex(data);
    console.log('Fake Posting message back to main script');
    //on complex task finished:
    this.onmessage({ data: workerResult });
  };
};
const useFake = true;
const useReal = true;
window.onload = function() {
  if (window.Worker) {
    const myWorker = new Worker('worker.js');
    const fakeWorker = new FakeWorker();

    const fake0 = document.getElementById('fake0');
    const real0 = document.getElementById('real0');
    const both0 = document.getElementById('both0');
    const both1 = document.getElementById('both1');

    const output = document.getElementById('output');
    const clearOutput = document.getElementById('clear-output');
    clearOutput.addEventListener('click', () => {
      output.textContent = '';
    });
    const data = ['apple', 'orange'];
    fake0.addEventListener('click', () => {
      output.textContent += '\n\nStarted NoWorker only.';
      fakeWorker.postMessage(Date.now());
    });
    real0.addEventListener('click', () => {
      output.textContent += '\n\nStarted Worker only.';
      myWorker.postMessage(Date.now());
    });
    both0.addEventListener('click', () => {
      output.textContent += '\n\nStarted NoWorker then Worker.';
      fakeWorker.postMessage(Date.now());
      myWorker.postMessage(Date.now());
    });
    both1.addEventListener('click', () => {
      output.textContent += '\n\nStarted Worker then NoWorker.';
      myWorker.postMessage(Date.now());
      fakeWorker.postMessage(Date.now());
    });

    myWorker.onmessage = function({ data }) {
      const t0 = data.input;
      console.log('message received from real worker:', data.output);
      output.textContent += '\nWorker response: ' + data.output;
      output.textContent +=
        '\nWorker response took ' + (Date.now() - t0) / 1000 + ' s\n';
    };
    fakeWorker.onmessage = function({ data }) {
      const t0 = data.input;
      console.log('message received from fake worker:', data.output);
      output.textContent += '\nNoWorker response: ' + data.output;
      output.textContent +=
        '\nNoWorker response took ' + (Date.now() - t0) / 1000 + ' s\n';
    };
  } else {
    alert('sorry no worker support');
  }
};
