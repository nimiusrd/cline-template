# Cline Rules

このディレクトリには、プロジェクトで使用するClineのルールが含まれています。

## 概要

`.cline`ディレクトリには、プロジェクトのさまざまな側面に関するルールが個別のMarkdownファイルとして保存されています。これらのルールは、プロジェクトのコーディング規約、ドキュメント要件、テスト基準などを定義しています。

## 利用可能なルール

- `tech_requirements.md` - 技術要件
- `documentation.md` - ドキュメント要件
- `testing.md` - テスト基準
- `code_style.md` - コードスタイルとパターン
- `eslint.md` - ESLintの設定
- `typescript.md` - TypeScriptの型定義
- `nextjs.md` - Next.jsの使用ガイドライン
- `component_patterns.md` - コンポーネントの書き方
- `business_logic.md` - ビジネスロジックの書き方
- `openapi.md` - OpenAPI仕様書の書き方

## ルールの生成方法

プロジェクトルートに`.clinerules`ファイルを生成するには、以下のコマンドを実行します：

```bash
node src/cline-rules-generator.js
```

このコマンドを実行すると、利用可能なルールのリストが表示され、どのルールを`.clinerules`ファイルに含めるかを選択できます。

### 使用例

```
$ node src/cline-rules-generator.js
Cline Rules Generator
=====================
利用可能なルールファイル:
1. tech_requirements
2. documentation
3. testing
4. code_style
5. eslint
6. typescript
7. nextjs
8. component_patterns
9. business_logic
10. openapi
すべて選択する場合は "all" と入力してください。
複数選択する場合はカンマ区切りで番号を入力してください（例: 1,3,5）
選択するルールファイルの番号を入力してください: 1,2,3
選択されたルール:
- tech_requirements.md
- documentation.md
- testing.md
.clinerules ファイルが正常に生成されました: /path/to/project/.clinerules
```

## ルールのカスタマイズ

新しいルールを追加したり、既存のルールを変更したりする場合は、`.cline`ディレクトリ内の対応するMarkdownファイルを編集してください。
