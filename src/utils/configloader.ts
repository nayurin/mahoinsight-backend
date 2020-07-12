import * as fs from 'fs'

export default function loadConfig(path?: string) {
  try {
    // path of .local_config.json: `${__dirname}/../.local_config.json` should be related to tsconfig.json's prop "outDir"
    const dataBuffer: Buffer = path ? fs.readFileSync(path) : fs.readFileSync(`${__dirname}/../.local_config.json`)
    const data: object = JSON.parse(dataBuffer.toString())
    return data
  } catch (e) {
    console.error(e)
  }
}
