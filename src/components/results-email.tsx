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
            <Heading as="h4" style={{ color: "#525252", marginBottom: "-10px" }}>
              1. Muitas vezes tenho dificuldade tomar decisões.
            </Heading>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              nesciunt, voluptas odit voluptatem exercitationem harum eaque tenetur
              ratione quia labore, non suscipit dolores explicabo deleniti
              incidunt molestiae ut laborum placeat eligendi!
            </Text>
            <Heading as="h4" style={{ color: "#525252", marginBottom: "-10px" }}>
              4. Tenho dificuldade em expressar meus sentimentos e emoções, ficando irritado(a) por isso.
            </Heading>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              nesciunt, voluptas odit voluptatem exercitationem harum eaque tenetur
              ratione quia labore, non suscipit dolores explicabo deleniti
              incidunt molestiae ut laborum placeat eligendi!
            </Text>
            <Heading as="h4" style={{ color: "#525252", marginBottom: "-10px" }}>
              5. Me penalizo pelas falhas que cometo.
            </Heading>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              nesciunt, voluptas odit voluptatem exercitationem harum eaque tenetur
              ratione quia labore, non suscipit dolores explicabo deleniti
              incidunt molestiae ut laborum placeat eligendi!
            </Text>
            <Heading as="h4" style={{ color: "#525252", marginBottom: "-10px" }}>
              8. Tenho dificuldades em agir quando me sinto pressionado(a).
            </Heading>
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
              nesciunt, voluptas odit voluptatem exercitationem harum eaque tenetur
              ratione quia labore, non suscipit dolores explicabo deleniti
              incidunt molestiae ut laborum placeat eligendi!
            </Text>
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
