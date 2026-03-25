# 衛生管理者試験 対策サイト — 公開手順ガイド

GitHub Pages + 独自ドメインで無料公開するまでの全手順です。

---

## 全体の流れ

```
STEP 1  GitHubアカウントを作る
STEP 2  リポジトリを作ってファイルをアップロード
STEP 3  GitHub Pagesを有効化（この時点で公開される）
STEP 4  独自ドメインを取得
STEP 5  DNS設定
STEP 6  GitHubにドメインを紐づけ
STEP 7  HTTPS有効化 & 動作確認
```

所要時間の目安：STEP 1〜3 で約15分、STEP 4〜7 で約30分＋DNS反映待ち（数分〜最大48時間）

---

## STEP 1 — GitHubアカウントを作成

すでにアカウントがあればスキップしてください。

1. https://github.com にアクセス
2. 「Sign up」からメールアドレス・ユーザー名・パスワードを入力
3. メール認証を完了

> 無料プランで問題ありません。GitHub Pagesは無料プランで利用可能です。


---

## STEP 2 — リポジトリを作ってファイルをアップロード

### 2-1. 新規リポジトリを作成

1. GitHub右上の「+」→「New repository」
2. 以下を入力：

| 項目 | 入力値 |
|------|--------|
| Repository name | `eisei-kanrisha`（好きな名前でOK） |
| Description | 衛生管理者試験 対策サイト（任意） |
| Public / Private | **Public**（GitHub Pages無料利用のため） |
| Add a README | チェックを入れる |

3. 「Create repository」をクリック

### 2-2. ファイルをアップロード

**方法A：ブラウザから（初心者向け）**

1. リポジトリのページで「Add file」→「Upload files」
2. ダウンロードした `eisei-kanrisha-app` フォルダの **中身すべて** をドラッグ＆ドロップ

> 重要：フォルダごとではなく、中のファイル・フォルダ群をまとめてドロップします。
> ただし、ブラウザからのアップロードではフォルダ構造が維持されない場合があります。
> その場合は方法Bを使ってください。

**方法B：Git コマンドから（確実）**

ターミナル（Mac）またはコマンドプロンプト（Windows）で以下を実行します。
Gitが未インストールの場合は https://git-scm.com からインストールしてください。

```bash
# 1. リポジトリをクローン（URLは自分のものに置き換え）
git clone https://github.com/あなたのユーザー名/eisei-kanrisha.git

# 2. クローンしたフォルダに移動
cd eisei-kanrisha

# 3. ダウンロードしたファイル群をすべてこのフォルダにコピー
#    （index.html, css/, js/, type1/, type2/, manifest.json 等）

# 4. 全ファイルをGitに追加
git add .

# 5. コミット
git commit -m "初回リリース：衛生管理者試験対策サイト"

# 6. プッシュ
git push origin main
```

### アップロード後のリポジトリ構造（確認）

```
eisei-kanrisha/          ← リポジトリのルート
├── index.html           ← ★ ルート直下にindex.htmlがあることが重要
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── quiz.js
├── type1/
│   ├── index.html
│   ├── past/...
│   └── original/...
├── type2/...
├── manifest.json
├── sw.js
├── icon-192.png
└── icon-512.png
```


---

## STEP 3 — GitHub Pagesを有効化

1. リポジトリのページで「Settings」タブを開く
2. 左メニューから「Pages」を選択
3. 「Source」セクションで以下を設定：

| 項目 | 設定値 |
|------|--------|
| Source | 「Deploy from a branch」 |
| Branch | 「main」 |
| Folder | 「/ (root)」 |

4. 「Save」をクリック

数分後、以下のURLでサイトが公開されます：

```
https://あなたのユーザー名.github.io/eisei-kanrisha/
```

> まずこのURLでサイトが正常に動作するか確認してください。
> 問題演習ページまで遷移できればOKです。


---

## STEP 4 — 独自ドメインを取得

### 4-1. ドメイン名を決める

例：
- `eisei-kanrisha.com`
- `eisei-taisaku.jp`
- `eiseikanri-mondai.com`

> ポイント：短くて覚えやすく、サイトの内容が伝わる名前がベストです。
> `.com` は年間約1,500円、`.jp` は年間約3,000円程度です。

### 4-2. ドメイン取得サービスで購入

おすすめのドメイン取得サービス：

| サービス | 特徴 | URL |
|---------|------|-----|
| **お名前.com** | 国内最大手。初年度割引あり | https://www.onamae.com |
| **ムームードメイン** | GMO系。管理画面がシンプル | https://muumuu-domain.com |
| **Google Domains → Squarespace** | Google Domains から移行。DNS設定がシンプル | https://domains.squarespace.com |
| **Cloudflare Registrar** | 原価販売で最安。DNS設定も高機能 | https://www.cloudflare.com |

購入手順（お名前.comの場合）：
1. サイトにアクセスし、希望のドメイン名を検索
2. 利用可能であればカートに入れる
3. 登録年数を選択（1年でOK）
4. Whois情報公開代行を有効にする（プライバシー保護）
5. 決済して取得完了


