import records from '../models/preposttest.model.js';

export async function updatePrePostTest(request, response) {
    response.setHeader('Content-Type', 'application/json')
   
    try {
      const data = request?.body
      console.log(data)
      const userID = data.userID
      const theme_num = data.theme_num
      const test_type = data.test_type
      const score = data.score
  
      if (!userID || !theme_num || !test_type || !score) {
  
          response.write(JSON.stringify({
          'success': false,
          'message': 'Invalid data. Expecting `userID`, `theme_num`, `test_type`, `score`.',
          }))
          return response.end()
      }
  
      const res = await records.update_PrePostTestscore(userID, theme_num, test_type, score)
  
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