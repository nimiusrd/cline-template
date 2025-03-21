# Cline 活用リポジトリ

このリポジトリは、コーディングタスク用のAIアシスタントであるClineを効果的に活用するためのものです。

## ディレクトリ構造

- `src/`: ソースコードファイル
- `docs/`: ドキュメント
- `examples/`: Clineの使用例
- `.cline/`: Clineのルールファイル

## このリポジトリの使い方

このリポジトリでは、Clineが支援できる様々なタスクの例とテンプレートを提供しています：

1. コード生成
2. コード説明
3. デバッグ
4. リファクタリング
5. UI/UX開発
6. テスト

具体的な使用例については、examplesディレクトリをご確認ください。

## Clineルールの活用

このリポジトリでは、`.cline`ディレクトリに様々なプロジェクトルールを個別のファイルとして保存しています。これらのルールから必要なものを選択して、プロジェクトルートの`.clinerules`ファイルを生成するCLIツールを提供しています。

### ルール生成ツールの使用方法

```bash
node src/cline-rules-generator.js
```

このコマンドを実行すると、利用可能なルールのリストが表示され、どのルールを`.clinerules`ファイルに含めるかを選択できます。詳細については、`.cline/README.md`をご確認ください。
