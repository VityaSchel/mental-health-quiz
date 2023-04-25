import secureJsonParse from 'secure-json-parse'

export function JSONParse<T = any>(json: any): T | undefined {
  if(typeof json !== 'string') return undefined
  try {
    return secureJsonParse(json, null, { protoAction: 'remove', constructorAction: 'remove' })
  } catch(e) {
    return undefined
  }
}