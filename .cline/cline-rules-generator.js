#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const inquirer = __importStar(require("inquirer"));
const gray_matter_1 = __importDefault(require("gray-matter"));
// 現在のディレクトリを取得
const currentDir = process.cwd();
const clineDir = path.join(currentDir, 'rules');
const clinerulesDest = path.join(currentDir, '..', '.clinerules');
/**
 * rulesディレクトリ内のルールファイルを取得する
 * @returns ルールファイルのリスト
 */
async function getRuleFiles() {
    try {
        const files = await fs.promises.readdir(clineDir);
        return files.filter(file => file.endsWith('.md'));
    }
    catch (error) {
        console.error('エラー: .clineディレクトリが見つかりません。', error.message);
        process.exit(1);
    }
}
/**
 * ファイルの内容を読み取り、Frontmatterを解析する
 * @param filePath ファイルパス
 * @returns ファイルの内容とFrontmatterデータ
 */
async function readFileWithFrontmatter(filePath) {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const { content, data } = (0, gray_matter_1.default)(fileContent);
        return { content, data };
    }
    catch (error) {
        console.error(`エラー: ${filePath}を読み取れませんでした。`, error.message);
        return { content: '', data: {} };
    }
}
/**
 * ユーザーにルールファイルを選択させる
 * @param filesWithMeta ルールファイルとメタデータのリスト
 * @returns 選択されたファイルとメタデータのリスト
 */
async function selectRuleFiles(filesWithMeta) {
    // カテゴリごとにファイルをグループ化
    const categorizedFiles = {};
    filesWithMeta.forEach((item) => {
        const { data } = item;
        const category = data.category || 'uncategorized';
        if (!categorizedFiles[category]) {
            categorizedFiles[category] = [];
        }
        categorizedFiles[category].push(item);
    });
    // カテゴリごとに選択肢を作成
    const choices = [];
    // カテゴリの順序を定義（必要に応じて調整）
    const categoryOrder = ['development', 'documentation', 'frontend', 'api', 'uncategorized'];
    // カテゴリごとに選択肢を追加
    categoryOrder.forEach(category => {
        if (categorizedFiles[category] && categorizedFiles[category].length > 0) {
            // カテゴリの見出しを追加（選択不可）
            choices.push(new inquirer.Separator(`=== ${category.charAt(0).toUpperCase() + category.slice(1)} ===`));
            // カテゴリ内のファイルを追加
            categorizedFiles[category].forEach((item) => {
                const { file, data } = item;
                const title = data.title || file.replace('.md', '');
                const description = data.description ? ` - ${data.description}` : '';
                choices.push({
                    name: `${title}${description}`,
                    value: filesWithMeta.indexOf(item), // 元の配列内のインデックスを保持
                    checked: false // デフォルトでは選択されていない
                });
            });
            // カテゴリの区切り線を追加
            choices.push(new inquirer.Separator(' '));
        }
    });
    const { selectedOptions } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedOptions',
            message: '含めるルールファイルを選択してください (<a>ですべて選択):',
            choices: choices,
            pageSize: 20 // 表示する選択肢の数
        }
    ]);
    // 選択されたインデックスに対応するファイルを返す
    return selectedOptions.map((index) => filesWithMeta[index]);
}
/**
 * 選択されたルールファイルの内容を結合して.clinerulesファイルを生成する
 * @param selectedFiles 選択されたファイルのリスト
 */
async function generateClinerules(selectedFiles) {
    if (selectedFiles.length === 0) {
        console.log('ルールファイルが選択されていません。');
        return;
    }
    console.log('\n選択されたルール:');
    selectedFiles.forEach(item => {
        const title = item.data.title || item.file.replace('.md', '');
        console.log(`- ${title}`);
    });
    // カテゴリを取得
    const categories = [...new Set(selectedFiles.map(item => item.data.category || 'uncategorized'))];
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
    // 選択されたカテゴリ順にルールを追加
    for (const category of categories) {
        const rules = categorizedRules[category];
        if (!rules)
            continue;
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
    // 生成内容の確認
    console.log('\n生成される.clinerules ファイルのプレビュー:');
    console.log('----------------------------------------');
    // プレビューを表示（最初の500文字とカテゴリ構造）
    const preview = content.length > 500 ? content.substring(0, 500) + '...' : content;
    console.log(preview);
    console.log('\nカテゴリ構造:');
    categories.forEach(category => {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        const rulesCount = categorizedRules[category].length;
        console.log(`- ${categoryName} (${rulesCount}件のルール)`);
    });
    // 確認プロンプト
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: '.clinerules ファイルを生成しますか？',
            default: true
        }
    ]);
    if (!confirm) {
        console.log('\n.clinerules ファイルの生成をキャンセルしました。');
        return;
    }
    // .clinerules ファイルに書き込む
    try {
        await fs.promises.writeFile(clinerulesDest, content);
        console.log(`\n.clinerules ファイルが正常に生成されました: ${clinerulesDest}`);
    }
    catch (error) {
        console.error('エラー: .clinerules ファイルの生成に失敗しました。', error.message);
    }
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
            return;
        }
        // ファイルとそのメタデータを取得
        const filesWithMeta = await Promise.all(files.map(async (file) => {
            const filePath = path.join(clineDir, file);
            const { content, data } = await readFileWithFrontmatter(filePath);
            return { file, data, content };
        }));
        const selectedFiles = await selectRuleFiles(filesWithMeta);
        await generateClinerules(selectedFiles);
    }
    catch (error) {
        console.error('予期しないエラーが発生しました:', error);
    }
}
// プログラムを実行
main();
