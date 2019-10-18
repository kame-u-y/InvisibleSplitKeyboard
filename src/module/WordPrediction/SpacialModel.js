let gaussianData = {};

function calcAverage(arr) {
  return (
    arr.reduce((sum, v) => {
      return sum + v;
    }) / arr.length
  );
}

function calcSigma(arr, ave) {
  return Math.sqrt(
    arr.reduce((sum, v) => {
      return sum + (v - ave) ** 2;
    }) / arr.length
  );
}

function calcRelation(letterData, aveX, aveY, sigmaX, sigmaY) {
  return (
    letterData
      .map(v => {
        return (v.position.x - aveX) * (v.position.y - aveY);
      })
      .reduce((sum, v) => {
        return sum + v;
      }) /
    (letterData.length * sigmaX * sigmaY)
  );
}

function calcGaussian(letterData) {
  const posXArr = letterData.map(v => v.position.x);
  const posYArr = letterData.map(v => v.position.y);

  const aveX = calcAverage(posXArr);
  const aveY = calcAverage(posYArr);

  const sigmaX = calcSigma(posXArr, aveX);
  const sigmaY = calcSigma(posYArr, aveY);

  const relation = calcRelation(letterData, aveX, aveY, sigmaX, sigmaY);

  return {
    x: {
      average: aveX,
      sigma: sigmaX
    },
    y: {
      average: aveY,
      sigma: sigmaY
    },
    relation: relation
  };
}

export function createSpacialModel(tapData) {
  Object.keys(tapData).filter(letter => {
    gaussianData[letter] = calcGaussian(tapData[letter]);
  });
}

export function isOutlier(letter, x, y) {
  return (
    Math.abs(gaussianData[letter].x.average - x) >
      3 * gaussianData[letter].x.sigma ||
    Math.abs(gaussianData[letter].y.average - y) >
      3 * gaussianData[letter].y.sigma
  );
}

export function getSMProbability(x, y) {
  let probabilities = [];
  Object.keys(gaussianData).filter(letter => {
    let data = gaussianData[letter];
    let [aX, aY] = [data.x.average, data.y.average];
    let [sX, sY] = [data.x.sigma, data.y.sigma];
    let rel = data.relation;

    let z =
      (x - aX) ** 2 / sX ** 2 -
      (2 * rel * (x - aX) * (y - aY)) / (sX * sY) +
      (y - aY) ** 2 / sY ** 2;

    probabilities.push({
      letter: letter,
      probability:
        Math.exp(-(z / (2 * (1 - rel ** 2)))) /
        (2 * Math.PI * sX * sY * Math.sqrt(1 - rel ** 2))
    });
  });
  probabilities.sort((a, b) => b.probability - a.probability);
  return probabilities;
}

export function drawCircle() {
  console.log(gaussianData);
  Object.keys(gaussianData).filter(letter => {
    const getH = letter => {
      const initial = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"]
      ];
      if (initial[0].indexOf(letter) !== -1)
        return initial[0].indexOf(letter) * 30;
      if (initial[1].indexOf(letter) !== -1)
        return 180 + initial[1].indexOf(letter) * 30;
      if (initial[2].indexOf(letter) !== -1)
        return initial[2].indexOf(letter) * 30;
    };
    const width = gaussianData[letter].x.sigma * 3 * 2;
    const height = gaussianData[letter].y.sigma * 3 * 2;
    const left = gaussianData[letter].x.average;
    const top = gaussianData[letter].y.average;
    let circleContainer = document.getElementById("circle-container");
    let circle = document.createElement("div");
    circle.setAttribute("class", "circle");
    circle.style.cssText = `background-color: hsla(${getH(
      letter
    )}, 100%, 80%, 0.1); border: solid 1px hsla(${getH(letter)}, 50%, 50%);
               width: ${width}px; height: ${height}px; left: ${left}px; top: ${top}px;`;
    circleContainer.appendChild(circle);
  });
}
