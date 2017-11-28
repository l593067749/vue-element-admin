import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/lol/battle/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return fetch({
    url: '/lol/battle/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return fetch({
    url: '/lol/battle/pv',
    method: 'get',
    params: { pv }
  })
}

