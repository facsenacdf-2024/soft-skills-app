import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text

} from "@react-email/components";

interface EmailTemplateProps {
  quizTitle: string,
  points: number,
  totalPoints: number,
  feedbacks: { [key: string]: string | number }[],
}

export const ResultsEmail = (props: Readonly<EmailTemplateProps>) => {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading as="h2" style={title}>
              Soft Skills Check
            </Heading>
            <Heading as="h3" style={{ color: "#525252", marginTop: "-20px" }}>
              {props.quizTitle}
            </Heading>
            <Hr />
            <Text>
              Nós da equipe do Soft Skills Check, agradecemos por responder
              um dos nossos questionários de autoavaliação de soft skills!
              Como solicitado, aqui estão os resultados da sua autoavaliação:
            </Text>
            <Heading as="h3" style={subtitle}>
              Pontuação
            </Heading>
            <Text style={result}>
              {props.points}
            </Text>
            <Text style={total}>
              / {props.totalPoints}
            </Text>
            <Hr />
            <Heading mb={0} as="h3" style={subtitle}>
              Feedback
            </Heading>
            {props.feedbacks.map((feedback, index) => (
              <>
                <Heading key={feedback.questionTitle} as="h4" style={{ color: "#525252", marginBottom: "-10px" }}>
                  {feedback.questionId}. {feedback.questionTitle}
                </Heading>
                <Text>
                  {feedback.questionFeedback}
                </Text>
              </>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  )
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "5px",
};

const box = {
  padding: "0 48px",
};

const title = {
  color: "#7c3aed",
}

const subtitle = {
  color: "#7c3aed",
}

const result = {
  color: "#7c3aed",
  fontSize: "52px",
}

const total = {
  color: "#737373",
  fontSize: "18px",
  fontWeight: "lighter",
  paddingTop: "8px",
}
