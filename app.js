/**
 * 簡易労務監査 for 中小企業 - Step 3: Application Logic
 * 状態管理とイベントハンドリング
 */

import {
    renderTopScreen,
    renderCompanyInfoScreen,
    renderAuditScreen,
    renderResultScreen,
    renderContactScreen
} from './screens.js';

import { calculateScore } from './scoring.js';
import { getRecommendations } from './recommendations.js';

// --- Global State ---
const state = {
    screen: 'top', // 'top' | 'company-info' | 'audit' | 'result' | 'contact'
    companyInfo: {},
    answers: {},
    result: null,
    recommendations: null
};

// --- App Container ---
const app = document.getElementById('app');

// --- Navigation ---
function navigateTo(screenName) {
    state.screen = screenName;
    console.log(`[App] Transitioning to: ${screenName}`, state);
    render();
}

// --- Main Render Function ---
function render() {
    if (!app) {
        console.error('#app コンテナが見つかりません');
        return;
    }

    app.innerHTML = '';
    window.scrollTo(0, 0);

    let html = '';

    switch (state.screen) {
        case 'top':
            html = renderTopScreen();
            app.innerHTML = html;
            bindTopEvents();
            break;

        case 'company-info':
            html = renderCompanyInfoScreen(state.companyInfo);
            app.innerHTML = html;
            bindCompanyInfoEvents();
            break;

        case 'audit':
            html = renderAuditScreen(state.answers);
            app.innerHTML = html;
            bindAuditEvents();
            break;

        case 'result':
            // 結果が計算されていない場合は計算する
            if (!state.result) {
                state.result = calculateScore(state.answers);
                state.recommendations = getRecommendations(state.result);
            }
            html = renderResultScreen(state.companyInfo, state.result, state.recommendations);
            app.innerHTML = html;
            bindResultEvents();
            break;

        case 'contact':
            html = renderContactScreen(state.companyInfo);
            app.innerHTML = html;
            bindContactEvents();
            break;

        default:
            console.error('Unknown screen:', state.screen);
            navigateTo('top');
            break;
    }
}

// --- Event Binding ---

// Top Screen
function bindTopEvents() {
    const btnData = document.getElementById('btn-start');
    if (btnData) {
        btnData.addEventListener('click', () => {
            navigateTo('company-info');
        });
    }
}

// Company Info Screen
function bindCompanyInfoEvents() {
    const form = document.getElementById('form-company-info');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            // 状態保存
            state.companyInfo = {
                companyName: formData.get('companyName'),
                location: formData.get('location'),
                industry: formData.get('industry'),
                employeeCount: formData.get('employeeCount'),
                countRegular: formData.get('countRegular'),
                countPart: formData.get('countPart'),
                countOther: formData.get('countOther'),
                contactName: formData.get('contactName'),
                contactEmail: formData.get('contactEmail')
            };

            navigateTo('audit');
        });
    }
}

// Audit Screen
function bindAuditEvents() {
    const form = document.getElementById('form-audit');
    const btnBack = document.getElementById('btn-back-to-info');

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            // 現在の入力（途中保存）を取得してから戻る
            if (form) saveAuditProgress(form);
            navigateTo('company-info');
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveAuditProgress(form);

            // スコア再計算を強制（戻って変更したケース対応）
            state.result = null;

            navigateTo('result');
        });
    }
}

function saveAuditProgress(form) {
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        state.answers[key] = value;
    }
}

// Result Screen
function bindResultEvents() {
    const btnBack = document.getElementById('btn-back-to-audit');

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            navigateTo('audit');
        });
    }
}

// Contact Screen
function bindContactEvents() {
    const form = document.getElementById('form-contact');
    const btnBack = document.getElementById('btn-back-to-result');

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            navigateTo('result');
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const submitData = {
                companyInfo: state.companyInfo,
                contactInfo: {
                    name: formData.get('contactName'),
                    email: formData.get('contactEmail'),
                    message: formData.get('message')
                },
                auditResult: state.result
            };

            console.log('Sending Data (Dummy):', submitData);
            alert(
                `【送信完了（デモ）】\n\n${submitData.companyInfo.companyName} 様\nお問い合わせありがとうございます。\n\n詳細内容はコンソールログに出力されています。`
            );

            // トップへ戻る
            state.answers = {};
            state.result = null;
            state.companyInfo = {};
            navigateTo('top');
        });
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('top');
});
