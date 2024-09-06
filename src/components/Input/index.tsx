import { ChangeEvent, KeyboardEvent, forwardRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import "./style.css";

// interface: Input 컴포넌트 //
interface Props {
  label: string;
  type: "text" | "password";
  error: boolean;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  icon?: "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon";
  onButtonClick?: () => void;

  message?: string;

  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

// component: Input 컴포넌트 //
const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  // state: properties //
  const { label, placeholder, error, type, value, icon, message } = props;
  const { onChange, onButtonClick, onKeyDown } = props;

  // event handler: input 키 이벤트 처리 함수 //
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

  // render: Input Box 렌더링 //
  return (
    <div className="input">
      <div className="input-label">{label}</div>
      <div className={error ? "input-container-error" : "input-container"}>
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
          onKeyDown={onKeyDownHandler}
        />
        {onButtonClick !== undefined && (
          <div className="icon-button" onClick={onButtonClick}>
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
          </div>
        )}
      </div>
      {message !== undefined && <div className="input-message">{message}</div>}
    </div>
  );
});

interface searchProps {
  onButtonClick?: () => void;
  className?: string;
  size: number;
}

const SearchInput = (props: searchProps) => {
  const { onButtonClick, className, size } = props;

  return (
    <div id="searchInput">
      <select name="searchSelect" id="searchSelect">
        <option value="blog">블로그</option>
        <option value="user">유저</option>
      </select>
      <input
        type="text"
        className={className}
        placeholder="검색어를 입력하세요."
      />
      <div className="icon-box">
        <IoSearchSharp size={size} onClick={onButtonClick} />
      </div>
    </div>
  );
};

export { Input, SearchInput };
