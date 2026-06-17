/* ==========================================================================
   ButlerCrab Website Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initCopyHandlers();
  initTerminalSimulation();
  initWebUIConsole();
});

/* ==========================================================================
   1. 多國語言字典與切換邏輯 (Multi-language i18n)
   ========================================================================== */
const locales = {
  "zh-TW": {
    "head.title": "ButlerCrab — 舊電腦重生成為安全隱私的本地家庭總管 AI",
    "nav.features": "功能特性",
    "nav.skills": "技能市集",
    "nav.dev_docs": "開發者文件",
    "nav.download": "立即下載",
    "hero.badge": "ButlerCrab v1.0.0 正式發布",
    "hero.title": "家裡舊電腦重生成為<br><span class=\"gradient-text\">全家群組隨身的 AI 智慧管家</span>",
    "hero.subtitle": "不只為您個人，更是為全家人量身打造的 AI 智慧管家！只要加入同一個家庭 LINE/Telegram 群組，AI 就能自動認出是誰在說話，並在保護個人隱私的前提下，各自打理專屬的行事曆與帳戶設定，資料安全絕不混淆。",
    "hero.btnDownload": "免費下載 Windows 安裝包 (.exe)",
    "hero.btnGithub": "GitHub 原始碼",
    "terminal.copySuccess": "複製成功",
    "terminal.userQuery": "\"檢查我明天的 Google 日曆，如果有會面，請在會前一小時通知我，並開啟智慧空調。\"",
    "terminal.listening": "ButlerCrab 已就緒，隨時待命...",
    "features.title": "專為家庭守護與自動化打造的本地 AI 功能",
    "features.desc": "為追求極致隱私與自動化生產力的使用者而設計",
    "features.f1.title": "100% 本地與隱私優先",
    "features.f1.desc": "所有對話與生活數據皆儲存在您放在家裡的舊電腦中。絕不上傳雲端、絕不用於訓練外部模型，隱私防護滴水不漏。",
    "features.f2.title": "超強記性，像家人一樣懂你",
    "features.f2.desc": "自動記住您說過的每一句話與家庭習慣，不需要每次重複解釋，對話越久越有默契。",
    "features.f3.title": "跨平台對話與智慧自動化",
    "features.f3.desc": "支援 LINE、Telegram、WhatsApp、Discord 等 11 種常用通訊軟體，出門在外傳訊即可隨身控管總管。搭配獨家工具路由技術，可節省 80% 以上 Token 消耗，使本地推理速度提升 5 倍，且省電省錢！",
    "features.f4.title": "直覺式 Web UI 控制台",
    "features.f4.desc": "提供精緻的響應式 Web 操作介面。支援輕量級極簡設定，輕鬆配置家庭成員、智慧連動與下載擴充技能。",
    "features.f5.title": "家庭群組共用與個人空間隔離",
    "features.f5.desc": "打破個人 AI 限制。在同個家庭群組或本機電腦中，AI 能自動識別不同成員，並動態切換專屬的上下文、個人金鑰與行事曆，兼顧家庭協作與個人隱私安全。",
    "features.f6.title": "舊視訊鏡頭變身隱私安全警報器",
    "features.f6.desc": "免買訂閱制雲端攝影機，利用家裡舊鏡頭進行安全警戒，發現陌生人徘徊時即時傳送 LINE/Telegram 警報。",
    "skills.title": "官方技能市集目錄",
    "skills.desc": "一鍵安裝，快速擴展您的家庭總管能力",
    "download.title": "立即開始使用 ButlerCrab",
    "download.desc": "本機運行，免除繁瑣設定。下載對應平台的安裝包即可開始體驗。",
    "download.span": "下載適用於",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac 電腦 (.dmg)",
    "footer.desc": "100% 本地運行的隱私優先 AI Agent 協作平台",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. 本專案對個人與家庭使用者完全免費。基於 Business Source License 1.1 (BSL 1.1) 授權協議釋出，商業使用請聯絡取得授權。",
    
    // Skills
    "skills.gmail_connector.desc": "本地整合 Google Mail API，支援自動分類郵件、起草回覆與排程發信，保持安全憑證隔離。",
    "skills.scheduler_pro.desc": "解鎖複雜 DAG 任務工作流排程。支援多步驟錯誤重試、變數鏈傳遞與事件驱动監聽器。",
    "skills.smart_home_link.desc": "對接本地 Home Assistant 平台，支援利用對話控制智慧家電，並依據排程自動執行場景。",
    "skills.calendar_sync.desc": "串接 Google 日曆與 Outlook 日曆，自動同步日程並能透過 RAG 提供會前背景簡報。",
    "skills.local_vision.desc": "調用本機相機進行 YOLO 目標偵測與即時影像辨識，並將事件推送至排程核心執行反應動作。",
    "skills.system_terminal.desc": "允許 Agent 在本機安全沙盒內執行終端機指令，執行打包、專案建置與日常檔案管理任務。",
    "mockup.sidebar.overview": "總覽",
    "mockup.sidebar.chat": "即時對話",
    "mockup.sidebar.skills": "技能市集",
    "mockup.sidebar.scheduler": "任務排程",
    "mockup.sidebar.cameras": "安全監控",
    "mockup.sidebar.settings": "系統設定",
    "mockup.profile.admin": "管理員",
    "mockup.header.refresh": "重新整理",
    "mockup.header.restart": "重啟服務",
    "mockup.header.model": "進階智慧大腦 (Ollama)",
    "mockup.overview.tokens": "今日對話字數",
    "mockup.overview.tokens_sub": "本週累計：31,530 字",
    "mockup.overview.skills": "已載入技能",
    "mockup.overview.skills_sub": "已載入 68 項智慧生活技能",
    "mockup.overview.online": "已啟用",
    "mockup.overview.disabled": "未啟用",
    "mockup.overview.telegram_sub": "背景接收通知執行中",
    "mockup.overview.line_sub": "前往訊息通道設定",
    "mockup.overview.recent_chats": "近期對話",
    "mockup.overview.new_chat": "開啟對話",
    "mockup.overview.no_history": "尚無歷史對話記錄",
    "mockup.overview.quick_actions": "快速操作",
    "mockup.overview.manage_family": "管理家庭成員",
    "mockup.chat.response": "已為您規劃並排定以下任務工作流：",
    "mockup.chat.step1": "讀取本地行事曆行程 (尋獲 1 個會面「家庭聚餐」)",
    "mockup.chat.step2": "設定通知排程 (成功，預定於 08:00 AM 發送提醒)",
    "mockup.chat.step3": "已自動開啟客廳冷氣 (設定溫度為 24°C)",
    "mockup.skills.desc": "管理已安裝技能，或從市集下載新技能。所有技能皆在本地安全執行。",
    "mockup.skills.installed": "已啟用技能 (81)",
    "mockup.skills.marketplace": "技能市集",
    "mockup.skills.1password": "連接您的個人保險箱，安全保管各類網站密碼。",
    "mockup.skills.applenotes": "安全讀取、建立與管理您的個人備忘錄。",
    "mockup.skills.blogwatcher": "訂閱喜愛的部落格或新聞，每日定時摘要給您。",
    "mockup.skills.blucli": "連接家中的智慧音響，自動播放您想聽的音樂。",
    "mockup.skills.calculator": "進行家庭帳務、簡單記帳與數學公式計算。",
    "mockup.skills.camsnap": "連接家中的安全攝影機與視訊鏡頭，即時進行安全偵測。",
    "mockup.scheduler.desc": "設定本地端背景排程，在特定時間或滿足特定事件觸發條件時，自動喚醒管家執行任務。",
    "mockup.scheduler.col_task": "排程工作名稱",
    "mockup.scheduler.col_trigger": "觸發機制",
    "mockup.scheduler.col_status": "運行狀態",
    "mockup.scheduler.every10": "每 10 分鐘",
    "mockup.scheduler.monfri": "週一至週五 08:00 AM",
    "mockup.scheduler.event1hr": "會面開始前 1 小時",
    "mockup.scheduler.active": "進行中",
    "mockup.cameras.desc": "管理您家中的攝影機與 USB 鏡頭。所有影像辨識皆在本機電腦處理，隱私安全無虞，影像絕對不外流。",
    "mockup.cameras.register": "連接新鏡頭",
    "mockup.cameras.scan": "掃描家用網路",
    "mockup.cameras.desktop": "桌面鏡頭",
    "mockup.cameras.nb": "筆電鏡頭",
    "mockup.cameras.protection": "防護狀態",
    "mockup.cameras.bg_guard": "啟用背景警戒",
    "mockup.cameras.edge_text": "本地晶片加速中",
    "mockup.cameras.feed_resolution": "畫質：高畫質 1080p · USB 鏡頭",
    "mockup.cameras.protocol_label": "連線協定",
    "mockup.cameras.protocol_val": "本機影音連線",
    "mockup.cameras.protection_val": "🔒 已儲存於本機安全防護鎖中",
    "mockup.settings.general": "一般設定",
    "mockup.settings.device_name": "管家稱呼",
    "mockup.settings.device_name_desc": "本機運行的 AI 管家識別稱呼。",
    "mockup.settings.model": "智慧大腦配置",
    "mockup.settings.provider": "預設大腦推理引擎",
    "mockup.settings.provider_desc": "選擇本地 Ollama 引擎（免費）或接入雲端 API 端點。",
    "mockup.settings.provider_local": "本地免費推理 (Ollama)",
    "mockup.settings.provider_cloud": "進階雲端大腦 (Gemini)",
    
    "hero.ctaHint": "※ 像安裝一般軟體一樣簡單，3 分鐘內完成設定，免敲任何指令",
    "scenarios.title": "AI 如何打理您的家庭生活？",
    "scenarios.desc": "無需學習繁瑣設定，用最直覺的日常場景，體驗未來智慧管家服務",
    "scenarios.card1.title": "舊筆電鏡頭變身「AI 防盜警報器」",
    "scenarios.card1.desc": "家裡閒置的舊電腦與鏡頭插上電，即可 24 小時偵測門口異狀。一旦發現陌生人徘徊，立刻發送 LINE/Telegram 警報給全家，完全不需要額外的月租監控費。",
    "scenarios.card1.badge": "給爸爸的安心防線",
    "scenarios.card2.title": "整合日程與家電的「家庭大管家」",
    "scenarios.card2.desc": "每天早晨出門前，主動為您播報天氣、確認家人行程，甚至能根據濕度偵測自動開啟除濕機。您只需動口，瑣事由 AI 為您串接打理。",
    "scenarios.card2.badge": "給媽媽的貼心助手",
    "scenarios.card3.title": "同一個群組對話，獨立的隱私空間",
    "scenarios.card3.desc": "全家共用同一個 LINE/Telegram 聊天群組時，管家會根據發言人身份（透過 /bind 綁定）自動切換到獨立的工作空間，爸爸存取不了媽媽的私密行程，實現完美的物理隔離。",
    "scenarios.card3.badge": "給全家的隱私與隔離防線",
    "dev.title": "開發者與 Geek 專區",
    "dev.desc": "支援命令列安裝與自訂原始碼編譯",
    "dev.cmd_desc": "若您熟悉系統管理，可直接於 PowerShell 終端機執行此指令一鍵極速部署：",
    "dev.accordion_title": "進階開發與命令列部署 (適合技術人員)",
    "download.info_pricing_subtitle": "彈性的雙重運行模式與費用說明",
    "download.mode_local_badge": "本地模型模式",
    "download.mode_local_title": "0 訂閱費、0 API 費用",
    "download.mode_local_desc": "配合本地 Ollama 推理（如 Llama 3 或 Gemma），即便 24 小時常駐運作，ButlerCrab 也不會產生任何 AI 額外使用費，完全免費。無須綁定任何信用卡，絕對無未知帳單扣款風險。",
    "download.mode_cloud_badge": "雲端 API 模式",
    "download.mode_cloud_title": "按需自付 API 費用（Pay-as-you-go）",
    "download.mode_cloud_desc": "若選擇接入第三方雲端大模型（如 Gemini 或 OpenAI），費用由第三方平台按實際用量直接收取，ButlerCrab 平台本身不加收任何服務費用。支援免卡體驗基本功能，杜絕意外扣款。",
    "download.info_license_title": "授權聲明：",
    "download.info_license_desc": "本專案採用 BSL 1.1 授權，對個人、家庭與非商業用途完全免費且開放原始碼，商業用途請聯絡取得授權。",
    "demo.title": "親自體驗 Web UI 控制台",
    "demo.subtitle": "在下方模擬控制面板中點選切換分頁（總覽、即時對話、安全監控等），親自感受本地 AI 助理的流暢操作。",
    "comparison.title": "為什麼選擇 ButlerCrab？",
    "comparison.desc": "專為全家與群組設計，打破傳統個人 AI 助理的局限性",
    "comparison.th_feature": "功能特色",
    "comparison.th_personal": "傳統個人 AI 助理",
    "comparison.th_butler": "ButlerCrab 家庭總管",
    "comparison.row1.name": "服務對象與場景",
    "comparison.row1.personal": "僅針對個人單一帳戶，無法多人協作",
    "comparison.row1.butler": "專為家庭與群組設計，支援多人語意識別與任務綁定",
    "comparison.row2.name": "群組對話隱私",
    "comparison.row2.personal": "共用帳密或群組中對話與隱私全部曝露",
    "comparison.row2.butler": "共享同個通訊群組，個人工作空間與憑證獨立隔離",
    "comparison.row3.name": "運行與 API 成本",
    "comparison.row3.personal": "多人獨立購買，且對話長度增加時 API 成本呈指數上升",
    "comparison.row3.butler": "共用本機電腦算力，智慧路由技術節省 80% 以上 Token 消耗",
    "comparison.row4.name": "智慧家居連動",
    "comparison.row4.personal": "無法原生控制本地家電，需額外租用雲端中轉服務",
    "comparison.row4.butler": "內建 Home Assistant 橋接器，出門在外隨手發訊操控",
    "comparison.row5.name": "資料安全防線",
    "comparison.row5.personal": "全部對話上傳雲端，面臨遙測與個資外洩風險",
    "comparison.row5.butler": "100% 本地運行，機密金鑰存入系統底層安全憑證庫"
  },
  "en": {
    "head.title": "ButlerCrab — Repurpose Old Computers into a Secure Local Family Butler AI",
    "nav.features": "Features",
    "nav.skills": "Skills Market",
    "nav.dev_docs": "Developer Docs",
    "nav.download": "Download Now",
    "hero.badge": "ButlerCrab v1.0.0 Released",
    "hero.title": "Repurpose Old Computers into a<br><span class=\"gradient-text\">High-Performance Family Butler AI</span>",
    "hero.subtitle": "Built for families and group chats, not just individuals. In a shared LINE/Telegram group, the AI recognizes different members and routes queries to their isolated workspaces with 100% private calendars and keys.",
    "hero.btnDownload": "Download Windows Installer (.exe)",
    "hero.btnGithub": "GitHub Source",
    "terminal.copySuccess": "Copied!",
    "terminal.userQuery": "\"Check my Google Calendar for tomorrow. If there's a meeting, notify me an hour before and turn on the smart AC.\"",
    "terminal.listening": "ButlerCrab is ready and standing by...",
    "features.title": "Local AI Features Designed for Home Protection & Automation",
    "features.desc": "Built for users demanding absolute privacy and automated productivity",
    "features.f1.title": "100% Local & Privacy-First",
    "features.f1.desc": "All chats and life data are stored on the old computer in your home. Never uploaded to the cloud, never used for training external models, shielding your privacy completely.",
    "features.f2.title": "Smart Memory, Understands You Like Family",
    "features.f2.desc": "Automatically remembers your conversations and family habits. No need to repeat yourself, building a deeper understanding over time.",
    "features.f3.title": "Cross-App Chat & Smart Automation",
    "features.f3.desc": "Supports 11 messaging apps like LINE, Telegram, WhatsApp, and Discord. Text your butler anywhere to trigger tasks. Save over 80% on tokens via smart routing, boosting local inference speed by 5x while saving energy and API costs!",
    "features.f4.title": "Intuitive Web UI Console",
    "features.f4.desc": "Features a beautiful, responsive web dashboard. Easily manage family members, automation rules, and extensions with a lightweight, clean interface.",
    "features.f5.title": "Shared Groups \u0026 Strict Space Isolation",
    "features.f5.desc": "Break free from single-user AI limits. Share the same family chat group or computer while keeping conversation history, schedules, and API credentials fully isolated and secure.",
    "features.f6.title": "Turn Old Webcams into Private Security Alerts",
    "features.f6.desc": "No need for subscription-based cloud cameras. Monitor your home with old cameras and receive instant LINE/Telegram alerts when strangers are detected, with zero image leaks.",
    "skills.title": "Official Skills Directory",
    "skills.desc": "Install with a single click to expand your family butler capabilities",
    "download.title": "Get Started with ButlerCrab",
    "download.desc": "Local execution, zero setup friction. Download the client installer for your platform.",
    "download.span": "Download for",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac (.dmg)",
    "footer.desc": "100% local-first privacy-focused AI Agent collaboration platform",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. 100% Free for personal and family use. Released under Business Source License 1.1 (BSL 1.1). Commercial use requires a commercial license。",
    
    // Skills
    "skills.gmail_connector.desc": "Local Google Mail API integration. Supports automated categorization, draft drafting, and scheduling while isolating credentials.",
    "skills.scheduler_pro.desc": "Unlock complex DAG workflows with retries, variable chaining, and real-time event-driven listeners.",
    "skills.smart_home_link.desc": "Connects to local Home Assistant. Control smart home appliances through natural language dialogue and schedules.",
    "skills.calendar_sync.desc": "Sync Google Calendar and Outlook Calendar. Get pre-meeting briefings prepared by local RAG.",
    "skills.local_vision.desc": "Access local camera feed for real-time YOLO object detection and pipe events directly into the scheduler daemon.",
    "skills.system_terminal.desc": "Enables agents to execute terminal commands in a secure local sandbox to compile code and manage files.",
    "mockup.sidebar.overview": "Overview",
    "mockup.sidebar.chat": "Chat Console",
    "mockup.sidebar.skills": "Skills Hub",
    "mockup.sidebar.scheduler": "Task Scheduler",
    "mockup.sidebar.cameras": "Smart Cameras",
    "mockup.sidebar.settings": "Settings",
    "mockup.profile.admin": "Admin",
    "mockup.header.refresh": "Refresh",
    "mockup.header.restart": "Restart Server",
    "mockup.header.model": "Smart Brain (Ollama)",
    "mockup.overview.tokens": "Today's Words Chatted",
    "mockup.overview.tokens_sub": "This week: 31,530 words",
    "mockup.overview.skills": "Loaded Skills",
    "mockup.overview.skills_sub": "68 butler skills ready for use",
    "mockup.overview.online": "ONLINE",
    "mockup.overview.disabled": "DISABLED",
    "mockup.overview.telegram_sub": "Notification receiver active",
    "mockup.overview.line_sub": "Go to Message settings",
    "mockup.overview.recent_chats": "Recent Chats",
    "mockup.overview.new_chat": "New Chat",
    "mockup.overview.no_history": "No conversation history yet",
    "mockup.overview.quick_actions": "Quick Actions",
    "mockup.overview.manage_family": "Manage Family Members",
    "mockup.chat.response": "I have planned and scheduled the following task workflow for you:",
    "mockup.chat.step1": "Read local calendar (Success, found meeting 'Family Dinner')",
    "mockup.chat.step2": "Configure desktop notification reminder (Success, scheduled for 08:00 AM)",
    "mockup.chat.step3": "Turned on living room air conditioner automatically (Temp set to 24°C)",
    "mockup.skills.desc": "Manage installed skills or explore new ones. All skills run safely on your local computer.",
    "mockup.skills.installed": "Enabled (81)",
    "mockup.skills.marketplace": "Skills Marketplace",
    "mockup.skills.1password": "Connect to your personal password manager vault securely.",
    "mockup.skills.applenotes": "Read, create, and manage your personal text notes safely.",
    "mockup.skills.blogwatcher": "Subscribe to favorite news sources and get daily summaries.",
    "mockup.skills.blucli": "Connect to smart home speakers and play music.",
    "mockup.skills.calculator": "Perform daily household budgeting and calculations.",
    "mockup.skills.camsnap": "Connect family webcams for real-time security alerts.",
    "mockup.scheduler.desc": "Set local background schedules to wake up your butler AI automatically at specific times.",
    "mockup.scheduler.col_task": "Task Name",
    "mockup.scheduler.col_trigger": "Trigger Mechanism",
    "mockup.scheduler.col_status": "Status",
    "mockup.scheduler.every10": "Every 10 minutes",
    "mockup.scheduler.monfri": "Mon-Fri 08:00 AM",
    "mockup.scheduler.event1hr": "1 hour before meeting",
    "mockup.scheduler.active": "Active",
    "mockup.cameras.desc": "Manage home webcams and USB cameras. All vision processing runs on your local machine. No data or image ever leaves your home.",
    "mockup.cameras.register": "Connect Camera",
    "mockup.cameras.scan": "Scan Home Network",
    "mockup.cameras.desktop": "Desktop Camera",
    "mockup.cameras.nb": "Laptop Camera",
    "mockup.cameras.protection": "Protection Status",
    "mockup.cameras.bg_guard": "Enable Background Guard",
    "mockup.cameras.edge_text": "Local Acceleration Active",
    "mockup.cameras.feed_resolution": "Resolution: HD 1080p · USB Cam",
    "mockup.cameras.protocol_label": "Connection Type",
    "mockup.cameras.protocol_val": "Local Stream Connection",
    "mockup.cameras.protection_val": "🔒 Secured inside local hardware key store",
    "mockup.settings.general": "General Settings",
    "mockup.settings.device_name": "Butler Nickname",
    "mockup.settings.device_name_desc": "Nickname to identify this local AI butler.",
    "mockup.settings.model": "Smart Brain Settings",
    "mockup.settings.provider": "Default AI Provider",
    "mockup.settings.provider_desc": "Use local Ollama (100% free) or connect to cloud API endpoints.",
    "mockup.settings.provider_local": "Local Free Inference (Ollama)",
    "mockup.settings.provider_cloud": "Advanced Cloud Brain (Gemini)",
    
    "hero.ctaHint": "※ As simple as installing any normal app. No commands, setup in 3 minutes.",
    "scenarios.title": "How Can AI Manage Your Household?",
    "scenarios.desc": "Skip complex settings. Experience the future of smart butler services through intuitive daily scenarios.",
    "scenarios.card1.title": "Old Laptop Webcams Become 'AI Security Guards'",
    "scenarios.card1.desc": "Plug in your idle old computer and webcam to monitor your home 24/7. Instantly sends LINE/Telegram alerts if suspicious activity is detected, with zero subscription fees.",
    "scenarios.card1.badge": "Peace of Mind for Dad",
    "scenarios.card2.title": "A 'Family Butler' Coordinating Calendars & Smart Home",
    "scenarios.card2.desc": "Every morning before you leave, the butler broadcasts weather updates, checks schedules, and can even turn on the dehumidifier based on humidity levels. All via natural voice commands.",
    "scenarios.card2.badge": "A Helpful Assistant for Mom",
    "scenarios.card3.title": "Shared Group Chat, Isolated Workspace",
    "scenarios.card3.desc": "When the family interacts in a shared Telegram/LINE group, the AI dynamically switches workspace based on who speaks (via /bind). Dad cannot access Mom's private tasks or Google Calendar.",
    "scenarios.card3.badge": "Privacy Isolation for Everyone",
    "dev.title": "Developer & Geek Zone",
    "dev.desc": "Supports CLI installation and custom source builds",
    "dev.cmd_desc": "If you are familiar with systems administration, run this command in a PowerShell terminal to deploy instantly:",
    "dev.accordion_title": "Advanced Development & Command-Line Deployment (For Tech Users)",
    "download.info_pricing_subtitle": "Flexible Dual Running Modes & Cost Disclosure",
    "download.mode_local_badge": "Local Model Mode",
    "download.mode_local_title": "$0 Subscription, $0 API Costs",
    "download.mode_local_desc": "Pair with a local Ollama model (like Llama 3 or Gemma). Even with 24/7 operation, ButlerCrab incurs no usage fees. Completely free. No credit card required, zero unexpected billing.",
    "download.mode_cloud_badge": "Cloud API Mode",
    "download.mode_cloud_title": "Pay-as-you-go API Pricing",
    "download.mode_cloud_desc": "If you choose to connect third-party cloud APIs (like Gemini or OpenAI), fees are charged directly by those platforms based on actual usage. ButlerCrab itself charges no service fees.",
    "download.info_license_title": "License Notice:",
    "download.info_license_desc": "This project is released under BSL 1.1. It is 100% free and open-source for personal and family use. Commercial use requires a commercial license.",
    "demo.title": "Try Our Web UI Console Demo",
    "demo.subtitle": "Click the sidebar tabs below (Overview, Chat, Cameras, etc.) to experience the local AI assistant interface in action.",
    "comparison.title": "Why Choose ButlerCrab?",
    "comparison.desc": "Built for families and group chats, overcoming the limits of typical personal AI assistants",
    "comparison.th_feature": "Key Feature",
    "comparison.th_personal": "Personal AI Assistant",
    "comparison.th_butler": "ButlerCrab Family AI",
    "comparison.row1.name": "Audience & Scenario",
    "comparison.row1.personal": "Single user account; no multi-user collaboration support",
    "comparison.row1.butler": "Built for family/group; supports voice/speaker-specific task binding",
    "comparison.row2.name": "Group Chat Privacy",
    "comparison.row2.personal": "Shared credentials expose all chat histories and private details",
    "comparison.row2.butler": "Shared group chat but separate workspace and keyring isolation",
    "comparison.row3.name": "API & Run Costs",
    "comparison.row3.personal": "Individual licenses; API costs grow exponentially with chat length",
    "comparison.row3.butler": "Shared local PC hardware; smart routing saves over 80% tokens",
    "comparison.row4.name": "Smart Home Hub",
    "comparison.row4.personal": "No native local device control; requires paid cloud bridges",
    "comparison.row4.butler": "Built-in Home Assistant integrations; send commands on the go",
    "comparison.row5.name": "Security Boundary",
    "comparison.row5.personal": "All chats uploaded to cloud; telemetry and data leak risks",
    "comparison.row5.butler": "100% local operation; credentials stored in secure local keyring"
  },
  "ja": {
    "head.title": "ButlerCrab — 古いPCを安全でプライベートなローカル家庭用AI執事へ再生",
    "nav.features": "機能特性",
    "nav.skills": "スキルカタログ",
    "nav.dev_docs": "開発者ドキュメント",
    "nav.download": "今すぐダウンロード",
    "hero.badge": "ButlerCrab v1.0.0 がリリースされました",
    "hero.title": "古いパソコンを再生し<br><span class=\"gradient-text\">高性能な家庭用 AI 執事へ</span>",
    "hero.subtitle": "個人用ではなく家族やグループのために設計。同じ LINE/Telegram グループ内でも、AI が発言者を識別し、個人のカレンダーや API キーを完全に隔離された安全なローカル環境で自動切り替えします。",
    "hero.btnDownload": "Windows版をダウンロード (.exe)",
    "hero.btnGithub": "GitHub ソースコード",
    "terminal.copySuccess": "コピー完了",
    "terminal.userQuery": "\"明日の Google カレンダーを確認して、会議があれば開始1時間前に通知し、エアコンをオンにして。\"",
    "terminal.listening": "ButlerCrab は準備完了、待機しています...",
    "features.title": "家庭用ガードと自動化に特化したローカル AI 機能",
    "features.desc": "ユーザーの極致的なプライバシー保護と自動化生産性を両立する設計",
    "features.f1.title": "データは自宅保管、100%プライバシー",
    "features.f1.desc": "ご家族の写真、会話履歴、生活習慣はすべて自宅のPC内だけに安全に保存されます。クラウドへのアップロードや、外部のAI学習に利用されることはありません。",
    "features.f2.title": "家族のようにあなたを理解する「スマート記憶」",
    "features.f2.desc": "家族のように会話や習慣を徐々に学習し、同じことを何度も説明する手間を省きます。話せば話すほど、あなたに寄り添う執事になります。",
    "features.f3.title": "マルチチャット連携とスマート自動化",
    "features.f3.desc": "LINE、Telegram、WhatsApp、Discord など 11 種の対話アプリに対応。どこからでもメッセージを送信するだけで、自動タスクを安全に呼び出せます。スマートルーティング技術により、トークン消費量を 80% 以上削減。ローカル推論速度が 5 倍になり、コストや消費電力も大幅カット！",
    "features.f4.title": "直感的な Web UI コンソール",
    "features.f4.desc": "洗練されたレスポンシブWeb UIを搭載。専門的な知識がなくても、家族メンバーの追加やスマート連携の設定、追加スキルのインストールを簡単に行えます。",
    "features.f5.title": "グループ共有と個人スペースの厳密な隔離",
    "features.f5.desc": "個人用 AI の限界を打破。同じ家族グループやパソコンを共有しながら、対話履歴、予定表、API 認証キーを完全に隔離し、コラボレーションと個人のプライバシー保護を両立します。",
    "features.f6.title": "Webカメラを安心のスマート防犯カメラへ",
    "features.f6.desc": "ローカルYOLO画像認識技術により自宅を警戒。月額クラウドストレージ費用不要、画像流出の心配もなく、リアルタイムで通知します。",
    "skills.title": "公式スキルカタログ",
    "skills.desc": "一鍵でインストールし、家庭用執事の機能を拡張します",
    "download.title": "ButlerCrab を今すぐ開始",
    "download.desc": "ローカル実行、設定不要。対応プラットフォームのパッケージをダウンロードしてください。",
    "download.span": "ダウンロード",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac (.dmg)",
    "footer.desc": "100% ローカル運用のプライバシー優先 AI エージェント協調プラットフォーム",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. 個人および家庭での利用は完全に無料です。Business Source License 1.1 (BSL 1.1) ライセンスの下で提供されています。商用利用にはライセンスが必要です。",
    
    // Skills
    "skills.gmail_connector.desc": "ローカル Google Mail API 連携。認証情報を隔離した状態で、メールの自動分類、下書き作成、送信を実行。",
    "skills.scheduler_pro.desc": "エラーリトライ、変数チェーン、リアルタイムイベントリスナーを備えた複雑な DAG ワークフローを実行。",
    "skills.smart_home_link.desc": "ローカルの Home Assistant に接続。対話とスケジュールからスマート家電を自動操作。",
    "skills.calendar_sync.desc": "Google と Outlook カレンダーを同期。ローカル RAG に基づく事前ミーティングブリーフィングを作成。",
    "skills.local_vision.desc": "ローカルカメラを使用したリアルタイムの YOLO 物体検出。イベントをスケジューラに直接転送。",
    "skills.system_terminal.desc": "安全なローカルサンドボックス内でのターミナルコマンド実行を許可。ビルドやファイル管理を自動化。",
    "mockup.sidebar.overview": "ダッシュボード",
    "mockup.sidebar.chat": "チャット執事",
    "mockup.sidebar.skills": "機能スキル",
    "mockup.sidebar.scheduler": "自動実行タスク",
    "mockup.sidebar.cameras": "防犯カメラ",
    "mockup.sidebar.settings": "システム設定",
    "mockup.profile.admin": "管理者",
    "mockup.header.refresh": "更新",
    "mockup.header.restart": "サービス再起動",
    "mockup.header.model": "賢い頭脳 (Ollama)",
    "mockup.overview.tokens": "本日の会話文字数",
    "mockup.overview.tokens_sub": "今週の累計：31,530文字",
    "mockup.overview.skills": "有効な機能",
    "mockup.overview.skills_sub": "68個の執事スキルが有効",
    "mockup.overview.online": "有効",
    "mockup.overview.disabled": "無効",
    "mockup.overview.telegram_sub": "通知受信機能が稼働中",
    "mockup.overview.line_sub": "通知設定を開く",
    "mockup.overview.recent_chats": "最近の対話",
    "mockup.overview.new_chat": "新規チャット",
    "mockup.overview.no_history": "会話履歴はまだありません",
    "mockup.overview.quick_actions": "クイック操作",
    "mockup.overview.manage_family": "家族メンバーの管理",
    "mockup.chat.response": "以下の自動タスクを設定しました：",
    "mockup.chat.step1": "カレンダーを確認しました（「家族の夕食」を検出）",
    "mockup.chat.step2": "デスクトップ通知を設定しました（08:00 AM に送信予定）",
    "mockup.chat.step3": "エアコンを自動でオンにしました（設定温度：24℃）",
    "mockup.skills.desc": "インストール済みの機能を管理するか、新しい機能を追加します。すべての機能はご自宅のパソコン上で安全に実行されます。",
    "mockup.skills.installed": "有効化済み (81)",
    "mockup.skills.marketplace": "スキルマーケット",
    "mockup.skills.1password": "パスワード管理ツールと安全に連携します。",
    "mockup.skills.applenotes": "メモアプリを安全に読み込み・作成・管理します。",
    "mockup.skills.blogwatcher": "お気に入りのブログやニュースを購読し、毎日要約を作成します。",
    "mockup.skills.blucli": "スマートスピーカーと連携し、音楽を自動再生します。",
    "mockup.skills.calculator": "家計簿の計算や簡単な計算処理を行います。",
    "mockup.skills.camsnap": "防犯カメラやWebカメラを接続し、リアルタイムで防犯検知を行います。",
    "mockup.scheduler.desc": "タスクのスケジュールを設定し、決まった時間や条件で執事AIを自動起動します。",
    "mockup.scheduler.col_task": "自動タスク名",
    "mockup.scheduler.col_trigger": "トリガー条件",
    "mockup.scheduler.col_status": "ステータス",
    "mockup.scheduler.every10": "10分ごと",
    "mockup.scheduler.monfri": "月曜〜金曜 08:00 AM",
    "mockup.scheduler.event1hr": "会議の1時間前",
    "mockup.scheduler.active": "実行中",
    "mockup.cameras.desc": "ご自宅のWebカメラやUSBカメラを管理します。すべての画像認識はご自宅のPC内で行われ、データや画像が外部に送信されることはありません。",
    "mockup.cameras.register": "カメラを接続する",
    "mockup.cameras.scan": "宅内ネットワークをスキャン",
    "mockup.cameras.desktop": "デスクトップカメラ",
    "mockup.cameras.nb": "ノートPCカメラ",
    "mockup.cameras.protection": "暗号化保護",
    "mockup.cameras.bg_guard": "バックグラウンド警戒を有効化",
    "mockup.cameras.edge_text": "ローカル高速化が有効",
    "mockup.cameras.feed_resolution": "画質：フルHD 1080p · USBカメラ",
    "mockup.cameras.protocol_label": "接続方式",
    "mockup.cameras.protocol_val": "ローカル配信接続",
    "mockup.cameras.protection_val": "🔒 パソコン内の安全な保管庫に暗号化保存済み",
    "mockup.settings.general": "一般設定",
    "mockup.settings.device_name": "執事の名前",
    "mockup.settings.device_name_desc": "このAI執事のニックネームを設定します。",
    "mockup.settings.model": "頭脳（AIモデル）の設定",
    "mockup.settings.provider": "デフォルトのAIエンジン",
    "mockup.settings.provider_desc": "無料のローカル Ollama 又は クラウドAPI を選択します。",
    "mockup.settings.provider_local": "ローカル無料推論 (Ollama)",
    "mockup.settings.provider_cloud": "クラウドAI頭脳 (Gemini)",
    
    "hero.ctaHint": "※ 通常のアプリと同様に簡単。コマンド入力不要、3分でセットアップ完了。",
    "scenarios.title": "AIはどのようにあなたの家庭生活をサポートしますか？",
    "scenarios.desc": "面倒な設定は不要です。直感的な日常シーンを通じて、未来のスマートAI執事サービスを体験してください。",
    "scenarios.card1.title": "古いノートPCのカメラが「AI防犯アラーム」に再生",
    "scenarios.card1.desc": "ご自宅に眠っている古いPCとカメラを電源に接続するだけで、24時間ドア周りの異変を検知。不審な人物を検知すると、LINEやTelegramでご家族にリアルタイムでアラームを送信します。追加の月額監視費用は不要です。",
    "scenarios.card1.badge": "お父さんのための安心防衛線",
    "scenarios.card2.title": "予定と家電を連動する「家庭のスマート執事」",
    "scenarios.card2.desc": "毎朝の外出前に、自動で天気を予報し、家族の予定を確認。さらに、湿度に基づいて除湿機を自動で起動することも可能です。あなたが話しかけるだけで、AIがすべての雑務を連携して処理します。",
    "scenarios.card2.badge": "お母さんのための優しいアシスタント",
    "scenarios.card3.title": "同じグループチャット、個別の隔離スペース",
    "scenarios.card3.desc": "家族で LINE/Telegram グループを共有する際、AI が発言者（/bind で紐付け）に応じて自動的に個別のワークスペースを切り替え。お父さんはお母さんのプライベートなカレンダーにアクセスできません。",
    "scenarios.card3.badge": "ご家族へのプライバシーと隔離の約束",
    "dev.title": "開発者＆ギークエリア",
    "dev.desc": "コマンドラインによるインストールと自作ソースコードのコンパイルをサポート",
    "dev.cmd_desc": "システム管理に詳しい方は、PowerShellターミナルでこのコマンドを実行するだけで、瞬時にデプロイできます：",
    "dev.accordion_title": "高度な開発とコマンドラインデプロイ (技術者向け)",
    "download.info_pricing_subtitle": "柔軟なデュアル実行モードと費用について",
    "download.mode_local_badge": "ローカルモデルモード",
    "download.mode_local_title": "月額費用ゼロ、API料金ゼロ",
    "download.mode_local_desc": "ローカルのOllamaモデル（Llama 3やGemmaなど）と連携。24時間稼働させても、ButlerCrabの利用料金は一切発生しません。完全に無料です。クレジットカードの登録も不要で、予期せぬ請求の心配もありません。",
    "download.mode_cloud_badge": "クラウドAPIモード",
    "download.mode_cloud_title": "従量課金制のAPI料金",
    "download.mode_cloud_desc": "サードパーティのクラウドAPI（GeminiやOpenAIなど）を選択した場合、実際の利用量に応じて各プラットフォームから直接請求されます。ButlerCrabプラットフォーム自体が手数料を追加することはありません。",
    "download.info_license_title": "ライセンスに関するお知らせ：",
    "download.info_license_desc": "本プロジェクトはBSL 1.1ライセンスを採用しています。個人および家庭内での利用は完全に無料でオープンソースです。商用利用には商用ライセンスが必要です。",
    "demo.title": "Web UI コンソールを体験する",
    "demo.subtitle": "以下のシミュレーションパネルのタブ（ダッシュボード、対話、防犯カメラなど）を切り替えて、ローカル AI アシスタントの直感的な操作を体感してください。",
    "comparison.title": "なぜ ButlerCrab なのか？",
    "comparison.desc": "家族やグループ向けに特別に設計されており、一般的な個人用 AI アシスタントの限界を克服します。",
    "comparison.th_feature": "機能・特徴",
    "comparison.th_personal": "従来の個人用 AI アシスタント",
    "comparison.th_butler": "ButlerCrab 家庭用 AI",
    "comparison.row1.name": "対象・シナリオ",
    "comparison.row1.personal": "個人アカウントのみ。複数人の共同作業はサポートされません。",
    "comparison.row1.butler": "家族・グループ向け。発言者ごとのタスクバインドをサポート。",
    "comparison.row2.name": "グループチャットのプライバシー",
    "comparison.row2.personal": "認証情報の共有により、会話履歴やプライベートな詳細がすべて露出します。",
    "comparison.row2.butler": "チャットグループを共有しつつ、個人ワークスペースと認証キーを完全に隔離。",
    "comparison.row3.name": "実行・APIコスト",
    "comparison.row3.personal": "人数分のライセンスが必要で、対話が長くなると API コストが急増します。",
    "comparison.row3.butler": "ローカル PC 算力を共有。スマートルーティング技術で Token 消費を 80% 以上削減。",
    "comparison.row4.name": "スマートホーム連携",
    "comparison.row4.personal": "ローカル家電を直接制御できず、有料のクラウド仲介サービスが必要です。",
    "comparison.row4.butler": "Home Assistant 連携機能を内蔵。外出先からでも送信して直接制御。",
    "comparison.row5.name": "セキュリティ境界",
    "comparison.row5.personal": "すべての会話がクラウドにアップロードされ、データ漏洩のリスクがあります。",
    "comparison.row5.butler": "100% ローカル実行。認証情報はローカル OS の安全な Keyring に隔離保存。"
  },
  "zh-CN": {
    "head.title": "ButlerCrab — 旧电脑重生成为安全隐私的本地家庭总管 AI",
    "nav.features": "功能特性",
    "nav.skills": "技能市场",
    "nav.dev_docs": "开发者文档",
    "nav.download": "立即下载",
    "hero.badge": "ButlerCrab v1.0.0 正式发布",
    "hero.title": "家里旧电脑重生成为<br><span class=\"gradient-text\">全家群组随身的 AI 智慧管家</span>",
    "hero.subtitle": "不只为您个人，更是为全家人量身打造的 AI 智慧管家！只要加入同一个家庭 LINE/Telegram 群组，AI 就能自动认出是谁在说话，并在保护个人隐私的前提下，各自打理专属的日程表与账户设置，数据安全绝不混淆。",
    "hero.btnDownload": "免费下载 Windows 安装包 (.exe)",
    "hero.btnGithub": "GitHub 源码",
    "terminal.copySuccess": "复制成功",
    "terminal.userQuery": "\"检查我明天的 Google 日历，如果有会议，请在会前一小时通知我，并开启智能空调。\"",
    "terminal.listening": "ButlerCrab 已就绪，随时待命...",
    "features.title": "专为家庭守护与自动化打造的本地 AI 功能",
    "features.desc": "为追求极致隐私与自动化生产力的用户设计",
    "features.f1.title": "100% 本地与隐私优先",
    "features.f1.desc": "所有对话与生活数据皆存储在您放在家里的旧电脑中。绝不上传云端、绝不用于训练外部模型，隐私防护滴水不漏。",
    "features.f2.title": "超强记性，像家人一样懂你",
    "features.f2.desc": "自动记住您说过的每一句话与家庭习惯，不需要每次重复解释，对话越久越有默契。",
    "features.f3.title": "跨平台对话与智能自动化",
    "features.f3.desc": "支持 LINE、Telegram、WhatsApp、Discord 等 11 种常用通讯软件，出门在外传讯即可随身控管总管。搭配独家工具路由技术，可节省 80% 以上 Token 消耗，使本地推理速度提升 5 倍，且省电省钱！",
    "features.f4.title": "直观式 Web UI 控制台",
    "features.f4.desc": "提供精美的响应式 Web 操作界面。支持轻量级极简设置，轻松配置家庭成员、智能联动与下载扩展技能。",
    "features.f5.title": "家庭群组共用与个人空间隔离",
    "features.f5.desc": "打破个人 AI 限制。在同个家庭群组或本地电脑中，AI 能自动识别不同成员，并动态切换专属的上下文、个人密钥与日历，兼顾家庭协作与个人隐私安全。",
    "features.f6.title": "旧视讯镜头变身隐私安全警报器",
    "features.f6.desc": "免买订阅制云端摄像头，利用家里旧镜头进行安全警戒，发现陌生人徘徊时即时发送 LINE/Telegram 警报。",
    "skills.title": "官方技能市场目录",
    "skills.desc": "一键安装，快速扩展您的家庭总管能力",
    "download.title": "立即开始使用 ButlerCrab",
    "download.desc": "本地运行，免除繁琐设置。下载对应平台的安装包即可开始体验。",
    "download.span": "下载适用于",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac 电脑 (.dmg)",
    "footer.desc": "100% 本地运行的隐私优先 AI Agent 协作平台",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. 本项目对个人与家庭用户完全免费。基于 Business Source License 1.1 (BSL 1.1) 授权协议发布，商业使用请联系取得授权。",
    
    // Skills
    "skills.gmail_connector.desc": "本地集成 Google Mail API，支持自动分类邮件、起草回复与排程发信，保持安全凭证隔离。",
    "skills.scheduler_pro.desc": "解锁复杂 DAG 任务工作流调度。支持多步骤错误重试、变量链传递与事件驱动监听器。",
    "skills.smart_home_link.desc": "对接本地 Home Assistant 平台，支持利用对话控制智能家电，并依据排程自动执行场景。",
    "skills.calendar_sync.desc": "串接 Google 日历与 Outlook 日历，自动同步日程并能通过 RAG 提供会前背景简报。",
    "skills.local_vision.desc": "调用本地相机进行 YOLO 目标检测与实时图像识别，并将事件推送至调度核心执行反应动作。",
    "skills.system_terminal.desc": "允许 Agent 在本地安全沙箱内执行终端指令，执行打包、项目构建与日常文件管理任务。",
    "mockup.sidebar.overview": "总览",
    "mockup.sidebar.chat": "即时对话",
    "mockup.sidebar.skills": "技能市场",
    "mockup.sidebar.scheduler": "任务排程",
    "mockup.sidebar.cameras": "安全监控",
    "mockup.sidebar.settings": "系统设置",
    "mockup.profile.admin": "管理员",
    "mockup.header.refresh": "重新整理",
    "mockup.header.restart": "重启服务",
    "mockup.header.model": "进阶智慧大脑 (Ollama)",
    "mockup.overview.tokens": "今日对话字数",
    "mockup.overview.tokens_sub": "本周累计：31,530 字",
    "mockup.overview.skills": "已载入技能",
    "mockup.overview.skills_sub": "已载入 68 项智慧生活技能",
    "mockup.overview.online": "已启用",
    "mockup.overview.disabled": "未启用",
    "mockup.overview.telegram_sub": "背景接收通知运行中",
    "mockup.overview.line_sub": "前往消息通道设置",
    "mockup.overview.recent_chats": "近期对话",
    "mockup.overview.new_chat": "开启对话",
    "mockup.overview.no_history": "尚无历史对话记录",
    "mockup.overview.quick_actions": "快速操作",
    "mockup.overview.manage_family": "管理家庭成员",
    "mockup.chat.response": "已为您规划并排定以下任务工作流：",
    "mockup.chat.step1": "读取本地日历日程 (寻获 1 个会面「家庭聚餐」)",
    "mockup.chat.step2": "设置通知排程 (成功，预定于 08:00 AM 发送提醒)",
    "mockup.chat.step3": "已自动开启客厅空调 (设定温度为 24°C)",
    "mockup.skills.desc": "管理已安装技能，或从市场下载新技能。所有技能均在本地安全运行。",
    "mockup.skills.installed": "已启用技能 (81)",
    "mockup.skills.marketplace": "技能市场",
    "mockup.skills.1password": "连接您的个人保险箱，安全保管各类网站密码。",
    "mockup.skills.applenotes": "安全读取、建立与管理您的个人备忘录。",
    "mockup.skills.blogwatcher": "订阅喜爱的博客或新闻，每日定时摘要给您。",
    "mockup.skills.blucli": "连接家中的智能音响，自动播放您想听的音乐。",
    "mockup.skills.calculator": "进行家庭账务、简单记账与数学公式计算。",
    "mockup.skills.camsnap": "连接家中的安全摄像机与视讯镜头，即时进行安全侦测。",
    "mockup.scheduler.desc": "设置本地端背景排程，在特定时间或满足特定事件触发条件时，自动唤醒管家执行任务。",
    "mockup.scheduler.col_task": "排程工作名称",
    "mockup.scheduler.col_trigger": "触发机制",
    "mockup.scheduler.col_status": "运行状态",
    "mockup.scheduler.every10": "每 10 分钟",
    "mockup.scheduler.monfri": "周一至周五 08:00 AM",
    "mockup.scheduler.event1hr": "会面开始前 1 小时",
    "mockup.scheduler.active": "运行中",
    "mockup.cameras.desc": "管理您家中的摄像机与 USB 镜头。所有影像识别均本机电脑处理，隐私安全无虞，影像绝对不外流。",
    "mockup.cameras.register": "连接新镜头",
    "mockup.cameras.scan": "扫描家用网络",
    "mockup.cameras.desktop": "桌面镜头",
    "mockup.cameras.nb": "笔记本镜头",
    "mockup.cameras.protection": "防护状态",
    "mockup.cameras.bg_guard": "启用背景警戒",
    "mockup.cameras.edge_text": "本地芯片加速中",
    "mockup.cameras.feed_resolution": "画质：高画质 1080p · USB 镜头",
    "mockup.cameras.protocol_label": "连线协定",
    "mockup.cameras.protocol_val": "本机影音连线",
    "mockup.cameras.protection_val": "🔒 已储存于本机安全防护锁中",
    "mockup.settings.general": "一般设置",
    "mockup.settings.device_name": "管家称呼",
    "mockup.settings.device_name_desc": "本机运行的 AI 管家识别称呼。",
    "mockup.settings.model": "智慧大脑配置",
    "mockup.settings.provider": "预设大脑推理引擎",
    "mockup.settings.provider_desc": "选择本地 Ollama 引擎（免费）或接入云端 API 端点。",
    "mockup.settings.provider_local": "本地免费推理 (Ollama)",
    "mockup.settings.provider_cloud": "进阶云端大脑 (Gemini)",
    
    "hero.ctaHint": "※ 像安装普通软件一样简单，3 分钟内完成设置，免敲任何指令",
    "scenarios.title": "AI 如何打理您的家庭生活？",
    "scenarios.desc": "无需学习繁琐设置，用最直观的日常场景，体验未来智慧管家服务",
    "scenarios.card1.title": "旧笔记本镜头变身「AI 防盗警报器」",
    "scenarios.card1.desc": "家里闲置 of 旧电脑与镜头插上电，即可 24 小时侦测门口异状。一旦发现陌生人徘徊，立刻发送 LINE/Telegram 警报给全家，完全不需要额外的月租监控费。",
    "scenarios.card1.badge": "给爸爸的安心防线",
    "scenarios.card2.title": "整合日程与家电的「家庭大管家」",
    "scenarios.card2.desc": "每天早晨出门前，主动为您播报天气、确认家人行程，甚至能根据湿度侦测自动开启除湿机。您只需动口，琐事由 AI 为您串接打理。",
    "scenarios.card2.badge": "给妈妈的贴心助手",
    "scenarios.card3.title": "同一个群组对话，独立的隐私空间",
    "scenarios.card3.desc": "全家共用同一个 LINE/Telegram 聊天群组时，管家会根据发言人身份（透过 /bind 绑定）自动切换到工作空间，爸爸读取不到妈妈的私密日程，实现完美的物理隔离。",
    "scenarios.card3.badge": "给全家的隐私与隔离防线",
    "dev.title": "开发者与 Geek 专区",
    "dev.desc": "支援命令列安装与自订原始码编译",
    "dev.cmd_desc": "若您熟悉系统管理，可直接于 PowerShell 终端机执行此指令一键极速部署：",
    "dev.accordion_title": "进阶开发与命令行部署 (适合技术人员)",
    "download.info_pricing_subtitle": "弹性的双重运行模式与费用说明",
    "download.mode_local_badge": "本地模型模式",
    "download.mode_local_title": "0 订阅费、0 API 费用",
    "download.mode_local_desc": "配合本地 Ollama 推理（如 Llama 3 或 Gemma），即便 24 小时常驻运作，ButlerCrab 也不会产生任何 AI 额外使用费，完全免费。无需绑定任何信用卡，绝对无未知账单扣款风险。",
    "download.mode_cloud_badge": "云端 API 模式",
    "download.mode_cloud_title": "按需自付 API 费用（Pay-as-you-go）",
    "download.mode_cloud_desc": "若选择接入第三方云端大模型（如 Gemini 或 OpenAI），费用由第三方平台按实际用量直接收取，ButlerCrab 平台本身不加收任何服务费用。支持免卡体验基本功能，杜绝意外扣款。",
    "download.info_license_title": "授权声明：",
    "download.info_license_desc": "本项目采用 BSL 1.1 授权，对个人、家庭与非商业用途完全免费且开放源代码，商业用途请联系取得授权。",
    "demo.title": "亲自体验 Web UI 控制台",
    "demo.subtitle": "在下方模拟控制面板中点选切换分页（总览、即时对话、安全监控等），亲身感受本地 AI 助理的流畅操作。",
    "comparison.title": "为什么选择 ButlerCrab？",
    "comparison.desc": "专为全家与群组设计，打破传统个人 AI 助理的局限性",
    "comparison.th_feature": "功能特色",
    "comparison.th_personal": "传统个人 AI 助理",
    "comparison.th_butler": "ButlerCrab 家庭总管",
    "comparison.row1.name": "服务对象与场景",
    "comparison.row1.personal": "仅针对个人单一账户，无法多人协作",
    "comparison.row1.butler": "专为家庭与群组设计，支持多人语意识别与任务绑定",
    "comparison.row2.name": "群组对话隐私",
    "comparison.row2.personal": "共用帐密或群组中对话与隐私全部暴露",
    "comparison.row2.butler": "共享同个通讯群组，个人工作空间与凭证独立隔离",
    "comparison.row3.name": "运行与 API 成本",
    "comparison.row3.personal": "多人独立购买，且对话长度增加时 API 成本呈指数上升",
    "comparison.row3.butler": "共用本地电脑算力，智慧路由技术节省 80% 以上 Token 消耗",
    "comparison.row4.name": "智能家居连動",
    "comparison.row4.personal": "无法原生控制本地家电，需额外租用云端中转服务",
    "comparison.row4.butler": "内置 Home Assistant 桥接器，出门在外随手发讯操控",
    "comparison.row5.name": "数据安全防线",
    "comparison.row5.personal": "全部对话上传云端，面临遥测与个资外泄风险",
    "comparison.row5.butler": "100% 本地运行，机密金钥存入系统底层安全凭证库"
  },
  "ko": {
    "head.title": "ButlerCrab — 프라이버시 우선 로컬 멀티 에이전트 협업 플랫폼",
    "nav.features": "기능 및 특징",
    "nav.skills": "스킬 레지스트리",
    "nav.dev_docs": "개발자 문서",
    "nav.download": "지금 다운로드",
    "hero.badge": "ButlerCrab v1.0.0 정식 출시",
    "hero.title": "로컬에서 작동하는 AI 비서<br><span class=\"gradient-text\">설정 없이 즉시 사용 가능한 완벽한 보안</span>",
    "hero.subtitle": "개인용 AI를 넘어 온 가족과 그룹 협업을 위해 설계되었습니다. 동일한 LINE/Telegram 그룹 내에서도 AI가 발화자를 인식하고 100% 로컬 환경에서 개인별 워크스페이스와 일정, API 키를 분리하여 제공합니다.",
    "hero.btnDownload": "설치 프로그램 다운로드",
    "hero.btnGithub": "GitHub 소스코드",
    "terminal.copySuccess": "복사 완료",
    "terminal.userQuery": "\"내일 Google 캘린더 확인해서 회의가 있으면 시작 1시간 전에 알림을 보내고 스마트 에어컨을 켜줘.\"",
    "terminal.listening": "ButlerCrab이 대기 중이며 준비되었습니다...",
    "features.title": "강력한 로컬 AI 기능",
    "features.desc": "철저한 프라이버시와 자동화된 생산성을 원하는 사용자를 위한 설계",
    "features.f1.title": "100% 로컬 및 프라이버시 우선",
    "features.f1.desc": "모든 대화, 지식베이스, 스케줄이 로컬 장치에서만 처리됩니다. 텔레메트리 전송이 전혀 없어 데이터 유출 걱정이 없습니다.",
    "features.f2.title": "GraphRAG 계층형 메모리",
    "features.f2.desc": "독창적인 계층형 메모리(HTM) 알고리즘이 대화 내역을 분석해 로컬 지식 그래프를 구축하고, 정밀한 기억 검색을 지원합니다.",
    "features.f3.title": "크로스 플랫폼 앱 연동 및 지능형 자동화",
    "features.f3.desc": "LINE, Telegram, WhatsApp, Discord 등 11가지 메신저 앱을 지원합니다. 언제 어디서나 텍스트로 스마트 가전을 제어할 수 있으며, 지능형 라우팅 기술로 토큰 소모를 80% 이상 절감해 추론 속도를 5배 높이고 전기세와 API 비용을 획기적으로 낮춥니다.",
    "features.f4.title": "직관적인 Web 콘솔",
    "features.f4.desc": "세련된 반응형 Web 조작 인터페이스를 제공합니다. 다크/라이트 테마 및 다국어 전환을 지원하여 에이전트 설정, 실행 로그 및 스케줄 상태를 쉽게 관리합니다.",
    "features.f5.title": "그룹 공유 및 개인 공간의 철저한 격리",
    "features.f5.desc": "개인용 AI의 한계를 극복하세요. 동일한 대화 그룹이나 PC를 공유하면서 대화 기록, 일정 및 API 자격 증명을 완전히 격리하여 협업과 프라이버시를 동시에 보호합니다.",
    "features.f6.title": "스마트 홈 및 로컬 모니터링",
    "features.f6.desc": "Home Assistant 생태계 연동으로 자연어 가전 제어를 지원하고, 내장된 YOLO 컴퓨터 비전으로 로컬 보안 이미지 모니터링 및 실시간 알림을 수행합니다.",
    "scenarios.title": "AI는 어떻게 당신의 가정생활을 관리할까요?",
    "scenarios.desc": "복잡한 설정 없이, 가장 직관적인 일상 시나리오를 통해 미래의 스마트 비서 서비스를 체험해 보세요.",
    "scenarios.card1.title": "구형 노트북 카메라가 'AI 방범 카메라'로 변신",
    "scenarios.card1.desc": "집에 방치된 노트북이나 웹캠을 켜두기만 하면 24시간 현관문을 감시합니다. 외부인 배회 감지 시 온 가족에게 즉시 LINE/Telegram 알림을 전송하며, 월 구독료는 전혀 발생하지 않습니다.",
    "scenarios.card1.badge": "아빠를 위한 안심 방어선",
    "scenarios.card2.title": "일정과 가전을 연동하는 '가족 스마트 집사'",
    "scenarios.card2.desc": "매일 아침 외출 전 날씨를 알려주고 가족 일정을 확인하며, 습도에 따라 제습기를 자동으로 가동합니다. 대화 한 줄로 모든 집안일이 연동됩니다.",
    "scenarios.card2.badge": "엄마를 위한 든든한 조력자",
    "scenarios.card3.title": "동일한 그룹 대화, 격리된 프라이버시 공간",
    "scenarios.card3.desc": "가족이 LINE/Telegram 그룹을 공유할 때 AI가 발화자(/bind 연동)에 따라 개인 워크스페이스를 자동 전환합니다. 남편은 아내의 비공개 일정에 접근할 수 없습니다.",
    "scenarios.card3.badge": "가족을 위한 프라이버시 및 격리 보장",
    "skills.title": "공식 스킬 레지스트리",
    "skills.desc": "명령어 한 줄로 간편하게 로컬 에이전트의 기능을 확장하세요",
    "download.title": "지금 ButlerCrab 시작하기",
    "download.desc": "로컬 실행, 복잡한 설정 불필요. 해당 플랫폼에 맞는 설치 패키지를 다운로드하세요.",
    "download.span": "다운로드",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac (.dmg)",
    "footer.desc": "100% 로컬에서 실행되는 개인정보 보호 중심 AI 에이전트 협업 플랫폼",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. BSL 1.1 라이선스 적용。",
    
    // Skills
    "skills.gmail_connector.desc": "로컬 Google Mail API 연동. 인증 정보가 격리된 상태에서 메일 자동 분류, 임시보관함 작성, 발송 예약 실행.",
    "skills.scheduler_pro.desc": "재시도, 변수 연결, 실시간 이벤트 리스너를 갖춘 복잡한 DAG 워크플로 스케줄러 제공.",
    "skills.smart_home_link.desc": "로컬 Home Assistant 연동. 대화 및 스케줄러를 통해 스마트 가전 자동 제어.",
    "skills.calendar_sync.desc": "Google 및 Outlook 캘린더 동기화. 로컬 RAG 기반의 회의 배경 브리핑 보고서 생성.",
    "skills.local_vision.desc": "로컬 카메라를 활용한 실시간 YOLO 객체 감지 및 스케줄러 데몬으로의 이벤트 직접 전달.",
    "skills.system_terminal.desc": "안전한 로컬 샌드박스 내부에서의 터미널 명령 실행 지원. 빌드 및 파일 관리 자동화.",
    "download.info_pricing_subtitle": "유연한 이중 실행 모드 및 비용 안내",
    "download.mode_local_badge": "로컬 모델 모드",
    "download.mode_local_title": "구독료 $0, API 비용 $0",
    "download.mode_local_desc": "로컬 Ollama 추론(Llama 3 또는 Gemma 등)과 연동하여 24시간 상시 가동해도 ButlerCrab의 추가 사용료는 전혀 발생하지 않으며 완전히 무료입니다. 신용카드 등록이 필요 없어 예기치 않은 결제 위험이 전혀 없습니다.",
    "download.mode_cloud_badge": "클라우드 API 모드",
    "download.mode_cloud_title": "사용량 기준 API 요금(Pay-as-you-go)",
    "download.mode_cloud_desc": "선택적으로 타사 클라우드 모델(Gemini, OpenAI 등)을 연결할 경우 실제 사용량에 따라 해당 플랫폼에서 직접 비용을 청구합니다. ButlerCrab 플랫폼 자체는 어떠한 추가 수수료도 받지 않습니다.",
    "download.info_license_title": "라이선스 고지:",
    "download.info_license_desc": "본 프로젝트는 BSL 1.1 라이선스에 따라 배포됩니다. 개인 및 가정 내 사용 시 100% 무료 및 오픈 소스이며, 상업적 이용 시 상용 라이선스 취득이 필요합니다.",
    "demo.title": "Web UI 콘솔 직접 체험하기",
    "demo.subtitle": "아래 모의 제어판에서 사이드바 탭(총괄, 실시간 대화, 보안 모니터링 등)을 전환하며 로컬 AI 비서의 인터페이스를 직접 경험해 보세요.",
    "comparison.title": "왜 ButlerCrab인가요?",
    "comparison.desc": "온 가족과 그룹 대화를 위해 설계되어, 기존 개인용 AI 비서의 한계를 극복합니다.",
    "comparison.th_feature": "주요 기능",
    "comparison.th_personal": "기존 개인용 AI 비서",
    "comparison.th_butler": "ButlerCrab 가정용 AI",
    "comparison.row1.name": "대상 및 시나리오",
    "comparison.row1.personal": "개인 단일 계정 전용, 다중 사용자 협업 미지원",
    "comparison.row1.butler": "가족 및 그룹 전용, 사용자별 일정 및 작업 바인딩 지원",
    "comparison.row2.name": "그룹 대화 개인정보 보호",
    "comparison.row2.personal": "자격 증명 공유로 인해 모든 대화 내역 및 개인정보가 노출됨",
    "comparison.row2.butler": "그룹 대화방을 공유하면서도 개별 워크스페이스와 자격 증명을 안전하게 격리",
    "comparison.row3.name": "실행 및 API 비용",
    "comparison.row3.personal": "개별 라이선스 구매 필요, 대화가 길어질수록 API 비용 기하급수적 증가",
    "comparison.row3.butler": "로컬 PC 하드웨어 공유, 스마트 라우팅으로 Token 소모 80% 이상 절감",
    "comparison.row4.name": "스마트 홈 허브",
    "comparison.row4.personal": "로컬 가전 제어 불가, 유료 클라우드 중계 서비스 필요",
    "comparison.row4.butler": "Home Assistant 연동 내장, 외출 중에도 메시지로 즉각 제어",
    "comparison.row5.name": "보안 경계",
    "comparison.row5.personal": "모든 대화가 클라우드에 업로드되어 데이터 유출 및 원격 측정 위험 존재",
    "comparison.row5.butler": "100% 로컬 동작, 자격 증명은 로컬 OS의 안전한 Keyring에 격리 저장"
  },
  "es": {
    "head.title": "ButlerCrab — Plataforma local de colaboración multiagente priorizando la privacidad",
    "nav.features": "Características",
    "nav.skills": "Catálogo de Habilidades",
    "nav.dev_docs": "Docs de Desarrollador",
    "nav.download": "Descargar ahora",
    "hero.badge": "Lanzamiento oficial de ButlerCrab v1.0.0",
    "hero.title": "Asistente de IA en local<br><span class=\"gradient-text\">Seguro por diseño, listo para usar</span>",
    "hero.subtitle": "Diseñado para familias y grupos, no solo para individuos. En un grupo compartido de LINE/Telegram, la IA reconoce a cada miembro y cambia a su espacio de trabajo aislado con calendarios y claves 100% privados.",
    "hero.btnDownload": "Descargar instalador",
    "hero.btnGithub": "Código fuente de GitHub",
    "terminal.copySuccess": "¡Copiado!",
    "terminal.userQuery": "\"Revisa mi Google Calendar para mañana. Si hay una reunión, notifícame una hora antes y enciende el aire acondicionado inteligente.\"",
    "terminal.listening": "ButlerCrab está listo y a la espera...",
    "features.title": "Potentes funciones de IA local",
    "features.desc": "Diseñado para usuarios que exigen privacidad absoluta y productividad automatizada",
    "features.f1.title": "100% Local y Privacidad Primero",
    "features.f1.desc": "Todos los chats, bases de conocimiento y tareas se procesan en su dispositivo local. Cero envíos de telemetría.",
    "features.f2.title": "Memoria jerárquica GraphRAG",
    "features.f2.desc": "El algoritmo local HTM conecta las conversaciones históricas, creando un mapa de conocimiento para búsquedas más precisas.",
    "features.f3.title": "Chat multiplataforma y automatización inteligente",
    "features.f3.desc": "Compatible con 11 aplicaciones de mensajería como LINE, Telegram, WhatsApp y Discord. Controle tareas desde cualquier lugar. ¡Ahorre más del 80% de tokens mediante enrutamiento inteligente, acelerando la inferencia local 5 veces y reduciendo costos!",
    "features.f4.title": "Consola Web Intuitiva",
    "features.f4.desc": "Ofrece una interfaz web limpia y responsiva. Configure el comportamiento del agente, vea logs y monitoree tareas en modo claro u oscuro.",
    "features.f5.title": "Grupos Compartidos y Aislamiento Estricto de Espacio",
    "features.f5.desc": "Supere los límites de la IA personal. Comparta el mismo chat grupal o PC familiar manteniendo historiales de chat, agendas y credenciales de API totalmente aislados y seguros.",
    "features.f6.title": "Hogar Inteligente y Vigilancia Local",
    "features.f6.desc": "Se integra con Home Assistant para el control por lenguaje natural, y cuenta con visión YOLO local para detección segura de objetos y notificaciones.",
    "scenarios.title": "¿Cómo gestiona la IA su vida hogareña?",
    "scenarios.desc": "Sin configuraciones complejas, experimente el futuro de la asistencia inteligente a través de escenarios cotidianos.",
    "scenarios.card1.title": "Cámaras viejas convertidas en 'Guardias de seguridad de IA'",
    "scenarios.card1.desc": "Monitoree su hogar 24/7 con su computadora y cámara viejas. Envía alertas de forma segura por LINE/Telegram si detecta actividad sospechosa, sin tarifas mensuales.",
    "scenarios.card1.badge": "Tranquilidad para Papá",
    "scenarios.card2.title": "Un 'Mayordomo Familiar' que coordina agendas y hogar inteligente",
    "scenarios.card2.desc": "Cada mañana antes de salir, el mayordomo le informa del clima, verifica agendas y enciende el deshumidificador según los niveles de humedad. Todo mediante comandos de voz.",
    "scenarios.card2.badge": "Un asistente útil para Mamá",
    "scenarios.card3.title": "Chat Grupal Compartido, Espacio Aislado",
    "scenarios.card3.desc": "Cuando la familia interactúa en un grupo de Telegram/LINE, la IA cambia dinámicamente el espacio según quién hable (vía /bind). Papá no puede acceder a las tareas privadas de Mamá.",
    "scenarios.card3.badge": "Aislamiento de Privacidad Familiar",
    "skills.title": "Catálogo oficial de habilidades",
    "skills.desc": "Instalación en un clic para expandir las capacidades de su asistente local",
    "download.title": "Comience con ButlerCrab ahora",
    "download.desc": "Ejecución local, sin configuraciones complejas. Descargue el instalador para su plataforma.",
    "download.span": "Descargar para",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac (.dmg)",
    "footer.desc": "Plataforma local y priorizando la privacidad para la colaboración de agentes de IA",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. Lanzado bajo la licencia BSL 1.1。",
    
    // Skills
    "skills.gmail_connector.desc": "Integración local con Google Mail API. Permite categorización, borradores y envíos aislando las credenciales.",
    "skills.scheduler_pro.desc": "Ejecute flujos de travail DAG complejos con reintentos, paso de variables y receptores en tiempo real.",
    "skills.smart_home_link.desc": "Conectado a Home Assistant local. Controla electrodomésticos inteligentes por voz o programaciones.",
    "skills.calendar_sync.desc": "Sincroniza Google Calendar y Outlook Calendar. Genera informes de reuniones mediante RAG local.",
    "skills.local_vision.desc": "Uso de cámara local para detección de objetos en tiempo real con YOLO, enviando eventos al programador.",
    "skills.terminal.desc": "Permite ejecutar comandos de terminal en un entorno sandbox seguro para automatizar tareas de archivos.",
    "download.info_pricing_subtitle": "Modos de ejecución dual flexibles e información de costos",
    "download.mode_local_badge": "Modo de modelo local",
    "download.mode_local_title": "Suscripción de $0, costos de API de $0",
    "download.mode_local_desc": "Úselo con un modelo de Ollama local (como Llama 3 o Gemma). Incluso con un funcionamiento las 24 horas, los 7 días de la semana, ButlerCrab no genera tarifas de uso. Completamente gratis. No requiere tarjeta de crédito, sin cargos sorpresa.",
    "download.mode_cloud_badge": "Modo de API en la nube",
    "download.mode_cloud_title": "Tarifa de API de pago por uso (Pay-as-you-go)",
    "download.mode_cloud_desc": "Si opta por conectar API en la nube de terceros (como Gemini u OpenAI), las tarifas son cobradas directamente por esas plataformas según el uso real. ButlerCrab no cobra tarifas de servicio adicionales.",
    "download.info_license_title": "Aviso de licencia:",
    "download.info_license_desc": "Este proyecto se publica bajo la licencia BSL 1.1. Es 100% gratuito y de código abierto para uso personal y familiar. El uso comercial requiere una licencia comercial.",
    "demo.title": "Pruebe nuestra consola Web UI",
    "demo.subtitle": "Haga clic en las pestañas laterales del panel (Resumen, Chat, Cámaras, etc.) para experimentar la interfaz del asistente local de IA.",
    "comparison.title": "¿Por qué elegir ButlerCrab?",
    "comparison.desc": "Diseñado para familias y chats grupales, superando los límites de los asistentes de IA personales típicos.",
    "comparison.th_feature": "Característica clave",
    "comparison.th_personal": "Asistente de IA personal",
    "comparison.th_butler": "Asistente familiar ButlerCrab",
    "comparison.row1.name": "Audiencia y escenario",
    "comparison.row1.personal": "Cuenta de usuario único; sin soporte para colaboración multiusuario.",
    "comparison.row1.butler": "Diseñado para familias/grupos; vinculación de tareas por usuario.",
    "comparison.row2.name": "Privacidad en chats grupales",
    "comparison.row2.personal": "Las credenciales compartidas exponen todos los historiales y detalles privados.",
    "comparison.row2.butler": "Chat grupal compartido con aislamiento estricto de workspace y claves.",
    "comparison.row3.name": "Costes de ejecución y API",
    "comparison.row3.personal": "Licencias individuales; el coste de la API crece exponencialmente con el chat.",
    "comparison.row3.butler": "Hardware local compartido; enrutamiento inteligente ahorra más del 80% de tokens.",
    "comparison.row4.name": "Control de hogar inteligente",
    "comparison.row4.personal": "Sin control local nativo; requiere servicios en la nube de pago.",
    "comparison.row4.butler": "Integración nativa con Home Assistant; envíe comandos desde cualquier lugar.",
    "comparison.row5.name": "Límite de seguridad",
    "comparison.row5.personal": "Todos los chats subidos a la nube; riesgos de telemetría y filtración de datos.",
    "comparison.row5.butler": "Operación 100% local; credenciales seguras en el keyring del sistema operativo local"
  },
  "de": {
    "head.title": "ButlerCrab — Lokale, datenschutzfreundliche Multi-Agenten-Plattform",
    "nav.features": "Features",
    "nav.skills": "Skills-Verzeichnis",
    "nav.dev_docs": "Entwickler-Dokumentation",
    "nav.download": "Jetzt herunterladen",
    "hero.badge": "ButlerCrab v1.0.0 offiziell veröffentlicht",
    "hero.title": "Lokaler KI-Assistent<br><span class=\"gradient-text\">Sicher im Design, sofort startklar</span>",
    "hero.subtitle": "Entwickelt für Familien und Gruppen, nicht nur für Einzelpersonen. In einem LINE/Telegram-Chat erkennt die KI verschiedene Mitglieder und leitet Anfragen an deren isolierte Arbeitsbereiche weiter.",
    "hero.btnDownload": "Installer herunterladen",
    "hero.btnGithub": "GitHub-Quellcode",
    "terminal.copySuccess": "Kopiert!",
    "terminal.userQuery": "\"Prüfe meinen Google Kalender für morgen. Wenn es ein Meeting gibt, benachrichtige mich eine Stunde vorher und schalte die Klimaanlage ein.\"",
    "terminal.listening": "ButlerCrab ist bereit und wartet...",
    "features.title": "Leistungsstarke lokale KI-Funktionen",
    "features.desc": "Entwickelt für Anwender, die absolute Privatsphäre und automatisierte Produktivität verlangen",
    "features.f1.title": "100% lokal & Datenschutz zuerst",
    "features.f1.desc": "Alle Chats, Wissensdatenbanken und Planer laufen auf Ihrem Gerät. Keine Telemetriedaten werden hochgeladen.",
    "features.f2.title": "GraphRAG Hierarchischer Speicher",
    "features.f2.desc": "Ein lokaler HTM-Algorithmus verbindet Konversationen zu einem Wissensgraphen für präzisere Abfragen.",
    "features.f3.title": "Cross-App-Chat & intelligente Automatisierung",
    "features.f3.desc": "Unterstützt 11 Messenger-Apps wie LINE, Telegram, WhatsApp und Discord. Steuern Sie Haushaltsgeräte von überall aus. Sparen Sie über 80% der Token durch intelligentes Routing, wodurch die lokale Inferenzgeschwindigkeit um das Fünffache erhöht und Kosten gesenkt werden!",
    "features.f4.title": "Intuitive Web-Konsole",
    "features.f4.desc": "Bietet ein sauberes, responsives Web-UI. Konfigurieren Sie das Agentenverhalten, sehen Sie Ausführungsprotokolle ein und überwachen Sie Aufgaben.",
    "features.f5.title": "Geteilte Gruppen \u0026 strikte Bereichstrennung",
    "features.f5.desc": "Befreien Sie sich von den Grenzen persönlicher KIs. Nutzen Sie denselben Chat oder PC gemeinsam, während Verläufe, Termine und API-Anmeldedaten vollständig getrennt bleiben.",
    "features.f6.title": "Smart Home & Lokale Überwachung",
    "features.f6.desc": "Integriert Home Assistant zur Steuerung über natürliche Sprache und bietet lokale YOLO-Bildverarbeitung zur Objekterkennung und Alarmierung.",
    "scenarios.title": "Wie verwaltet KI Ihren Haushalt?",
    "scenarios.desc": "Erleben Sie die Zukunft der smarten Assistenz durch intuitive Alltagsszenarien ohne komplexe Einstellungen.",
    "scenarios.card1.title": "Alte Laptops werden zu 'KI-Sicherheitsgardisten'",
    "scenarios.card1.desc": "Überwachen Sie Ihr Zuhause rund um die Uhr mit einem alten Computer und einer Kamera. Sendet sofort LINE/Telegram-Alarme bei verdächtigen Aktivitäten, ganz ohne Abo-Gebühren.",
    "scenarios.card1.badge": "Sicherheit für Papa",
    "scenarios.card2.title": "Ein 'Familien-Butler' für Kalender & Smart Home",
    "scenarios.card2.desc": "Jeden Morgen vor dem Verlassen des Hauses sagt der Butler das Wetter an, prüft Termine und schaltet den Luftentfeuchter je nach Luftfeuchtigkeit ein. Alles per Sprachsteuerung.",
    "scenarios.card2.badge": "Hilfreicher Assistent für Mama",
    "scenarios.card3.title": "Gemeinsamer Gruppen-Chat, getrennte Bereiche",
    "scenarios.card3.desc": "Wenn die Familie in einer Telegram/LINE-Gruppe chattet, wechselt die KI den Bereich dynamisch je nach Sprecher (via /bind). Der Vater kann nicht auf die privaten Kalender der Mutter zugreifen.",
    "scenarios.card3.badge": "Privatsphäre-Isolation für alle",
    "skills.title": "Offizielles Skills-Verzeichnis",
    "skills.desc": "Mit nur einem Befehl installieren, um die Funktionen Ihres Assistenten zu erweitern",
    "download.title": "Starten Sie jetzt mit ButlerCrab",
    "download.desc": "Lokale Ausführung ohne Reibung. Laden Sie den passenden Installer für Ihr System herunter.",
    "download.span": "Download für",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac (.dmg)",
    "footer.desc": "Lokale Multi-Agenten-Plattform mit Fokus auf Datensicherheit",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. Veröffentlicht unter BSL 1.1-Lizenz。",
    
    // Skills
    "skills.gmail_connector.desc": "Lokale Google Mail API-Integration. Automatisiert Kategorisierung und Entwürfe bei vollständiger Isolation der Credentials.",
    "skills.scheduler_pro.desc": "Ermöglicht komplexe DAG-Planer mit Fehler-Retries, Variablen-Chaining und Real-Time Listenern.",
    "skills.smart_home_link.desc": "Anbindung an lokales Home Assistant. Steuert Smart-Home-Geräte über Konversationen und Zeittrigger.",
    "skills.calendar_sync.desc": "Synchronisiert Google- und Outlook-Kalender. Bereitet Briefings basierend auf lokalem RAG vor.",
    "skills.local_vision.desc": "Echtzeit-YOLO-Objekterkennung über lokale Kamera-Feeds mit direkter Ereignisweiterleitung an den Scheduler.",
    "skills.system_terminal.desc": "Erlaubt Befehlsausführungen in einer sicheren Sandbox zur Automatisierung von Builds und Dateien.",
    "download.info_pricing_subtitle": "Flexible duale Betriebsmodi und Kostenaufstellung",
    "download.mode_local_badge": "Lokaler Modellmodus",
    "download.mode_local_title": "0 $ Abonnement, 0 $ API-Kosten",
    "download.mode_local_desc": "Kombinieren Sie es mit einem lokalen Ollama-Modell (wie Llama 3 oder Gemma). Selbst bei einem 24/7-Betrieb fallen bei ButlerCrab keine Nutzungsgebühren an. Völlig kostenlos. Keine Kreditkarte erforderlich, keine unerwarteten Kosten.",
    "download.mode_cloud_badge": "Cloud-API-Modus",
    "download.mode_cloud_title": "Nutzungsabhängige API-Preise (Pay-as-you-go)",
    "download.mode_cloud_desc": "Wenn Sie sich für die Verbindung mit Cloud-APIs von Drittanbietern entscheiden (wie Gemini oder OpenAI), werden die Gebühren direkt von diesen Plattformen basierend auf der tatsächlichen Nutzung berechnet. ButlerCrab selbst erhebt keine Servicegebühren.",
    "download.info_license_title": "Lizenzhinweis:",
    "download.info_license_desc": "Dieses Projekt wird unter der BSL 1.1-Lizenz veröffentlicht. Es ist zu 100% kostenlos und Open-Source für den persönlichen und familiären Gebrauch. Die gewerbliche Nutzung erfordert eine kommerzielle Lizenz.",
    "demo.title": "Testen Sie unsere Web-Konsole",
    "demo.subtitle": "Klicken Sie auf die Registerkarten (Übersicht, Chat, Kameras usw.), um die Benutzeroberfläche des lokalen KI-Assistenten live zu erleben.",
    "comparison.title": "Warum ButlerCrab wählen?",
    "comparison.desc": "Entwickelt für Familien und Gruppenchats, um die Grenzen typischer persönlicher KI-Assistenten zu überwinden.",
    "comparison.th_feature": "Hauptmerkmal",
    "comparison.th_personal": "Persönlicher KI-Assistent",
    "comparison.th_butler": "ButlerCrab Familien-KI",
    "comparison.row1.name": "Zielgruppe & Szenario",
    "comparison.row1.personal": "Einzelnes Benutzerkonto; keine Unterstützung für Multi-User-Zusammenarbeit.",
    "comparison.row1.butler": "Für Familien/Gruppen entwickelt; benutzerbezogene Aufgabenzuweisung.",
    "comparison.row2.name": "Privatsphäre in Gruppenchats",
    "comparison.row2.personal": "Gemeinsame Zugangsdaten legen alle Chatverläufe und Details offen.",
    "comparison.row2.butler": "Gemeinsamer Gruppenchat bei strikter Trennung von Arbeitsbereich und Schlüsseln.",
    "comparison.row3.name": "API- und Betriebskosten",
    "comparison.row3.personal": "Einzelne Lizenzen; API-Kosten steigen exponentiell mit der Chatlänge.",
    "comparison.row3.butler": "Gemeinsame lokale Hardware; intelligentes Routing spart über 80% an Tokens.",
    "comparison.row4.name": "Smart-Home-Zentrale",
    "comparison.row4.personal": "Keine native lokale Gerätesteuerung; erfordert kostenpflichtige Cloud-Brücken.",
    "comparison.row4.butler": "Integrierte Home-Assistant-Verbindung; Befehle von unterwegs senden.",
    "comparison.row5.name": "Sicherheitsgrenze",
    "comparison.row5.personal": "Alle Chats in die Cloud hochgeladen; Risiko von Datenlecks.",
    "comparison.row5.butler": "100% lokaler Betrieb; Anmeldeinformationen im lokalen OS-Keyring gesichert."
  },
  "fr": {
    "head.title": "ButlerCrab — Plateforme locale multi-agent axée sur la confidentialité",
    "nav.features": "Caractéristiques",
    "nav.skills": "Catalogue de Skills",
    "nav.dev_docs": "Docs Développeur",
    "nav.download": "Télécharger",
    "hero.badge": "ButlerCrab v1.0.0 officiellement publié",
    "hero.title": "Assistant IA en local<br><span class=\"gradient-text\">Sécurisé par conception, prêt à l'emploi</span>",
    "hero.subtitle": "Conçu pour les familles et les groupes, pas seulement les individus. Dans un groupe LINE/Telegram partagé, l'IA reconnaît les membres et dirige les requêtes vers leurs espaces isolés.",
    "hero.btnDownload": "Télécharger l'installateur",
    "hero.btnGithub": "Code source GitHub",
    "terminal.copySuccess": "Copié !",
    "terminal.userQuery": "\"Vérifie mon Google Agenda pour demain. S'il y a une réunion, préviens-moi une heure avant et allume la climatisation intelligente.\"",
    "terminal.listening": "ButlerCrab est prêt et en attente...",
    "features.title": "Puissantes fonctionnalités d'IA locale",
    "features.desc": "Conçu pour les utilisateurs exigeant une confidentialité absolue et une productivité automatisée",
    "features.f1.title": "100% Local & Confidentialité d'abord",
    "features.f1.desc": "Toutes les discussions, bases de connaissances et tâches sont traitées sur votre machine. Zéro télémétrie.",
    "features.f2.title": "Mémoire hiérarchique GraphRAG",
    "features.f2.desc": "L'algorithme HTM local relie les conversations pour créer un graphe de connaissances et optimiser la recherche contextuelle.",
    "features.f3.title": "Chat multi-plateforme & automatisation intelligente",
    "features.f3.desc": "Prend en charge 11 applications de messagerie (LINE, Telegram, WhatsApp, Discord, etc.). Contrôlez vos tâches n'importe où. Économisez plus de 80% de tokens grâce au routage intelligent, multipliant par 5 la vitesse d'inférence locale et réduisant les coûts !",
    "features.f4.title": "Console Web Intuitive",
    "features.f4.desc": "Fournit une interface Web claire et réactive. Configurez le comportement des agents, affichez les journaux et surveillez les tâches en mode clair ou sombre.",
    "features.f5.title": "Groupes Partagés \u0026 Isolation de l'Espace",
    "features.f5.desc": "Libérez-vous des limites de l'IA personnelle. Partagez le même groupe ou PC familial tout en gardant vos historiques, agendas et identifiants API entièrement isolés et sécurisés.",
    "features.f6.title": "Domotique & Surveillance Locale",
    "features.f6.desc": "Intègre Home Assistant pour contrôler vos appareils par la voix et intègre la vision YOLO locale pour la détection d'objets et les notifications.",
    "scenarios.title": "Comment l'IA gère-t-elle votre vie de famille ?",
    "scenarios.desc": "Découvrez le futur de l'assistance intelligente à travers des scénarios quotidiens, sans réglages compliqués.",
    "scenarios.card1.title": "De vieilles caméras transformées en 'Gardiens de sécurité IA'",
    "scenarios.card1.desc": "Surveillez votre domicile 24h/24 avec votre vieil ordinateur et une webcam. Envoie des alertes LINE/Telegram instantanées en cas d'intrusion, sans frais d'abonnement.",
    "scenarios.card1.badge": "Tranquillité d'esprit pour Papa",
    "scenarios.card2.title": "Un 'Majordome familial' qui coordonne agendas & domotique",
    "scenarios.card2.desc": "Chaque matin, le majordome annonce la météo, vérifie les plannings et active le déshumidificateur selon le taux d'humidité. Tout cela par commande vocale.",
    "scenarios.card2.badge": "Un assistant précieux pour Maman",
    "scenarios.card3.title": "Groupe de Discussion Partagé, Espace Isolé",
    "scenarios.card3.desc": "Lorsque la famille interagit dans un groupe Telegram/LINE, l'IA change d'espace dynamiquement selon qui parle (via /bind). Le père ne peut pas accéder aux tâches privées de la mère.",
    "scenarios.card3.badge": "Isolation de la Vie Privée pour Tous",
    "skills.title": "Catalogue officiel de Skills",
    "skills.desc": "Installez en une seule commande pour étendre les capacités de votre assistant local",
    "download.title": "Commencer avec ButlerCrab",
    "download.desc": "Exécution locale, sans tracas de configuration. Téléchargez le pack d'installation pour votre système.",
    "download.span": "Télécharger pour",
    "download.win_label": "Windows (.exe)",
    "download.mac_label": "Mac (.dmg)",
    "footer.desc": "Plateforme locale et respectueuse de la vie privée pour la collaboration d'agents IA",
    "footer.copyright": "&copy; 2026 QUARTIMES INC. Publié sous licence BSL 1.1。",
    
    // Skills
    "skills.gmail_connector.desc": "Intégration locale de l'API Google Mail. Classement automatique, brouillons et envois isolant les identifiants.",
    "skills.scheduler_pro.desc": "Planificateur de tâches DAG complexes avec tentatives automatiques, chaîne de variables et écouteurs d'événements.",
    "skills.smart_home_link.desc": "Connexion à Home Assistant en local. Contrôle des appareils par dialogue naturel et planifications.",
    "skills.calendar_sync.desc": "Synchronisation de Google Calendar et Outlook Calendar. Prépare des briefings de réunions via RAG local.",
    "skills.local_vision.desc": "Utilisation de la caméra locale pour détection YOLO en temps réel, redirigeant les événements vers le planificateur.",
    "skills.terminal.desc": "Exécute des commandes système dans un bac à sable local sécurisé pour automatiser la gestion de fichiers.",
    "download.info_pricing_subtitle": "Modes de fonctionnement doubles flexibles et détails des coûts",
    "download.mode_local_badge": "Mode modèle local",
    "download.mode_local_title": "Abonnement à 0 $, coûts d'API à 0 $",
    "download.mode_local_desc": "Associez-le à un modèle Ollama local (comme Llama 3 ou Gemma). Même avec un fonctionnement 24h/24 et 7j/7, ButlerCrab ne génère aucun frais d'utilisation. Entièrement gratuit. Aucune carte de crédit requise, aucun risque de facturation inattendue.",
    "download.mode_cloud_badge": "Mode API Cloud",
    "download.mode_cloud_title": "Tarification de l'API au paiement à l'usage (Pay-as-you-go)",
    "download.mode_cloud_desc": "Si vous choisissez de connecter des API cloud tierces (comme Gemini ou OpenAI), les frais sont facturés directement par ces plateformes en fonction de l'utilisation réelle. ButlerCrab ne facture aucun frais de service.",
    "download.info_license_title": "Avis de licence :",
    "download.info_license_desc": "Ce projet est publié sous licence BSL 1.1. Il est 100 % gratuit et open-source pour un usage personnel et familial. L'utilisation commerciale nécessite une licence commerciale.",
    "demo.title": "Essayez notre console Web UI",
    "demo.subtitle": "Cliquez sur les onglets (Aperçu, Chat, Caméras, etc.) pour faire l'expérience de l'interface de l'assistant IA local.",
    "comparison.title": "Pourquoi choisir ButlerCrab ?",
    "comparison.desc": "Conçu pour les familles et les groupes, surmontant les limites des assistants IA personnels.",
    "comparison.th_feature": "Caractéristique clé",
    "comparison.th_personal": "Assistant IA personnel",
    "comparison.th_butler": "IA familiale ButlerCrab",
    "comparison.row1.name": "Public & Scénario",
    "comparison.row1.personal": "Compte unique ; pas de collaboration multi-utilisateur.",
    "comparison.row1.butler": "Conçu pour les familles/groupes ; affectation des tâches par utilisateur.",
    "comparison.row2.name": "Confidentialité des groupes",
    "comparison.row2.personal": "Les identifiants partagés exposent tous les historiques et détails privés.",
    "comparison.row2.butler": "Groupe partagé avec isolation stricte des espaces de travail et des clés.",
    "comparison.row3.name": "Coûts API & Exécution",
    "comparison.row3.personal": "Licences individuelles ; les coûts API grimpent avec la longueur du chat.",
    "comparison.row3.butler": "Matériel local partagé ; le routage intelligent économise plus de 80% de jetons.",
    "comparison.row4.name": "Maison connectée",
    "comparison.row4.personal": "Pas de contrôle local natif ; nécessite ponts cloud payants.",
    "comparison.row4.butler": "Intégration Home Assistant ; envoyez des commandes en déplacement.",
    "comparison.row5.name": "Sécurité des données",
    "comparison.row5.personal": "Tous les chats envoyés sur le cloud ; risques de télémétrie et de fuite.",
    "comparison.row5.butler": "100% local ; identifiants sécurisés dans le trousseau d'accès local."
  }
};

