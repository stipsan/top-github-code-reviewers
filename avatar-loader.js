import DataLoader from 'dataloader'
import { encode, decode } from 'node-base64-image'
import got from 'got'

/*
var url = 'http://../demo.png';
base64Img.requestBase64(url, function(err, res, body) {

});
*/
/*
const batchGetAvatars = keys => Promise.all(keys.map(url => new Promise((resolve, reject) => {
  base64Img.requestBase64(url, function(err, res, body) {
    if(err) {
      reject(err)
    }
    resolve
  })
})))
// */
const batchGetAvatars = keys =>
  Promise.all(
    keys.map(url =>
      //new Promise(resolve => encode(url, {string: true}, (err, res) => resolve([url, res]))
      ///*
      got(url, { encoding: null }).then(
        res => [
          url,
          `data:${res.headers['content-type']};base64,${res.body.toString(
            'base64'
          )}`,
        ]

        //*/
      )
    )
  )

var avatarLoader = new DataLoader(keys => batchGetAvatars(keys))

export default async function* avatarGenerator() {
  const resolve = yield
  console.log('resolve', resolve)
  const avatars = yield
  console.log('avatars', avatars)

  avatarLoader.loadMany([...avatars.values()]).then(resolve)
  /*

  const avatarPromises = [
    [...avatars.values()].map(avatarUrl =>
      avatarLoader.load(avatarUrl).then(base64Url => [avatarUrl, base64Url])
    ),
  ]

  for await (let val of avatarPromises) {
    var [avatarUrl, base64Url] = await val;
    console.log(avatarUrl, base64Url)
  }
  */
  /*
  avatars.values.forEach(async avatarUrl => {
    const base64Url = await avatarLoader.load(avatarUrl)
    console.log(base64Url)
  })*/
  return
  resolve(
    Promise.all([
      [...avatars.values()].map(avatarUrl =>
        avatarLoader.load(avatarUrl).then(base64Url => [avatarUrl, base64Url])
      ),
    ])
      .then(avatarArray => {
        const avatarMap = {}
        avatarArray.forEach(([avatarUrl, base64Url]) => {
          avatarMap[avatarUrl] = base64Url
        })
        return avatarMap
      })
      .catch(err => console.error(err))
  )
}
