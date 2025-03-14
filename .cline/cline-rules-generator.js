#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const matter = require('gray-matter');

// 現在のディレクトリを取得
const currentDir = process.cwd();
const clineDir = path.join(currentDir, '.cline', 'rules');
const clinerulesDest = path.join(currentDir, '.clinerules');

// ユーザー入力を処理するためのインターフェース
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * rulesディレクトリ内のルールファイルを取得する
 * @returns {Promise<string[]>} ルールファイルのリスト
 */
async function getRuleFiles() {
  try {
    const files = await fs.promises.readdir(clineDir);
    return files.filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error('エラー: .clineディレクトリが見つかりません。', error.message);
    process.exit(1);
  }
}

/**
 * ファイルの内容を読み取り、Frontmatterを解析する
 * @param {string} filePath ファイルパス
 * @returns {Promise<{content: string, data: Object}>} ファイルの内容とFrontmatterデータ
 */
async function readFileWithFrontmatter(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContent);
    return { content, data };
  } catch (error) {
    console.error(`エラー: ${filePath}を読み取れませんでした。`, error.message);
    return { content: '', data: {} };
  }
}

/**
 * ユーザーにルールファイルを選択させる
 * @param {Array<{file: string, data: Object}>} filesWithMeta ルールファイルとメタデータのリスト
 * @returns {Promise<Array<{file: string, data: Object}>>} 選択されたファイルとメタデータのリスト
 */
async function selectRuleFiles(filesWithMeta) {
  return new Promise((resolve) => {
    console.log('利用可能なルールファイル:');
    filesWithMeta.forEach((item, index) => {
      const { file, data } = item;
      const title = data.title || file.replace('.md', '');
      const description = data.description ? ` - ${data.description}` : '';
      const category = data.category ? `[${data.category}]` : '';
      console.log(`${index + 1}. ${title} ${category}${description}`);
    });
    console.log('すべて選択する場合は "all" と入力してください。');
    console.log('複数選択する場合はカンマ区切りで番号を入力してください（例: 1,3,5）');

    rl.question('選択するルールファイルの番号を入力してください: ', (answer) => {
      if (answer.toLowerCase() === 'all') {
        resolve(filesWithMeta);
      } else {
        const selectedIndices = answer.split(',').map(num => parseInt(num.trim(), 10) - 1);
        const selectedFiles = selectedIndices
          .filter(index => index >= 0 && index < filesWithMeta.length)
          .map(index => filesWithMeta[index]);
        resolve(selectedFiles);
      }
    });
  });
}

/**
 * 選択されたルールファイルの内容を結合して.clinerulesファイルを生成する
 * @param {Array<{file: string, data: Object, content: string}>} selectedFiles 選択されたファイルのリスト
 */
async function generateClinerules(selectedFiles) {
  console.log('選択されたルール:');
  selectedFiles.forEach(item => {
    const title = item.data.title || item.file.replace('.md', '');
    console.log(`- ${title}`);
  });

  let content = '# プロジェクトガイドライン\n\n';

  // カテゴリごとにルールをグループ化
  const categorizedRules = {};
  selectedFiles.forEach(item => {
    const category = item.data.category || 'uncategorized';
    if (!categorizedRules[category]) {
      categorizedRules[category] = [];
    }
    categorizedRules[category].push(item);
  });

  // カテゴリごとにルールを追加
  for (const [category, rules] of Object.entries(categorizedRules)) {
    // カテゴリ名を追加（最初の文字を大文字に）
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    content += `## ${categoryName}\n\n`;

    // orderでソート
    rules.sort((a, b) => {
      const orderA = a.data.order || 999;
      const orderB = b.data.order || 999;
      return orderA - orderB;
    });

    // ルールを追加
    for (const rule of rules) {
      content += rule.content + '\n\n';
    }
  }

  // .clinerules ファイルに書き込む
  try {
    await fs.promises.writeFile(clinerulesDest, content);
    console.log(`.clinerules ファイルが正常に生成されました: ${clinerulesDest}`);
  } catch (error) {
    console.error('エラー: .clinerules ファイルの生成に失敗しました。', error.message);
  }

  rl.close();
}

/**
 * メイン関数
 */
async function main() {
  try {
    console.log('Cline Rules Generator');
    console.log('=====================');
    
    const files = await getRuleFiles();
    if (files.length === 0) {
      console.log('ルールファイルが見つかりませんでした。');
      rl.close();
      return;
    }
    
    // ファイルとそのメタデータを取得
    const filesWithMeta = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(clineDir, file);
        const { content, data } = await readFileWithFrontmatter(filePath);
        return { file, data, content };
      })
    );
    
    const selectedFiles = await selectRuleFiles(filesWithMeta);
    if (selectedFiles.length === 0) {
      console.log('ルールファイルが選択されていません。');
      rl.close();
      return;
    }
    
    await generateClinerules(selectedFiles);
  } catch (error) {
    console.error('予期しないエラーが発生しました:', error);
    rl.close();
  }
}

// プログラムを実行
main();
