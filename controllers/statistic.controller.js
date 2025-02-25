import statistic from '../models/statistic.model.js'

export async function getStatistic(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {

      const user_ID = request?.query.user_ID
      const theme_num = request?.query.theme_num

      if (user_ID && theme_num) {
        const data = await statistic.get(user_ID, theme_num)
        response.write(JSON.stringify({
          'success': true,
          'data': data
        }, undefined, 4))
      }
      else {
        response.write(JSON.stringify({
            'success': false,
            'message': 'Invalid data. Expecting `user_ID`, `theme_num`.'
            }))
            return response.end()
      }
      
    } catch (err) {
      response.write(JSON.stringify({
        'success': false,
        'message': err.message,
      }))
    }
  
    return response.end()
}