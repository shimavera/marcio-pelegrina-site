import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Cookie, FileText, Eye, Mail, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-blue opacity-10 blur-[120px] rounded-full" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-kiona font-bold text-foreground mb-6">
                Política de Privacidade
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
                Transparência e segurança no tratamento dos seus dados pessoais
              </p>
              <p className="text-sm text-muted-foreground/70 font-inter mt-4">
                <Calendar className="w-4 h-4 inline mr-2" />
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12 p-6 bg-accent/5 border border-accent/20 rounded-lg">
                <p className="text-foreground font-inter leading-relaxed">
                  O <strong>Dr. Luan Maciel - Odontologia Avançada</strong> está comprometido com a proteção da privacidade e dos dados pessoais de seus pacientes e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong> e demais legislações aplicáveis.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      1. Informações que Coletamos
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1.1. Dados Fornecidos por Você</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Coletamos informações que você nos fornece diretamente, incluindo:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Dados de contato:</strong> nome, e-mail, telefone, endereço</li>
                    <li><strong>Dados de saúde:</strong> histórico médico, odontológico, exames, tratamentos realizados</li>
                    <li><strong>Dados de agendamento:</strong> preferências de horário, tipo de consulta</li>
                    <li><strong>Dados de comunicação:</strong> mensagens via WhatsApp, formulários de contato</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1.2. Dados Coletados Automaticamente</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Quando você acessa nosso site, coletamos automaticamente:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
                    <li><strong>Dados de dispositivo:</strong> sistema operacional, resolução de tela</li>
                    <li><strong>Dados de uso:</strong> tempo de permanência, cliques, interações</li>
                    <li><strong>Cookies e tecnologias similares:</strong> conforme descrito na seção específica</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      2. Como Usamos Seus Dados
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Utilizamos seus dados pessoais para as seguintes finalidades:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Prestação de serviços:</strong> agendamento, atendimento, realização de procedimentos odontológicos</li>
                    <li><strong>Comunicação:</strong> responder dúvidas, enviar confirmações de consultas, lembretes</li>
                    <li><strong>Melhoria dos serviços:</strong> análise de satisfação, aprimoramento da experiência do paciente</li>
                    <li><strong>Cumprimento legal:</strong> atender obrigações legais, regulatórias e contratuais</li>
                    <li><strong>Marketing:</strong> envio de informações sobre tratamentos, novidades (mediante seu consentimento)</li>
                    <li><strong>Segurança:</strong> prevenir fraudes, garantir a segurança do site e dos dados</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 - Cookies */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      3. Cookies e Tecnologias Similares
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Nosso site utiliza cookies e tecnologias similares para melhorar sua experiência de navegação:
                  </p>
                  
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1. Tipos de Cookies</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site</li>
                    <li><strong>Cookies de desempenho:</strong> coletam informações sobre como você usa o site</li>
                    <li><strong>Cookies de funcionalidade:</strong> lembram suas preferências e escolhas</li>
                    <li><strong>Cookies de marketing:</strong> rastreiam sua atividade para exibir anúncios relevantes</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.2. Google Tag Manager</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Utilizamos o Google Tag Manager para gerenciar tags de rastreamento e análise. Isso nos ajuda a entender como os visitantes interagem com nosso site e otimizar a experiência do usuário.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.3. Como Gerenciar Cookies</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Você pode controlar e gerenciar cookies através das configurações do seu navegador. Note que a desativação de cookies pode afetar a funcionalidade do site.
                  </p>
                </div>
              </div>

              {/* Section 4 - LGPD */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      4. Seus Direitos sob a LGPD
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Em conformidade com a LGPD, você tem os seguintes direitos:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Confirmação e acesso:</strong> confirmar a existência de tratamento e acessar seus dados</li>
                    <li><strong>Correção:</strong> solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                    <li><strong>Anonimização, bloqueio ou eliminação:</strong> de dados desnecessários ou tratados em desconformidade</li>
                    <li><strong>Portabilidade:</strong> solicitar a portabilidade dos dados a outro fornecedor</li>
                    <li><strong>Eliminação:</strong> dos dados tratados com seu consentimento</li>
                    <li><strong>Informação:</strong> sobre entidades públicas e privadas com as quais compartilhamos dados</li>
                    <li><strong>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento</li>
                    <li><strong>Oposição:</strong> opor-se ao tratamento de dados em certas circunstâncias</li>
                  </ul>

                  <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="text-foreground font-semibold mb-2">Como Exercer Seus Direitos</p>
                    <p className="text-muted-foreground">
                      Para exercer qualquer um desses direitos, entre em contato conosco através dos canais disponíveis na seção "Contato" desta política.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      5. Compartilhamento de Dados
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Seus dados pessoais podem ser compartilhados nas seguintes situações:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Prestadores de serviços:</strong> laboratórios, fornecedores de tecnologia, plataformas de agendamento</li>
                    <li><strong>Parceiros comerciais:</strong> apenas com seu consentimento explícito</li>
                    <li><strong>Autoridades legais:</strong> quando exigido por lei ou ordem judicial</li>
                    <li><strong>Clínicas parceiras:</strong> onde o Dr. Luan Maciel atua</li>
                  </ul>
                  <p className="leading-relaxed text-muted-foreground mt-4">
                    Todos os parceiros e prestadores de serviços são obrigados a manter a confidencialidade e segurança dos dados, em conformidade com a LGPD.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      6. Segurança dos Dados
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração, incluindo:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Criptografia de dados sensíveis</li>
                    <li>Controles de acesso rigorosos</li>
                    <li>Monitoramento constante de segurança</li>
                    <li>Treinamento regular da equipe sobre proteção de dados</li>
                    <li>Backups regulares e seguros</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      7. Retenção de Dados
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Mantemos seus dados pessoais pelo tempo necessário para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Cumprir as finalidades para as quais foram coletados</li>
                    <li>Atender obrigações legais, regulatórias e contratuais</li>
                    <li>Exercer direitos em processos judiciais</li>
                  </ul>
                  <p className="leading-relaxed text-muted-foreground mt-4">
                    Após o término do período de retenção, os dados serão eliminados ou anonimizados de forma segura.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      8. Alterações nesta Política
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a revise regularmente. Alterações significativas serão comunicadas através do nosso site ou por e-mail.
                  </p>
                </div>
              </div>

              {/* Section 9 - Contact */}
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-kiona font-bold text-foreground mb-4">
                      9. Contato
                    </h2>
                  </div>
                </div>
                
                <div className="pl-14 space-y-4 text-foreground font-inter">
                  <p className="leading-relaxed text-muted-foreground">
                    Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos sob a LGPD, entre em contato:
                  </p>
                  <div className="mt-6 p-6 bg-accent/5 border border-accent/20 rounded-lg space-y-3">
                    <p className="text-foreground font-semibold text-lg">Dr. Luan Maciel - Odontologia Avançada</p>
                    <p className="text-muted-foreground">
                      <strong>CROSP:</strong> 158810
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Endereço:</strong> R. Emília Marengo, 1040 - Jardim Anália Franco, São Paulo - SP, 03336-000
                    </p>
                    <p className="text-muted-foreground">
                      <strong>WhatsApp:</strong> (11) 98338-5832
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Horário:</strong> Segunda a Sexta, das 9h às 18h
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-gradient-to-br from-secondary/5 to-accent/5 border border-accent/20 rounded-2xl text-center">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-kiona font-bold text-foreground mb-4">
                  Sua Privacidade é Nossa Prioridade
                </h3>
                <p className="text-muted-foreground font-inter mb-6 max-w-2xl mx-auto">
                  Estamos comprometidos em proteger seus dados pessoais e garantir a transparência no tratamento das suas informações.
                </p>
                <Link 
                  to="/"
                  className="inline-block px-8 py-3 bg-accent text-background rounded-full font-inter font-semibold hover:bg-accent/90 transition-all duration-300"
                >
                  Voltar para o Início
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
