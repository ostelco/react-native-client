# 2.5.x

- Design issues on User screen
    - title was not visible
    - could not edit text on android
- Issue with user without subscription, now alerts the user of the missing subscription
    - Users would see spinning icon instead of data left
    - A purchase would not be registered
    - The what you bought screen would crash or show blank screen
- Analytics
    - After user successfully logs in with auth0
    - After user successfully updates profile on sign up screen
    - After user successfully updates consent on gdpr screen
    - After user clicks on a product
    - After user successfully completes a purchase
- Flow
    - User is now automatically redirected to Home screen if already logged in, will still see the first screen though
    