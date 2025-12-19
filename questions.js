/**
 * 簡易労務監査 for 中小企業 - 質問データ定義
 */

export const QUESTIONS = [
    // 1. 労働時間管理
    {
        id: "worktime_1",
        category: "労働時間管理",
        text: "従業員の労働時間を客観的な方法（タイムカード、ICカードなど）で記録・管理していますか？",
        type: "yesno"
    },
    {
        id: "worktime_2",
        category: "労働時間管理",
        text: "法定時間外労働（1日8時間、週40時間超）の発生状況を毎月正確に把握していますか？",
        type: "yesno"
    },
    {
        id: "worktime_3",
        category: "労働時間管理",
        text: "月45時間、年360時間の残業上限規制（36協定の限度公募）を遵守できていますか？",
        type: "yesno"
    },
    {
        id: "worktime_4",
        category: "労働時間管理",
        text: "休憩時間は法令通り（6時間超で45分、8時間超で1時間）一斉に取得させていますか？",
        type: "yesno"
    },
    {
        id: "worktime_5",
        category: "労働時間管理",
        text: "管理監督者の範囲は適切に設定され、深夜労働の割増賃金は支払われていますか？",
        type: "yesno"
    },

    // 2. 就業規則・規程
    {
        id: "rules_1",
        category: "就業規則・規程",
        text: "常時10人以上の事業場として、就業規則を作成し労基署へ届け出ていますか？（10人未満でも作成を推奨）",
        type: "yesno"
    },
    {
        id: "rules_2",
        category: "就業規則・規程",
        text: "直近3年以内に就業規則を改訂し、法改正（育児介護休業法など）に対応していますか？",
        type: "yesno"
    },
    {
        id: "rules_3",
        category: "就業規則・規程",
        text: "就業規則は従業員がいつでも見られる状態（周知）になっていますか？",
        type: "yesno"
    },
    {
        id: "rules_4",
        category: "就業規則・規程",
        text: "パートタイム・有期雇用労働者向けの就業規則（または適用条項）を整備していますか？",
        type: "yesno"
    },
    {
        id: "rules_5",
        category: "就業規則・規程",
        text: "採用時の労働条件通知書（または雇用契約書）で、就業規則に基づいた条件を明示していますか？",
        type: "yesno"
    },

    // 3. 賃金・割増賃金
    {
        id: "wage_1",
        category: "賃金・割増賃金",
        text: "時間外労働、休日労働、深夜労働の割増賃金（残業代）を正しく支払っていますか？",
        type: "yesno"
    },
    {
        id: "wage_2",
        category: "賃金・割増賃金",
        text: "割増賃金の単価計算において、除外できない手当（役職手当、精皆勤手当など）を含めて計算していますか？",
        type: "yesno"
    },
    {
        id: "wage_3",
        category: "賃金・割増賃金",
        text: "固定残業代（みなし残業）を導入している場合、超過分は追加で支払っていますか？",
        type: "yesno"
    },
    {
        id: "wage_4",
        category: "賃金・割増賃金",
        text: "最低賃金（地域別・産業別）以上の賃金を支払っていることを定期的に確認していますか？",
        type: "yesno"
    },
    {
        id: "wage_5",
        category: "賃金・割増賃金",
        text: "賃金控除（社宅費、旅行積立金など）を行う場合、労使協定を締結していますか？",
        type: "yesno"
    },

    // 4. 有休管理
    {
        id: "leave_1",
        category: "有休管理",
        text: "年次有給休暇の管理簿を作成し、付与日・取得日・日数を従業員ごとに管理していますか？",
        type: "yesno"
    },
    {
        id: "leave_2",
        category: "有休管理",
        text: "年10日以上の有給休暇が付与される従業員に対し、年5日の取得義務を果たしていますか？",
        type: "yesno"
    },
    {
        id: "leave_3",
        category: "有休管理",
        text: "パートタイマーに対しても、労働日数に応じた比例付与を行っていますか？",
        type: "yesno"
    },
    {
        id: "leave_4",
        category: "有休管理",
        text: "有給休暇の取得理由を聞いたり、取得を不当に制限したりしていませんか？",
        type: "yesno"
    },
    {
        id: "leave_5",
        category: "有休管理",
        text: "育児・介護休業の申し出があった場合、規程通りに取得させていますか？",
        type: "yesno"
    },

    // 5. 社会保険・労働保険
    {
        id: "insurance_1",
        category: "社会保険・労働保険",
        text: "法人（または常時5人以上の個人事業所）として、社会保険の新規適用届を提出済みですか？",
        type: "yesno"
    },
    {
        id: "insurance_2",
        category: "社会保険・労働保険",
        text: "加入要件（週20時間以上など）を満たすパート・アルバイトも社会保険・雇用保険に加入させていますか？",
        type: "yesno"
    },
    {
        id: "insurance_3",
        category: "社会保険・労働保険",
        text: "入社手続において、法定の期限内に資格取得届を提出していますか？",
        type: "yesno"
    },
    {
        id: "insurance_4",
        category: "社会保険・労働保険",
        text: "毎年、「算定基礎届」や「労働保険の年度更新」の申告を適正に行っていますか？",
        type: "yesno"
    },
    {
        id: "insurance_5",
        category: "社会保険・労働保険",
        text: "昇給・降給など固定的賃金の変動があった場合、月額変更届（随時改定）を行っていますか？",
        type: "yesno"
    },

    // 6. 安全衛生
    {
        id: "safety_1",
        category: "安全衛生",
        text: "年1回の定期健康診断を全対象従業員に受診させていますか？",
        type: "yesno"
    },
    {
        id: "safety_2",
        category: "安全衛生",
        text: "健康診断の結果、異常所見がある従業員に対して医師の意見聴取や就業措置を行っていますか？",
        type: "yesno"
    },
    {
        id: "safety_3",
        category: "安全衛生",
        text: "（従業員50名以上の場合）ストレスチェックを年1回実施していますか？",
        type: "yesno"
    },
    {
        id: "safety_4",
        category: "安全衛生",
        text: "労災リスク評価（リスクアセスメント）や職場巡視を定期的に行っていますか？",
        type: "yesno"
    },
    {
        id: "safety_5",
        category: "安全衛生",
        text: "過去に労災隠し（労災事故の報告遅れや虚偽報告）をしたことはありませんか？",
        type: "yesno"
    }
];

// カテゴリ一覧定義
export const CATEGORY_LIST = [
    "労働時間管理",
    "就業規則・規程",
    "賃金・割増賃金",
    "有休管理",
    "社会保険・労働保険",
    "安全衛生"
];
