export const GAME_SETTINGS = {
  maxPlayers: 10,
  gameDuration: 300, // 5 minutes
  topics: [
    '食べ物',
    '趣味',
    '夏休みの思い出',
    '休日の過ごし方',
    '将来の夢',
    '学校生活',
    'スポーツ',
    '旅行',
    'テレビ・映画',
    'お正月',
    '音楽',
    'ペット',
    '仕事',
    '恋愛',
    'ファッション'
  ]
} as const;

export const PLAYER_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500'
] as const;