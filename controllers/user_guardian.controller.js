import guardian from '../models/user_guardian.model.js';

export async function getGuardian(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
      const id = request?.body.id
  
      const data = await guardian.get(id)
  
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

export async function addGuardian(request, response) {
    response.setHeader('Content-Type', 'application/json')
    console.log(request.data)
    try {
        const data = request?.body
        const email = data.email
        const password = data.password
        const birth_month = data.birth_month
        const birth_date = data.birth_date
        const birth_year = data.birth_year
    
        if (!email || !password || !birth_month || !birth_date || !birth_year) {

            response.write(JSON.stringify({
            'success': false,
            'message': 'Invalid data. Expecting `email`, `password`, `birth_month`, `birth_date`, `birth_year`.',
            }))
            return response.end()
        }
    
        const res = await guardian.add_guardian(email, password, birth_month, birth_date, birth_year)
    
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

export async function searchGuardian(request, response) {
  response.setHeader('Content-Type', 'application/json')
  
    try {
      const email = request?.query.email
  
      const data = await guardian.search_guardian(email)
  
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