let currentLang = "zh-TW";

function initLanguage() {
  const langSelect = document.getElementById('lang-select');
  if (!langSelect) return;

  const savedLang = localStorage.getItem('lang');
  let defaultLang = savedLang;

  if (!defaultLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh-CN')) {
      defaultLang = 'zh-CN';
    } else if (browserLang.startsWith('zh')) {
      defaultLang = 'zh-TW';
    } else if (browserLang.startsWith('ja')) {
      defaultLang = 'ja';
    } else if (browserLang.startsWith('ko')) {
      defaultLang = 'ko';
    } else if (browserLang.startsWith('es')) {
      defaultLang = 'es';
    } else if (browserLang.startsWith('de')) {
      defaultLang = 'de';
    } else if (browserLang.startsWith('fr')) {
      defaultLang = 'fr';
    } else {
      defaultLang = 'en';
    }
  }

  currentLang = locales[defaultLang] ? defaultLang : 'en';
  langSelect.value = currentLang;
  
  translatePage();
  renderSkillsCatalog();

  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    translatePage();
    renderSkillsCatalog();
  });
}

function translatePage() {
  const dict = locales[currentLang];
  if (!dict) return;

  document.documentElement.setAttribute('lang', currentLang);
  if (dict["head.title"]) {
    document.title = dict["head.title"];
  }

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const dictValue = dict[key] || locales['en'][key];
    if (dictValue) {
      if (dictValue.includes('<') && dictValue.includes('>')) {
        el.innerHTML = dictValue;
      } else {
        el.textContent = dictValue;
      }
    }
  });
}

