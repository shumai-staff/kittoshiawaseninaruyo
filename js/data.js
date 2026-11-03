/* =========================================================
   網站內容都在這個檔案裡。
   想改文字、加作品，基本上只需要改這裡。

   小提醒：
   - 文字要放在引號 ' ' 或反引號 ` ` 裡面。
     反引號 ` ` 裡面可以直接換行，適合長文章。
   - 每一筆資料 { ... } 後面要加逗號 ,
   - 圖片路徑是從網站最外層開始算，例如 images/gallery/xxx.png
   ========================================================= */

window.SITE = {

  /* ---------- 網站名稱 ----------
     \n 是換行（主選單會分兩行，分頁標籤和上方小標題會接成一行） */
  title: '二人の\nわんだーらんど♡',
  author: '作者名',

  /* 網站背景照片 */
  background: 'images/bg/alley.jpg',

  loadingImagines: [
     'images/futari/komaru02.3.png',
     'images/futari/nes01-nbg.png',
     'images/futari/nes02.png',
     'images/futari/ogura-an3.png',
   ],
   
  /* ---------- 主選單 ----------
     label：選單上顯示的英文
     ja：底下的小字
     想改名字（例如 INTRODUCTION 改成 PROLOGUE）改 label 就好 */
  menu: [
    { id: 'intro',     label: 'INTRODUCTION', ja: 'あらすじ' },
    { id: 'character', label: 'CHARACTER',    ja: 'キャラクター' },
    { id: 'gallery',   label: 'GALLERY',      ja: 'ギャラリー' },
    { id: 'story',     label: 'STORY',        ja: 'ストーリー' },
    { id: 'wardrobe',  label: 'WARDROBE',     ja: '衣装' },
    { id: 'update',    label: 'UPDATE',       ja: '更新履歴' },
    { id: 'about',     label: 'ABOUT',        ja: 'このサイトについて' },
  ],

  /* ---------- 開頭的文字遊戲 ----------
     每一段 = 幾句台詞 + 三個選項
     正確的選項加上 correct: true
     選錯的會進入 BAD END，再回到第一段
     （目前的台詞是先借用 Carrd 的句子暫放，等你給正式劇本再換） */
  opening: [
    {
      speaker: '',
      lines: ['ねえ、一緒に逃げない？', '私と。'],
      choices: [
        { text: '……え？' },
        { text: '……逃げるって？' },
        { text: '……。', correct: true },
      ],
    },
    {
      speaker: '',
      lines: ['（第2段のセリフ）'],
      choices: [
        { text: 'いや、そんなこと急に……' },
        { text: '……。' },
        { text: 'わかった', correct: true },
      ],
    },
    {
      speaker: '',
      lines: ['（第3段のセリフ）'],
      choices: [
        { text: '（選択肢）' },
        { text: '（選択肢）' },
        { text: '一緒に行こう', correct: true },
      ],
    },
  ],

  /* 選錯時進入的對話；三個選項選哪個都會回到第一段 */
  badEnd: {
    speaker: '',
    lines: ['（選錯したときのセリフ）'],
    choices: [
      { text: '（選択肢）' },
      { text: '（選択肢）' },
      { text: '（選択肢）' },
    ],
  },

  /* ---------- INTRODUCTION（故事簡介） ----------
     vertical: true = 電腦版用直書；手機一律橫書 */
  intro: {
    vertical: true,
    text: `（ここに物語のあらすじが入ります）

ふたりが家を出た日のこと、
どこへ向かっているのか、
何を探しているのか。

このあたりに数行でまとめてください。`,
  },

  /* ---------- CHARACTER（角色人設） ----------
     full：去背的立繪（背景透明 PNG）。半身放大、RELATIONSHIP、WARDROBE 用這張
     card：有排版的全身立繪，人設頁預設顯示這張；按「半身を見る」才會換成 full 放大（不需要的話整行刪掉，就會改用 full）
           full 和 card 要是同樣大小的圖，人物位置也要一樣
     icon：上方選角色用的大頭圖
     pet：讀取畫面跳來跳去的小動物
     heightCm：「ふたり」頁面兩人並排時的身高比例
     tags：名字下面的小標籤
     profile：左邊是項目，右邊是內容，可以自由增減
     sections：表向き、裏顔這種分段介紹 */
  characters: [
    {
      id: 'saki',
      name: '早紀',
      reading: 'SAKI',
      color: '#8796de',
      full: 'images/saki/plu-saki-nbg.1.png',
      card: 'images/saki/plu-saki-nbg.2.png',
      icon: 'images/saki/spfh-saki.2.png',
      heightCm: 172,
      tags: ['王子様系', 'イケメン女子'],
      profile: [
        ['性別', '女'],
        ['年齢', '17'],
        ['職業', '家出中♪'],
        ['動物', '博美犬'],
        ['身長', '172cm'],
      ],
      sections: [
        {
          title: '表向き',
          head: '何でも受け入れる完璧な王子様',
          text: `特徴 ‣ 挑染 / 黒眼圈 / 右耳耳洞
社交全能，擅長照顧人
在大家眼中的形象是優雅的王子様`,
        },
        {
          title: '裏顔',
          head: 'ちょっぴり情けない犬',
          text: `害怕影響氣氛而不擅長拒絕
反而導致更多衝突
心志意外薄弱的女孩子`,
        },
      ],
    },
    {
      id: 'hinano',
      name: '姫奈乃',
      reading: 'HINANO',
      color: '#e4a9c5',
      full: 'images/hinano/plu-hinano-nbg.1.png',
      card: 'images/hinano/plu-hinano-nbg.1.png',
      icon: 'images/hinano/spfh-hinano.2.png',
      heightCm: 150,
      tags: ['受け', '無口', '地雷系女子'],
      profile: [
        ['性別', '女'],
        ['年齢', '18'],
        ['職業', '家出中♪'],
        ['動物', '垂耳兔'],
        ['身長', '150cm'],
      ],
      sections: [
        {
          title: '表向き',
          head: '毒舌で孤高な不思議ちゃん',
          text: `特徴 ‣ 八字眉 / 左眼下痣 / 無表情
無口的女孩子，即使開口了也是吐槽居多
看起來難以接近，總是獨來獨往`,
        },
        {
          title: '裏顔',
          head: '不器用で優しい努力家',
          text: `成長在父母陰晴不定的家庭
因而擅長察言觀色
不擅表達但會笨拙的嘗試照顧人`,
        },
      ],
    },
  ],

  /* ---------- CHARACTER 頁往下滑的「ふたり」區（互動關係表） ----------
     每一條拉桿：label 是項目名稱
     數字是 0～100，名字要對應上面角色的 id（saki / hinano） */
  relationship: {
    title: '離家出走中　共依存的兩人♡',
    sliders: [
      { label: '主導権', saki: 30,  hinano: 80 },
      { label: '独占欲', saki: 90,  hinano: 40 },
      { label: '甘え', saki: 55, hinano: 80 },
      { label: '甘やかし', saki: 75, hinano: 65 },
      { label: '素直さ', saki: 85, hinano: 10 },
      { label: '依存度', saki: 100, hinano: 100 },
    ],
    text: `沒有在交往
理所當然的維持著等同交往的肢體接觸和距離感
除了對方已經別無所有了
所以要把對方抓的緊緊的絕對不分開，就這樣每天每天互相撒嬌和溺愛的甜蜜日常♡`,
  },

  /* ---------- GALLERY（圖庫） ----------
     新作品加在「最上面」，編號會自動往上加
     thumb（縮圖）可以不填，不填就直接用原圖 */
  gallery: [
    { title: 'ゆらゆら', date: '2026/11/03', image: 'images/hinano/chibi-bg.gif' },
  ],

  /* ---------- STORY（文章、短漫） ----------
     id：網址會用到，不要重複（例如 003）
     type: 'novel' = 文章，要填 file（文字檔放在 stories 資料夾）
     type: 'comic' = 漫畫，pages 依序填每一頁的圖片
     thumb（縮圖）可以不填
     一樣是新作品加在最上面 */
  stories: [
    {
      id: '002',
      type: 'comic',
      title: '（サンプル）短い漫画',
      date: '2026/11/03',
      pages: [
        'images/saki/sd.png',
        'images/hinano/sd.png',
      ],
    },
    {
      id: '001',
      type: 'novel',
      title: '（サンプル）はじめての夜',
      date: '2026/11/03',
      file: 'stories/001.txt',
    },
  ],

  /* ---------- WARDROBE（服裝設計） ----------
     chara 要對應上面角色的 id（saki / hinano） */
  wardrobe: [
    { chara: 'saki',   name: 'いつもの服', image: 'images/saki/full.png',   note: `（デザインのポイントなど）` },
    { chara: 'hinano', name: 'いつもの服', image: 'images/hinano/full.png', note: `（デザインのポイントなど）` },
  ],

  /* ---------- UPDATE（更新紀錄） ----------
     新的寫在最上面 */
  updates: [
    { date: '2026/11/03', text: 'サイトを公開しました。' },
  ],

  /* ---------- ABOUT（作者、連結、使用規範） ---------- */
  about: {
    text: `（作者の自己紹介をここに）`,
    links: [
      { label: 'X', url: 'https://x.com/' },
    ],
    rules: `無断転載・自作発言・AI学習への使用はご遠慮ください。
禁止轉載、自稱原創、用於 AI 學習。`,
  },
};
