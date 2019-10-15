/*
{
    letter: {
        x: {
            average: number,
            standardDeviation: number
        },
        y: {
            average: number,
            standardDeviation: number
        }        
    }
}
*/
let gaussianData = {};

function calcGaussian(letterData) {
    const posXArr = letterData.map(v => v.position.x);
    const posYArr = letterData.map(v => v.position.y);
    const aveX = posXArr.reduce(v => v/2.0);
    const aveY = posYArr.reduce(v => v/2.0);
    const sigmaX = Math.sqrt( posXArr.map(v => Math.pow(v-aveX, 2)).reduce(v => v/posXArr.length) );
    const sigmaY = Math.sqrt( posYArr.map(v => Math.pow(v-aveY, 2)).reduce(v => v/posYArr.length) );
    const rho = letterData.map(v => (v.position.x-aveX)*(v.position.y-aveY)).reduce(v => v / (letterData.length*sigmaX*sigmaY));

    return {
        x: {
            average: aveX,
            standardDeviation: sigmaX,
        },
        y: {
            average: aveY,
            standardDeviation: sigmaY,
        },
        correlationCoefficient: rho,
    };
}

export function displaySpacialModel(tapData) {
    Object.keys(tapData).filter((v) => {
        gaussianData[v] = calcGaussian(tapData[v]);
    })
    console.log(gaussianData);
}

export function getSMProbability(x, y) {
    let probability;

    return probability;
}