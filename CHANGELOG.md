# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- props
   - showEmailVerification
   - socialLoginButtonsPosition
   - showLoginFormTitle
   - showRegisterOnMainScreen
- css handlers
    - formLinkContainerMainScreen
    - dontHaveAccountMainScreen

## [2.38.1] - 2020-10-08

## [2.38.0] - 2020-09-16

### Changed

- Fill email fields by default with the value from session

## [2.37.1] - 2020-09-08

### Fixed

- State change happening after "set password" and before redirect

### Removed

- `postreleasy` script to publish app (VTEX CD does it instead)

## [2.37.0] - 2020-09-08

### Changed

- Correctly identify whether the user is authenticated from the session profile object

## [2.36.3] - 2020-08-26

### Fixed

- `/login` page not auto redirecting logged user when `returnUrl` didn't exist

## [2.36.2] - 2020-08-24

### Fixed

- "Unknown error" message appeared when OAuth popup was closed

## [2.36.1] - 2020-08-20

### Fixed

- `hideIconLabel` prop now hides the label when the user is logged in

## [2.36.0] - 2020-08-13

### Added

- `hideIconLabel` prop to `login` interface
- `hideIconLabel` prop to site-editor

## [2.35.4] - 2020-08-12

### Changed

- Import hooks directly instead of the whole "serviceHooks" bundle

## [2.35.3] - 2020-08-12

## [2.35.2] - 2020-08-11

## [2.35.1] - 2020-08-11

## [2.35.0] - 2020-08-04

### Added

- OAuth error handling (for both popup and redirect flows), showing messages in case of errors

## [2.34.9] - 2020-07-16

### Removed

- Deprecated code

## [2.34.8] - 2020-07-15

### Changed

- `react-vtexid` API usage, to prepare for breaking changes

## [2.34.7] - 2020-07-13

### Changed

- `react-vtexid` API names that will receive breaking changes

## [2.34.6] - 2020-07-13

### Fixed

- `Logout` button had a bad background

## [2.34.5] - 2020-07-09

### Fixed

- Change truncate of user name from JS to CSS.

## [2.34.4] - 2020-07-07

### Changed

- Usage of service hooks to address future breaking changes in `react-vtexid`

## [2.34.3] - 2020-06-23

### Fixed

- Google OneTap not working
- Unit tests were broken

## [2.34.2] - 2020-06-09

### Fixed

- Injected google scripts (like `google map`) breaking the login

## [2.34.1] - 2020-06-04

### Fixed

- Prop warning printed to the console

## [2.34.0] - 2020-06-02

### Added

- `content` css handle modifiers for each login flow state

## [2.33.1] - 2020-06-01

### Fixed

- App breaking on server side rendering

## [2.33.0] - 2020-05-28

### Added

- When the header behavior is LINK, it passes `__bindingAddress` in navigation
- When the header behavior is LINK, it adds the current query string to the `returnUrl`

### Changed

- When `returnUrl` doesn't exist, redirect to default url defined by `vtex.react-vtexid` or consider `rootPath` and `__bindingAddress`

## [2.32.0] - 2020-05-21
### Added

