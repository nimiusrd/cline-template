# Testing with Cline

This example demonstrates how to use Cline to help with writing tests for your code.

## Example Task

**Prompt**: "Write unit tests for this JavaScript function."

## How to Ask Cline

When asking Cline to help with testing, consider including:

1. The code you want to test
2. The testing framework you're using (Jest, Mocha, Pytest, etc.)
3. The types of tests you need (unit, integration, end-to-end)
4. Any specific test cases or edge cases you want to cover
5. Code coverage requirements

Example prompt:
```
Write unit tests for this JavaScript function using Jest. The function calculates the total price of a shopping cart with discounts and tax. Please include tests for normal cases, edge cases, and error handling:

function calculateTotal(items, taxRate, discountCode) {
  if (!Array.isArray(items) || typeof taxRate !== 'number' || taxRate < 0) {
    throw new Error('Invalid arguments');
  }
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  // Apply discount
  const discountRates = {
    'SAVE10': 0.1,
    'SAVE20': 0.2
  };
  
  const discountRate = discountRates[discountCode] || 0;
  const discount = subtotal * discountRate;
  
  // Calculate tax and final total
  const taxAmount = (subtotal - discount) * taxRate;
  const total = subtotal - discount + taxAmount;
  
  return {
    subtotal,
    discount,
    tax: taxAmount,
    total
  };
}
```

## Expected Output

Cline will provide comprehensive tests with explanations:

```javascript
// calculateTotal.test.js
const { calculateTotal } = require('./shoppingCart');

describe('calculateTotal function', () => {
  // Test normal case with no discount
  test('calculates total correctly with no discount', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = null;
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35); // 10*2 + 15*1
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(2.8); // (35-0) * 0.08
    expect(result.total).toBe(37.8); // 35 - 0 + 2.8
  });
  
  // Test with valid discount code
  test('applies SAVE10 discount correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = 'SAVE10';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35);
    expect(result.discount).toBe(3.5); // 35 * 0.1
    expect(result.tax).toBe(2.52); // (35-3.5) * 0.08
    expect(result.total).toBe(34.02); // 35 - 3.5 + 2.52
  });
  
  // Test with another valid discount code
  test('applies SAVE20 discount correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = 'SAVE20';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35);
    expect(result.discount).toBe(7); // 35 * 0.2
    expect(result.tax).toBe(2.24); // (35-7) * 0.08
    expect(result.total).toBe(30.24); // 35 - 7 + 2.24
  });
  
  // Test with invalid discount code
  test('handles invalid discount code by applying no discount', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = 'INVALID';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.discount).toBe(0);
    expect(result.total).toBe(37.8); // Same as no discount
  });
  
  // Test with empty cart
  test('handles empty cart correctly', () => {
    const items = [];
    const taxRate = 0.08;
    const discountCode = 'SAVE10';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.total).toBe(0);
  });
  
  // Test with zero tax rate
  test('handles zero tax rate correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0;
    const discountCode = 'SAVE10';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35);
    expect(result.discount).toBe(3.5);
    expect(result.tax).toBe(0);
    expect(result.total).toBe(31.5); // 35 - 3.5 + 0
  });
  
  // Test error handling - invalid items
  test('throws error when items is not an array', () => {
    expect(() => {
      calculateTotal('not an array', 0.08, 'SAVE10');
    }).toThrow('Invalid arguments');
  });
  
  // Test error handling - invalid tax rate
  test('throws error when tax rate is negative', () => {
    const items = [{ price: 10, quantity: 1 }];
    
    expect(() => {
      calculateTotal(items, -0.1, 'SAVE10');
    }).toThrow('Invalid arguments');
  });
  
  // Test error handling - invalid tax rate type
  test('throws error when tax rate is not a number', () => {
    const items = [{ price: 10, quantity: 1 }];
    
    expect(() => {
      calculateTotal(items, '8%', 'SAVE10');
    }).toThrow('Invalid arguments');
  });
});
```

## Testing Strategies Explained

The tests above cover several important testing strategies:

1. **Happy path testing** - Testing the function with valid inputs and expected behavior
2. **Edge case testing** - Testing boundary conditions like empty cart and zero tax rate
3. **Error handling** - Testing that the function properly validates inputs and throws errors
4. **Equivalence partitioning** - Testing representative values from different input classes
5. **Precision testing** - Ensuring calculations with decimals are accurate

## Tips for Better Testing

1. Provide the complete function or class you want to test
2. Specify your testing framework and any testing libraries you're using
3. Mention any specific testing patterns or approaches you prefer
4. Include information about your test environment if relevant
5. Ask for tests that cover edge cases and error conditions
6. Request test organization suggestions (e.g., test grouping, setup/teardown)

---

# Clineによるテスト

この例では、Clineを使用してコードのテストを作成する方法を示します。

## 例題

**プロンプト**: 「このJavaScript関数の単体テストを書いてください。」

## Clineへの依頼方法

Clineにテストの支援を依頼する際は、以下を含めることを検討してください：

