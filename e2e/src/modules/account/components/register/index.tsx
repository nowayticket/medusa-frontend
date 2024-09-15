"use client"

import { useFormState } from "react-dom";
import Input from "@modules/common/components/input";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import { signUp } from "@modules/account/actions";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useRef, useEffect } from "react";

const Register = ({ setCurrentView }) => {
  const [message, formAction] = useFormState(signUp, null);

  // Создаем ссылку на форму
  const form = useRef(null);

  // Инициализируем EmailJS в useEffect
  useEffect(() => {
    // Подключаем EmailJS SDK через CDN
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.emailjs.com/sdk/3.2.0/email.min.js";
    script.onload = () => {
      // Инициализация EmailJS после загрузки SDK
      if (window.emailjs) {
        window.emailjs.init("awggaaFtBFfoba_oQ"); // Замените 'YOUR_PUBLIC_KEY' на ваш Public Key из EmailJS
      } else {
        console.error("EmailJS SDK не загружен");
      }
    };
    document.body.appendChild(script);
  }, []);

  // Функция отправки письма
  const sendEmail = () => {
    if (window.emailjs) {
      window.emailjs
        .sendForm("service_3t3eyh8", "template_83zd5wm", form.current)
        .then(
          (result) => {
            console.log("Письмо успешно отправлено:", result.text);
            alert("Поздравляем с успешной регистрацией!");
          },
          (error) => {
            console.error("Ошибка при отправке письма:", error);
            alert("Ошибка при отправке письма. Попробуйте еще раз.");
          }
        );
    } else {
      console.error("EmailJS SDK не доступен");
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();

    // Выполняем исходное действие регистрации
    formAction(event)
      .then(() => {
        // После успешной регистрации отправляем письмо
        sendEmail();
      })
      .catch((error) => {
        // Обработка ошибок регистрации
        console.error("Ошибка при регистрации:", error);
      });
  };

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        Become a Medusa Store Member
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      {/* Добавляем ref к форме и обновляем обработчик onSubmit */}
      <form
        className="w-full flex flex-col"
        ref={form}
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
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store's{" "}
          <LocalizedClientLink href="/content/privacy-policy" className="underline">
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink href="/content/terms-of-use" className="underline">
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
  );
};

export default Register;

