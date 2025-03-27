import test from '../models/preposttest.model.js';

export async function updatePrePostTest(request, response) {
    response.setHeader('Content-Type', 'application/json')
   
    try {
      const data = request?.body
      console.log(data)
      const userID = data.userID
      const theme_num = data.theme_num
      const test_type = data.test_type
      let score = data.score

      if (score == 0) {
        score = "0"
      }
  
      if (!userID || !theme_num || !test_type || !score) {
  
          response.write(JSON.stringify({
          'success': false,
          'message': 'Invalid data. Expecting `userID`, `theme_num`, `test_type`, `score`.',
          }))
          return response.end()
      }
  
      const res = await test.update_PrePostTestscore(userID, theme_num, test_type, score)
  
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

export async function getPrePostTest(request, response) {
  response.setHeader('Content-Type', 'application/json')
    
      try {
        const theme = request?.query.theme
        const test_type = request?.query.test_type
    
        const data = await test.get(theme, test_type)

        if (!theme || !test_type) {
  
          response.write(JSON.stringify({
          'success': false,
          'message': 'Invalid data. Expecting `theme_num`, `test_type`.',
          }))
          return response.end()
      }
    
        response.write(JSON.stringify({
          'success': true,
          'data': data
        }))
        
      } catch (err) {
        response.write(JSON.stringify({
          'success': false,
          'message': err.message,
        }))
      }
    
      return response.end()
}