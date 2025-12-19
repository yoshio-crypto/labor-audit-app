/**
 * 簡易労務監査 for 中小企業 - コメント／推奨アクション生成
 */

import { RANK_DETAILS } from './scoring.js';

/**
 * 結果に基づいた推奨テキストを生成する
 * @param {Object} result - calculateScoreの戻り値 { totalScore, categoryScores, riskRank }
 */
export function getRecommendations(result) {
    const { totalScore, categoryScores, riskRank } = result;

    const summary = generateSummaryComment(riskRank, totalScore);
    const categoryAdvice = generateCategoryAdvice(categoryScores);

    return {
        rankLabel: RANK_DETAILS[riskRank].label,
        rankColor: RANK_DETAILS[riskRank].color,
        summaryTitle: summary.title,
        summaryBody: summary.body,
        categoryAdvice: categoryAdvice
    };
}

function generateSummaryComment(rank, totalScore) {
    switch (rank) {
        case 'A':
            return {
                title: "素晴らしい管理体制です",
                body: "現在の労務管理体制は非常に良好です。基本的な法的義務は概ねクリアできています。今後は、より働きやすい職場環境の整備や、法改正への継続的な対応を行うことで、さらなる組織力の向上が期待できます。油断せず、定期的なチェックを継続してください。"
            };
        case 'B':
            return {
                title: "概ね良好ですが、一部にリスクがあります",
                body: "労務管理の基本は押さえられていますが、いくつかの項目で改善の余地が見られます。特に点数が低かった項目については、放置すると将来的にトラブルの火種になる可能性があります。早めの対策を行うことで、安定した経営基盤を構築しましょう。"
            };
        case 'C':
            return {
                title: "リスクが高まっています。改善が必要です",
                body: "複数の重要項目で未対応の部分が見受けられます。現状のままでは、労使トラブルや行政是正の対象となるリスクが否定できません。経営上の重要課題として捉え、優先順位をつけて計画的な改善に取り組むことを強くお勧めします。"
            };
        case 'D':
        default:
            return {
                title: "緊急の対応が必要です",
                body: "非常に危険な状態です。労働基準法をはじめとする関係法令に対して大幅な未対応項目があり、いつ重大な労務トラブルが発生してもおかしくありません。経営リスクとして直ちに認識し、専門家の支援を仰ぎながら、早急に是正措置を講じてください。"
            };
    }
}

function generateCategoryAdvice(categoryScores) {
    const adviceList = [];

    // 各カテゴリ5点満点
    // 3点以下の場合に警告コメントを出すなどのロジック

    // 1. 労働時間管理
    if (categoryScores['労働時間管理'] < 5) {
        adviceList.push({
            category: '労働時間管理',
            text: "労働時間の把握は労務管理の基本です。客観的な記録がない場合、未払い残業代請求のリスクが高まります。また、36協定の届出漏れは法違反となりますので、直ちに確認してください。"
        });
    }

    // 2. 就業規則・規程
    if (categoryScores['就業規則・規程'] < 5) {
        adviceList.push({
            category: '就業規則・規程',
            text: "就業規則は会社の憲法です。未作成や古いままの放置は、トラブル発生時に会社を守れない原因となります。直近の法改正（育児介護、ハラスメント等）に対応した改訂を検討してください。"
        });
    }

    // 3. 賃金・割増賃金
    if (categoryScores['賃金・割増賃金'] < 5) {
        adviceList.push({
            category: '賃金・割増賃金',
            text: "賃金計算の誤りは、遡及して多額の支払いを命じられる最大のリスク要因です。特に「手当を含めた割増単価の計算」が正しく行われているか、専門的な視点での再確認を推奨します。"
        });
    }

    // 4. 有休管理
    if (categoryScores['有休管理'] < 5) {
        adviceList.push({
            category: '有休管理',
            text: "年5日の有給取得は法的義務です。管理簿を作成し、計画的に取得させる仕組みを導入しなければ、罰則の対象となり得ます。取得状況の可視化から始めましょう。"
        });
    }

    // 5. 社会保険・労働保険
    if (categoryScores['社会保険・労働保険'] < 5) {
        adviceList.push({
            category: '社会保険・労働保険',
            text: "加入漏れは従業員の将来に関わる重大な問題です。パートタイマーの加入要件確認や、年度更新・算定基礎届の適正な手続きができているか、改めて確認が必要です。"
        });
    }

    // 6. 安全衛生
    if (categoryScores['安全衛生'] < 5) {
        adviceList.push({
            category: '安全衛生',
            text: "健康診断の実施は会社の義務です。事後の医師確認やストレスチェックを含め、従業員の健康を守る体制づくりは、生産性向上やリスク回避に不可欠です。"
        });
    }

    // 全て満点の場合
    if (adviceList.length === 0) {
        adviceList.push({
            category: '全体',
            text: "各カテゴリにおいて高い水準で管理されています。法改正情報のキャッチアップを継続し、優良な職場環境を維持してください。"
        });
    }

    return adviceList;
}
