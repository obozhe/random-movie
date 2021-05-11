const key = '99778a26e9ad6fefbb08a48e1bef2785';

const genres = [
  {
    id: 28,
    name: 'экшн',
  },
  {
    id: 12,
    name: 'приключения',
  },
  {
    id: 16,
    name: 'анимационный',
  },
  {
    id: 35,
    name: 'комедия',
  },
  {
    id: 80,
    name: 'криминал',
  },
  {
    id: 99,
    name: 'документальный',
  },
  {
    id: 18,
    name: 'драма',
  },
  {
    id: 10751,
    name: 'семейный',
  },
  {
    id: 14,
    name: 'фэнтези',
  },
  {
    id: 36,
    name: 'история',
  },
  {
    id: 27,
    name: 'ужасы',
  },
  {
    id: 10402,
    name: 'музыкальный',
  },
  {
    id: 9648,
    name: 'мистика',
  },
  {
    id: 10749,
    name: 'романс',
  },
  {
    id: 878,
    name: 'фантастика',
  },
  {
    id: 10770,
    name: 'телефильм',
  },
  {
    id: 53,
    name: 'триллер',
  },
  {
    id: 10752,
    name: 'военный',
  },
  {
    id: 37,
    name: 'вестерн',
  },
];

const getMovie = (query = '', page = '') =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${key}&${query}&page=${page}&language=ru&vote_count.gte=50`
  )
    .then((value) => value.json())
    .catch(() => alert('Something went wrong'));

const getWeeksHot = () =>
  fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&language=ru`
  )
    .then((value) => value.json())
    .catch(() => alert('Something went wrong'));

export { getWeeksHot, getMovie, genres };
