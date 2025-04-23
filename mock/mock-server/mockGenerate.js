const fs = require('fs')
const path = require('path')

const ROUTES_DIR = path.join(__dirname, 'mock-server/routes')
const DATA_DIR = path.join(__dirname, 'mock-server/data')
const OUTPUT_FILE = path.join(__dirname, 'mock-server/mock.json')

const baseEnv = {
  source: 'mockoon:environment',
  name: 'Test API',
  created_at: new Date().toISOString(),
  last_modified: new Date().toISOString(),
  environment: {
    uuid: '',
    name: 'Test API',
    port: 5173,
    routes: [],
    proxyMode: false,
    tlsOptions: {
      enabled: false
    }
  }
}

const loadRoutes = () => {
  const routeFiles = fs.readdirSync(ROUTES_DIR)
  return routeFiles.map(file => {
    const route = JSON.parse(fs.readFileSync(path.join(ROUTES_DIR, file), 'utf-8'))
    if (route.responses) {
      route.responses = route.responses.map(response => {
        if (response.bodyFile) {
          const dataPath = path.join(DATA_DIR, response.bodyFile)
          response.body = fs.readFileSync(dataPath, 'utf-8')
          delete response.bodyFile
        }
        return response
      })
    }
    route.uuid = ''
    return route
  })
}

baseEnv.environment.routes = loadRoutes()

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(baseEnv, null, 2))
console.log('✅ mock.json generated successfully.')
