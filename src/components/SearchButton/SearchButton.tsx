import styles from "components/SearchButton/SearchButton.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Search from "assets/images/Search.svg";
import { FC } from "react";

interface SearchButtonProps {
  text?: string;
  onClick?: () => void;
  style?: any;
  className?: string;
  noSearchIcon?: boolean;
}

const SearchButton: FC<SearchButtonProps> = ({
  text,
  onClick,
  style,
  className,
  noSearchIcon,
}) => {
  return (
    <div
      className={`${className} ${styles.searchButton}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {!noSearchIcon && <img src={Search} alt="Search" className="w-full" />}
      <p style={{color: "var(--light-green)"}}>{text}</p>
    </div>
  );
};

export default SearchButton;
