import user from '../models/user.model.js'

export async function getUser(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
      const id = request?.query.id
  
      const data = await user.get(id)
  
      response.write(JSON.stringify({
        'success': true,
        'data': data
      }, undefined, 4))
      
    } catch (err) {
      response.write(JSON.stringify({
        'success': false,
        'message': err.message,
      }))
    }
  
    return response.end()
}

export async function addUser(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
        const data = request?.body
        console.log(data)
        const username = data.username
        const age = data.age
        const gender = data.gender
        const avatar_filename = data.avatar_filename
        const current_theme = data.current_theme
        const current_level = data.current_level
        const relation_to_guardian = data.relation_to_guardian
        const guardian_ID = data.guardian_ID
        console.log(username, age, gender, avatar_filename, current_theme, current_level, relation_to_guardian, guardian_ID)
    
        if (!username || !age || !gender || !avatar_filename || !current_theme || !current_level || !relation_to_guardian || !guardian_ID) {

            response.write(JSON.stringify({
            'success': false,
            'message': 'Invalid data. Expecting `username`, `age`, `gender`, `avatar_filename`, `current_theme`, `current_level`, `relation_to_guardian`, `guardian_ID`.',
            }))
            return response.end()
        }
    
        const res = await user.add_user(username, age, gender, avatar_filename, current_theme, current_level, relation_to_guardian, guardian_ID)
    
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