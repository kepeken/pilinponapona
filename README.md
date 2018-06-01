# ごちうさで学ぶトキポナbot

## 概要
[@pilinponapona](https://twitter.com/pilinponapona)

mi ante e toki pi sitelen tawa *Wile Li Soweli Ala Soweli* tawa **toki pona**. jan @kepeken li pali e ni.

アニメ「ご注文はうさぎですか？／？？」のセリフを人工言語トキポナに訳します。@kepeken が作っています。

## トキポナとは
トキポナ（toki pona）は、2001年に Sonja Elen Kisa さんによって公開された人工言語です。最小の努力で最大の意味を表現することを目指して設計されており、14の音素と120の単語、簡単な文法しか持ちません。

## データ（2017/01/11 現在）
- 収録：1期 第1羽 - 第12羽 / 2期 第1羽 - 第4羽
- つぶやきパターン数：206
- つぶやき間隔：8時間
- 自動でフォローバックします

## 翻訳ルールなど
### 単語・熟語
単語の翻訳の仕方は人それぞれですが、このbotでは以下を採用しています。

日本語|トキポナ
---|---
ココア|jan Kokowa
チノ|jan Sino \*
リゼ|jan Lise
千夜|jan Sija \*
シャロ|jan Salo
ティッピー|soweli Sipi \*
マヤ|jan Maja
メグ|jan Meku
ウサギ|soweli
妹|meli sama lili
姉|meli sama suli
コーヒー／カフェイン|telo seli wawa

\* トキポナには `ti` の音が無いので「チ」や「ティ」の音写は `si` になります。

### 文法
公式に定められていない書き方については以下を採用しています。
#### 約物
`.` `,` `?` `!` `...` `:` を使用しています。
#### 疑問文
普通の疑問文は反復疑問文（`X ala X`）、念押しや感嘆の疑問文は付加疑問文（`X anu seme`）に訳しています。
#### 関係節
トキポナに関係節はないので、`ni` とコロンを使用して文を２つに分けています。  
例：`mi wile e ni: sina pilin pona pona.` / 私はあなたに心ぴょんぴょんしてほしい。
#### la
このbotでは砕けた会話が多いので、`la` の前や後ろを省略していたりします。正式な文法ではないので、そのうち修正するかもしれません。
