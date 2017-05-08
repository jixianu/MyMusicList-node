import url from 'url'
import fs from 'fs'
import path from 'path'
import _ from 'underscore'
import Music from './model/music'
import * as config from './config'
import * as HomeCtrl from './controllers/HomeCtrl'
import * as MusicCtrl from './controllers/MusicCtrl'
import * as LoginCtrl from './controllers/LoginCtrl'

export default function(req, res) {
  // 給res添加兩個方法
  // 讀取字符串，渲染数据
  res.render = (template, context = {}) => {
    fs.readFile(path.join(config.TPL_PATH, template + config.TPL_EXT), (err, data) => {
      if (err) {
        throw err
      }
      data = data.toString()
      const compiled = _.template(data)
      const htmlStr = compiled(context || {})
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
      })
      res.end(htmlStr)
    })
  }
  // 路由重定向
  res.redirect = redirectPath => {
    res.writeHead(302, {
      'Location': redirectPath
    })
    res.end()
  }

  const urlObj = url.parse(req.url, true)
  const pathname = decodeURI(urlObj.pathname)
  const query = urlObj.query
  const method = req.method.toUpperCase()
  req.query = query

  // 简易路由
  if ((pathname === '/' || pathname === 'index.html') && method === 'GET') {
    HomeCtrl.showHome(req, res)
  } else if (pathname === '/favicon.ico' && method === 'GET') {
    res.end()
  } else if ((pathname.startsWith('/node_modules/') || pathname.startsWith('/uploads/')) && method === 'GET') {
    fs.readFile(path.join(__dirname, pathname), function(err, data) {
      if (err) {
        return res.end(err.message)
      }
      res.end(data);
    });
  } else if (pathname === '/add' && method === 'GET') {
    MusicCtrl.showAdd(req, res)
  } else if (pathname === '/edit' && method === 'GET') {
    MusicCtrl.showEdit(req, res)
  } else if (pathname === '/login' && method === 'GET') {
    LoginCtrl.showHome(req, res)
  } else if (pathname === '/remove' && method === 'GET') {
    MusicCtrl.doRemove(req, res)
  } else if (pathname === '/add' && method === 'POST') {
    MusicCtrl.addMusic(req, res)
  } else if (pathname === '/edit' && method === 'POST') {
    MusicCtrl.doEdit(req, res)
  }
}
