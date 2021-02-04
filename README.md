# InvisibleSplitKeyboard

分割ソフトウェアキーボード入力時に発生する頻繁な視線移動を、透明化により自然に抑制する手法（卒論）

<img width="400px" alt="スクリーンショット 2021-02-05 6 40 23" src="https://user-images.githubusercontent.com/20572112/106958737-196bcc00-677d-11eb-8470-219f0da96b5b.png">　<img width="500px" alt="スクリーンショット 2021-02-05 6 37 49" src="https://user-images.githubusercontent.com/20572112/106958496-c98d0500-677c-11eb-870c-796d6a7ce291.png">

<img width="400px" alt="スクリーンショット 2021-02-05 2 56 58" src="https://user-images.githubusercontent.com/20572112/106957813-d8bf8300-677b-11eb-96d8-56ce86cdce87.jpg">




## アプリのページ

[タップデータ収集用システム](https://kame-v-d.github.io/InvisibleSplitKeyboard/collectKeyboard)

[本番用システム](https://kame-v-d.github.io/InvisibleSplitKeyboard/nextAwesome)

## デモ動画

[InvisibleSplitKeyboard - YouTube](https://youtu.be/UDp-I4-Mcms) 

## 使用方法

### タップデータ収集用システム

各キーのタップ座標データを収集するためのシステム

キーボード周辺のどこをタップしても正しい入力がされる

バックスペース：キーボード上で左方向へスワイプ

入力するキーのあるキーボードと反対側をタップした場合は「*」が入力される

### 本番用システム

タップデータ収集用システムで収集したデータをもとに予測モデルを構築

枠のみ表示されたキーボード

## モチベーション

卒論ネタ

入力速度低下の原因となる
左キーボード・右キーボード・テキストエリア
の間の頻繁な視線移動を透明化によって自然に抑制する

<img width="600px" alt="スクリーンショット 2021-02-05 6 37 49" src="https://user-images.githubusercontent.com/20572112/106958496-c98d0500-677c-11eb-870c-796d6a7ce291.png">

以下二つのモデルのかけ合わせにより単語を予測
・各キーのタップ座標の二次元正規分布からなる空間モデル
・ANCのコーパスをもとにした1-gramの言語モデル

完全に透明な場合はタップ座標の分散が非常に大きくなり予測精度が不十分であるが、枠のみ表示されることで分散が抑制され、
スマホのqwertyキーボード入力に慣れている人を対象にした場合、第5位までの単語予測で95%以上の精度が得られた