/* ==========================================================================
   2. 主題切換與持久化 (Theme Switching)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================================================
   3. 剪貼簿複製功能 (Clipboard Copy)
   ========================================================================== */
function initCopyHandlers() {
  const copyBtn = document.getElementById('btn-copy-install');
  const installCmd = document.getElementById('install-command');
  const tooltip = document.getElementById('copy-tooltip');

  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', () => {
      copyToClipboard(installCmd.textContent, tooltip);
    });
  }
}

function copyToClipboard(text, tooltipElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (tooltipElement) {
      tooltipElement.classList.add('show');
      setTimeout(() => {
        tooltipElement.classList.remove('show');
      }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy command: ', err);
  });
}

/* ==========================================================================
   4. 終端機載入動畫模擬 (Terminal Simulation)
   ========================================================================== */
let activeTimeouts = [];
function initTerminalSimulation() {
  const terminalLines = document.querySelectorAll('.window-body .terminal-line');
  const activeLine = document.querySelector('.window-body .terminal-line-active');
  
  if (terminalLines.length === 0) return;

  // Clear previous timeouts to prevent overlapping animations
  activeTimeouts.forEach(t => clearTimeout(t));
  activeTimeouts = [];

  terminalLines.forEach(line => {
    line.style.display = 'none';
  });
  if (activeLine) activeLine.style.display = 'none';

  let delay = 300;

  terminalLines.forEach((line, index) => {
    const t = setTimeout(() => {
      line.style.display = 'block';
      if (index === terminalLines.length - 1 && activeLine) {
        const t2 = setTimeout(() => {
          activeLine.style.display = 'flex';
        }, 500);
        activeTimeouts.push(t2);
      }
    }, delay);
    activeTimeouts.push(t);
    
    if (index === 0) {
      delay += 800;
    } else {
      delay += 400;
    }
  });
}

