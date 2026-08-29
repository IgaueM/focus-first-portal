# 集中力ファースト・ラボ

既存のWixブログ記事を、目的別・テーマ別に整理して案内するGitHub Pages向け静的ポータルサイトです。

## 構成

- `index.html`：ページ本体
- `styles.css`：デザインとレスポンシブ表示
- `articles.js`：記事タイトル、URL、カテゴリ、表示順
- `script.js`：記事の絞り込みとメニュー操作

## 記事を追加する

`articles.js` の `window.FOCUS_ARTICLES` に記事を1件追加します。既存記事URLは変更せず、`category`、`purposes`、`priority`を設定します。

## 公開前の確認

1. 全記事リンクが正しいか確認
2. Amazon短縮URLの遷移先を確認
3. PCとスマートフォンで表示確認
4. 公開先のリポジトリとサブドメインを決定
5. 人間が最終確認後、GitHub Pagesを有効化

## 独自ドメイン

推奨候補は `focus.vbarpa.com` です。ドメイン確定後に `CNAME` ファイルを追加します。
