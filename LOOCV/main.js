const hr = require('./MyHttpRequest/MyHttpRequest.js');
const wp = require('./WordPrediction/WordPrediction.js');
const { PythonShell } = require('python-shell');

const pyshell = new PythonShell('loocv.py');

const corpus = ['the', 'interesting'];

let experimentData = {
  peripheral: {
    tapData: {},
    gausianData: {}
  },
  stkPeripheral: {
    tapData: {},
    gausianData: {}
  },
  stkBorderless: {
    tapData: {},
    gausianData: {}
  }
};

function loocv(trainMode) {
  wp.createSpacialModel(experimentData[trainMode].tapData);
  const testModes = Object.keys(experimentData).splice(
    experimentData.indexOf(keyboardType),
    1
  );
  testModes.filter(testMode => {
    pyshell.send({
      trainData: experimentData[trainMode].gausianData,
      testData: experimentData[testMode].tapData
    });
    pyshell.on('message', message => {
      console.log(message);
    });
  });
}

function main() {
  hr.initFirebase();
  hr.getTapData('kmaw2', 'peripheral', 'invisible', data => {
    tapData.peripheral.tapData = data;
  });
  hr.getTapData('kmaw2', 'stk-peripheral', 'invisible', data => {
    tapData.stkPeripheral.tapData = data;
  });
  hr.getTapData('kmaw2', 'stk-borderless', 'invisible', data => {
    tapData.stkBorderless.tapData = data;
  });

  loocv('peripheral');
  loocv('stkPeripheral');
  loocv('stkBorderless');

  // const modeKeys = ['peripheral', 'stkPeripheral', 'stkBorderless'];
  // modeKeys.forEach((trainMode, i, array) => {
  //   tapData[testMode];
  //   const otherModes = a.splice(i, 1);
  //   otherModes.forEach((testMode, i, array) => {});
  // });
}
main();
