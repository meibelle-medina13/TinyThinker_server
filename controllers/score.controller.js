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

export async function updateScore(request, response) {
  response.setHeader('Content-Type', 'application/json')
  try {
    const data = request?.body
    const userID = data.userID
    const theme_num = data.theme_num
    const level_num = data.level_num
    let score = data.score

    if (score == 0) {
      score = "0"
    }

    if (!userID || !theme_num || !level_num || !score) {
      response.write(JSON.stringify({
      'success': false,
      'message': 'Invalid data. Expecting `userID`, `theme_num`, `level_num`, `score`.',
      }))
      return response.end()
    }
    const res = await records.update_Levelscore(userID, theme_num, level_num, score)
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