import quarterStat from '../models/quarter_status.model.js'

export async function getQuarterStatus(request, response) {
  response.setHeader('Content-Type', 'application/json')
  try {
    const res = await quarterStat.get_QuarterStatus()
    response.write(JSON.stringify({
        'success': true,
        'data': res
    }))
  } catch (err) {
    response.write(JSON.stringify({
      'success': false,
      'message': err.message,
    }))
  }
  return response.end()
}

export async function updateQuarterStatus(request, response) {
  response.setHeader('Content-Type', 'application/json')
  try {
    const data = request?.body
    const theme_num = data.theme_num
    const status = data.status.toString()
    if (!theme_num || !status) {
      response.write(JSON.stringify({
      'success': false,
      'message': 'Invalid data. Expecting `theme_num`, `status`.',
      }))
      return response.end()
    }
    const res = await quarterStat.update_QuarterStatus(theme_num, status)
    response.write(JSON.stringify({
        'success': true,
        'data': res
    }))
  } catch (err) {
    response.write(JSON.stringify({
      'success': false,
      'message': err.message,
    }))
  }
  return response.end()
}