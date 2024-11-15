import cors from 'cors'

import GuardianRoutes from './routes/user_guardian.route.js'
import UserRoutes from './routes/user.route.js'

const registerRoutes = (app) => {
    app.use(cors())
    app.use('/users_guardian', GuardianRoutes)
    app.use('/users', UserRoutes)
}

export default registerRoutes