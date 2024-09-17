import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@modules/common/components/input";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import { signUp } from "@modules/account/actions";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import emailjs from "emailjs-com";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register: React.FC<Props> = ({ setCurrentView }) => {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init("awggaaFtBFfoba_oQ");
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const sendEmail = async () => {
    try {
      const result = await emailjs.sendForm('service_3t3eyh8', 'template_83zd5wm', form.current!);
      console.log("Письмо успешно отправлено:", result.text);
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
      alert("Ошибка при отправке письма. Попробуйте еще раз.");
    }
  };

  const onSubmit = async (data) => {
    try {
      await signUp(data);
      await sendEmail();
      alert("Поздравляем с успешной регистрацией!");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert("Ошибка при регистрации. Попробуйте еще раз.");
    }
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
      <form
        className="w-full flex flex-col"
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            {...register("first_name", { required: true })}
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            {...register("last_name", { required: true })}
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            {...register("email", { required: true })}
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            {...register("password", { required: true })}
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        {errors && <ErrorMessage error={errors} data-testid="register-error" />}
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
  );
};

export default Register;
