// 统一返回结果的方法
module.exports = function (req, res, next) {
  res.sendResult = function (data, code, message) {
    res.json({
      data: data,
      code: code,
      message: message,
    })
  }
  next()
}
