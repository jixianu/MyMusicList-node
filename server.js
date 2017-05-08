import http from 'http'
import router from './router'
import * as config from './config.js'

const server = http.createServer();

server
  .on('request', (req, res) => {
  	// 路由
    router(req, res)
  })
  .listen(config.SER_PORT, config.SER_HOST, () => {
    console.log('server is running at port ' + config.SER_PORT);
  });
