/*global document */

export function IframeDocument (frameId){
  let iframe = document.querySelector(frameId)
  let iframeDocument = iframe != null ? iframe.contentDocument || iframe.contentWindow.document : null
  return iframeDocument
}

export function IframeNode (frameId, selector){
  var iframe = IframeDocument(frameId)
  if (iframe) {
    return iframe.querySelectorAll(selector.replace(/\[([0-9]*)\]/g, '$1'))
  }
  return []
}

function IframeGetComment(frameId, prop, val, meth, nd, useSelf ) {
  prop = 'nodeType'
  val = 8
  meth = null
  var r=[], any= IframeGetComment[val]===true
  var iframe = IframeDocument(frameId)
  if (iframe == null) return []
  nd = nd||IframeDocument(frameId).documentElement

  if(nd.constructor===Array){
    nd = {childNodes:nd}
  }
  for(var cn = nd.childNodes, i=0, mx=cn.length;i<mx;i++) {
    var it=cn[i]
    if(it.childNodes.length && !useSelf) {
      r = r.concat(IframeGetComment(frameId, prop, val, meth, it, useSelf ))
    }
    if( any ? it[prop] : (it[prop]!==undefined && (meth ? ''[meth] &&  String(it[prop])[meth](val) : it[prop]==val))) {
      r[r.length]=it
    }
  }
  return r
}

export function IframeCommentNode(frameId, key) {
  var nodes = IframeGetComment(frameId, 'nodeType', 8, null, null)
  var found = []
  Array.prototype.forEach.call(nodes, (node) => {
    if(node.textContent.indexOf(key) > -1) {
      found.push(node)
    }
  })
  return found
}