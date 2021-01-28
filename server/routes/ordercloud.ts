import express from 'express'
const router = express.Router()
import { scope } from '../config/ordercloud.config'
import { Auth } from 'ordercloud-javascript-sdk'

router.route('/login').post(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { username, password, clientID, redirectUri, state } = req.body
  const authResponse = await Auth.Login(username, password, clientID, scope)
  res.status(200).json({
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    redirectUrl: `${redirectUri}?access_token=${authResponse.access_token}&token_type=bearer&state=${state}`,
  })
})

export default router