- Added support for [Google's One-tap sign-up and auto sign-in](https://developers.google.com/identity/one-tap/web/)
- New `hasGoogleOneTap` prop to the site-editor

## [2.30.2] - 2020-05-18

### Changed

- Use `vtex.react-vtexid` lib to call `/api/vtexid/pub/authentication/redirect`

### Fixed

- User was not being redirected when already logged in

### Removed

- Unused dependencies

## [2.30.1] - 2020-05-13

## [2.30.0] - 2020-05-07

### Added

- Subtitle to create password screen

### Changed

- Title of create password screen

## [2.29.1] - 2020-04-13

### Fixed

- `react-device-detect` dependency removed to fix broken SSR
- Password tooltip opening direction depended on device type rather than screen size

## [2.29.0] - 2020-04-08

### Added

- `userEmail` query string to set default email
- `flowState` query string to set default state of the login flow

## [2.28.1] - 2020-04-03

## [2.28.0] - 2020-03-18

### Added

- `forgotPasswordLink`, `dontHaveAccount`, `eyeIcon` CSS handles

## [2.27.0] - 2020-03-17

### Added

- `termsAndConditions` prop to the `login` and `login-content` interfaces
- `termsAndConditions` prop to the site-editor

## [2.26.0] - 2020-03-12

### Added

- `accountOptionsButtonBehavior` prop to the `login` interface. It defaults to `popover` and can be changed to `link`
- New `accountOptionsButtonBehavior` prop to the site-editor

## [2.25.0] - 2020-03-10

### Fixed

- `mirrorTooltipToRight`'s default prop value

### Added

- `accountOptionLinks` prop to the `login` interface
- `accountOptionLinks` prop to the site-editor

## [2.24.0] - 2020-02-19

### Added

- `logInButtonBehavior` prop to the `login` interface. It defaults to `popover` and can be changed to `link`

- New `logInButtonBehavior` prop to the site-editor

### Changed

- Log in is now a button instead of a link in mobile (or when `logInButtonBehavior=link`)

### Fixed

- The translation of the `mirrorTooltipToRight` prop in the site-editor

## [2.23.3] - 2020-02-17

### Changed
- Import session query directly, import less JS.

## [2.23.2] - 2020-02-11

### Fixed

- The `Identifier input placeholder` and `Invalid identifier error` site-editor form fields were not coming right after the `Identifier extension` toggle.

## [2.23.1] - 2020-02-06

## [2.23.0] - 2020-02-04
### Changed
- Render login button on SSR.
- Load login content lazily.
- Use internal and lighter implementation of `OutsideClickHandler`.

## [2.22.0] - 2020-01-09

## [2.21.2] - 2020-01-08
### Changed
- Use `handlePasswordChange` to verify when the password changes then hide validation message

## [2.21.1] - 2019-12-18

### Added

- Missing props to documentation

## [2.21.0] - 2019-12-17

### Added

- Customization classes ".accessCodeOptionBtn", ".emailPasswordOptionBtn", ".facebookOptionBtn", ".googleOptionBtn" and ".customOAuthOptionBtn".

- Customization classes ".emailForm", ".emailAndPasswordForm" and ".forgotPasswordForm".

## [2.20.2] - 2019-12-06

### Added

- Information on new icon blocks to the documentation.

## [2.20.1] - 2019-12-02

### Fixed

- Scenarios where the icons would not be rendered if the user did not provide the icon blocks.

## [2.20.0] - 2019-11-25

### Added

- Support for `icon-profile`, `icon-arrow-back` and `icon-eye-sight` blocks to be used by `login` and `login-content`. This enables the user to customize the props passed to each of those icons.

## [2.19.3] - 2019-11-21

## [2.19.2] - 2019-11-13

### Added

- `showIconProfile` and `iconLabel` props to documentation

## [2.19.1] - 2019-11-12

### Added

- Add error feedback for when the user types a wrong code in "Forgot Password" screen

## [2.19.0] - 2019-11-11

### Added

- `mirrorTooltipToRight` Store Front prop to the `login` block. It makes the login open towards the right instead of the left.

## [2.18.0] - 2019-11-01
### Changed
- Remove call to `getSession` in first component, use sessionPromise from render.

### Fixed

- Fix secuirty vulnerabilities from project dev dependencies

## [2.17.0] - 2019-10-28

### Added

- oAuthRedirect query string to automatically redirect to an OAuth provider.

## [2.16.2] - 2019-10-16

### Added

- Pass app version to `react-vtexid`

## [2.16.1] - 2019-10-14

### Fixed

- Fix unsatisfactory messages and normalize them in all languages.

## [2.16.0] - 2019-10-01

### Added

- Add `providerPasswordButtonLabel`, `hasIdentifierExtension`, `identifierPlaceholder`, `invalidIdentifierError` configurations to Store Front that can be edited in site-editor.

- Add support for User Identifier Extension Apps, documented in the `README.md` file.

## [2.15.1] - 2019-09-10

### Changed
- Make render strategy `client`, i.e. component assets are fetched client-side with same priority as server-side blocks.

## [2.15.0] - 2019-09-09

### Changed
- OAuth buttons now open a popup window instead of redirecting the user.

## [2.14.0] - 2019-08-30
### Changed
- Render type set to lazy

## [2.13.9] - 2019-08-29

## [2.13.8] - 2019-08-07

## [2.13.7] - 2019-07-01
### Fixed
- Issue where user was unable to input auth token when the default login option was "0" (i.e. by token instead of email/password).

## [2.13.6] - 2019-06-28
### Fixed
- App considered user logged in even after his or her session expired

## [2.13.5] - 2019-06-27
### Fixed
- Build assets with new builder hub.

## [2.13.4] - 2019-06-25
### Fixed
- Reword message written with bad english

## [2.13.3] - 2019-06-19
### Changed
- Removed animation on LoginContent due to performance issues.

## [2.13.2] - 2019-06-17
### Fixed
- Make password verification fixed after it was shown

## [2.13.1] - 2019-05-23
### Fixed 
- Page reload after login for price update

## [2.13.0] - 2019-05-17
### Changed
- Set the prop `iconLabel` in `LoginComponent`.

### Added
- prop `showIconProfile` to `LoginComponent`.

## [2.12.0] - 2019-05-17

## [2.11.0] - 2019-05-16

### Added

- Auto-redirect to OAuth when there's only one provider.

## [2.10.1] - 2019-05-07
### Fixed
- Fix error messages not appearing correctly

## [2.10.0] - 2019-05-02
### Changed
- Fix redirection after OAuth login.
- Pass the `returnUrl` query when the user opens login on mobile.

## [2.9.2] - 2019-04-30
### Changed
- Use `react-portal` to add login popover on the top level of the body.

## [2.9.1] - 2019-04-30
### Changed
- Fixes user redirection after OAuth login
- Validates the return URL to prevent [Open Redirect](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)

## [2.9.0] - 2019-04-24
### Changed
- Scope messages by domain

## [2.8.5] - 2019-03-22

### Changed
- Set default color to gray

## [2.8.4] - 2019-03-22
### Fixed
- Change messages file to generic language.

## [2.8.3] - 2019-03-14

### Fixed

- Fix Password validation

## [2.8.2] - 2019-03-13

### Fixed

- Fix Password tooltip

### Changed

- Add snapshot tests.

## [2.8.1] - 2019-03-01

### Changed

- Using `store-icons` instead of `dreamstore-icons`.

### Fixed

- Move `package.json` file data from wrong folder to the right one.

## [2.8.0] - 2019-02-15

### Added

- Add CSS Modules.

## [2.7.6] - 2019-02-14

## [2.7.5] - 2019-02-14

## [2.7.4] - 2019-02-12

### Fixed

- Improve regex for email validation.

## [2.7.3] - 2019-02-12

### Fixed

- Fix `react-vtexid` scope value.

## [2.7.2] - 2019-02-01

## [2.7.1] - 2019-02-01

### Changed

- Better use of EyeSightIcon API.

## [2.7.0] - 2019-01-30

### Changed

- Use icons from `vtex.dreamstore-icons`.

## [2.6.2] - 2019-01-29

### Fixed

- Remove `inheritComponent` from blocks.

## [2.6.1] - 2019-01-28

### Fixed

- Encoding of `returnUrl` query param.

## [2.6.0] - 2019-01-28

## [2.5.3] - 2019-01-26

### Changed

- Fix style of profile name in tablet view.

## [2.5.2] - 2019-01-18

### Changed

- Fix dependencies issues.

## [2.5.1] - 2019-01-18

## [2.5.0] - 2019-01-18

### Changed

- Bump vtex.styleguide to 9.x.

## [2.4.0] - 2019-01-18

### Changed

- Update React builder to 3.x.

## [2.3.1] - 2019-01-15

### Fixed

- Improve the design tokens of login.

## [2.3.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome store-builder.

### Fixed

- Spacing between login credentials and login options.

## [2.2.1] - 2019-01-04

### Changed

- Use `ButtonWithIcon` in favour of `Button` from styleguide.

### Fixed

- Create `GoBackButton` to remove duplicated code.

## [2.2.0] - 2018-12-17

### Added

- Support to messages builder.

## [2.1.0] - 2018-12-14

### Changed

- Use `vtex.auth` lib instead of mutations to perform authentication operations.
- Bump `vtex.styleguide` major version.

### Fixed

- Add design tokens on labels.

## [2.0.4] - 2018-11-29

### Changed

- Use of `vtex.use-svg` lib to display icons.

## [2.0.3] - 2018-11-27

### Added

- Internationalization on all the inputs placeholder.

## [2.0.2] - 2018-11-23

### Changed

- Use icons from the dreamstore icon pack.

## [2.0.1] - 2018-11-09

### Fixed

- Fix redirect behavior, now this function is called only when `/login` is in path

## [2.0.0] - 2018-11-08

### Changed

- Replace tachyons classes with design tokens.
- Use icons from dreamstore icon pack.

## [1.6.5] - 2018-11-08

### Fixed

- Fix Account Options is showing before complete login action

## [1.6.4] - 2018-10-18

### Fixed

- _Hotfix_ - Move out the return null of redirect logic.

## [1.6.3] - 2018-10-18

### Fixed

- Fix redirect behavior, now this function is called only when `returnUrl` is defined in location.search.

## [1.6.2] - 2018-10-09

### Fixed

- Warning message on loading element being a function.

## [1.6.1] - 2018-10-02

### Fixed

- Await before logout to avoid reloading before logging out

## [1.6.0] - 2018-10-02

### Changed

- Uses session query provided by vtex.store

## [1.5.6] - 2018-09-26

### Fixed

- Redirecting to the previous route in the app when the user tries to go to Login when already logged

## [1.5.5] - 2018-09-26

### Fixed

- Login does not break when there are no options. Now it allows the user to refetch it.

## [1.5.4] - 2018-09-24

### Changed

- Hide label in screens thinner than the laptop resolution.

## [1.5.3] - 2018-09-14

### Fixed

- Redirect to return URL after login success.

## [1.5.2] - 2018-09-13

### Changed

- Change My Orders to My account route.

## [1.5.1] - 2018-09-12

### Fixed

- Add HOC `withSession` to the `LoginContent` component.

## [1.5.0] - 2018-09-06

### Added

- Add HOC `withSession` to initialize user session.

### Changed

- Change profile query to session query.

## [1.4.1] - 2018-09-05

### Changed

- Update the `Login` to receive classnames for the label and icon.

## [1.4.0] - 2018-08-31

### Changed

- Update `Styleguide` version.

## [1.3.1] - 2018-08-24

### Added

- Add CSS class to `Login` label.

## [1.3.0] - 2018-08-23

### Added

- `LoginContent` animation.

## [1.2.2] - 2018-08-21

### Fixed

- Box position to be compatible with the new header design.

## [1.2.1] - 2018-08-20

### Fixed

- Fix email to e-mail in `pt-BR` translate.

## [1.2.1] - 2018-08-20

### Fixed

- Fix email to e-mail in `pt-BR` translate.

## [1.2.0] - 2018-08-17

### Added

- prop `fillColor` to `ProfileIcon` component.
- props `iconLabel`, `iconSize`, `iconColor` to `Login` component.

## [1.1.4] - 2018-08-17

### Fixed

- `Tooltip` position and container width.
- Close `Login` when clicking outside it.

## [1.1.3] - 2018-08-08

### Fixed

- Login page options when displaying login form.

## [1.1.2] - 2018-08-07

### Changed

- Add slugify in `providerName` CSS token.

## [1.1.1] - 2018-08-06

### Fixed

- `LoginOptions` throwing error on invalid element type

## [1.1.0] - 2018-08-02

### Added

- `Tooltip` component to show to the user if the password is attending the requisites.
- Schema into `Login` component.

### Fixed

- `LoginContent` form position.

## [1.0.1] - 2018-07-30

### Fixed

- Console warning of `loginTitle` being undefined.

## [1.0.2] - 2018-07-30

- Fix error of undefined LoginOption props.

## [1.0.1] - 2018-07-30

### Fixed

- Console warning of `loginTitle` being undefined.

## [1.0.0] - 2018-07-26

### Added

- Receive from the `VTEX-ID` all the login options available to authenticate users.
- Arrow icon to the back button.

### Changed

- Validation component tick color to red (error) and green (success).

## [0.10.0] - 2018-07-26

### Added

- `PasswordInput` to validate the password and show the validation to the user.
- Show password icon.

## [0.9.13] - 2018-07-25

### Fixed

- `LoginContent` position to be always under the `ProfileIcon`.

## [0.9.12] - 2018-07-24

### Fixed

- Fix onClick handle of recovery password.

## [0.9.11] - 2018-07-24

### Added

- Now, placeholders are customize by schema props.

### Changed

- Allow breakline on Login Titles.

## [0.9.10] - 2018-07-24

### Added

- Support for attribute `closeonclick` to close on click events inside modal.

### Changed

- Update CCS classes to improve customization.

## [0.9.9] - 2018-07-24

### Fixed

- Set default option correctly in `LoginContent`.

## [0.9.8] - 2018-07-23

### Added

- Add `ExtensionContainer` to allow multiple `ExtensionPoints`.

### Fixed

- Set cookie properly when is a social login.

## [0.9.7] - 2018-07-19

### Changed

- Move css back to tachyons classes.
- Refactor form structure to generic component.

## [0.9.6] - 2018-07-16

### Added

- Add `ExtensionPoint` as a custom login option.

## [0.9.5] - 2018-07-13

### Added

- Default callback after login success.

### Fixed

- Get profile after login.

## [0.9.4] - 2018-07-12

### Fixed

- Callback after login success.

## [0.9.3] - 2018-07-12

### Fixed

- Fix oAuth Set-Cookie in `LoginContent`.

## [0.9.2] - 2018-07-11

### Fixed

- Add intl and css in `LoginContent`.

## [0.9.1] - 2018-7-9

### Fixed

- Icon not showing on mobile.

## [0.9.0] - 2018-7-9

### Changed

- Render login icon as a link when mobile.

## [0.8.0] - 2018-7-6

### Fixed

- The Login button padding.

### Added

- `LoginContent` component.

### Changed

- Moved from tachyons classes to custom classes with the tachyons properties.

## [0.7.2] - 2018-7-6

### Changed

- Change to HTML button instead of VTEX Style Guide.

## [0.7.1] - 2018-7-5

### Fixed

- Intl of the OAuth Component.

## [0.7.0] - 2018-7-5

### Added

- `OAuth` with Facebook account.

## [0.6.0] - 2018-7-5

### Added

- `OAuth` with Google account.

## [0.5.0] - 2018-7-4

### Added

- Add recovery password in classic login.

## [0.4.0] - 2018-6-28

### Added

- Add validation on email, password and code inputs.

## [0.3.0] - 2018-6-28

### Added

- Login with email and password.

## [0.2.1] - 2018-6-26

### Changed

- Add email when user profile don't have firstName.

### Fixed

- Fix `accessKeySignIn` and `sendEmailVerification` mutations to reflect the changes in resolvers.

## [0.2.0] - 2018-6-14

### Added

- Add form in login inputs and my-orders route in account options.
- Remove My Profile from Account Options.

## [0.1.0] - 2018-6-11

### Added

- Add Account content when user is logged.

## [0.0.2] - 2018-6-8

### Changed

- Rename `index` to `Login`

## [0.0.1] - 2018-6-8

### Added

- Add _Login_ app.
