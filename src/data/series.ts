export interface Series {
  id: number;
  title: string;
  slug: string;
  poster: string;
  rating: number;
  age: string;
  duration: string;
  year: number;
  genres: string[];
  description: string;
  episodes: Episode[];
  status: 'ongoing' | 'completed';
  totalEpisodes?: number;
}

export interface Episode {
  id: number;
  number: number;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  date?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

export const seriesData: Series[] = [
  {
    id: 1,
    title: "Сказание о пастухе богов",
    slug: "skazanie-o-pastuhe-bogov",
    poster: "https://dunhuatv.ru/uploads/posts/2025-08/skazanie-o-pastuhe-bogov1.webp",
    rating: 9.4,
    age: "16+",
    duration: "20 мин",
    year: 2024,
    genres: ["экшен", "приключения", "фэнтези", "исторический"],
    description: "В мире, где некогда царили древние боги, эпоха их власти подошла к концу, оставив после себя лишь осколки мифов и магию. Теперь миром правят разнообразные культы и секты, стремящиеся обрести могущество, контролируя остатки божественных сил.",
    status: "ongoing",
    totalEpisodes: 40,
    episodes: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/15-skazanie-o-pastuhe-bogov-smotret-onlajn.html",
      date: "2024"
    }))
  },
  {
    id: 2,
    title: "Окутывая небеса",
    slug: "okutyvaja-nebesa",
    poster: "https://dunhuatv.ru/uploads/posts/2025-08/okutyvaja-nebesa1.webp",
    rating: 9.7,
    age: "16+",
    duration: "18 мин",
    year: 2023,
    genres: ["экшен", "приключения", "фантастика"],
    description: "В отдаленном уголке Вселенной, где научные открытия и мистические явления смешиваются в единое целое, группа молодых исследователей отправляется на поиски загадочного артефакта, известного как «Покров Небес».",
    status: "ongoing",
    totalEpisodes: 52,
    episodes: Array.from({ length: 52 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/7-okutyvaja-nebesa-smotret-onlajn.html",
      date: "2023"
    }))
  },
  {
    id: 3,
    title: "За гранью времени",
    slug: "za-granju-vremeni",
    poster: "https://dunhuatv.ru/uploads/posts/2025-08/za-granju-vremeni1.webp",
    rating: 9.6,
    age: "16+",
    duration: "20 мин",
    year: 2025,
    genres: ["экшен", "приключения", "фэнтези", "исторический", "боевые искусства"],
    description: "В один роковой день привычный мир рухнул. Ещё вчера здесь царило благоденствие: воздух был наполнен живительной энергией ци, люди жили в мире и согласии, а одаренные мастера боевых искусств могли достичь бессмертия.",
    status: "ongoing",
    totalEpisodes: 20,
    episodes: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/684-za-granju-vremeni.html",
      date: "2025"
    }))
  },
  {
    id: 4,
    title: "Противостояние святого",
    slug: "protivostojanie-svjatogo",
    poster: "https://dunhuatv.ru/uploads/posts/2026-10/protivostojanie-svjatogo26.webp",
    rating: 6.7,
    age: "16+",
    duration: "25 мин",
    year: 2023,
    genres: ["экшен", "приключения", "фэнтези", "исторический"],
    description: "Главный герой, Ван Лин, — обычный юноша из небогатой семьи, живущий в мире, где бессмертие является целью каждого. В этом мире люди и кланы стремятся освоить таинственные техники культивации.",
    status: "ongoing",
    totalEpisodes: 60,
    episodes: Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/8-protivostojanie-svjatogo-smotret-onlajn.html",
      date: "2023"
    }))
  },
  {
    id: 5,
    title: "Расколотая битвой синева небес 5",
    slug: "raskolotaja-bitvoj-sineva-nebes-5",
    poster: "https://dunhuatv.ru/uploads/posts/2025-07/raskolotaja-bitvoj-sineva-nebes-51.webp",
    rating: 9.4,
    age: "16+",
    duration: "24 мин",
    year: 2022,
    genres: ["экшен", "приключения", "фэнтези", "боевые искусства"],
    description: "В мире, где магия и боевые искусства определяют судьбу каждого, каждый стремится обрести силу, чтобы достичь величия. Сяо Ян, обладающий огромным потенциалом, теряет все свои силы в результате загадочного события.",
    status: "ongoing",
    totalEpisodes: 52,
    episodes: Array.from({ length: 52 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/24-raskolotaja-bitvoj-sineva-nebes-5-smotret-onlajn.html",
      date: "2022"
    }))
  },
  {
    id: 6,
    title: "Несравненный боевой дух 2",
    slug: "nesravnennyj-boevoj-duh-2",
    poster: "https://dunhuatv.ru/uploads/posts/2026-09/nesravnennyj-boevoj-duh-2-1.webp",
    rating: 8.5,
    age: "16+",
    duration: "10 мин",
    year: 2026,
    genres: ["экшен", "приключения", "боевые искусства"],
    description: "Продолжение истории о бойце, который бросает вызов судьбе и стремится стать сильнейшим воином. Новый сезон приносит ещё больше захватывающих сражений и неожиданных поворотов.",
    status: "ongoing",
    totalEpisodes: 37,
    episodes: Array.from({ length: 37 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/767-nesravnennyj-boevoj-duh-2-smotret-onlajn.html",
      date: "2026"
    }))
  },
  {
    id: 7,
    title: "Путешествие к бессмертию 5",
    slug: "puteshestvie-k-bessmertiju-5",
    poster: "https://dunhuatv.ru/uploads/posts/2026-04/puteshestvie-k-bessmertiju-51.webp",
    rating: 8.8,
    age: "16+",
    duration: "15 мин",
    year: 2026,
    genres: ["экшен", "фэнтези", "культивация"],
    description: "Пятый сезон эпического путешествия к бессмертию. Герой продолжает свой путь культивации, сталкиваясь с всё более могущественными противниками и раскрывая тайны древнего мира.",
    status: "ongoing",
    totalEpisodes: 22,
    episodes: Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/737-puteshestvie-k-bessmertiju-5-smotret-onlajn.html",
      date: "2026"
    }))
  },
  {
    id: 8,
    title: "Практикуя ци сто тысяч лет",
    slug: "praktikuja-ci-sto-tysjach-let",
    poster: "https://dunhuatv.ru/uploads/posts/2025-01/1736540762_1.webp",
    rating: 8.2,
    age: "16+",
    duration: "12 мин",
    year: 2023,
    genres: ["экшен", "фэнтези", "культивация", "комедия"],
    description: "Герой практикует ци уже сто тысяч лет и стал невероятно силён. Но его путь далёк от завершения — впереди ещё множество испытаний и открытий.",
    status: "ongoing",
    totalEpisodes: 390,
    episodes: Array.from({ length: 390 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/28-praktikuja-ci-sto-tysjach-let-smotret-onlajn.html",
      date: "2023"
    }))
  },
  {
    id: 9,
    title: "Сильнейший: История Юньсяо Ли",
    slug: "silnejshij-istorija-li-junsjao",
    poster: "https://dunhuatv.ru/uploads/posts/2025-11/silnejshij-istorija-li-junsjao1.webp",
    rating: 8.0,
    age: "16+",
    duration: "11 мин",
    year: 2026,
    genres: ["экшен", "приключения", "боевые искусства"],
    description: "История Ли Юньсяо — воина, который стремится стать сильнейшим в мире, полном опасностей и интриг. Каждый бой приближает его к вершине.",
    status: "ongoing",
    totalEpisodes: 32,
    episodes: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/709-silnejshij-istorija-li-junsjao.html",
      date: "2026"
    }))
  },
  {
    id: 10,
    title: "Владыка множества миров 3",
    slug: "vladyka-mnozhestva-mirov-3",
    poster: "https://dunhuatv.ru/uploads/posts/2025-01/vladyka-mnozhestva-mirov-3j.webp",
    rating: 7.8,
    age: "16+",
    duration: "9 мин",
    year: 2024,
    genres: ["экшен", "фэнтези", "приключения"],
    description: "Третий сезон истории о владыке, который покоряет множество миров. Новые измерения, новые враги и новые союзники ждут героя.",
    status: "ongoing",
    totalEpisodes: 222,
    episodes: Array.from({ length: 222 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/66-vladyka-tysjachi-mirov-3-smotret-onlajn.html",
      date: "2024"
    }))
  },
  {
    id: 11,
    title: "За гранью времени 2",
    slug: "za-granju-vremeni-2",
    poster: "https://dunhuatv.ru/uploads/posts/2026-05/za-granju-vremeni-2.webp",
    rating: 9.2,
    age: "16+",
    duration: "25 мин",
    year: 2026,
    genres: ["экшен", "фэнтези", "исторический", "боевые искусства"],
    description: "Продолжение эпической саги за гранью времени. Герои сталкиваются с новыми угрозами, а тайны древнего мира раскрываются одна за другой.",
    status: "ongoing",
    totalEpisodes: 20,
    episodes: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/742-za-granju-vremeni-smotret-onlajn.html",
      date: "2026"
    }))
  },
  {
    id: 12,
    title: "День моего вознесения",
    slug: "den-moego-voznesenija",
    poster: "https://dunhuatv.ru/uploads/posts/2025-04/den-moego-voznesenija11.webp",
    rating: 8.3,
    age: "16+",
    duration: "20 мин",
    year: 2026,
    genres: ["экшен", "фэнтези", "культивация"],
    description: "История о дне, который изменил всё. Герой переживает вознесение и обретает силу, о которой даже не мечтал. Но с великой силой приходит великая ответственность.",
    status: "ongoing",
    totalEpisodes: 18,
    episodes: Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/488-den-moego-voznesenija.html",
      date: "2026"
    }))
  },
  {
    id: 13,
    title: "Пощади меня, великий господин! 3",
    slug: "poschadi-menja-velikij-gospodin-3",
    poster: "https://dunhuatv.ru/uploads/posts/2026-09/1789390460_poschadi-menja-velikij-gospodin-3.webp",
    rating: 7.5,
    age: "18+",
    duration: "24 мин",
    year: 2026,
    genres: ["экшен", "комедия", "фэнтези"],
    description: "Третий сезон комедийной истории о простом парне, который постоянно попадает в переделки рядом с великим господином. Смех, интриги и захватывающие приключения.",
    status: "ongoing",
    totalEpisodes: 7,
    episodes: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Серия ${i + 1}`,
      videoUrl: "https://dunhuatv.ru/768-poschadi-menja-velikij-gospodin-3-smotret-onlajn.html",
      date: "2026"
    }))
  }
];

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Новые серии «Несравненный боевой дух 2»",
    date: "2026-01-15",
    content: "Вышли новые серии популярного мультсериала «Несравненный боевой дух 2». Смотрите уже сейчас!"
  },
  {
    id: 2,
    title: "Премьера «За гранью времени 2»",
    date: "2026-01-10",
    content: "Начался показ второго сезона «За гранью времени». Новые приключения и ещё более захватывающий сюжет."
  },
  {
    id: 3,
    title: "Обновление «Путешествие к бессмертию 5»",
    date: "2026-01-08",
    content: "Пятый сезон продолжает радовать зрителей новыми сериями каждую неделю."
  },
  {
    id: 4,
    title: "Новый сезон «Пощади меня, великий господин! 3»",
    date: "2026-01-05",
    content: "Стартовал третий сезон комедийного хита. Первые серии уже доступны для просмотра."
  }
];

export const genres = [
  "Все",
  "экшен",
  "приключения",
  "фэнтези",
  "исторический",
  "боевые искусства",
  "фантастика",
  "культивация",
  "комедия"
];