---

## STEP 5 — DNS設定

ドメイン取得サービスの管理画面で、DNSレコードを設定します。

### 5-1. Aレコードを追加（4つ）

GitHub PagesのIPアドレスを指定します：

| ホスト名 | タイプ | 値 |
|---------|--------|-----|
| `@`（空欄の場合も） | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |

### 5-2. CNAMEレコードを追加（www用）

| ホスト名 | タイプ | 値 |
|---------|--------|-----|
| `www` | CNAME | `あなたのユーザー名.github.io` |

### 設定例（お名前.comの場合）

1. お名前.comにログイン
2. 「ドメイン設定」→「DNS設定/転送設定」→ 対象ドメインを選択
3. 「DNSレコード設定を利用する」を選択
4. 上記のAレコード4つとCNAMEレコード1つを追加
5. 保存

> DNS反映には数分〜最大48時間かかることがあります（通常は数分〜数時間）。


---

## STEP 6 — GitHubにドメインを紐づけ

### 6-1. CNAMEファイルを作成

リポジトリのルートに `CNAME` というファイル（拡張子なし）を作成します。

**ファイルの中身（自分のドメインに置き換え）：**
```
eisei-kanrisha.com
```

方法：
- GitHubのリポジトリページで「Add file」→「Create new file」
- ファイル名に `CNAME` と入力
- 内容にドメイン名を1行だけ入力
- 「Commit new file」

### 6-2. GitHub Pagesの設定画面で確認

1. リポジトリの「Settings」→「Pages」
2. 「Custom domain」欄にドメイン名が表示されていることを確認
3. もし表示されていなければ、ドメイン名を入力して「Save」


---

## STEP 7 — HTTPS有効化 & 動作確認

### 7-1. HTTPSを有効にする

1. 「Settings」→「Pages」
2. 「Enforce HTTPS」にチェックを入れる

> DNSの反映が完了していないとチェックできないことがあります。
> その場合は数時間後に再度試してください。

### 7-2. 動作確認チェックリスト

以下をすべて確認します：

- [ ] `https://あなたのドメイン.com` でトップページが表示される
- [ ] `https://あなたのドメイン.com/type1/` で第一種ページが表示される
- [ ] `https://あなたのドメイン.com/type1/past/2024/law/` で問題が開始される
- [ ] 問題の回答→解説→次の問題→結果画面まで正常に動作する
- [ ] スマホで表示してレスポンシブが機能している
- [ ] アドレスバーに鍵マーク（HTTPS）が表示されている
- [ ] 「ホーム画面に追加」でPWAとしてインストールできる


---

## 公開後にやるべきこと

### Google Search Console に登録

Googleに自分のサイトを認識させ、インデックス状況を確認できるようにします。

1. https://search.google.com/search-console にアクセス
2. 「プロパティを追加」→「ドメイン」タイプでドメインを入力
3. DNS確認用のTXTレコードを追加して所有権を確認
4. サイトマップ（後述）を登録

### サイトマップを作成して登録

検索エンジンにサイト構造を伝えるファイルです。
リポジトリのルートに `sitemap.xml` を作成して追加してください。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://あなたのドメイン.com/</loc><priority>1.0</priority></url>
  <url><loc>https://あなたのドメイン.com/type1/</loc><priority>0.9</priority></url>
  <url><loc>https://あなたのドメイン.com/type2/</loc><priority>0.9</priority></url>
  <url><loc>https://あなたのドメイン.com/type1/past/</loc><priority>0.8</priority></url>
  <url><loc>https://あなたのドメイン.com/type1/original/</loc><priority>0.8</priority></url>
  <!-- ... 各ページを列挙 ... -->
</urlset>
```

> サイトマップの完全版は、ドメインが決まったら自動生成できます。

### robots.txt を追加

```
User-agent: *
Allow: /
Sitemap: https://あなたのドメイン.com/sitemap.xml
```


---

## 今後のコンテンツ更新方法

### 問題を追加・修正する場合

1. `js/data.js` を編集（問題データの追加・修正）
2. 必要に応じて新しいHTMLページを追加
3. GitHubにプッシュすると自動で反映（通常1〜2分）

```bash
git add .
git commit -m "令和7年度の過去問を追加"
git push origin main
```

### Service Workerのキャッシュ更新

`sw.js` のバージョン番号を変更：
```javascript
const CACHE_NAME = 'eisei-site-v2';  // v1 → v2 に変更
```


---

## 費用まとめ

| 項目 | 費用 |
|------|------|
| GitHub（Free プラン） | 無料 |
| GitHub Pages | 無料 |
| HTTPS（SSL証明書） | 無料（GitHub Pages自動対応） |
| ドメイン（.com の場合） | 年間 約1,500円 |
| **合計** | **年間 約1,500円** |

> ドメイン代のみでプロフェッショナルなWebサイトを運営できます。
