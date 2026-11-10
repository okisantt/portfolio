import "server-only";
import { optionalEnv, requiredEnv } from "./env";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requiredEnv("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: requiredEnv("EMAIL_FROM"),
      to: [to],
      subject,
      text,
      html,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha no provedor de e-mail: ${response.status}`);
  }
}

export function sendVerificationEmail(to: string, firstName: string, code: string) {
  const safeName = escapeHtml(firstName);
  return sendEmail({
    to,
    subject: "Código para verificar sua solicitação",
    text: `Olá, ${firstName}. Seu código de verificação é ${code}. Ele expira em 10 minutos. A confirmação do e-mail não libera automaticamente o currículo.`,
    html: `<p>Olá, ${safeName}.</p><p>Seu código de verificação é:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>Ele expira em 10 minutos. A confirmação do e-mail não libera automaticamente o currículo; a solicitação ainda passará por aprovação manual.</p>`,
  });
}

export async function sendAdminNotification(firstName: string, lastName: string, email: string) {
  const adminEmail = optionalEnv("ADMIN_EMAIL");
  if (!adminEmail) return;
  await sendEmail({
    to: adminEmail,
    subject: "Nova solicitação de currículo verificada",
    text: `${firstName} ${lastName} (${email}) confirmou o e-mail e aguarda análise.`,
    html: `<p><strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong> (${escapeHtml(email)}) confirmou o e-mail e aguarda análise.</p>`,
  });
}

export function sendApprovalEmail(to: string, firstName: string, accessUrl: string) {
  return sendEmail({
    to,
    subject: "Acesso ao currículo aprovado",
    text: `Olá, ${firstName}. Sua solicitação foi aprovada. Acesse o currículo pelo link temporário (válido por 24 horas e com uso limitado): ${accessUrl}`,
    html: `<p>Olá, ${escapeHtml(firstName)}.</p><p>Sua solicitação foi aprovada.</p><p><a href="${escapeHtml(accessUrl)}">Acessar currículo</a></p><p>O link é individual, tem uso limitado e expira em 24 horas.</p>`,
  });
}

export function sendRejectionEmail(to: string, firstName: string) {
  return sendEmail({
    to,
    subject: "Atualização sobre sua solicitação",
    text: `Olá, ${firstName}. Sua solicitação de acesso ao documento não foi aprovada neste momento.`,
    html: `<p>Olá, ${escapeHtml(firstName)}.</p><p>Sua solicitação de acesso ao documento não foi aprovada neste momento.</p>`,
  });
}
