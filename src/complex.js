function complex(input) {
  let t0 = Date.now();
  let output = 0;
  const n = 10e6;
  for (let i = 0; i < n; i++) {
    output = Math.random();
    if (Date.now() - t0 > 1000 * 8) {
      console.error('took too long (> 8s)');
      break;
    }
  }
  return { input, output: 'Did ' + n + ' iterations.' };
}
