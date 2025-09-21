import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, about2, about3, about4, person, person2, person3, person4, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const teamMembers = [
    { person: person2, about: about2 },
    { person: person3, about: about3 },
    { person: person4, about: about4 },
  ];

  const structure = [
    {
      title: about2.intro.title,
      display: about2.intro.display,
      items: [],
    },
    {
      title: about3.intro.title,
      display: about3.intro.display,
      items: [],
    },
    {
      title: about4.intro.title,
      display: about4.intro.display,
      items: [],
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="About Our Team"
        description="Meet our team of design engineers"
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent("About Our Team")}`}
        author={{
          name: "NeuroSphere Team",
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      
      {/* Team Members */}
      {teamMembers.map((member, index) => (
        <Row key={index} fillWidth s={{ direction: "column"}} horizontal="center" marginBottom="80">
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={member.person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {member.person.location}
            </Row>
            {member.person.languages && member.person.languages.length > 0 && (
              <Row wrap gap="8">
                {member.person.languages.map((language, langIndex) => (
                  <Tag key={langIndex} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
          
          <Column className={styles.blockAlign} flex={9} maxWidth={40}>
            <Column
              id={member.about.intro.title}
              fillWidth
              minHeight="160"
              vertical="center"
              marginBottom="32"
            >
              {member.about.calendar.display && (
                <Row
                  fitWidth
                  border="brand-alpha-medium"
                  background="brand-alpha-weak"
                  radius="full"
                  padding="4"
                  gap="8"
                  marginBottom="m"
                  vertical="center"
                  className={styles.blockAlign}
                  style={{
                    backdropFilter: "blur(var(--static-space-1))",
                  }}
                >
                  <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                  <Row paddingX="8">Schedule a call</Row>
                  <IconButton
                    href={member.about.calendar.link}
                    data-border="rounded"
                    variant="secondary"
                    icon="chevronRight"
                  />
                </Row>
              )}
              <Heading className={styles.textAlign} variant="display-strong-xl">
                {member.person.name}
              </Heading>
              <Text
                className={styles.textAlign}
                variant="display-default-xs"
                onBackground="neutral-weak"
              >
                {member.person.role}
              </Text>
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {member.person.github && (
                  <React.Fragment>
                    <Row s={{ hide: true }}>
                      <Button
                        href={member.person.github}
                        prefixIcon="github"
                        label="GitHub"
                        size="s"
                        weight="default"
                        variant="secondary"
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <IconButton
                        size="l"
                        href={member.person.github}
                        icon="github"
                        variant="secondary"
                      />
                    </Row>
                  </React.Fragment>
                )}
                {member.person.linkedin && (
                  <React.Fragment>
                    <Row s={{ hide: true }}>
                      <Button
                        href={member.person.linkedin}
                        prefixIcon="linkedin"
                        label="LinkedIn"
                        size="s"
                        weight="default"
                        variant="secondary"
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <IconButton
                        size="l"
                        href={member.person.linkedin}
                        icon="linkedin"
                        variant="secondary"
                      />
                    </Row>
                  </React.Fragment>
                )}
                {member.person.twitter && (
                  <React.Fragment>
                    <Row s={{ hide: true }}>
                      <Button
                        href={member.person.twitter}
                        prefixIcon="x"
                        label="X"
                        size="s"
                        weight="default"
                        variant="secondary"
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <IconButton
                        size="l"
                        href={member.person.twitter}
                        icon="x"
                        variant="secondary"
                      />
                    </Row>
                  </React.Fragment>
                )}
                {member.person.telegram && (
                  <React.Fragment>
                    <Row s={{ hide: true }}>
                      <Button
                        href={`https://t.me/${member.person.telegram.replace('@', '')}`}
                        prefixIcon="telegram"
                        label="Telegram"
                        size="s"
                        weight="default"
                        variant="secondary"
                      />
                    </Row>
                    <Row hide s={{ hide: false }}>
                      <IconButton
                        size="l"
                        href={`https://t.me/${member.person.telegram.replace('@', '')}`}
                        icon="telegram"
                        variant="secondary"
                      />
                    </Row>
                  </React.Fragment>
                )}
              </Row>
            </Column>

            {member.about.intro.display && (
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {member.about.intro.description}
              </Column>
            )}
          </Column>
        </Row>
      ))}
    </Column>
  );
}