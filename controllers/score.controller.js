import records from '../models/score.model.js';

export async function getScores(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
      const id = request?.query.theme
  
      const data = await records.get(id)
  
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