import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({ response }) => {
  // Extract last 4 characters from shortUrl
  const shortUrlSuffix = response?.shortUrl?.substring(response.shortUrl.length - 4);

  return (
    <Html>
      <Head />
      <Preview>Welcome Email</Preview>
      <Body style={main}>
        <Container>
          <Section>
            <Row>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {response?.userName}
                </Heading>
                <Heading
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Someone shared a file with you
                </Heading>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={paragraph}>
                 File Name:{response?.fileName}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={paragraph}>
                File Size:{response?.fileSize/(1024*1000)}mb
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={paragraph}>
                File Type:{response?.fileType}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={paragraph}>
                File Password:{response?.password}
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerLink} colSpan={2}>
                  <a
                    href={`http://localhost:3000/files/${shortUrlSuffix}`}
                    style={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click To Download
                  </a>
                </Column>
              </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};
const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};
const boxInfos = {
  padding: "20px",
};
const containerLink = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const link = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  textDecoration: "none",
};
