import {
  cmsData
  ,config
} from '../../'

export function add(json, type, date = null) {
  let meta = config.meta.name
  var currentDate = (date != null && date !== '') ? date : new Date()
  var prefixStatus = type[0]
  var abeUrl = (type === 'publish') ? json[meta].link : cmsData.fileAttr.add(json[meta].link, prefixStatus + cmsData.revision.removeStatusAndDateFromFileName(currentDate.toISOString())) + ''

  if(json[meta].date == null) {
    json[meta].date = currentDate
  }
  json[meta].latest = {
    date: currentDate,
    abeUrl: abeUrl
  }
  json[meta].status = type
  if(json[meta][type] == null) {
    json[meta][type] = {latest: {}}
    json[meta][type].date = currentDate
    json[meta][type].abeUrl = abeUrl
  }
  // json[meta][type].latest = JSON.parse(JSON.stringify(obj))
  json[meta][type].latest.date = currentDate
  json[meta][type].latest.abeUrl = abeUrl
}


export function create(json, template, url) {
  let meta = config.meta.name
  if (json[meta] == null) {
    json[meta] = {}
  }

  json[meta].template = template
  json[meta].link = url

  return json
}
