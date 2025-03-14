#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
 * ファイルの内容を読み取る
 * @param {string} filePath ファイルパス
 * @returns {Promise<string>} ファイルの内容
 */
async function readFile(filePath) {
  try {
    return await fs.promises.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`エラー: ${filePath}を読み取れませんでした。`, error.message);
    return '';
  }
}

/**
 * ユーザーにルールファイルを選択させる
 * @param {string[]} files ルールファイルのリスト
 * @returns {Promise<string[]>} 選択されたファイルのリスト
 */
async function selectRuleFiles(files) {
  return new Promise((resolve) => {
    console.log('利用可能なルールファイル:');
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.replace('.md', '')}`);
    });
    console.log('すべて選択する場合は "all" と入力してください。');
    console.log('複数選択する場合はカンマ区切りで番号を入力してください（例: 1,3,5）');

    rl.question('選択するルールファイルの番号を入力してください: ', (answer) => {
      if (answer.toLowerCase() === 'all') {
        resolve(files);
      } else {
        const selectedIndices = answer.split(',').map(num => parseInt(num.trim(), 10) - 1);
        const selectedFiles = selectedIndices
          .filter(index => index >= 0 && index < files.length)
          .map(index => files[index]);
        resolve(selectedFiles);
      }
    });
  });
}

/**
 * 選択されたルールファイルの内容を結合して.clinerulesファイルを生成する
 * @param {string[]} selectedFiles 選択されたファイルのリスト
 */
async function generateClinerules(selectedFiles) {
  console.log('選択されたルール:');
  selectedFiles.forEach(file => console.log(`- ${file}`));

  let content = '# プロジェクトガイドライン\n\n';

  for (const file of selectedFiles) {
    const filePath = path.join(clineDir, file);
    const fileContent = await readFile(filePath);
    const contentWithoutTitle = fileContent.split('\n').join('\n');    
    content += contentWithoutTitle + '\n';
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
    
    const selectedFiles = await selectRuleFiles(files);
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
