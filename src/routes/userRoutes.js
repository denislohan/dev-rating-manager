import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import Authenticate from '../middlewares/auth';

const {
  viewAllProfiles, getAllUsers, viewSingleProfile, getMyProfile,
} = UserController;

console.log("Fetching Profile 1", )

const router = express.Router();
const { loginCallback } = AuthController;
const { updateRole } = UserController;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  callbackURL: '/api/v1/users/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  profileFields: ['emails', 'firstName', 'lastName'],
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    googleId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value,
  };
  return done(null, user);
}));

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  loginCallback);

router.patch('/make-lf', Authenticate, updateRole);

router.get('/all', Authenticate, getAllUsers);
router.get('/', Authenticate, viewAllProfiles);
router.get('/my-profile', Authenticate, getMyProfile);
router.get('/:id', Authenticate, viewSingleProfile);

export default { router, passport };
