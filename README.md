# InvisibleSplitKeyboard

<img width="400px" alt="スクリーンショット 2021-02-05 6 40 23" src="https://user-images.githubusercontent.com/20572112/106958737-196bcc00-677d-11eb-8470-219f0da96b5b.png">

<img width="600px" alt="スクリーンショット 2021-02-05 6 37 49" src="https://user-images.githubusercontent.com/20572112/106958496-c98d0500-677c-11eb-870c-796d6a7ce291.png">

<img width="400px" alt="スクリーンショット 2021-02-05 2 56 58" src="https://user-images.githubusercontent.com/20572112/106957813-d8bf8300-677b-11eb-96d8-56ce86cdce87.jpg">

分割ソフトウェアキーボード入力時に発生する頻繁な視線移動を、透明化により自然に抑制する手法（卒論）

<br/>

## アプリのページ

- [タップデータ収集用ページ](https://kame-v-d.github.io/InvisibleSplitKeyboard/collectKeyboard)

  - 各キーのタップ座標データを収集するためのシステム

  - キーボード周辺のどこをタップしても正しい入力がされる
  
  - まずはこのページで予測用データを収集（10文程度である程度予測可能）
  
- [タップの分布確認用ページ](https://kame-v-d.github.io/InvisibleSplitKeyboard/displayData)

  - タップ座標データをロードし、各キーの二次元正規分布を確認できる
  
- [本番用ページ](https://kame-v-d.github.io/InvisibleSplitKeyboard/nextAwesome)

  - タップデータ収集用システムで収集したデータをもとに予測モデルを構築

  - テキストボックス付近に5つの予測単語が表示され、スワイプジェスチャで選択可能

<br/>

## デモ動画

[InvisibleSplitKeyboard - YouTube](https://youtu.be/UDp-I4-Mcms) 

<br/>

## 使用技術等

- pure JavaScript：Webアプリケーションの実装

- Node.js：ExpressによるAPI実装、LOOCVによる予測精度の検証

- Firestore：タップ座標データの保存

- Google App Engine：Firestoreを扱うAPIサーバの構築

- 予測アルゴリズム：空間モデルと言語モデルからなるベイズ

  - 空間モデル...タップ座標データをもとにした各キーの二次元正規分布
  
  - 言語モデル...ANCコーパスをもとに作成した1-gram言語モデル

<br/>

## 使用方法

### タップデータ収集用システム

<img width="600px" alt="スクリーンショット 2021-02-05 8 40 45" src="https://user-images.githubusercontent.com/20572112/106970808-05ca6080-6791-11eb-995d-cfe5737027e9.jpg">

はじめにデータ保存用のユーザ名と、キーボードの見た目を選択（枠のみは「frame-only」）

<img width="300px" alt="スクリーンショット 2021-02-05 8 40 45" src="https://user-images.githubusercontent.com/20572112/106971852-11b72200-6793-11eb-9d6f-4fec5a2e9e14.png">　<img width="300px" alt="スクリーンショット 2021-02-05 8 36 42" src="https://user-images.githubusercontent.com/20572112/106968979-5344ce80-678d-11eb-9df3-af496bbd27fb.png">

入力するキーのあるキーボードと反対側をタップした場合は「*」が入力される

<br/>

### 本番用システム

<img width="600px" alt="スクリーンショット 2021-02-05 8 40 45" src="https://user-images.githubusercontent.com/20572112/106973400-2943da00-6796-11eb-8a14-ddf253f421d2.jpg">

- はじめにユーザ名とキーボードの見た目を指定してデータをロード

- データロード完了で「load success」と表示

<img width="480px" alt="スクリーンショット 2021-02-05 10 17 33" src="https://user-images.githubusercontent.com/20572112/106976245-6c547c00-679b-11eb-82c4-026a33f268a6.png">


<br/>

## モチベーション

卒論ネタ

<img width="600px" alt="スクリーンショット 2021-02-05 6 37 49" src="https://user-images.githubusercontent.com/20572112/106958496-c98d0500-677c-11eb-870c-796d6a7ce291.png">

分割ソフトウェアキーボードでは、通常のキーボードよりも視線移動が大きく、

入力速度低下の要因となっている

キーボードを透明化することで、自然に視線移動が抑制されるようにしたい

そのとき、十分な精度の予測によって入力が可能であることを検証したい

<br/>

スマートフォンのqwertyキーボードに慣れた人を対象、被験者4人

<img width="600px" alt="スクリーンショット 2021-02-05 10 24 02" src="https://user-images.githubusercontent.com/20572112/106976831-762aaf00-679c-11eb-88fa-a2f597f953a5.png">

枠のみのキーボードの視線移動は、通常より少ないが、完全な透明よりは多い

<img width="600px" alt="スクリーンショット 2021-02-05 10 24 24" src="https://user-images.githubusercontent.com/20572112/106976836-788d0900-679c-11eb-9981-b406927e3bbd.png">

枠のみのキーボードのタップ座標の分散は、通常より小さいが、完全な透明よりは大きい

<img width="600px" alt="スクリーンショット 2021-02-05 10 24 54" src="https://user-images.githubusercontent.com/20572112/106976842-7a56cc80-679c-11eb-8ec8-96b86ebc3d42.png">

枠のみのキーボードの予測精度は、第1候補のみでは不十分だが、第5候補までならば95%を超え十分

