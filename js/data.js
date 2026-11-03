window.SITE = {

  /* 名稱 */
  title: '二人の\nわんだーらんど♡',
  author: '焼売病院',

  /* 背景 */
  background: 'images/bg/alley.jpg',

  loadingImages: [
     'images/futari/komaru02.3.png',
     'images/futari/nes01-nbg.png',
     'images/futari/nes02.png',
     'images/futari/ogura-an3.png',
   ],
   
  /* 主選單 */
  menu: [
    { id: 'intro',     label: 'INTRODUCTION', ja: 'あらすじ' },
    { id: 'character', label: 'CHARACTER',    ja: 'キャラクター' },
    { id: 'gallery',   label: 'GALLERY',      ja: 'ギャラリー' },
    { id: 'story',     label: 'STORY',        ja: 'ストーリー' },
    { id: 'wardrobe',  label: 'WARDROBE',     ja: '衣装' },
    { id: 'update',    label: 'UPDATE',       ja: '更新履歴' },
    { id: 'about',     label: 'ABOUT',        ja: 'このサイトについて' },
  ],

  /* 開頭 */
  opening: [
    {
      speaker: '',
      lines: ['ねえ、一緒に逃げない？\n私と。'],
      choices: [
        { text: '……え？', correct: true },
        { text: '……逃げるって？', correct: true },
        { text: '……。', correct: true },
      ],
    },
    {
      speaker: '',
      lines: ['二人だけの居場所は\nきっと、何処かにあるから'],
      choices: [
        { text: '……。' },
        { text: 'いや、そんなこと急に……' },
        { text: 'わかった', correct: true },
      ],
    },
    {
      speaker: '',
      lines: ['……。'],
      choices: [
        { text: '一緒に行こう', correct: true },
      ],
    },
    {
      speaker: '',
      lines: ['……。'],
      choices: [
        { text: '二人で探しましょう、幸せになる方法', correct: true },
      ],
    },
  ],
   
  badEnd: {
    speaker: '',
    lines: ['二人だけの居場所二人二人だけの居場所はきっと何処か\nにあるからだけの居場所はきっと何処かにあるからはき','きっと、何処かにあるから'],
    choices: [
      { text: '……。' },
      { text: '……。' },
      { text: '……。' },
    ],
  },

  /* INTRO */
  intro: {
    vertical: true,
    text: `（ここに物語のあらすじが入ります）

ふたりが家を出た日のこと、
どこへ向かっているのか、
何を探しているのか。

このあたりに数行でまとめてください。`,
  },

  /* CHAR */
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
      card: 'images/hinano/plu-hinano-nbg.2.png',
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

  /* GALLERY
  往上添加最新 thumb = 縮圖*/
  gallery: [
    { title: 'ゆらゆら', date: '2026/11/03', image: 'images/hinano/chibi-bg.gif' },
  ],

  /* STORY */
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

  /* 服 */
  wardrobe: [
    { chara: 'saki',   name: 'いつもの服', image: 'images/saki/full.png',   note: `（デザインのポイントなど）` },
    { chara: 'hinano', name: 'いつもの服', image: 'images/hinano/full.png', note: `（デザインのポイントなど）` },
  ],

  /* UPDATE */
  updates: [
    { date: '2026/11/03', text: 'サイトを公開しました。' },
  ],

  /* ABOUT */
  about: {
    text: `（作者の自己紹介をここに）`,
    links: [
      { label: 'X', url: 'https://x.com/' },
    ],
    rules: `無断転載・自作発言・AI学習への使用はご遠慮ください。
禁止轉載、自稱原創、用於 AI 學習。`,
  },
};
