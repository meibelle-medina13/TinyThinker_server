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

export async function getPending(request, response) {
  response.setHeader('Content-Type', 'application/json')

  const data = await admin.get_pending()
    response.write(JSON.stringify({
      'success': true,
      'data': data
    }, undefined, 4))

  return response.end()
}

export async function updateAdminAccount(request, response) {
  response.setHeader('Content-Type', 'application/json')
 
  try {
    const data = request?.body
    const adminID = data.adminID
    const username = data.username
    const lastname = data.lastname
    const firstname = data.firstname
    const middle_name = data.middle_name
    const age = data.age
    const address = data.address
    const profile = data.profile_url

    if (!adminID || !username || !lastname || !firstname) {

        response.write(JSON.stringify({
        'success': false,
        'message': 'Invalid data. Expecting `adminID`, `username`, `lastname`, `firstname`.',
        }))
        return response.end()
    }

    const res = await admin.update_adminAccount(adminID, username, lastname, firstname, middle_name, age, address, profile)

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

export async function approveRequest(request, response) {
  response.setHeader('Content-Type', 'application/json')
 
  try {
    const data = request?.body
    const adminID = data.adminID

    if (!adminID) {

        response.write(JSON.stringify({
        'success': false,
        'message': 'Invalid data. Expecting `adminID`.',
        }))
        return response.end()
    }

    const res = await admin.approve_request(adminID)

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

export async function declineRequest(request, response) {
  response.setHeader('Content-Type', 'application/json')
 
  try {
    const data = request?.body
    const adminID = data.adminID

    if (!adminID) {

        response.write(JSON.stringify({
        'success': false,
        'message': 'Invalid data. Expecting `adminID`.',
        }))
        return response.end()
    }

    const res = await admin.decline_request(adminID)

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