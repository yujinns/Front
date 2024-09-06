import { Input } from "components/Input";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import "./style.css";

export default function Auth() {
  //*  */

  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  const SignIn = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordType, setPasswordType] = useState<"password" | "text">(
      "password"
    );
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
      const rememberedEmail = localStorage.getItem("rememberedEmail");
      const rememberedIsChecked = localStorage.getItem("isChecked") === "true";

      if (rememberedEmail) {
        setEmail(rememberedEmail);
      }

      setIsChecked(rememberedIsChecked);
    }, []);

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = e.target;
      setEmail(value);
      if (isChecked) {
        localStorage.setItem("rememberedEmail", value);
      }
    };

    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = e.target;
      setPassword(value);
    };

    const onCheckboxChangeHandler = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const checked = e.target.checked;
      setIsChecked(checked);

      if (checked) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("isChecked", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.setItem("isChecked", "false");
      }
    };

    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };

    const onEmailKeyDownHandler = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key !== "Enter") return;
      onSignInButtonClickHandler();
    };

    const onSignInButtonClickHandler = () => {
      alert("로그인 버튼 클릭");
    };

    const onSignUpLinkClickHandler = () => {
      setView("sign-up");
    };

    return (
      <div className="auth-card-box">
        <div className="auth-card-title">로그인</div>
        <div className="auth-card-input-box">
          <Input
            ref={emailRef}
            label="이메일"
            placeholder="이메일을 입력하세요."
            type="text"
            error={error}
            value={email}
            onChange={onEmailChangeHandler}
            onKeyDown={onEmailKeyDownHandler}
          />
          <Input
            ref={passwordRef}
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            type={passwordType}
            error={error}
            value={password}
            onChange={onPasswordChangeHandler}
            icon={passwordButtonIcon}
            onButtonClick={onPasswordButtonClickHandler}
            onKeyDown={onPasswordKeyDownHandler}
          />
          {error && (
            <div className="auth-sign-in-error-box">
              <div className="auth-sign-in-error-message">
                {
                  "이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
                }
              </div>
            </div>
          )}
          <div className="auth-sign-in-remember-id">
            <input
              type="checkbox"
              name="rememberId"
              id="rememberId"
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
            />
            <label htmlFor="rememberId">이메일 기억하기</label>
          </div>
          <div
            className="blue-large-full-button"
            onClick={onSignInButtonClickHandler}
          >
            {"로그인"}
          </div>
          <div className="auth-description-box">
            <div className="auth-description">
              {"처음이신가요? "}
              <span
                className="auth-description-link"
                onClick={onSignUpLinkClickHandler}
              >
                {"회원가입"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SignUp = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);
    const addressDetailRef = useRef<HTMLInputElement | null>(null);
    const [page, setPage] = useState<1 | 2>(1);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordType, setPasswordType] = useState<"password" | "text">(
      "password"
    );
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [passwordCheckType, setPasswordCheckType] = useState<
      "password" | "text"
    >("password");
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");

    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    const [isPasswordCheckError, setPasswordCheckError] =
      useState<boolean>(false);
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    const [isAddressError, setAddressError] = useState<boolean>(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordErrorMessage, setPasswordErrorMessage] =
      useState<string>("");
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
      useState<string>("");
    const [nicknameErrorMessage, setNicknameErrorMessage] =
      useState<string>("");
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>("");

    const open = useDaumPostcodePopup();

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage("");
    };

    const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage("");
    };

    const onPasswordCheckChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage("");
    };

    const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage("");
    };

    const onAddressChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMessage("");
    };

    const onAddressDetailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setAddressDetail(value);
    };

    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };

    const onPasswordCheckButtonClickHandler = () => {
      if (passwordCheckButtonIcon === "eye-light-off-icon") {
        setPasswordCheckButtonIcon("eye-light-on-icon");
        setPasswordCheckType("text");
      } else {
        setPasswordCheckButtonIcon("eye-light-off-icon");
        setPasswordCheckType("password");
      }
    };

    const onAddressButtonClickHandler = () => {
      open({ onComplete });
    };

    const onNextButtonClickHandler = () => {
      const emailPattern = /^[a-zA-z0-9]*@([-.]?[a-zA-z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
      }

      const isCheckedPassword = password.length >= 4;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage("비밀번호는 4자 이상이어야 합니다.");
      }

      const isEqualsPassword = password === passwordCheck;
      if (!isEqualsPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다.");
      }

      if (isEmailPattern && isCheckedPassword && isEqualsPassword) {
        setPage(2);
      }
    };

    const onSignUpButtonClickHandler = () => {
      const hasNickname = nickname.trim().length !== 0;
      if (!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage("닉네임을 입력해주세요.");
      }
      const hasAddress = address.trim().length !== 0;
      if (!hasAddress) {
        setAddressError(true);
        setAddressErrorMessage("주소를 입력해주세요.");
      }
      if (!hasNickname) return;
      alert("회원가입 버튼 클릭");
    };
    const onEmailKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };

    const onPasswordCheckKeyDownHandler = (
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key !== "Enter") return;
      onNextButtonClickHandler();
    };

    const onNicknameKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter" && e.key !== "Tab") return;
      if (!addressRef.current) return;
      // addressRef.current.focus();
      onAddressButtonClickHandler();
    };

    const onAddressKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };

    const onAddressDetailKeyDownHandler = (
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key !== "Enter") return;
      onSignUpButtonClickHandler();
    };

    const onComplete = (data: Address) => {
      const { address } = data;
      setAddress(address);
      setAddressError(false);
      setAddressErrorMessage("");
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };
    const onSignInLinkClickHandler = () => {
      setView("sign-in");
    };

    return (
      <div className="auth-card-box">
        <div className="auth-card-title">회원가입</div>
        <div className="auth-card-input-box">
          {page === 1 && (
            <>
              <Input
                ref={emailRef}
                label="이메일"
                placeholder="이메일을 입력하세요."
                type="text"
                error={isEmailError}
                message={emailErrorMessage}
                value={email}
                onChange={onEmailChangeHandler}
                onKeyDown={onEmailKeyDownHandler}
              />
              <Input
                ref={passwordRef}
                label="비밀번호"
                type={passwordType}
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={onPasswordChangeHandler}
                error={isPasswordError}
                message={passwordErrorMessage}
                icon={passwordButtonIcon}
                onButtonClick={onPasswordButtonClickHandler}
                onKeyDown={onPasswordKeyDownHandler}
              />

              <Input
                ref={passwordCheckRef}
                label="비밀번호 확인"
                type={passwordCheckType}
                placeholder="비밀번호를 다시 입력해주세요."
                value={passwordCheck}
                onChange={onPasswordCheckChangeHandler}
                error={isPasswordCheckError}
                message={passwordCheckErrorMessage}
                icon={passwordCheckButtonIcon}
                onButtonClick={onPasswordCheckButtonClickHandler}
                onKeyDown={onPasswordCheckKeyDownHandler}
              />
            </>
          )}
          {page === 2 && (
            <>
              <Input
                ref={nicknameRef}
                label="닉네임*"
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={onNicknameChangeHandler}
                error={isNicknameError}
                message={nicknameErrorMessage}
                onKeyDown={onNicknameKeyDownHandler}
              />
              <Input
                ref={addressRef}
                label="주소*"
                type="text"
                placeholder="우편번호 찾기"
                value={address}
                onChange={onAddressChangeHandler}
                error={isAddressError}
                message={addressErrorMessage}
                icon={"expand-right-light-icon"}
                onButtonClick={onAddressButtonClickHandler}
                onKeyDown={onAddressKeyDownHandler}
              />
              <Input
                ref={addressDetailRef}
                label="상세 주소"
                type="text"
                placeholder="상세 주소를 입력해주세요."
                value={addressDetail}
                onChange={onAddressDetailChangeHandler}
                error={false}
                onKeyDown={onAddressDetailKeyDownHandler}
              />
            </>
          )}
          <div className="auth-card-bottom">
            {page === 1 && (
              <div
                className="blue-large-full-button"
                onClick={onNextButtonClickHandler}
              >
                {"다음"}
              </div>
            )}
            {page === 2 && (
              <>
                <div
                  className="blue-large-full-button"
                  onClick={onSignUpButtonClickHandler}
                >
                  {"회원가입"}
                </div>
                <div className="auth-description-box">
                  <div className="auth-description">
                    {"기존 계정이 있으신가요? "}
                    <span
                      className="auth-description-link"
                      onClick={onSignInLinkClickHandler}
                    >
                      {"로그인"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="auth">
      <div className="auth-container">
        {view === "sign-in" && <SignIn />}
        {view === "sign-up" && <SignUp />}
      </div>
    </div>
  );
}
function setEmail(rememberedEmail: string) {
  throw new Error("Function not implemented.");
}
