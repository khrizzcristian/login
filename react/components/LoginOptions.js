import { ExtensionContainer, useRuntime } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import FacebookIcon from '../images/FacebookIcon'
import GoogleIcon from '../images/GoogleIcon'
import { translate } from '../utils/translate'
import FormTitle from './FormTitle'
import OAuth from './OAuth'
import styles from '../styles.css'
import FormError from './FormError'
import getErrorQuery from '../utils/getErrorQuery'
import getOAuthErrorMessage from '../utils/getOAuthErrorMessage'
import { steps } from '../utils/steps'

const PROVIDERS_ICONS = {
  Google: GoogleIcon,
  Facebook: FacebookIcon,
}

/** LoginOptions tab component. Displays a list of login options */
const LoginOptions = ({
  className,
  title,
  fallbackTitle,
  options,
  onLoginSuccess,
  intl,
  isAlwaysShown,
  providerPasswordButtonLabel,
  currentStep,
  onOptionsClick,
  showEmailVerification,
  onStateChange,
  socialLoginButtonsPosition,
  showLoginFormTitle,
  showRegisterOnMainScreen,
}) => {
  const runtime = useRuntime()
  const initialOAuthErrorMessage = useMemo(() => {
    const errorQuery = getErrorQuery(runtime)
    return errorQuery && getOAuthErrorMessage(errorQuery)
  }, [runtime])
  const [loginError, setLoginError] = useState(initialOAuthErrorMessage)

  const handleOAuthError = useCallback(err => {
    const msg = getOAuthErrorMessage(err)
    setLoginError(msg)
  }, [])

  const handleOptionClick = useCallback(
    el => () => {
      onOptionsClick(el)
    },
    [onOptionsClick]
  )



  const showOption = useCallback(
    (option, optionName) => {
      return (
        options &&
        ((options[option] && !isAlwaysShown) || currentStep !== optionName)
      )
    },
    [options, isAlwaysShown, currentStep]
  )

  const classes = useMemo(
    () =>
      classNames(styles.options, className, {
        [styles.optionsSticky]: isAlwaysShown,
      }),
    [className, isAlwaysShown]
  )
  return (
    <div className={classes}>
      {showLoginFormTitle && (
        <FormTitle>{title || translate(fallbackTitle, intl)}</FormTitle>
      )}
      <FormError show={!!loginError}>{loginError}</FormError>
      <ul className={`${styles.optionsList} list pa0`}>
        <Fragment>
          {options.providers &&
            socialLoginButtonsPosition === 'top' &&
            options.providers.map(({ providerName }, index) => {
              // eslint-disable-next-line no-prototype-builtins
              const hasIcon = PROVIDERS_ICONS.hasOwnProperty(providerName)
              return (
                <li
                  className={`${styles.optionsListItem} mb3`}
                  key={`${providerName}-${index}`}
                >
                  <OAuth
                    provider={providerName}
                    onLoginSuccess={onLoginSuccess}
                    onOAuthError={handleOAuthError}
                  >
                    {hasIcon
                      ? React.createElement(PROVIDERS_ICONS[providerName], null)
                      : null}
                  </OAuth>
                </li>
              )
            })}
          {options.accessKeyAuthentication &&
            showEmailVerification &&
            showOption(
              'accessKeyAuthentication',
              'store/loginOptions.emailVerification'
            ) && (
              <li className={`${styles.optionsListItem} mb3`}>
                <div
                  className={classNames(
                    styles.button,
                    styles.accessCodeOptionBtn
                  )}
                >
                  <Button
                    variation="secondary"
                    onClick={handleOptionClick(
                      'store/loginOptions.emailVerification'
                    )}
                  >
                    <span>
                      {translate('store/loginOptions.emailVerification', intl)}
                    </span>
                  </Button>
                </div>
              </li>
            )}
          {options.classicAuthentication &&
            showOption(
              'classicAuthentication',
              'store/loginOptions.emailAndPassword'
            ) && (
              <li className={`${styles.optionsListItem} mb3`}>
                <div
                  className={classNames(
                    styles.button,
                    styles.emailPasswordOptionBtn
                  )}
                >
                  <Button
                    variation="secondary"
                    onClick={handleOptionClick(
                      'store/loginOptions.emailAndPassword'
                    )}
                  >
                    <span>
                      {providerPasswordButtonLabel ||
                        translate('store/loginOptions.emailAndPassword', intl)}
                    </span>
                  </Button>
                </div>
              </li>
            )}
          {options.providers &&
            socialLoginButtonsPosition === 'bottom' &&
            options.providers.map(({ providerName }, index) => {
              // eslint-disable-next-line no-prototype-builtins
              const hasIcon = PROVIDERS_ICONS.hasOwnProperty(providerName)
              return (
                <li
                  className={`${styles.optionsListItem} mb3`}
                  key={`${providerName}-${index}`}
                >
                  <OAuth
                    provider={providerName}
                    onLoginSuccess={onLoginSuccess}
                    onOAuthError={handleOAuthError}
                  >
                    {hasIcon
                      ? React.createElement(PROVIDERS_ICONS[providerName], null)
                      : null}
                  </OAuth>
                </li>
              )
            })}
        </Fragment>
        {showRegisterOnMainScreen === true ? (
          <div
            className={`${styles.formLinkContainerMainScreen} flex justify-center ph0 mt4`}
          >
            <a
              href=""
              className={`${styles.dontHaveAccountMainScreen} link dim c-link t-small`}
              onClick={e =>
                onStateChange(
                  {
                    step: steps.EMAIL_VERIFICATION,
                    isCreatePassword: true,
                    isOnInitialScreen: false,
                  },
                  e.preventDefault()
                )
              }
            >
              {translate('store/login.notHaveAccount', intl)}
            </a>
          </div>
        ) : (
          <></>
        )}
        <li
          className={`${styles.optionsListItem} ${styles.optionsListItemContainer} mb3`}
        >
          <ExtensionContainer id="container" />
        </li>
      </ul>
    </div>
  )
}

LoginOptions.propTypes = {
  /** Intl object */
  intl: intlShape,
  /** Function to change de active tab */
  onOptionsClick: PropTypes.func.isRequired,
  /** Title that will be shown on top */
  title: PropTypes.string.isRequired,
  /** Fallback title that will be shown if there's no title */
  fallbackTitle: PropTypes.string.isRequired,
  /** List of options to be displayed */
  options: PropTypes.shape({
    accessKeyAuthentication: PropTypes.bool,
    classicAuthentication: PropTypes.bool,
    providers: PropTypes.arrayOf(
      PropTypes.shape({
        className: PropTypes.string,
        providerName: PropTypes.string,
      })
    ),
  }),
  /** Class of the root element */
  className: PropTypes.string,
  /** Whether this component is always rendered */
  isAlwaysShown: PropTypes.bool,
  /** Current option being displayed */
  currentStep: PropTypes.string,
  /** Function called after login success */
  onLoginSuccess: PropTypes.func.isRequired,
  /** Password login button text */
  providerPasswordButtonLabel: PropTypes.string,
  /** Show Email Verification button */
  showEmailVerification: PropTypes.bool,
  /** Social button position ( top or bottom ) */
  socialLoginButtonsPosition: PropTypes.string,
  /** Display or hide login form title */
  showLoginFormTitle: PropTypes.bool,
  /** Function to change de active tab */
  onStateChange: PropTypes.func.isRequired,
  /** Function to change de active tab */
  showRegisterOnMainScreen: PropTypes.bool,
}

export default injectIntl(LoginOptions)
