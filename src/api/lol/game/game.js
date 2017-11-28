import fetch from '@/utils/fetch2'

export function fetchList(query) {
  return fetch({
    url: '/lol/champion/info/105',
    method: 'get',
    params: query
  })
}

