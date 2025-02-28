# Cline Usage Guide

This guide provides general tips and best practices for effectively using Cline, an AI assistant for coding tasks.

## Table of Contents

1. [General Tips](#general-tips)
2. [Crafting Effective Prompts](#crafting-effective-prompts)
3. [Working with Code](#working-with-code)
4. [Iterative Development](#iterative-development)
5. [Troubleshooting](#troubleshooting)

## General Tips

### Be Specific

The more specific your request, the better Cline can assist you. Include details such as:

- Programming language or framework
- Specific functionality needed
- Any constraints or requirements
- Your experience level with the technology

### Provide Context

When asking about existing code, provide enough context for Cline to understand:

- The purpose of the code
- How it fits into the larger project
- Any relevant dependencies or imports
- Error messages if troubleshooting

### Set Clear Expectations

Clearly state what you expect from Cline:

- "Generate code for..."
- "Explain how this works..."
- "Debug this issue..."
- "Refactor this to improve..."

## Crafting Effective Prompts

### Structure Your Prompts

A well-structured prompt typically includes:

1. **Task description**: What you want Cline to do
2. **Context**: Relevant background information
3. **Requirements**: Specific needs or constraints
4. **Examples**: If applicable, examples of what you're looking for

### Example Prompt Structures

#### For Code Generation

```
Create a [language] function/component that [does something].
Requirements:
- Should handle [specific cases]
- Use [specific libraries/patterns]
- Include error handling for [scenarios]
```

#### For Code Explanation

```
Explain this [language] code that [does something].
I'm particularly confused about [specific part].
I have [beginner/intermediate/advanced] experience with [technology].
```

#### For Debugging

```
Help me debug this code that's supposed to [expected behavior] but instead [actual behavior].
Here's the error message: [error message]
I've already tried [what you've tried].
```

## Working with Code

### Code Review Requests

When asking Cline to review your code:

- Specify what aspects you want feedback on (performance, readability, security, etc.)
- Mention any coding standards or patterns you're trying to follow
- Ask for specific improvement suggestions

Example:
```
Review this React component for:
1. Performance optimizations
2. Best practices
3. Potential bugs
We follow the Airbnb style guide and prefer functional components with hooks.
```

### Learning from Generated Code

To maximize learning when Cline generates code for you:

- Ask for explanations of non-obvious parts
- Request alternative approaches to the same problem
- Ask about the trade-offs of the chosen solution

## Iterative Development

Cline works best in an iterative process:

1. **Start with a basic request** to get an initial solution
2. **Review and refine** by asking for specific improvements
3. **Ask follow-up questions** about implementation details
4. **Request variations** to explore different approaches

Example iterative workflow:
```
1. "Create a basic React form with name, email, and message fields"
2. "Add form validation to the previous form"
3. "Modify the form to use Formik for state management"
4. "How would I connect this form to a backend API?"
```

## Troubleshooting

### When Cline Misunderstands

If Cline misunderstands your request:

- Clarify your requirements with more specific details
- Provide examples of what you're looking for
- Break down complex requests into smaller, more manageable parts

### Handling Complex Problems

For complex problems:

- Break them down into smaller, more focused questions
- Start with a high-level approach and then dive into specific components
- Use multiple interactions to build up the solution incrementally

### Code That Doesn't Work

If Cline provides code that doesn't work as expected:

- Share the specific error messages or unexpected behaviors
- Ask for an explanation of what might be causing the issue
- Request a step-by-step debugging approach

---

# Cline 使用ガイド

このガイドでは、コーディングタスク用のAIアシスタントであるClineを効果的に使用するための一般的なヒントとベストプラクティスを提供します。

## 目次

1. [一般的なヒント](#一般的なヒント)
2. [効果的なプロンプトの作成](#効果的なプロンプトの作成)
3. [コードの取り扱い](#コードの取り扱い)
4. [反復的な開発](#反復的な開発)
5. [トラブルシューティング](#トラブルシューティング)

## 一般的なヒント

### 具体的に伝える

リクエストが具体的であるほど、Clineはより良くサポートできます。以下のような詳細を含めてください：

- プログラミング言語またはフレームワーク
- 必要な特定の機能
- 制約や要件
- そのテクノロジーに関するあなたの経験レベル

### コンテキストを提供する

既存のコードについて質問する場合は、Clineが理解するのに十分なコンテキストを提供してください：

- コードの目的
- より大きなプロジェクトにどのように適合するか
- 関連する依存関係やインポート
- トラブルシューティングの場合はエラーメッセージ

### 明確な期待を設定する

Clineに期待することを明確に述べてください：

- 「〜のコードを生成してください」
- 「これがどのように機能するか説明してください」
- 「この問題をデバッグしてください」
- 「これを改善するためにリファクタリングしてください」

## 効果的なプロンプトの作成

### プロンプトを構造化する

適切に構造化されたプロンプトには通常、以下が含まれます：

1. **タスクの説明**：Clineに何をしてほしいか
2. **コンテキスト**：関連する背景情報
3. **要件**：特定のニーズや制約
4. **例**：該当する場合、あなたが求めているものの例

### プロンプト構造の例

#### コード生成の場合

```
[言語]で[何かをする]関数/コンポーネントを作成してください。
要件：
- [特定のケース]を処理する必要があります
- [特定のライブラリ/パターン]を使用してください
- [シナリオ]のエラー処理を含めてください
```

#### コード説明の場合

```
[何かをする][言語]コードを説明してください。
特に[特定の部分]について混乱しています。
[テクノロジー]については[初心者/中級者/上級者]の経験があります。
```

#### デバッグの場合

```
[期待される動作]のはずが、代わりに[実際の動作]となるこのコードのデバッグを手伝ってください。
エラーメッセージはこちらです：[エラーメッセージ]
すでに[試したこと]を試しました。
```

## コードの取り扱い

### コードレビューのリクエスト

Clineにコードレビューを依頼する場合：

- フィードバックが欲しい側面を指定する（パフォーマンス、読みやすさ、セキュリティなど）
- 従おうとしているコーディング標準やパターンについて言及する
- 具体的な改善提案を求める

例：
```
このReactコンポーネントを以下の観点でレビューしてください：
1. パフォーマンスの最適化
2. ベストプラクティス
3. 潜在的なバグ
私たちはAirbnbスタイルガイドに従っており、フックを使用した関数コンポーネントを好みます。
```

### 生成されたコードから学ぶ

Clineがコードを生成した際に学習を最大化するには：

- 明白でない部分の説明を求める
- 同じ問題に対する代替アプローチを要求する
- 選択されたソリューションのトレードオフについて質問する

## 反復的な開発

Clineは反復的なプロセスで最も効果を発揮します：

1. **基本的なリクエストから始める**：初期ソリューションを得る
2. **レビューと改良**：特定の改善点を求める
3. **実装の詳細について質問する**
4. **バリエーションを要求する**：異なるアプローチを探る

反復的なワークフローの例：
```
1. 「名前、メール、メッセージフィールドを持つ基本的なReactフォームを作成してください」
2. 「前のフォームにフォームバリデーションを追加してください」
3. 「状態管理にFormikを使用するようにフォームを修正してください」
4. 「このフォームをバックエンドAPIにどのように接続しますか？」
```

## トラブルシューティング

### Clineが誤解した場合

Clineがリクエストを誤解した場合：

- より具体的な詳細で要件を明確にする
- あなたが求めているものの例を提供する
- 複雑なリクエストをより小さく管理しやすい部分に分解する

### 複雑な問題の処理

複雑な問題の場合：

- より焦点を絞った質問に分解する
- 高レベルのアプローチから始めて、特定のコンポーネントに掘り下げる
- 複数のやり取りを使用して段階的にソリューションを構築する

### 機能しないコード

Clineが期待通りに機能しないコードを提供した場合：

- 特定のエラーメッセージや予期しない動作を共有する
- 問題の原因となっている可能性のある説明を求める
- ステップバイステップのデバッグアプローチを要求する
