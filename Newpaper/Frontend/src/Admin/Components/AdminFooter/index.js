import { Layout, Typography, Space } from "antd";
import "./footer.css";

const { Footer } = Layout;

function AdminFooter() {
  return (
    <Footer className="AppFooter">
      <div className="footer-content">
        <Space size="large">
          <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
          <Typography.Link
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </Typography.Link>
          <Typography.Link
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use
          </Typography.Link>
          <Typography.Text>© {new Date().getFullYear()} NeP</Typography.Text>
        </Space>
      </div>
    </Footer>
  );
}

export default AdminFooter;
