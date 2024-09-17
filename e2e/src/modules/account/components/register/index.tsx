"use client"

import { useRef, useState, useEffect } from 'react'

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

// Добавьте эту строку, чтобы TypeScript знал о глобальном объекте emailjs
declare const emailjs: any

const Register = ({ setCurrentView }: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    // Динамически загружаем SDK EmailJS
    const script = document.createElement('script')
    script.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js'
    script.onload = () => {
      // Инициализируем EmailJS с вашим Public Key
      emailjs.init('awggaaFtBFfoba_oQ')
    }
    document.body.appendChild(script)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formRef.current) {
      // Создаем копию FormData без пароля
      const formData = new FormData(formRef.current)
      formData.delete('password') // Удаляем поле пароля

      // Преобразуем FormData в объект
      const formDataObj: { [key: string]: any } = {}
      formData.forEach((value, key) => {
        formDataObj[key] = value
      })

      emailjs.send(
        'service_3t3eyh8',       // Ваш Service ID
        'template_83zd5wm',      // Ваш Template ID
        formDataObj              // Объект с данными формы
      )
      .then((result: any) => {
        console.log('Email sent successfully:', result.text)
        setMessage('Регистрация прошла успешно! Пожалуйста, проверьте вашу электронную почту.')
        formRef.current?.reset()
      }, (error: any) => {
        console.error('Ошибка при отправке письма:', error.text)
        setMessage('Произошла ошибка при отправке письма. Пожалуйста, попробуйте еще раз.')
      })
    }
  }

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="register-page">
      <h1 className="text-large-semi uppercase mb-6">
        Become a Medusa Store Member
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form
        className="w-full flex flex-col"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        {message && (
          <div className="text-center text-green-500 mt-4">
            {message}
          </div>
        )}
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store's{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Join
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
