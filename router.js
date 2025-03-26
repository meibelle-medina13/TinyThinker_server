import cors from 'cors'

import GuardianRoutes from './routes/user_guardian.route.js'
import UserRoutes from './routes/user.route.js'
import Scores from './routes/score.route.js'
import TestScore from './routes/preposttest.route.js'
import Statistic from './routes/statistic.route.js'
import QuarterStatus from './routes/quarter_status.route.js'
import RewardCollection from './routes/reward.route.js'
import AdminAccount from './routes/admin_account.route.js'

const registerRoutes = (app) => {
    app.use(cors())
    app.use('/users_guardian', GuardianRoutes)
    app.use('/users', UserRoutes)
    app.use('/scores', Scores)
    app.use('/test_score', TestScore)
    app.use('/statistic', Statistic)
    app.use('/quarter_status', QuarterStatus)
    app.use('/reward', RewardCollection)
    app.use('/admin', AdminAccount)
}

export default registerRoutes