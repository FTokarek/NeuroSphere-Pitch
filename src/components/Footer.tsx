import { Row, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";
import { iconLibrary } from "@/resources/icons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="center"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Row gap="16" horizontal="center" align="center">
          {social.map((item) => {
            if (!item.link) return null;
            const Icon = iconLibrary[item.icon as keyof typeof iconLibrary] ?? iconLibrary.openLink;
            return (
              <SmartLink key={item.name} href={item.link} aria-label={item.name} title={item.name}>
                <Icon style={{ width: 18, height: 18 }} />
              </SmartLink>
            );
          })}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
