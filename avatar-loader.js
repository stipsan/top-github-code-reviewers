export default function* avatarLoader() {
  const resolve = yield
  console.log('resolve', resolve)
  const avatars = yield
  console.log('avatars', avatars)
  avatars.forEach((avatarUrl, login) => {
    console.log(login, avatarUrl)
  })
  // use data-loader to batch these urls to base64 calls

  resolve('test')
}
