/**
 * 簡易労務監査 for 中小企業 - Step 3: Screen Rendering
 * 各画面のHTML生成ロジック（本実装）
 */

import { QUESTIONS, CATEGORY_LIST } from './questions.js';

/**
 * トップ画面
 */
/**
 * トップ画面
 * @param {Array} history - 過去の診断履歴リスト
 */
export function renderTopScreen(history = []) {
    let historyHtml = '';

    if (history.length > 0) {
        const listItems = history.map(item => `
            <div style="padding: 1rem; border-bottom: 1px solid #eee; font-size: 0.9rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="color: var(--color-primary);">${item.companyName || '（未入力）'}</strong>
                    <span style="color: #666;">${item.date}</span>
                </div>
                <div>
                    スコア: <strong>${item.totalScore}/30</strong> 
                    <span style="margin: 0 0.5rem;">|</span> 
                    ランク: <strong>${item.riskRank}</strong>
                </div>
            </div>
        `).join('');

        historyHtml = `
            <div class="card" style="max-width: 600px; margin: 3rem auto 0; padding: 1.5rem;">
                <h3 style="margin-bottom: 1rem; font-size: 1.1rem; color: var(--color-gray-800);">最近の診断履歴（ローカル保存）</h3>
                <div style="border: 1px solid #eee; border-radius: 4px;">
                    ${listItems}
                </div>
            </div>
        `;
    }

    return `
        <div class="screen container text-center">
            <div style="margin: 4rem 0 2rem;">
                <h1 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 1rem;">
                    簡易労務監査 for 中小企業
                </h1>
                <p style="font-size: 1.2rem; color: var(--color-gray-800); margin-bottom: 3rem;">
                    貴社の労務管理リスクを10分で見える化し、<br>
                    明日からの改善アクションを明確にします。
                </p>
                
                <div class="card" style="max-width: 600px; margin: 0 auto; padding: 2rem;">
                    <h3 style="margin-bottom: 1rem;">診断の流れ</h3>
                    <div style="display: flex; justify-content: space-around; margin-bottom: 2rem; font-size: 0.9rem;">
                        <div>Step 1<br>会社情報</div>
                        <div>Step 2<br>30問チェック</div>
                        <div>Step 3<br>結果レポート</div>
                    </div>
                    <button id="btn-start" class="btn">診断を開始する</button>
                </div>
            </div>
            
            ${historyHtml}
        </div>
    `;
}

/**
 * 会社情報入力画面
 * @param {Object} currentData - 現在の入力値（戻ってきたとき用）
 */
export function renderCompanyInfoScreen(currentData = {}) {
    return `
        <div class="screen container">
            <h2 class="text-center" style="margin-bottom: 2rem;">Step 1: 会社情報の入力</h2>
            <div class="card" style="max-width: 800px; margin: 0 auto;">
                <form id="form-company-info">
                    <div class="form-group grid-2">
                        <div>
                            <label>会社名 <span style="color:red">*</span></label>
                            <input type="text" name="companyName" class="form-input" required 
                                value="${currentData.companyName || ''}">
                        </div>
                        <div>
                            <label>所在地</label>
                            <input type="text" name="location" class="form-input" 
                                value="${currentData.location || ''}">
                        </div>
                    </div>

                    <div class="form-group grid-2">
                        <div>
                            <label>業種</label>
                            <select name="industry" class="form-input">
                                <option value="">選択してください</option>
                                <option value="manufacture" ${currentData.industry === 'manufacture' ? 'selected' : ''}>製造業</option>
                                <option value="construction" ${currentData.industry === 'construction' ? 'selected' : ''}>建設業</option>
                                <option value="transport" ${currentData.industry === 'transport' ? 'selected' : ''}>運輸業</option>
                                <option value="retail" ${currentData.industry === 'retail' ? 'selected' : ''}>卸売・小売業</option>
                                <option value="service" ${currentData.industry === 'service' ? 'selected' : ''}>サービス業</option>
                                <option value="it" ${currentData.industry === 'it' ? 'selected' : ''}>IT・情報通信</option>
                                <option value="medical" ${currentData.industry === 'medical' ? 'selected' : ''}>医療・福祉</option>
                                <option value="other" ${currentData.industry === 'other' ? 'selected' : ''}>その他</option>
                            </select>
                        </div>
                        <div>
                            <label>従業員数（全体） <span style="color:red">*</span></label>
                            <input type="number" name="employeeCount" class="form-input" required min="0" placeholder="人"
                                value="${currentData.employeeCount || ''}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>雇用形態別人数（任意）</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                            <div>
                                <small>正社員</small>
                                <input type="number" name="countRegular" class="form-input" min="0" 
                                    value="${currentData.countRegular || ''}">
                            </div>
                            <div>
                                <small>パート・アルバイト</small>
                                <input type="number" name="countPart" class="form-input" min="0" 
                                    value="${currentData.countPart || ''}">
                            </div>
                            <div>
                                <small>その他</small>
                                <input type="number" name="countOther" class="form-input" min="0" 
                                    value="${currentData.countOther || ''}">
                            </div>
                        </div>
                    </div>

                    <hr style="margin: 2rem 0; border: none; border-top: 1px solid var(--color-gray-200);">

                    <div class="form-group grid-2">
                        <div>
                            <label>担当者名</label>
                            <input type="text" name="contactName" class="form-input" 
                                value="${currentData.contactName || ''}">
                        </div>
                        <div>
                            <label>メールアドレス</label>
                            <input type="email" name="contactEmail" class="form-input" 
                                value="${currentData.contactEmail || ''}">
                        </div>
                    </div>

                    <div class="text-center" style="margin-top: 2rem;">
                        <button type="submit" class="btn">次へ進む</button>
                    </div>
                </form>
            </div>
            <style>
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }
            </style>
        </div>
    `;
}

