import logo from "../assets/logo.png";

type LogoProps = {
  width?: string | number;
  height?: string | number;
};

const Logo = ({ width = 100, height = 100 }: LogoProps) => {
  return (
    <img src={logo} alt="Fantasy Manager Logo" width={width} height={height} />
  );
};

export default Logo;
