import {
  User
} from '../../../../cli'

var route = function(req, res) {
  var resultUpdate = User.operations.update(req.body)
  return res.status(200).json(resultUpdate)
}

export default route