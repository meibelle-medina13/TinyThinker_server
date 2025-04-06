import reward from '../models/reward.model.js'

export async function getReward(request, response) {
  response.setHeader('Content-Type', 'application/json')
  try {
    const user_ID = request?.query.user_ID
    if (user_ID) {
      const data = await reward.get_reward(user_ID)
      response.write(JSON.stringify({
        'success': true,
        'data': data
      }, undefined, 4))
    }
    else {
      response.write(JSON.stringify({
        'success': false,
        'message': 'Invalid data. Expecting `user_ID`.'
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

export async function addReward(request, response) {
  response.setHeader('Content-Type', 'application/json')
  try {
      const data = request?.body
      const user_ID = data.user_ID
      const reward_type_ID = data.reward_type_ID
      if (!user_ID || !reward_type_ID) {
        response.write(JSON.stringify({
        'success': false,
        'message': 'Invalid data. Expecting `user_ID`, `reward_type_ID`',
        }))
        return response.end()
      }
      const res = await reward.add_reward(user_ID, reward_type_ID)
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