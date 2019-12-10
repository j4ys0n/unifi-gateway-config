import { promises as fs } from 'fs'

const ENCODING = {encoding: 'utf-8'}

export class FileUtil {
  constructor() {}

  public readFile(path: string): Promise<any> {
    return fs.readFile(path, ENCODING)
  }

  public writeFile(path: string, data: any): Promise<any> {
    return fs.writeFile(path, data, ENCODING)
  }
}
