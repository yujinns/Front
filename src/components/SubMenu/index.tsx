interface SubMenuProps {
  onClick: () => void;
  gameImage: string;
  gameName: string;
}

export function SubMenu(props: SubMenuProps) {
  const { onClick, gameImage, gameName } = props;

  return (
    <div className={`header-sub-menu-image-box`} onClick={onClick}>
      <img src={gameImage} alt={gameName} />
    </div>
  );
}
