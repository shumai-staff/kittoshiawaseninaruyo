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
     'images/futari/ogura-an.png',
   ],
   
  /* 主選單 */
  menu: [
    { id: 'intro',     label: 'INTRODUCTION', ja: 'あらすじ' },
    { id: 'character', label: 'CHARACTER',    ja: 'キャラクター' },
    { id: 'wardrobe',  label: 'WARDROBE',     ja: '衣装' },
    { id: 'story',     label: 'STORY',        ja: 'ストーリー' },
    { id: 'gallery',   label: 'GALLERY',      ja: 'ギャラリー' },
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
    lines: ['二人だけの居場所二人二人だけの居場所\nはきっと何処何処何処かにあるからだけ\nの居場所はきっと何処かにあるからはき','きっと、何処かにあるから'],
    choices: [
      { text: '……。' },
      { text: '……。' },
      { text: '……。' },
    ],
  },

  /* INTRO */
  intro: {
    vertical: true,
    text: `「  　二人で探しましょう、
        幸せになる方法。 　 」

為了尋找容身之處，
一起離家出走的兩人。

除了對方之外已經一無所有了。

如此共依存著的
兩個女孩子的旅行日常。`,
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
      tags: ['王子系', 'イケメン女子'],
      profile: [
        ['性別', '女'],
        ['年齢', '17'],
        ['身長', '172cm'],
        ['誕生日', '05/20'],
        ['動物塑', '博美犬'],
        ['好きな食べ物', '甘いもの全部好き♪'],
        ['特技', '絕對能跟小吃店的阿姨拿到招待的小菜！'],
      ],
      sections: [
        {
          title: '表向き',
          head: '何でも受け入れる完璧な王子様',
          text: `社交全能，擅長照顧人
  在大家眼中的形象是優雅的王子様`,
        },
         {
          title: '特徵',
          head: '',
          text: `挑染 / 黑眼圈 / 右耳耳洞
          對姬奈乃的稱呼是おひめ`,
        },
        {
          title: '裏顔',
          head: 'ちょっぴり情けない犬',
          text: `對誰都過分溫柔，說話稍微有些輕浮
          比起王子搞不好更像牛郎
          
  不擅長拒絕
  認為比起做不想做的事
  拒絕而影響氣氛的成本更高
  總是隨意妥協，反而導致更多衝突

  因為這點造成的矛盾和在校的朋友圈決裂
  忍受帶著微妙惡意校園生活幾個月後
  被姬奈乃邀請一起逃走

  其實是個心志意外薄弱的女孩子
  離家出走後學了抽菸，但不到有癮的程度
  耳洞是姬奈乃親手穿的`,
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
      tags: ['無口', '地雷系女子'],
      profile: [
        ['性別', '女'],
        ['年齢', '17'],
        ['身長', '150cm'],
        ['誕生日', '12/23'],
        ['動物塑', '垂耳兔'],
        ['好きな食べ物', '辛いもの'],
        ['特技', '抽鬼牌不會輸']
      ],
      sections: [
        {
          title: '表向き',
          head: '毒舌で孤高な不思議ちゃん',
          text: `話少又毒舌，似乎一直面無表情
看起來難以接近，總是獨來獨往`,
        },
         {
          title: '特徵',
          head: '',
          text: `八字眉 / 左眼下痣 / 無表情
          對早紀的稱呼是さき`,
        },
        {
          title: '裏顔',
          head: '不器用で優しい努力家',
          text: `不擅長表達心情與好意
          即使開口也是吐槽居多
          
  成長在父母陰晴不定的家庭
  因而極為擅長察言觀色
  總是笨拙的嘗試照顧人
  自認做得不好
  所以反而更過度幫助人而消耗自己

  為了最大程度削減和父母之間的交流
  會在外閒晃到深夜才回家
  某天遇到早紀後邀請她一起逃跑
  
  貓舌，吃不了燙的東西
  很受小動物歡迎`,
        },
      ],
    },
  ],

  relationship: {
    title: '',
    sliders: [
      { label: '主導権', saki: 30,  hinano: 80 },
      { label: '独占欲', saki: 90,  hinano: 40 },
      { label: '甘え', saki: 55, hinano: 80 },
      { label: '甘やかし', saki: 75, hinano: 65 },
      { label: '素直さ', saki: 85, hinano: 10 },
      { label: '依存度', saki: 100, hinano: 100 },
    ],
    text: `
    沒有在交往
    理所當然維持著等同交往的肢體接觸
    情感上也是相互依附的重度共依存

    兩個人都是高攻低防的類型
    會主動、一旦輪對方主動的時候卻會慌張

    因為只剩下對方了
    所以要緊緊抓住彼此不放開
    就這樣每天每天互相撒嬌和寵溺著♡

    `,
  },

  /* GALLERY
  往上添加最新 thumb = 縮圖*/
  gallery: [
    { title: 'ㄒㄌ　様', date: '2026/11/13', image: 'images/gallery/nes03.PNG',  },
    { title: 'ネス　様', date: '2026/11/02', image: 'images/gallery/nes02.png',  },
    { title: '辣味魚醬　様', date: '2026/11/01', image: 'images/gallery/spfh.png',  },
    { title: '阿明　様', date: '2026/11/01', image: 'images/gallery/ming.jpg',  },
    { title: 'ネス　様', date: '2026/10/21', image: 'images/gallery/nes01.png',  },
    { title: '小丸子　様', date: '2026/10/16', image: 'images/gallery/komaru02.2.jpg',  },
    { title: '噗幣轉蛋', date: '2026/10/08', image: 'images/gallery/plu-saki.png',  },
    { title: '噗幣轉蛋', date: '2026/10/08', image: 'images/gallery/plu-hinano.png',  },
    { title: '小倉紅豆　様', date: '2026/10/05', image: 'images/gallery/ogura-an.png',  },
    { title: '床腳　様', date: '2026/10/04', image: 'images/gallery/bedfoot.png',  },
    { title: '小丸子　様', date: '2026/10/04', image: 'images/gallery/komaru01.jpg',  },
    { title: '米畫師', date: '2026/10/03', image: 'images/gallery/miiqm-saki.gif',  },
    { title: '米畫師', date: '2026/10/03', image: 'images/gallery/miiqm-hinano.gif',  },
    { title: '米畫師', date: '2026/10/02', image: 'images/gallery/mii.jpg',  },
    { title: '自分絵', date: '2026/08/15', image: 'images/gallery/shama.jpg',  },
    { title: 'アユ　様', date: '2025/07/15', image: 'images/gallery/ayu-saki.png',  },
    { title: 'アユ　様', date: '2025/07/15', image: 'images/gallery/ayu-hinano.png',  },
  ],

  /* STORY */
  storyTags: {
    '小説': '#e4a9c5',
    '漫画': '#8796de',
    '設定': '#BAA4D6',
    'R18': '#e0566b',
    '手描きMAD': '#D19D7F',
  },  
  
  stories: [
    {
      id: '004',
      type: 'novel',
      title: '〖中華パロ〗設定',
      date: '2026/11/14',
      tag : '設定',
      thumb: 'images/gallery/nes03.PNG',
      file: 'stories/004.txt',
    },
    {
      id: '002',
      type: 'comic',
      title: 'ネス　様',
      date: '2026/10/10',
      tag : ['R18', '漫画'],
      pages: [
        'images/gallery/nes0.1.png',
        'images/gallery/nes0.2.png',
      ],
    },
    {
      id: '001',
      type: 'novel',
      title: '〖手描き〗紗痲',
      date: '2026/08/15',
      tag : '手描きMAD',
      thumb: 'images/gallery/shama.jpg',
      file: 'stories/001.txt',
    },
  ],

  /* 服 */
  wardrobe: [
    { chara: 'saki',   name: '01', image: 'images/gallery/plu-saki-nbg.1.png', note: 'いつも着てるお気に入りの日常服\n出發後兩個人一起買的第一套新衣服\n\nDesign by / 噗幣轉蛋' },
    { chara: 'hinano', name: '01', image: 'images/gallery/plu-hinano-nbg.1.png', note: 'いつも着てるお気に入りの日常服\n出發後兩個人一起買的第一套新衣服\n\nDesign by / 噗幣轉蛋' },

    { chara: 'saki',   name: '02', image: 'images/gallery/ming-saki.png', note: 'のんぴりお出かけ服\n\nDesign by /  阿明 様' },
    { chara: 'hinano', name: '02', image: 'images/gallery/ming-hinano.png', note: 'のんぴりお出かけ服\n\nDesign by /  阿明 様' },
    
    { chara: 'saki',   name: '03', image: 'images/gallery/nes03-saki.PNG', note: 'チャイナ服\n『満月飯店』の店員ちゃん\n\nDesign by /  ㄒㄌ 様' },
    { chara: 'hinano', name: '03', image: 'images/gallery/nes03-hinano.PNG', note: 'チャイナ服\n『満月飯店』の店員ちゃん\n\nDesign by /  ㄒㄌ 様' },
  ],

  /* UPDATE */
  updates: [
    { date: '2026/11/14', text: '效果調整。更新中華風服設與世界觀。' },
    { date: '2026/11/04', text: '網站公開。' },
  ],

  /* ABOUT */
  about: {
    text: `
    太好了
    我最近很想吃煲仔飯

    網頁UI ▸ 空想曲線
    素敵なUIをお借りしました。
    有難うございます。

    網站中使用的所有圖片
    在ギャラリー中都已標註繪師
    謝謝大人們願意畫我家孩子！
    `,
    links: [
      { label: '連絡先 ▸ INSTAGRAM @shumai.staff', url: 'https://www.instagram.com/shumai.staff' },
    ],
    rules: `無断転載・自作発言・AI学習への使用はご遠慮ください。
禁止轉載、自作發言、用於 AI 學習。`,
  },
};
