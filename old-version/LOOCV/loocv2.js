const fs = require('fs');
const kl = require('./KeyList/KeyList.js');
const wp = require('./WordPrediction/WordPrediction.js');

// let trainData = JSON.parse(
//   fs.readFileSync('./tapData/pangram-peripheral.json', 'r')
// );
// let testData = JSON.parse(fs.readFileSync('./tapData/peripheral.json', 'r'));
const {
  freqJson
} = require('./WordPrediction/wordFreqData/wordFreq_top10000.js');
const { nanriNormal } = require('./tapData/nanri/nanri-normal.js');
const { sabuNormal } = require('./tapData/sabu/sabu-normal.js');
const { yutaroNormal } = require('./tapData/yutaro/yutaro-normal.js');
const { manoNormal } = require('./tapData/mano/mano-normal.js');

// const { testData } = require('./tapData/nanri-normal.js');
// let corpus = ['the', 'interesting'];
const dataList = [nanriNormal, sabuNormal, yutaroNormal, manoNormal];

function validate(trainIds, testId) {
  const trainData = {};
  kl.keyList.filter(k => {
    trainData[k] = [];
    trainIds.filter(id => {
      if (dataList[id][k]) {
        trainData[k] = trainData[k].concat(dataList[id][k]);
      }
    });
  });

  const testData = dataList[testId];

  // console.log(trainData);
  // kl.keyList.filter(k => {
  //   console.log(k, trainData[k].length);
  // });
  // console.log(testData);

  let wordAccuracyList = {};

  wp.createSpacialModel(trainData);

  let noDataKeyList = [];

  kl.keyList.filter(k => {
    if (!testData[k]) {
      noDataKeyList.push(k);
      return;
    }
    testData[k].filter(v => {
      v['letter'] = k;
      v['smProbability'] = wp.getALetterSMProbability(
        v['position']['x'],
        v['position']['y']
      );
      //   console.log(v);
    });
  });

  //   corpus.filter(w => {
  kl.keyList.filter(k => {
    // console.log(freqJson[k]);
    if (noDataKeyList.find(v => v === k)) return;
    freqJson[k].filter(word => {
      let w = word.word;
      if (w.match(/[^a-z]+/)) return;

      let flag = false;
      for (let i = 0; i < w.length; i++) {
        if (noDataKeyList.find(v => v === w[i])) {
          flag = true;
        }
      }
      if (flag) return;

      console.log(w);
      let tapSetList = [];
      for (let i = 0; i < 1000; i++) {
        let tapSet = [];
        for (let j = 0; j < w.length; j++) {
          tapSet.push(
            testData[w[j]][Math.floor(Math.random() * testData[w[j]].length)]
          );
        }
        tapSetList.push(tapSet);
      }
      // console.log(tapSetList);
      let rankList = [];
      tapSetList.filter(tapSet => {
        let p = wp.predictWord(tapSet);
        // console.log(p);

        for (let i = 0; i < p.length; i++) {
          if (i < 5) {
            if (p[i].letter === w) {
              rankList.push(1);
              break;
            }
          } else {
            rankList.push(0);
            break;
          }
        }
        wp.initProbability();
      });
      // console.log(rankList);
      console.log(w);
      const accuracy = rankList.reduce((sum, v) => sum + v) / rankList.length;
      console.log(accuracy);

      wordAccuracyList[w] = accuracy;
    });
  });
  console.log(wordAccuracyList);

  fs.writeFileSync(
    `./wordAccuracy-normal-${testId}.json`,
    JSON.stringify(wordAccuracyList)
  );
}

function loocv() {
  const looList = [
    [[1, 2, 3], 0],
    [[0, 1, 2], 1],
    [[0, 1, 3], 2],
    [[0, 1, 2], 3]
  ];
  looList.filter(loo => {
    validate(loo[0], loo[1]);
  });
}

loocv();
