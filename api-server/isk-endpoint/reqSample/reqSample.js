const request = require('request');

function httpRequest(options) {
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      let ret = {
        headers: response.headers,
        body: body,
        error: error,
        href: response.request.uri.href, // promise.all したときリクエスト元を特定するために設定
        status: response.statusCode,
      };

      if (error) {
        reject(ret);
      } else {
        resolve(ret);
      }
    });
  });
}

function getTapData() {
  Promise.resolve()
    .then(function(value) {
      const data = {
        user: 'kame-sample',
        keyboardType: 'frame-only',
        spaceVisual: 'invisible',
        // tapData: inputData,
      };

      const options = {
        url: 'http://localhost:8080/getTapData',
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        json: data,
      };
      return httpRequest(options); // リクエスト1回目
    })
    .then(function(value) {
      // リクエスト結果の処理
      console.log(value.body);
    })
    .catch(function(reason) {
      // エラー、rejectしたときの処理
      console.log(reason);
    });
}

const inputTapData = {
  a: [
    {
      x: 0,
      y: 1,
      timestamp: 2,
    },
    {
      x: 1,
      y: 2,
      timestamp: 3,
    },
  ],
  b: [
    {
      x: 2,
      y: 3,
      timestamp: 4,
    },
  ],
};
function postTapData() {
  Promise.resolve()
    .then(function(value) {
      const data = {
        user: 'test-request',
        keyboardType: 'frame-only',
        spaceVisual: 'invisible',
        tapData: inputTapData,
      };

      const options = {
        url: 'http://localhost:8080/postTapData',
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        json: data,
      };
      return httpRequest(options); // リクエスト1回目
    })
    .then(function(value) {
      // リクエスト結果の処理
      console.log(value.body);
    })
    .catch(function(reason) {
      // エラー、rejectしたときの処理
      console.log(reason);
    });
}

const inputTaskData = {
  startTime: 1,
  endTime: 2,
  letterCount: 101,
};
function postTaskData() {
  Promise.resolve()
    .then((value) => {
      console.log(value);
      const data = {
        user: 'test-request',
        keyboardType: 'frame-only',
        spaceVisual: 'invisible',
        taskData: inputTaskData,
      };

      const options = {
        url: 'http://localhost:8080/postTaskData',
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        json: data,
      };
      return httpRequest(options); // リクエスト1回目
    })
    .then((value) => {
      // リクエスト結果の処理
      console.log(value.body);
    })
    .catch((reason) => {
      // エラー、rejectしたときの処理
      console.log(reason);
    });
}

// getTapData();
// postTapData();
postTaskData();
