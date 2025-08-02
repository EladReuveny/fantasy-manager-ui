type FooterProps = {};

const Footer = ({}: FooterProps) => {
  return (
    <footer className="bg-(--color-bg-darker) text-gray-400 py-6 text-center">
      <p>© {new Date().getFullYear()} Fantasy Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
