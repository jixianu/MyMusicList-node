import Music from '../model/music'

export function showHome(req, res) {
  res.render('index', {
    musicList: Music.getAll()
  })
}
