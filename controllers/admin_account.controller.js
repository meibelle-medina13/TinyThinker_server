import admin from '../models/admin_account.model.js'

export async function addAdmin(request, response) {
    response.setHeader('Content-Type', 'application/json')
    try {
        const data = request?.body
        const username = data.username
        const password = data.password
        const lastname = data.lastname
        const firstname = data.firstname
        const middle_name = data.middle_name
    
        if (!username || !password || !lastname || !firstname) {

            response.write(JSON.stringify({
            'success': false,
            'message': 'Invalid data. Expecting `username`, `password`, `lastname`, `firstname`.',
            }))
            return response.end()
        }
    
        const res = await admin.add_admin(username, password, lastname, firstname, middle_name)
    
        response.write(JSON.stringify({
            'success': true
        }))
    } catch (err) {
      response.write(JSON.stringify({
        'success': false,
        'message': err.message,
      }))
    }
  
    return response.end()
}

export async function LogIn(request, response) {
  response.setHeader('Content-Type', 'application/json')
  try {
      const data = request?.body
      const username = data.username
      const password = data.password
  
      if (!username || !password) {

          response.write(JSON.stringify({
          'success': false,
          'message': 'Invalid data. Expecting `username`, `password`.',
          }))
          return response.end()
      }
  
      const res = await admin.login(username, password)
  
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

export async function getAdmin(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {

      const adminID = request?.query.adminID

      if (adminID) {
        const data = await admin.get_admin(adminID)
        response.write(JSON.stringify({
          'success': true,
          'data': data
        }, undefined, 4))
      }
      
    } catch (err) {
      response.write(JSON.stringify({
        'success': false,
        'message': err.message,
      }))
    }
  
    return response.end()
}