1. テストしたいコード
2. 使用しているテストフレームワーク（Jest、Mocha、Pytestなど）
3. 必要なテストの種類（単体、統合、エンドツーエンド）
4. カバーしたい特定のテストケースやエッジケース
5. コードカバレッジの要件

プロンプト例：
```
Jestを使用して、このJavaScript関数の単体テストを書いてください。この関数は、割引と税金を含むショッピングカートの合計価格を計算します。通常のケース、エッジケース、およびエラー処理のテストを含めてください：

function calculateTotal(items, taxRate, discountCode) {
  if (!Array.isArray(items) || typeof taxRate !== 'number' || taxRate < 0) {
    throw new Error('Invalid arguments');
  }
  
  // 小計を計算
  const subtotal = items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  // 割引を適用
  const discountRates = {
    'SAVE10': 0.1,
    'SAVE20': 0.2
  };
  
  const discountRate = discountRates[discountCode] || 0;
  const discount = subtotal * discountRate;
  
  // 税金と最終合計を計算
  const taxAmount = (subtotal - discount) * taxRate;
  const total = subtotal - discount + taxAmount;
  
  return {
    subtotal,
    discount,
    tax: taxAmount,
    total
  };
}
```

## 期待される出力

Clineは説明付きの包括的なテストを提供します：

```javascript
// calculateTotal.test.js
const { calculateTotal } = require('./shoppingCart');

describe('calculateTotal関数', () => {
  // 割引なしの通常ケースをテスト
  test('割引なしで正しく合計を計算する', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = null;
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35); // 10*2 + 15*1
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(2.8); // (35-0) * 0.08
    expect(result.total).toBe(37.8); // 35 - 0 + 2.8
  });
  
  // 有効な割引コードでテスト
  test('SAVE10割引を正しく適用する', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = 'SAVE10';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35);
    expect(result.discount).toBe(3.5); // 35 * 0.1
    expect(result.tax).toBe(2.52); // (35-3.5) * 0.08
    expect(result.total).toBe(34.02); // 35 - 3.5 + 2.52
  });
  
  // 別の有効な割引コードでテスト
  test('SAVE20割引を正しく適用する', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = 'SAVE20';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35);
    expect(result.discount).toBe(7); // 35 * 0.2
    expect(result.tax).toBe(2.24); // (35-7) * 0.08
    expect(result.total).toBe(30.24); // 35 - 7 + 2.24
  });
  
  // 無効な割引コードでテスト
  test('無効な割引コードを割引なしとして処理する', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0.08;
    const discountCode = 'INVALID';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.discount).toBe(0);
    expect(result.total).toBe(37.8); // 割引なしと同じ
  });
  
  // 空のカートでテスト
  test('空のカートを正しく処理する', () => {
    const items = [];
    const taxRate = 0.08;
    const discountCode = 'SAVE10';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.total).toBe(0);
  });
  
  // ゼロ税率でテスト
  test('ゼロ税率を正しく処理する', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 1 }
    ];
    const taxRate = 0;
    const discountCode = 'SAVE10';
    
    const result = calculateTotal(items, taxRate, discountCode);
    
    expect(result.subtotal).toBe(35);
    expect(result.discount).toBe(3.5);
    expect(result.tax).toBe(0);
    expect(result.total).toBe(31.5); // 35 - 3.5 + 0
  });
  
  // エラー処理のテスト - 無効なアイテム
  test('itemsが配列でない場合にエラーをスローする', () => {
    expect(() => {
      calculateTotal('配列ではない', 0.08, 'SAVE10');
    }).toThrow('Invalid arguments');
  });
  
  // エラー処理のテスト - 無効な税率
  test('税率が負の場合にエラーをスローする', () => {
    const items = [{ price: 10, quantity: 1 }];
    
    expect(() => {
      calculateTotal(items, -0.1, 'SAVE10');
    }).toThrow('Invalid arguments');
  });
  
  // エラー処理のテスト - 無効な税率タイプ
  test('税率が数値でない場合にエラーをスローする', () => {
    const items = [{ price: 10, quantity: 1 }];
    
    expect(() => {
      calculateTotal(items, '8%', 'SAVE10');
    }).toThrow('Invalid arguments');
  });
});
```

## テスト戦略の説明

上記のテストは、いくつかの重要なテスト戦略をカバーしています：

1. **ハッピーパステスト** - 有効な入力と期待される動作でのテスト
2. **エッジケーステスト** - 空のカートやゼロ税率などの境界条件のテスト
3. **エラー処理** - 関数が入力を適切に検証しエラーをスローすることのテスト
4. **同値分割** - 異なる入力クラスからの代表値のテスト
5. **精度テスト** - 小数点を含む計算が正確であることの確認

## より良いテストを得るためのヒント

1. テストしたい完全な関数またはクラスを提供する
2. テストフレームワークと使用しているテストライブラリを指定する
3. 好みの特定のテストパターンやアプローチについて言及する
4. 関連する場合はテスト環境に関する情報を含める
5. エッジケースとエラー条件をカバーするテストを依頼する
6. テストの整理に関する提案を求める（テストのグループ化、セットアップ/ティアダウンなど）