/**
 * 監査チェック画面
 * @param {Object} currentAnswers - 現在の回答（戻ってきたとき用）
 */
export function renderAuditScreen(currentAnswers = {}) {
    // カテゴリごとにHTMLを生成
    const categorySections = CATEGORY_LIST.map((category, catIndex) => {
        // このカテゴリに属する質問を抽出
        const categoryQuestions = QUESTIONS.filter(q => q.category === category);

        const questionsHtml = categoryQuestions.map((q, qIndex) => {
            const val = currentAnswers[q.id];
            return `
                <div class="question-item" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #eee;">
                    <p style="font-weight: 500; margin-bottom: 0.5rem;">Q${qIndex + 1}. ${q.text}</p>
                    <div style="display: flex; gap: 1.5rem;">
                        <label style="cursor: pointer;">
                            <input type="radio" name="${q.id}" value="yes" ${val === 'yes' ? 'checked' : ''} required> はい
                        </label>
                        <label style="cursor: pointer;">
                            <input type="radio" name="${q.id}" value="no" ${val === 'no' ? 'checked' : ''}> いいえ
                        </label>
                        <label style="cursor: pointer;">
                            <input type="radio" name="${q.id}" value="unknown" ${val === 'unknown' ? 'checked' : ''}> わからない
                        </label>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="card" style="margin-bottom: 2rem;">
                <h3 style="color: var(--color-primary); border-bottom: 2px solid var(--color-primary); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
                    ${catIndex + 1}. ${category}
                </h3>
                ${questionsHtml}
            </div>
        `;
    }).join('');

    return `
        <div class="screen container">
            <h2 class="text-center" style="margin-bottom: 2rem;">Step 2: 労務監査チェック（全30問）</h2>
            <form id="form-audit">
                ${categorySections}
                <div class="text-center" style="margin-top: 2rem;">
                    <button type="button" id="btn-back-to-info" class="btn btn--secondary" style="margin-right: 1rem;">戻る</button>
                    <button type="submit" class="btn">結果を見る</button>
                </div>
            </form>
        </div>
    `;
}

/**
 * 結果画面
 * @param {Object} companyInfo 
 * @param {Object} scoringResult 
 * @param {Object} recommendationData 
 */
export function renderResultScreen(companyInfo, scoringResult, recommendationData) {
    const { totalScore, categoryScores, riskRank } = scoringResult;
    const { rankLabel, rankColor, summaryTitle, summaryBody, categoryAdvice } = recommendationData;
    const today = new Date().toLocaleDateString('ja-JP');

    // カテゴリスコアのテーブル行生成
    const scoreRows = Object.keys(categoryScores).map(cat => {
        const score = categoryScores[cat];
        return `
            <tr>
                <td style="font-weight: bold;">${cat}</td>
                <td style="text-align: center;">${score} / 5</td>
                <td>
                    <div class="no-print" style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; width: 100px;">
                        <div style="background: var(--color-primary); width: ${(score / 5) * 100}%; height: 100%;"></div>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // カテゴリ別アドバイスHTML
    const specificAdviceHtml = categoryAdvice.map(advice => `
        <div style="margin-bottom: 1rem; padding: 1rem; border-left: 4px solid var(--color-secondary); page-break-inside: avoid;">
            <strong style="color: var(--color-primary); font-size: 1.1rem;">${advice.category}</strong>
            <p style="margin-top: 0.5rem; font-size: 1rem;">${advice.text}</p>
        </div>
    `).join('');

    return `
        <div class="screen container">
            <!-- 印刷用ヘッダー -->
            <div class="header-section" style="display: none;">
                <div class="report-title">簡易労務監査 書面レポート</div>
                <div class="meta-info">
                    <p>${companyInfo.companyName || '＿＿＿＿＿＿＿＿'} 御中</p>
                    <p>診断日: ${today}</p>
                </div>
            </div>

            <h2 class="text-center no-print" style="margin-bottom: 2rem;">Step 3: 診断結果レポート</h2>
            
            <!-- サマリー -->
            <div class="card text-center" style="background: linear-gradient(to bottom right, #ffffff, #f1f5f9); page-break-inside: avoid;">
                <p class="no-print" style="color: var(--color-gray-500); margin-bottom: 0.5rem;">${companyInfo.companyName || '貴社'} の診断結果</p>
                
                <div style="display: flex; justify-content: center; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <div>
                        <div style="font-size: 1rem;">総合スコア</div>
                        <div style="font-size: 3rem; font-weight: bold; color: var(--color-primary);">
                            ${totalScore}<span style="font-size: 1.5rem;">/30</span>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 1rem;">リスクランク</div>
                        <div style="font-size: 2.5rem; font-weight: bold; color: ${rankColor}; text-shadow: 1px 1px 0 #fff;">
                            ${riskRank} : ${rankLabel}
                        </div>
                    </div>
                </div>

                <div style="text-align: left; background: white; padding: 1.5rem; border-radius: 8px;">
                    <h3 style="color: ${rankColor}; margin-bottom: 0.5rem;">${summaryTitle}</h3>
                    <p style="line-height: 1.8;">${summaryBody}</p>
                </div>
            </div>

            <div class="grid-print-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- カテゴリスコア (テーブル形式) -->
                <div class="card" style="page-break-inside: avoid;">
                    <h3>分野別スコア詳細</h3>
                    <div style="margin-top: 1rem;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f8fafc;">
                                    <th style="padding: 8px; text-align: left;">カテゴリ</th>
                                    <th style="padding: 8px; text-align: center;">スコア</th>
                                    <th class="no-print" style="padding: 8px;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${scoreRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 推奨アクション -->
                <div class="card">
                    <h3>推奨アクション・コメント</h3>
                    <div style="margin-top: 1rem;">
                        ${specificAdviceHtml}
                    </div>
                </div>
            </div>
            
            <style>
             @media (max-width: 768px) { 
                div[style*="grid-template-columns"] { 
                    grid-template-columns: 1fr !important; 
                } 
             }
            </style>

            <!-- 印刷用フッター -->
            <div class="footer-section" style="display: none; margin-top: 2rem; border-top: 1px solid #ccc; padding-top: 1rem;">
                <p><strong>【監修・お問い合わせ】</strong></p>
                <p>〇〇社会保険労務士事務所</p>
                <p>〒000-0000 東京都〇〇区〇〇 1-2-3</p>
                <p>TEL: 03-0000-0000 / Email: contact@example.com</p>
            </div>

            <!-- 見直しガイド (画面表示のみ) -->
            <div class="card text-left no-print" style="margin-top: 2rem;">
                <h3 style="margin-bottom: 1rem;">この結果をもとに見直すべきポイント</h3>
                <p style="margin-bottom: 1rem;">
                    スコアが低い分野ほど、法令違反やトラブルに発展しやすい領域です。
                    この結果をもとに、次の順番で見直しの優先順位を整理してください。
                </p>
                <ol style="padding-left: 1.2rem; margin-bottom: 1rem; line-height: 1.7;">
                    <li>スコアが 3/5 以下の分野から優先的に確認する</li>
                    <li>「ルールがない」のか「運用されていない」のかを切り分ける</li>
                    <li>いつまでに・誰が・何を修正するかを決める</li>
                </ol>
            </div>

            <div class="text-center no-print" style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
                <button id="btn-back-to-audit" class="btn btn--secondary">チェックリストを見直す</button>
                <button onclick="window.print()" class="btn" style="background-color: #4b5563;">
                    🖨️ PDFとして保存/印刷する
                </button>
            </div>
        </div>
    `;
}

/**
 * 問い合わせ画面
 * @param {Object} companyInfo 
 */
export function renderContactScreen(companyInfo) {
    return `
        <div class="screen container">
            <h2 class="text-center" style="margin-bottom: 2rem;">お問い合わせ</h2>
            <div class="card" style="max-width: 600px; margin: 0 auto;">
                <form id="form-contact">
                    <p style="margin-bottom: 1.5rem;">以下の内容で社労士事務所へ送信します。</p>
                    
                    <div class="form-group">
                        <label>会社名</label>
                        <input type="text" class="form-input" value="${companyInfo.companyName || ''}" disabled>
                    </div>
                    <div class="form-group grid-2">
                        <div>
                            <label>担当者名 <span style="color:red">*</span></label>
                            <input type="text" name="contactName" class="form-input" required
                                value="${companyInfo.contactName || ''}">
                        </div>
                        <div>
                            <label>メールアドレス <span style="color:red">*</span></label>
                            <input type="email" name="contactEmail" class="form-input" required
                                value="${companyInfo.contactEmail || ''}">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>ご相談内容・備考</label>
                        <textarea name="message" class="form-input" rows="5" placeholder="例：就業規則の改定について相談したい"></textarea>
                    </div>

                    <div class="text-center" style="margin-top: 2rem;">
                        <button type="button" id="btn-back-to-result" class="btn btn--secondary" style="margin-right: 1rem;">戻る</button>
                        <button type="submit" class="btn">送信する</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}
