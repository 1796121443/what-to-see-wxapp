// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var rp = require('request-promise');
const type = 'movie'
const tag = encodeURI('热门')
const limit = 50
const start = 0

// https://movie.douban.com/j/search_subjects?type=movie&tag=热门&page_limit=50&page_start=0
// https://movie.douban.com/j/subject_abstract?subject_id=30446494

// 云函数入口函数
exports.main = async (event, context) => {
  const options = {
    uri: `https://movie.douban.com/j/search_subjects?type=${type}&tag=${tag}&page_limit=${limit}&page_start=${start}`,
    headers: {
      'Host': 'movie.douban.com',
      'Referer': 'https://movie.douban.com/'
    },
    json: true // Automatically parses the JSON string in the response
  }
  return rp(options)
    .then(function (res) {
      console.log('res==>', res)
      return res;
    })
    .catch(function (err) {
      console.log(err)
    });
}