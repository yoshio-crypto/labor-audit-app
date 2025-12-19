/**
 * 簡易労務監査 for 中小企業 - スコアリングロジック
 */

import { CATEGORY_LIST } from './questions.js';

/**
 * 回答を集計してスコアとランクを計算する関数
 * @param {Object} answers - { questionId: 'yes' | 'no' | 'unknown', ... }
 */
export function calculateAuditResult(answers) {
    let totalScore = 0;
    const categoryScores = {};

    // カテゴリスコアの初期化
    CATEGORY_LIST.forEach(cat => {
        categoryScores[cat] = 0;
    });

    // 回答の集計
    // answersのキー(questionId)から質問データを引くのではなく、
    // questions.jsからすべての質問をループしてanswersを参照するアプローチも可能だが、
    // ここではシンプルにanswersのキーには質問IDが含まれ、カテゴリとのマッピングができる前提とする
    // ※今回は calculateAuditResult の引数に questionDefinitions も渡す設計にするか、
    // questions.js をインポートして照合するのが確実。

    // 簡易的に実装するため、questions.jsをインポートする必要があります。
    // ここではimport済みのQUESTIONSを使います。
}

// 循環参照を避けるため、QUESTIONSをここでインポートし直すか、引数で受け取る設計にします。
// 今回はモジュールとして完結させるため、questions.jsからインポートします。
import { QUESTIONS } from './questions.js';

export function calculateScore(userAnswers) {
    let totalScore = 0;
    const categoryScores = {};

    // 初期化
    CATEGORY_LIST.forEach(cat => {
        categoryScores[cat] = 0;
    });

    QUESTIONS.forEach(q => {
        const ans = userAnswers[q.id];
        // yes: 1点, no: 0点, unknown: 0点
        // 未回答の場合は0点扱い
        if (ans === 'yes') {
            totalScore += 1;
            categoryScores[q.category] += 1;
        }
    });

    const rank = getRiskRank(totalScore);

    return {
        totalScore,
        categoryScores,
        riskRank: rank
    };
}

/**
 * スコアに基づくリスクランク判定
 * A: 26〜30（低リスク）
 * B: 21〜25（注意）
 * C: 16〜20（要改善）
 * D: 0〜15（緊急対応）
 */
function getRiskRank(score) {
    if (score >= 26) return 'A';
    if (score >= 21) return 'B';
    if (score >= 16) return 'C';
    return 'D';
}

export const RANK_DETAILS = {
    A: { label: '低リスク', color: '#10B981' }, // Green
    B: { label: '注意', color: '#3B82F6' },     // Blue
    C: { label: '要改善', color: '#F59E0B' },   // Orange
    D: { label: '緊急対応', color: '#EF4444' }  // Red
};