/* ==========================================================================
   4b. 互動控制台邏輯 (Web UI Console Tabs and Tickers)
   ========================================================================== */
function initWebUIConsole() {
  const sidebarItems = document.querySelectorAll('.webui-sidebar-item');
  const tabContents = document.querySelectorAll('.webui-tab-content');
  const activeTitle = document.getElementById('webui-active-tab-title');

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      if (!tabName) return;

      // Update sidebar active state
      sidebarItems.forEach(si => si.classList.remove('active'));
      item.classList.add('active');

      // Update active tab content display
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${tabName}`) {
          content.classList.add('active');
        }
      });

      // Update active title text using translation or title fallback
      if (activeTitle) {
        const dict = locales[currentLang] || locales['en'];
        const translationKey = `mockup.sidebar.${tabName}`;
        if (dict && dict[translationKey]) {
          activeTitle.textContent = dict[translationKey];
        } else {
          activeTitle.textContent = tabName.charAt(0).toUpperCase() + tabName.slice(1);
        }
      }

      // If switching to chat tab, replay chat simulation
      if (tabName === 'chat') {
        initTerminalSimulation();
      }
    });
  });

  // Start live clock for NB Camera in Smart Cameras tab
  const timestampEl = document.getElementById('camera-timestamp');
  if (timestampEl) {
    // Initial call
    updateCameraTime(timestampEl);
    setInterval(() => {
      updateCameraTime(timestampEl);
    }, 1000);
  }
}

function updateCameraTime(el) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

/* ==========================================================================
   5. 動態渲染技能市集 (Skills Catalog Renderer)
   ========================================================================== */
const fallbackSkills = [
  {
    id: "gmail_connector",
    name: "Gmail Connector",
    version: "v1.1.2",
    installCmd: "crab install gmail"
  },
  {
    id: "scheduler_pro",
    name: "Scheduler Pro",
    version: "v1.0.0",
    installCmd: "crab install scheduler-pro"
  },
  {
    id: "smart_home_link",
    name: "Smart Home Link",
    version: "v0.9.8",
    installCmd: "crab install smart-home"
  },
  {
    id: "calendar_sync",
    name: "Calendar Sync",
    version: "v1.0.5",
    installCmd: "crab install calendar"
  },
  {
    id: "local_vision",
    name: "Local Vision Analyzer",
    version: "v0.8.2",
    installCmd: "crab install vision"
  },
  {
    id: "system_terminal",
    name: "Terminal Controller",
    version: "v1.0.2",
    installCmd: "crab install terminal"
  }
];

function renderSkillsCatalog() {
  const container = document.getElementById('skills-catalog');
  if (!container) return;

  fetch('registry.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      if (data && data.skills) {
        buildGrid(data.skills, container);
      } else {
        buildGrid(fallbackSkills, container);
      }
    })
    .catch(() => {
      buildGrid(fallbackSkills, container);
    });
}

function buildGrid(skills, container) {
  container.innerHTML = '';
  
  skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.id = `skill-card-${skill.id}`;

    const descKey = `skills.${skill.id}.desc`;
    const dict = locales[currentLang];
    const localizedDesc = (dict && dict[descKey]) ? dict[descKey] : (skill.description || '');

    card.innerHTML = `
      <div class="skill-header">
        <span class="skill-title">${skill.name}</span>
        <span class="skill-version">${skill.version}</span>
      </div>
      <p class="skill-desc">${localizedDesc}</p>
      <div class="skill-install">
        <span class="skill-cmd" id="cmd-${skill.id}">${skill.installCmd}</span>
        <button class="copy-btn" id="btn-copy-${skill.id}" title="複製安裝指令" aria-label="複製安裝指令">
          <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>
    `;

    container.appendChild(card);

    const btn = card.querySelector(`#btn-copy-${skill.id}`);
    const cmdText = card.querySelector(`#cmd-${skill.id}`);
    if (btn && cmdText) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        let tooltip = card.querySelector('.tooltip');
        if (!tooltip) {
          tooltip = document.createElement('span');
          tooltip.className = 'tooltip';
          tooltip.textContent = (dict && dict["terminal.copySuccess"]) ? dict["terminal.copySuccess"] : 'Copied';
          card.querySelector('.skill-install').appendChild(tooltip);
        }
        
        copyToClipboard(cmdText.textContent, tooltip);
      });
    }
  });
}
