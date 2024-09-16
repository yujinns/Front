import { gameSubMenu } from "assets/games";
import { Input } from "components/Input";
import { ChangeEvent, useRef, useState } from "react";
import "./style.css";

export default function Select() {
  const [modal, setModal] = useState<boolean>(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameImage: "" });
  const [blogName, setBlogName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isBlogNameError, setIsBlogNameError] = useState<boolean>(false);
  const [blogNameErrorMessage, setBlogNameErrorMessage] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickSelectGameHandler = (gameName: string, gameImage: string) => {
    setModal(true);
    setGameInfo({ gameName: gameName, gameImage: gameImage });
  };

  const onClickCancleHander = () => {
    setModal(false);
    setBlogName("");
  };

  const onBlogNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBlogName(value);
    setIsBlogNameError(false);
    setBlogNameErrorMessage("");
  };

  const onClickModalOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModal(false);
      setBlogName("");
    }
  };

  const onCreateBlogButtonClickHandler = () => {
    if (blogName.length < 1) {
      setIsBlogNameError(true);
      setBlogNameErrorMessage("블로그 이름을 입력해주세요.");
    } else {
      alert("블로그 생성 완료");
    }
  };

  return (
    <div id="select">
      <div className="select-container">
        {gameSubMenu.map((game, i) => (
          <div
            onClick={() =>
              onClickSelectGameHandler(game.gameName, game.gameImage)
            }
            className="select-game-block"
            key={i}
          >
            <img src={game.gameImage} alt={game.gameName} />
          </div>
        ))}
        {modal && (
          <div id="select-modal" onClick={onClickModalOutside}>
            <div ref={modalRef} className="select-modal-container">
              <div className="select-modal-box">
                <div className="select-modal-image">
                  <img src={gameInfo.gameImage} alt={gameInfo.gameName} />
                </div>
                <div className="select-modal-input">
                  <Input
                    placeholder="블로그 이름"
                    type={"text"}
                    error={isBlogNameError}
                    message={blogNameErrorMessage}
                    value={blogName}
                    onChange={onBlogNameChangeHandler}
                  />
                </div>
                <div
                  className="blue-large-full-button"
                  onClick={onCreateBlogButtonClickHandler}
                >
                  {"블로그 생성"}
                </div>
                <div
                  className="select-modal-cancle"
                  onClick={onClickCancleHander}
                >
                  취소
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
