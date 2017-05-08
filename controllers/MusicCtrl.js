import Music from '../model/music'
import formidable from 'formidable'
import * as config from '../config'
import path from 'path'
import qstring from 'querystring'
// 添加
export function addMusic(req, res) {
  // 文件上传
  const form = new formidable.IncomingForm()

  form.uploadDir = config.UPLOAD_PATH

  form.keepExtensions = true

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.end(err.message)
    }
    const music = new Music({
      title: fields.title,
      singer: fields.singer,
      music: path.basename(files.music.path),
      poster: path.basename(files.poster.path)
    })

    music.save()
    // 跳转
    res.redirect('http://127.0.0.1:3000/')
    res.end()
  })
}
// 显示增加
export function showAdd(req, res) {
  res.render('add')
}
// 显示修改
export function showEdit(req, res) {
  const id = req.query.mid
  const music = Music.getMusicById(id)
  console.log(music)
  if (!music) {
    return res.end('music is not exists.')
  }
  res.render('edit', {
    music: music
  })
}

// 修改
export function doEdit(req, res) {
  const id = req.query.mid
  let chunks = ''
  req.on('data', function(chunk) {
    chunks += chunk
  })
  req.on('end', function() {
    const body = qstring.parse(chunks)
    console.log(body)
    Music.edit(id, {
      title: body.title,
      singer: body.singer
    })
    res.redirect('http://127.0.0.1:3000')
  })
}

// 删除
export function doRemove(req, res) {
  const id = req.query.mid
  Music.delete(id)
  res.redirect('http://127.0.0.1:3000')
}
