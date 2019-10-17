let gaussianData = {};

function calcAverage(arr) {
    return arr.reduce((sum, v) => {
        return sum + v;
    }) / arr.length;
}

function calcSigma(arr, ave) {
    return Math.sqrt(
        arr.reduce((sum, v) => {
            return sum + (v - ave)**2
        }) / arr.length
    )
}

function calcRelation(letterData, aveX, aveY, sigmaX, sigmaY) {
    return letterData.map(v => {
        return (v.position.x - aveX) * (v.position.y - aveY);
    })
    .reduce((sum, v) => {
        return sum + v;
    }) / (letterData.length * sigmaX * sigmaY)
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
            sigma: sigmaX,
        },
        y: {
            average: aveY,
            sigma: sigmaY,
        },
        relation: relation,
    };
}

export function createSpacialModel(tapData) {
    Object.keys(tapData).filter((letter) => {
        gaussianData[letter] = calcGaussian(tapData[letter]);
    })
}

export function isOutlier(letter, x, y) {
    return Math.abs(gaussianData[letter].x.average - x) > 3*gaussianData[letter].x.sigma 
        || Math.abs(gaussianData[letter].y.average - y) > 3*gaussianData[letter].y.sigma;
}

export function getSMProbability(x, y) {

    let probabilities = [];
    Object.keys(gaussianData).filter((letter) => {
        let data = gaussianData[letter];
        let [aX, aY] = [data.x.average, data.y.average];
        let [sX, sY] = [data.x.sigma, data.y.sigma];
        let rel = data.relation;

        let z = (x-aX)**2 / sX**2 
              - 2*rel*(x-aX)*(y-aY) / (sX*sY) 
              + (y-aY)**2 / sY**2;
        
        probabilities.push({
            letter: letter,
            probability: Math.exp(-(z/(2*(1-rel**2))) / (2*Math.PI*sX*sY*Math.sqrt(1-rel**2)))
        });
    });
    probabilities.sort((a, b) => b.probability - a.probability)
    return probabilities;
}
