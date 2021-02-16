// const createKeyboardStyles = ([
//   bgVisible,
//   opacity,
//   borderVisible,
//   isBorderless,
// ]) => {
//   const bgColor = isBorderless ? '64, 64, 64' : '0, 0, 0';
//   const bgAlpha = bgVisible ? '1' : '0';
//   const borderAlpha = borderVisible ? '1' : '0';
//   return {
//     'background-color': `rgba(${bgColor}, ${bgAlpha})`,
//     opacity: opacity.toString(),
//     'border-color': `rgba(64, 64, 64, ${borderAlpha})`,
//   };
// };

// const createKeyStyles = ([bgVisible, opacity, borderVisible]) => {
//   const bgAlpha = bgVisible ? '1' : '0';
//   const borderWidth = !bgVisible && opacity === 1 ? '3px' : '0px';
//   const borderRadius = borderVisible ? '0px' : '7px';
//   return {
//     'background-color': `rgba(64, 64, 64, ${bgAlpha})`,
//     opacity: opacity.toString(),
//     'border-width': borderWidth,
//     'border-color': 'rgb(64, 64, 64)',
//     'border-radius': borderRadius,
//   };
// };

// const argList = {
//   'eyes-on': [true, 1, false, false],
//   peripheral: [true, 1, false, false],
//   'stk-peripheral': [true, 0.5, false, false],
//   borderless: [true, 1, false, true, true],
//   'stk-borderless': [true, 0.5, false, true],
//   'key-wired': [false, 1, true, false],
//   'stk-key-wired': [false, 0.5, true, false],
//   'key-invisible': [true, 1, false, false],
//   'stk-key-invisible': [true, 0.5, false, false],
//   'frame-only': [false, 1, true, false],
//   'stk-frame-only': [false, 0.5, true, false],
//   invisible: [false, 0, false, false],
// };

// export function getKeyboardStyles(mode) {
//   return createKeyboardStyles(argList[mode]);
// }

// export function getKeyStyles(mode) {
//   return createKeyStyles(argList[mode]);
// }
