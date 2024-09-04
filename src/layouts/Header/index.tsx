import steamLogo from 'assets/logo/Steam_icon_logo.png'

import { SearchInput } from 'components/Input'
import { AUTH_PATH, MAIN_PATH } from 'constants/index'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Header() {
  const navigate = useNavigate()

  const onClickButtonHandler = (selectButton:string) => {
    const navigatePath = selectButton === AUTH_PATH() ? AUTH_PATH() : MAIN_PATH();
    navigate(navigatePath)
  }

  return (
    <div id='header'>
      <div className="header-container">
        <div className="header-left-box" onClick={() => onClickButtonHandler(MAIN_PATH())} >
          <div className="header-logo-image">
            <img src={steamLogo} alt="유진스팀" />
          </div>
          <h1>유진스팀</h1>
        </div>
        <div className="header-middle-box">
          <SearchInput className='header-search-input' size={20} />
        </div>
        <div className="header-right-box">
          <div onClick={() => onClickButtonHandler(AUTH_PATH())}>로그인</div>
        </div>
      </div>
    </div>
  )
}
