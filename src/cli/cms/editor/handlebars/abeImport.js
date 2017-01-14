import Handlebars from 'handlebars'
import fse from 'fs-extra'
import path from 'path'

import {
  coreUtils
  ,abeExtend
} from '../../../'

export default function abeImport (file, config, ctx) {
  file = abeExtend.hooks.instance.trigger('beforeImport', file, config, ctx)

  config = JSON.parse(config)
  let intlData = config.intlData
  var defaultPartials = `${__dirname.replace(/\/$/,'')}/${config.defaultPartials.replace(/\/$/,'')}`
  var custom = (config.custom !== '') ? `${config.root.replace(/\/$/,'')}/${config.custom.replace(/\/$/,'')}` : defaultPartials
  var pathToPartial = `${custom}/${file}.html`
  try{
    fse.statSync(pathToPartial)
  }
  catch(e){
    pathToPartial = `${defaultPartials}/${file}.html`
  }
  if (coreUtils.file.exist(pathToPartial)) {
    var html = fse.readFileSync(pathToPartial, 'utf8')
  }else {
    html = ''
  }

  var pluginsPartials = abeExtend.plugins.instance.getPartials()
  Array.prototype.forEach.call(pluginsPartials, (pluginPartials) => {
    var checkFile = path.join(pluginPartials, `${file}.html`)
    if (coreUtils.file.exist(checkFile)) {
      html += fse.readFileSync(checkFile, 'utf8')
    }
  })
  html = abeExtend.hooks.instance.trigger('afterImport', html, file, config, ctx)

  var template = Handlebars.compile(html)
  var res = new Handlebars.SafeString(template(ctx, {data: {intl: intlData}}))

  return res
}
