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
const { trainData } = require('./tapData/pangram-stk-borderless.js');
const { testData } = require('./tapData/upd-stk-borderless.js');
let corpus = ['the', 'interesting'];

function loocv() {
  wordAccuracyList = {};

  wp.createSpacialModel(trainData);

  //   console.log(testData);
  kl.keyList.filter(k => {
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
    freqJson[k].filter(word => {
      let w = word.word;
      if (w.match(/[^a-z]+/)) return;
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

  fs.writeFileSync('./wordAccuracy.json', JSON.stringify(wordAccuracyList));
}
loocv();
