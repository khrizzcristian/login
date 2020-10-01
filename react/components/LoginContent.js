import React, { Component, Suspense, useMemo, useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import Markdown from 'react-markdown'

import Loading from './Loading'
import LoginOptions from './LoginOptions'
import AccountOptions from './AccountOptions'
import EmailAndPassword from './EmailAndPassword'
import CodeConfirmation from './CodeConfirmation'
import RecoveryPassword from './RecoveryPassword'
import EmailVerification from './EmailVerification'
import OAuthAutoRedirect from './OAuthAutoRedirect'

import { steps } from '../utils/steps'
import { setCookie } from '../utils/set-cookie'
import FlowState from '../utils/FlowState'

import { LoginPropTypes } from '../propTypes'
import { AuthStateLazy, AuthServiceLazy, useSendAccessKey } from 'vtex.react-vtexid'
import { SELF_APP_NAME_AND_VERSION } from '../common/global'
import getUserEmailQuery from '../utils/getUserEmailQuery'
import getFlowStateQuery from '../utils/getFlowStateQuery'
import getErrorQuery from '../utils/getErrorQuery'
import getSessionProfile from '../utils/getSessionProfile'
import { getReturnUrl, getDefaultRedirectUrl, jsRedirect } from '../utils/redirect'
import styleModifierByStep from '../utils/styleModifierByStep'
import useAsyncCallback from '../utils/useAsyncCallback'

import styles from '../styles.css'

const STEPS = [
  /* eslint-disable react/display-name, react/prop-types */
  ({ props, state, handleStateChange, isOptionsMenuDisplayed }) => {
    return style => (
      <div style={style} key={0}>
        <EmailVerification
          next={steps.CODE_CONFIRMATION}
          previous={steps.LOGIN_OPTIONS}
          isCreatePassword={state.isCreatePassword}
          title={props.accessCodeTitle}
          emailPlaceholder={props.emailPlaceholder}
          onStateChange={handleStateChange}
          showBackButton={!isOptionsMenuDisplayed}
        />
      </div>
    )
  },
  ({ props, handleStateChange, isOptionsMenuDisplayed, handleLoginSuccess }) => {
    return style => (
      <div style={style} key={1}>
        <EmailAndPassword
          next={steps.ACCOUNT_OPTIONS}
          previous={steps.LOGIN_OPTIONS}
          title={props.emailAndPasswordTitle}
          emailPlaceholder={props.emailPlaceholder}
          passwordPlaceholder={props.passwordPlaceholder}
          showPasswordVerificationIntoTooltip={
            props.showPasswordVerificationIntoTooltip
          }
          onStateChange={handleStateChange}
          showBackButton={!isOptionsMenuDisplayed}
          onLoginSuccess={handleLoginSuccess}
          identifierPlaceholder={props.hasIdentifierExtension ? props.identifierPlaceholder : ''}
          invalidIdentifierError={props.hasIdentifierExtension ? props.invalidIdentifierError : ''}
        />
      </div>
    )
  },
  ({ props, handleStateChange, handleLoginSuccess }) => {
    return style => (
      <div style={style} key={2}>
        <CodeConfirmation
          next={steps.ACCOUNT_OPTIONS}
          previous={steps.EMAIL_VERIFICATION}
          accessCodePlaceholder={props.accessCodePlaceholder}
          onStateChange={handleStateChange}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    )
  },
  ({ props }) => {
    return style => (
      <div style={style} key={3}>
        <AccountOptions optionLinks={props.accountOptionLinks} />
      </div>
    )
  },
  ({ props, handleStateChange, handleLoginSuccess }) => {
    return style => (
      <div style={style} key={4}>
        <RecoveryPassword
          next={steps.CREATE_PASSWORD}
          previous={steps.EMAIL_PASSWORD}
          passwordPlaceholder={props.passwordPlaceholder}
          showPasswordVerificationIntoTooltip={
            props.showPasswordVerificationIntoTooltip
          }
          accessCodePlaceholder={props.accessCodePlaceholder}
          onStateChange={handleStateChange}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    )
  },
  /* eslint-enable react/display-name react/prop-types */
]

class LoginContent extends Component {
  static propTypes = {
    /** Whether this is rendered by the header component (LoginComponent) */
    isHeaderLogin: PropTypes.bool,
    /** User profile information */
    profile: PropTypes.shape({}),
    /** Which screen option will renderize  */
    isInitialScreenOptionOnly: PropTypes.bool,
    /** Step that will be render first */
    defaultOption: PropTypes.number,
    /** Runtime context. */
    runtime: PropTypes.shape({
      navigate: PropTypes.func,
      page: PropTypes.string,
      history: PropTypes.shape({
        location: PropTypes.shape({
          pathname: PropTypes.string,
          search: PropTypes.string,
        }),
      }),
    }),
    /* Reused props */
    optionsTitle: LoginPropTypes.optionsTitle,
    emailAndPasswordTitle: LoginPropTypes.emailAndPasswordTitle,
    accessCodeTitle: LoginPropTypes.accessCodePlaceholder,
    emailPlaceholder: LoginPropTypes.emailPlaceholder,
    passwordPlaceholder: LoginPropTypes.passwordPlaceholder,
    accessCodePlaceholder: LoginPropTypes.accessCodePlaceholder,
    showPasswordVerificationIntoTooltip:
      LoginPropTypes.showPasswordVerificationIntoTooltip,
    providerPasswordButtonLabel: PropTypes.string,
    hasIdentifierExtension: PropTypes.bool,
    identifierPlaceholder: PropTypes.string,
    invalidIdentifierError: PropTypes.string,
    /** Terms and conditions text in markdown */
    termsAndConditions: PropTypes.string,
    defaultIsCreatePassword: PropTypes.bool,
    apiRedirect: PropTypes.func.isRequired,
    showEmailVerification: PropTypes.bool,
    socialLoginButtonsPosition: PropTypes.string,
    showLoginFormTitle: PropTypes.bool,
    showRegisterOnMainScreen: PropTypes.bool,
  }

  static defaultProps = {
    isInitialScreenOptionOnly: true,
    defaultOption: 0,
    optionsTitle: '',
    showEmailVerification: true,
    socialLoginButtonsPosition: "bottom",
    showLoginFormTitle: true,
    showRegisterOnMainScreen: false,
  }

  static contextTypes = {
    patchSession: PropTypes.func,
  }

  state = {
    isOnInitialScreen: !(this.props.profile && this.props.profile.isAuthenticated),
    isCreatePassword: this.props.defaultIsCreatePassword,
    step: this.props.defaultOption,
    email: '',
    password: '',
    code: '',
  }

  componentDidMount() {
    if (location.href.indexOf('accountAuthCookieName') > 0) {
      setCookie(location.href)
    }
  }

  get shouldRenderLoginOptions() {
    return this.props.isInitialScreenOptionOnly
      ? this.state.isOnInitialScreen
      : true
  }

  get shouldRenderForm() {
    const {
      isHeaderLogin,
      isInitialScreenOptionOnly,
      profile,
    } = this.props
    const {
      isOnInitialScreen,
    } = this.state

    const { isAuthenticated } = profile || {}

    if (isHeaderLogin && isAuthenticated) {
      return true
    }
    return !(isInitialScreenOptionOnly && isOnInitialScreen)
  }

  shouldRedirectToOAuth = loginOptions => {
    if (!loginOptions) return [false, null]
    const { accessKey, oAuthProviders, password } = loginOptions
    const { runtime } = this.props
    if (getErrorQuery(runtime)) {
      return [false, null]
    }
    if (runtime && runtime.query && runtime.query.oAuthRedirect) {
      const redirectProvider =
        oAuthProviders &&
        oAuthProviders.find(provider => provider.providerName === runtime.query.oAuthRedirect)
      if (redirectProvider) {
        return [true, redirectProvider]
      }
    }
    if (accessKey || password) return [false, null]
    if (!oAuthProviders || oAuthProviders.length !== 1) return [false, null]
    return [true, oAuthProviders[0]]
  }

  handleStateChange = state => {
    if (state.hasOwnProperty('step')) {
      if (state.step === -1) {
        state.step = 0
        state.isOnInitialScreen = true
      } else if (state.step !== this.props.defaultOption) {
        state.isOnInitialScreen = false
      }
    }

    this.setState({ ...state })
  }

  handleOptionsClick = option => {
    let nextStep

    if (option === 'store/loginOptions.emailVerification') {
      nextStep = 0
    } else if (option === 'store/loginOptions.emailAndPassword') {
      nextStep = 1
    }

    this.setState({
      step: nextStep,
      isOnInitialScreen: false,
      isCreatePassword: false,
    })
  }
  
  handleLoginSuccess = () => {
    const { isHeaderLogin, apiRedirect } = this.props
    return this.context.patchSession().then(() => {
      if (isHeaderLogin && window && window.location) {
        window.location.reload()
      } else {
        // the use of apiRedirect here, instead of
        // the redirect method, is because on CSR the
        // components using authentication and relying
        // on the session cookie haven't been updated yet,
        // so the refresh is intentional. 
        apiRedirect()
      }
    })
  }

  renderChildren = () => {
    const {
      isHeaderLogin,
      isInitialScreenOptionOnly,
      optionsTitle,
      defaultOption,
      providerPasswordButtonLabel,
      profile,
      showEmailVerification,
      socialLoginButtonsPosition,
      showLoginFormTitle,
      showRegisterOnMainScreen,
    } = this.props
    const {
      isOnInitialScreen,
    } = this.state

    const { isAuthenticated } = profile || {}

    let step = this.state.step
    if (isHeaderLogin && isAuthenticated) {
      step = steps.ACCOUNT_OPTIONS
    } else if (isOnInitialScreen) {
      step = defaultOption
    }

    return (
      <>
        <AuthStateLazy.IdentityProviders>
          {({ value: options }) => {
            const [
              shouldRedirectToOauth,
              oauthProvider,
            ] = this.shouldRedirectToOAuth(options)
            return shouldRedirectToOauth && oauthProvider ? (
              <OAuthAutoRedirect provider={oauthProvider.providerName} />
            ) : (
              <LoginOptions
                page="login-options"
                fallbackTitle="store/loginOptions.title"
                title={optionsTitle}
                showEmailVerification={showEmailVerification}
                socialLoginButtonsPosition={socialLoginButtonsPosition}
                showRegisterOnMainScreen={showRegisterOnMainScreen}
                showLoginFormTitle={showLoginFormTitle}
                onStateChange={this.handleStateChange}
                options={{
                  accessKeyAuthentication: options.accessKey,
                  classicAuthentication: options.password,
                  providers: options.oAuthProviders,
                }}
                currentStep={
                  step === 0
                    ? 'store/loginOptions.emailVerification'
                    : 'store/loginOptions.emailAndPassword'
                }
                isAlwaysShown={!isInitialScreenOptionOnly}
                onOptionsClick={this.handleOptionsClick}
                onLoginSuccess={this.handleLoginSuccess}
                providerPasswordButtonLabel={providerPasswordButtonLabel}
              />
            )
          }}
        </AuthStateLazy.IdentityProviders>
        <div className={`${styles.termsAndConditions} t-mini c-muted-2 tc`}>
         <Markdown source={this.props.termsAndConditions} />
        </div>
      </>
    )
  }

  render() {
    const {
      isHeaderLogin,
      isInitialScreenOptionOnly,
      defaultOption,
      runtime,
      profile,
    } = this.props

    const {
      isOnInitialScreen,
    } = this.state

    const { isAuthenticated } = profile || {}

    if (!isHeaderLogin && isAuthenticated) {
      if (location.pathname.includes('/login')) {
        jsRedirect({ runtime, isHeaderLogin })
      }
    }

    let step = this.state.step
    if (isHeaderLogin && isAuthenticated) {
      step = steps.ACCOUNT_OPTIONS
    } else if (isOnInitialScreen) {
      step = defaultOption
    }

    const renderForm = STEPS[step](
      {
        props: this.props,
        state: this.state,
        handleStateChange: this.handleStateChange,
        isOptionsMenuDisplayed: this.shouldRenderLoginOptions,
        handleLoginSuccess: this.handleLoginSuccess,
      }
    )

    const className = classNames(
      `${styles.content} ${styles.content}--${styleModifierByStep[step]} flex relative bg-base justify-around overflow-visible pa4 center`,
      (this.shouldRenderForm && this.shouldRenderLoginOptions) ? 'items-start-ns' : 'items-baseline-ns',
      {
        [styles.contentInitialScreen]: this.state.isOnInitialScreen,
        [`${styles.contentAlwaysWithOptions} mw6-ns flex-column-reverse items-center flex-row-ns`]: !isInitialScreenOptionOnly,
        'items-baseline': isInitialScreenOptionOnly,
      }
    )

    const formClassName = classNames(styles.contentForm, 'dn ph4', {
      [`${styles.contentFormVisible} db `]: this.shouldRenderForm,
    })
    
    return (
      <div className={className}>
        {!(isHeaderLogin && isAuthenticated) && this.shouldRenderLoginOptions
          ? this.renderChildren()
          : null}
        <div className={formClassName}>
          {this.shouldRenderForm && renderForm ? (
            /** If it renders both the form and the menu, wrap the
             * form in a Suspense, so it doesn't hide the options
             * while it's loading */
            this.shouldRenderLoginOptions ? (
              <Suspense fallback={<Loading />}>
                {renderForm()}
              </Suspense>
            ) : renderForm()
          ) : null}
        </div>
      </div>
    )
  }
}

const LoginContentWrapper = props => {
  const userEmail = getUserEmailQuery()
  const flowState = getFlowStateQuery()

  const isCreatePassFlow = useMemo(
    () => flowState === FlowState.CREATE_PASSWORD,
    [flowState]
  )

  const defaultOption = useMemo(
    () => (isCreatePassFlow ? steps.CREATE_PASSWORD : props.defaultOption),
    [isCreatePassFlow, props.defaultOption]
  )

  const redirectUrl = useMemo(() =>
    getReturnUrl() || getDefaultRedirectUrl(props.isHeaderLogin),
    [props.isHeaderLogin]
  )

  const [
    ,
    { loading: loadingSendAccessKey, error: errorSendAccessKey },
  ] = useSendAccessKey({
    scope: 'STORE',
    parentAppId: SELF_APP_NAME_AND_VERSION,
    autorun: isCreatePassFlow,
    actionArgs: {
      useNewLoginAttempt: true,
      email: userEmail,
    },
    loginAttempt: {
      returnUrl: redirectUrl,
    },
  })

  if (isCreatePassFlow && (!userEmail || errorSendAccessKey)) {
    return (
      <LoginContent
        {...props}
        defaultOption={steps.EMAIL_VERIFICATION}
        defaultIsCreatePassword
      />
    )
  }

  if (loadingSendAccessKey) {
    return (
      <div data-testid="loading-session">
        <Loading />
      </div>
    )
  }
  return (
    <LoginContent
      {...props}
      defaultOption={defaultOption}
    />
  )
}

const LoginContentProvider = props => {
  const runtime = useRuntime()
  const intl = useIntl()

  const redirectUrl = useMemo(() =>
    getReturnUrl() || getDefaultRedirectUrl(props.isHeaderLogin),
    [props.isHeaderLogin]
  )

  const [, {
    value: profileFromSession,
    loading: loadingProfileFromSession
  }] = useAsyncCallback(() => getSessionProfile(), [], {
    autorun: !props.isHeaderLogin,
  })
  const profile = useMemo(() => {
    if (props.isHeaderLogin) {
      return props.profile
    }
    return profileFromSession
  }, [props.isHeaderLogin, props.profile, profileFromSession])

  const userEmail = (profile && profile.email) || getUserEmailQuery()
  
  if (loadingProfileFromSession) {
    return (
      <div data-testid="loading-session">
        <Loading />
      </div>
    )
  }

  return (
    <AuthStateLazy
      skip={!!(profile && profile.isAuthenticated)}
      scope="STORE"
      parentAppId={SELF_APP_NAME_AND_VERSION}
      returnUrl={redirectUrl}
      email={userEmail}
    >
      {({ loading }) => {
        if (loading) {
          return (
            <div data-testid="loading-session">
              <Loading />
            </div>
          )
        }
        return (
          <AuthServiceLazy.RedirectAfterLogin>
            {({ action: apiRedirect }) => (
              <LoginContentWrapper
                {...props}
                profile={profile}
                intl={intl}
                runtime={runtime}
                apiRedirect={apiRedirect}
              />
            )}
          </AuthServiceLazy.RedirectAfterLogin>
      )}}
    </AuthStateLazy>
  )
}

export default LoginContentProvider
