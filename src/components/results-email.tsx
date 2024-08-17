import * as React from 'react';

interface EmailTemplateProps {
  points: number;
}

export const ResultsEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  points,
}) => (
  <div>
    <h1>Seu pontos: {points}</h1>
  </div>
);
