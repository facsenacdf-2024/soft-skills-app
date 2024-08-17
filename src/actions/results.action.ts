'use server'
import { ResultsEmail } from "@/components/results-email";
import { Resend } from "resend";

interface ResponseData {
  success: boolean,
  message: string,
  data?: any,
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResults = async (email: string, userPoints: number): Promise<ResponseData> => {
  const { data, error } = await resend.emails.send({
    from: 'Não Responda <no-reply@softskillscheck.app.br>',
    to: email,
    subject: 'Seus resultados no Soft Skills Check',
    react: ResultsEmail({ points: userPoints }),
  });

  if (error) {
    return {
      success: false,
      message: error.message,
      data: data,
    }
  }

  return {
    success: true,
    message: 'Resultados enviados com sucesso',
  };
}