import cors from 'cors'

import GuardianRoutes from './routes/user_guardian.route.js'
import UserRoutes from './routes/user.route.js'
import Scores from './routes/score.route.js'
import TestScore from './routes/preposttest.route.js'
import Statistic from './routes/statistic.route.js'

const registerRoutes = (app) => {
    app.use(cors())
    app.use('/users_guardian', GuardianRoutes)
    app.use('/users', UserRoutes)
    app.use('/scores', Scores)
    app.use('/test_score', TestScore)
    app.use('/statistic', Statistic)
}

export default registerRoutes