import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import battleAPI from './battle'
import remoteSearchAPI from './remoteSearch'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 赛程相关
Mock.mock(/\/lol\/battle\/list/, 'get', battleAPI.getList)
Mock.mock(/\/lol\/battle\/detail/, 'get', battleAPI.getArticle)

export default Mock
