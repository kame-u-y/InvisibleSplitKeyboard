const kl = require('./KeyList/KeyList.js');
const hr = require('./MyHttpRequest/MyHttpRequest.js');
const wp = require('./WordPrediction/WordPrediction.js');
// const { PythonShell } = require('python-shell');
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

// const pyshell = new PythonShell('loocv.py', { mode: 'json' });
// pyshell.on('message', message => {
//   console.log(message);
// });

function getTapData(userName, keyboardType) {
  return new Promise(resolve => {
    typeList = {
      peripheral: 'peripheral',
      'stk-peripheral': 'stkPeripheral',
      'stk-borderless': 'stkBorderless'
    };
    hr.getTapData(userName, keyboardType, 'invisible', data => {
      return resolve(data);
    });
  });
}

function loocv(trainMode) {
  wp.createSpacialModel(experimentData[trainMode].tapData);
  const testModes = Object.keys(experimentData).splice(
    Object.keys(experimentData).indexOf(trainMode),
    1
  );
  let resultList = {};
  const wordPrediction = (mode, word, num, tapSet) => {
    if (num === word.length) {
      let topOrder = [];
      tapSet.filter(tap => {
        topOrder = wp.wordPrediction(tap.position.x, tap.position.y);
      });
      resultList.push(topOrder.indexOf(word) + 1);
      wp.initProbability;
      return;
    }
    // console.log(experimentData[mode].tapData[word[num]]);
    experimentData[mode].tapData[word[num]].filter(tap => {
      tapSet.push(tap);
      wordPrediction(mode, word, num++, tapSet);
    });
  };
  testModes.filter(testMode => {
    corpus.filter(word => {
      resultList[word] = [];
      wordPrediction(testMode, word, 0, []);
    });
  });
  console.log(resultList);
}

function main() {
  hr.initFirebase();
  Promise.all([
    getTapData('kmaw2', 'peripheral'),
    getTapData('kmaw2', 'stk-peripheral'),
    getTapData('kmaw2', 'stk-borderless')
  ])
    .then(data => {
      // console.log(data[0]);
      experimentData.peripheral.tapData = data[0];
      experimentData.stkPeripheral.tapData = data[1];
      experimentData.stkBorderless.tapData = data[2];

      console.log('success');

      loocv('peripheral');
    })
    .catch(err => {
      console.log(err);
    });
  // .catch(err => {
  //   console.log(err);
  // });
  // hr.getTapData('kmaw2', 'peripheral', 'invisible', data => {
  //   experimentData.peripheral.tapData = data;
  // });
  // hr.getTapData('kmaw2', 'stk-peripheral', 'invisible', data => {
  //   experimentData.stkPeripheral.tapData = data;
  // });
  // hr.getTapData('kmaw2', 'stk-borderless', 'invisible', data => {
  //   experimentData.stkBorderless.tapData = data;
  // });

  // loocv('peripheral');
  // loocv('stkPeripheral');
  // loocv('stkBorderless');

  // pyshell.end(err => {
  //   if (err) console.log(err);
  // });

  // const modeKeys = ['peripheral', 'stkPeripheral', 'stkBorderless'];
  // modeKeys.forEach((trainMode, i, array) => {
  //   tapData[testMode];
  //   const otherModes = a.splice(i, 1);
  //   otherModes.forEach((testMode, i, array) => {});
  // });
}
main();
