# Code Generation with Cline

This example demonstrates how to use Cline to generate code based on your requirements.

## Example Task

**Prompt**: "Create a simple React component that displays a counter with increment and decrement buttons."

## How to Ask Cline

When asking Cline to generate code, be specific about:

1. The programming language or framework (e.g., React, Vue, Angular)
2. The functionality you need
3. Any specific requirements (styling, performance considerations, etc.)

Example prompt:
```
Create a React functional component called Counter that:
- Displays a count value
- Has increment and decrement buttons
- Uses React hooks for state management
- Includes basic CSS styling
```

## Expected Output

Cline will generate code like this:

```jsx
import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <div className="button-container">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
```

And the corresponding CSS:

```css
.counter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.button-container {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button:hover {
  background-color: #e0e0e0;
}
```

## Tips for Better Results

1. Be specific about your requirements
2. Mention any libraries or dependencies you want to use
3. Specify coding style preferences if you have any
4. Ask for explanations if you need to understand the generated code

---

# Clineによるコード生成

この例では、要件に基づいてコードを生成するためにClineを使用する方法を示します。

## 例題

**プロンプト**: 「インクリメントボタンとデクリメントボタンを備えたカウンターを表示するシンプルなReactコンポーネントを作成してください。」

## Clineへの依頼方法

Clineにコード生成を依頼する際は、以下の点を具体的に指定してください：

1. プログラミング言語またはフレームワーク（React、Vue、Angularなど）
2. 必要な機能
3. 特定の要件（スタイリング、パフォーマンスの考慮事項など）

プロンプト例：
```
以下の条件を満たすReact関数コンポーネントCounterを作成してください：
- カウント値を表示する
- インクリメントボタンとデクリメントボタンがある
- 状態管理にReactフックを使用する
- 基本的なCSSスタイリングを含める
```

## 期待される出力

Clineは次のようなコードを生成します：

```jsx
import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter-container">
      <h2>カウンター: {count}</h2>
      <div className="button-container">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default Counter;
```

対応するCSS：

```css
.counter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.button-container {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button:hover {
  background-color: #e0e0e0;
}
```

## より良い結果を得るためのヒント

1. 要件を具体的に指定する
2. 使用したいライブラリや依存関係を明記する
3. コーディングスタイルの好みがあれば指定する
4. 生成されたコードを理解する必要がある場合は説明を求める
