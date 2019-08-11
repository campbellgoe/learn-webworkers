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
    let t0;
    fake0.addEventListener('click', () => {
      t0 = Date.now();
      fakeWorker.postMessage(data);
      output.textContent += '\n\nStarted NoWorker only.';
    });
    real0.addEventListener('click', () => {
      t0 = Date.now();
      myWorker.postMessage(data);
      output.textContent += '\n\nStarted Worker only.';
    });
    both0.addEventListener('click', () => {
      t0 = Date.now();
      fakeWorker.postMessage(data);
      myWorker.postMessage(data);
      output.textContent += '\n\nStarted NoWorker then Worker.';
    });
    both1.addEventListener('click', () => {
      t0 = Date.now();
      myWorker.postMessage(data);
      fakeWorker.postMessage(data);
      output.textContent += '\n\nStarted Worker then NoWorker.';
    });

    myWorker.onmessage = function(e) {
      console.log('message received from real worker:', e.data);
      output.textContent += '\nWithWorker response: ' + e.data;
      output.textContent +=
        '\nWorker response took ' + (Date.now() - t0) / 1000 + ' s\n';
    };
    fakeWorker.onmessage = function(e) {
      console.log('message received from fake worker:', e.data);
      output.textContent += '\nNoWorker response: ' + e.data;
      output.textContent +=
        '\nNoWorker response took ' + (Date.now() - t0) / 1000 + ' s\n';
    };
  } else {
    alert('sorry no worker support');
  }
};
