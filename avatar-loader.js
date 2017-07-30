import DataLoader from 'dataloader'
import got from 'got'

const batchGetAvatars = keys =>
  Promise.all(
    keys.map(url =>
      got(url, { encoding: null }).then(res => [
        url,
        `data:${res.headers['content-type']};base64,${res.body.toString(
          'base64'
        )}`,
      ])
    )
  )

var avatarLoader = new DataLoader(keys => batchGetAvatars(keys))

export default async function* avatarGenerator() {
  const resolve = yield
  const avatars = yield

  avatarLoader.loadMany([...avatars.values()]).then(resolve)
}
