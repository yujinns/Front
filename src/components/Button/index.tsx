interface Props {
title: string;
onClick: () => void;
isSelected: boolean;
}


export function NavButton(props: Props) {

  const {title, onClick, isSelected} = props;
  return (
    <li>
      <button type="button" className={isSelected ? "active" : undefined} onClick={onClick}>{title}</button>
    </li>
  )
}
