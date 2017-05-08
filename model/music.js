import fs from 'fs'
import path from 'path'
import * as config from '../config'

let storage = null

export default function Music(music) {
  this.title = music.title
  this.singer = music.singer
  this.music = music.music
  this.poster = music.poster
}

// 保存
Music.prototype.save = function() {
  let id = 0
  storage.forEach(music => {
    if (music.id > id) {
      id = music.id
    }
  })

  let send_storage = storage
  send_storage.push({
    id: ++id,
    title: this.title,
    singer: this.singer,
    music: this.music,
    poster: this.poster
  })
  // 保存JSOM数据
  fs.writeFileSync(path.join(config.DATA_PATH, 'music.json'), JSON.stringify(send_storage))
}

// 删除
Music.delete = function(id) {
  if (!id) {
    return
  }
  let send_storage = storage
  send_storage.forEach((music, index) => {
    if (music.id == id) {
      send_storage.splice(index, 1)
    }
  })
  console.log('删除成功')
  fs.writeFileSync(path.join(config.DATA_PATH, 'music.json'), JSON.stringify(send_storage))
}

// 修改
Music.edit = function(id, newMusic) {
  if (!id) {
    return
  }
  let send_storage = storage
  send_storage.forEach(music => {
    if (music.id == id) {
      music.title = newMusic.title
      music.singer = newMusic.singer
    }
  })
  fs.writeFileSync(path.join(config.DATA_PATH, 'music.json'), JSON.stringify(send_storage))
}

// 获取全部数据
Music.getAll = function() {
  // 获取JSOM数据
  const data = fs.readFileSync(path.join(config.DATA_PATH, 'music.json'))
  storage = JSON.parse(data.toString())
  return storage
}

// 获取单个数据
Music.getMusicById = function(id) {
  if (!id) {
    return
  }
  let music
  storage.forEach(m => {
    if (m.id == id) {
      music = m
    }
  })
  return music
}
