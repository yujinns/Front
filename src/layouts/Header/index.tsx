import { gameSubMenu } from "assets/games";
import steamLogo from "assets/logo/Steam_icon_logo.png";
import { SearchInput } from "components/Input";
import { SubMenu } from "components/SubMenu";
import { AUTH_PATH, MAIN_PATH } from "constants/index";
import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const [gameSelect, setGameSelect] = useState<string>("게임 선택");
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickButtonHandler = (selectButton: string) => {
    const navigatePath =
      selectButton === AUTH_PATH() ? AUTH_PATH() : MAIN_PATH();
    navigate(navigatePath);
  };

  const onClickGameButtonHanlder = (gameName: string) => {
    setGameSelect(gameName);
  };

  const onClickGameSelectButtonHandler = () => {
    setIsOpen(!isOpen);
  };

  const onClickNextButtonHandler = () => {
    if (startIndex < gameSubMenu.length - 5) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onClickPrevButtonHandler = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <div id="header">
        <div className="header-container">
          <div
            className="header-left-box"
            onClick={() => onClickButtonHandler(MAIN_PATH())}
          >
            <div className="header-logo-image">
              <img src={steamLogo} alt="유진스팀" />
            </div>
            <h1>유진스팀</h1>
          </div>
          <div className="header-middle-box">
            <div
              className="header-game-select"
              onClick={onClickGameSelectButtonHandler}
            >
              <p>{gameSelect}</p>
              {isOpen ? (
                <GoTriangleUp size={25} />
              ) : (
                <GoTriangleDown size={25} />
              )}
            </div>
            <SearchInput className="header-search-input" size={20} />
          </div>
          <div className="header-right-box">
            <div onClick={() => onClickButtonHandler(AUTH_PATH())}>로그인</div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`header-sub-menu ${isOpen && "open"}`}>
          <div className="header-sub-menu-container">
            <VscTriangleLeft
              size={50}
              className={
                startIndex === 0
                  ? `header-sub-menu-prev-button disabled`
                  : `header-sub-menu-prev-button`
              }
              onClick={onClickPrevButtonHandler}
            />
            {gameSubMenu.slice(startIndex, startIndex + 5).map((game, i) => (
              <SubMenu
                key={i}
                onClick={() => onClickGameButtonHanlder(game.gameName)}
                gameImage={game.gameImage}
                gameName={game.gameName}
              />
            ))}
            <VscTriangleRight
              size={50}
              className={
                startIndex >= gameSubMenu.length - 5
                  ? `header-sub-menu-next-button disabled`
                  : "header-sub-menu-next-button"
              }
              onClick={onClickNextButtonHandler}
            />
          </div>
        </div>
      )}
    </>
  );
}
