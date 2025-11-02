# TODO: Implement Clerk Authentication and Remove JWT

## Steps to Complete

- [x] Install @clerk/clerk-sdk-node dependency
- [x] Update middleware/authMiddleware.js to verify Clerk JWT tokens
- [x] Modify models/User.js: remove password fields, add clerkId
- [x] Delete utils/generateToken.js
- [x] Update controllers/authController.js: remove JWT-based login/signup, add user creation via Clerk webhook
- [x] Update routes/authRoutes.js: remove or adjust login/signup routes
- [x] Uninstall jsonwebtoken and bcryptjs
- [x] Test all protected APIs (dashboard, studyPlan, notes, flashcards, ai) to ensure they work with Clerk tokens
- [x] Verify user creation and linking via Clerk
