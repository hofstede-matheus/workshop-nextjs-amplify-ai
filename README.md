# workshop-nextjs-amplify-ai - Lance projetos FullStack mais rápido e turbine seu portfólio com AWS Amplify + Next.js + AI

## Amazon Web Services (AWS)

A AWS é uma provedora de serviços de infraestrutura em nuvem que disponibiliza soluções que vão desde computação até inteligência artificial e machine learning.

## Free Tier

Possibilidade de experimentar serviços gratuitamente, dado certas condições e restricões.

https://aws.amazon.com/free/

### Tipos de ofertas

- Testes Gratuitos - Acesso gratuito por tempo limitado a serviços específicos.
- 12 Meses Gratuitos - Acesso gratuito a diversos serviços por 12 meses a partir da data de inscrição na AWS.
- Sempre Gratuito - Acesso gratuito a determinados serviços sem limite de tempo, desde que o uso permaneça dentro dos limites estabelecidos.

### Cuidado!

Fique atento nos limites definidos no free tier. Se ultrapassar, será cobrado. Utilize [AWS Pricing Calculator](https://calculator.aws.amazon.com/) para estimar os custos e [Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) para monitorar os gastos.

### Dicas

- Coloque um cartão virtual temporário
- Caso algo seja cobrado fora do esperado, dá pra pedir [isenção no suporte](https://patelsandeep88.medium.com/requesting-wave-off-aws-bill-in-free-trial-3aeb465cb5b7)

### AWS Identity and Access Management (IAM)

O AWS Identity and Access Management (IAM) é um serviço da AWS que permite gerenciar de forma segura o acesso aos recursos da AWS.

#### Dicas

- Crie usuários com permissões mínimas necessárias

## AWS Amplify

Plataforma (PaaS) para simplificar a criação e implantação de aplicativos full-stack, web e mobile.

Oferece serviços de hosting, autenticação, APIs e armazenamento de dados.

Abstraia a complexidade de configurar e gerenciar infraestrutura, como escalabilidade, disponibilidade, segurança e monitoramento.

Considerado “Firebase” da AWS, mas cá entre a gente eu prefiro o Firebase da Google

### Free tier (12 Meses Gratuitos)

- Build e Deploy: 1.000 minutos de build por mês
- Armazenamento de dados: 5 GB armazenados por mês
- Transferência de dados de saída: 15 GB oferecidos por mês

## Amazon Q Developer

O Amazon Q Developer é uma versão específica do assistente de IA generativa da AWS, voltada para desenvolvedores que permite receber sugestões de código, documentação e respostas a perguntas técnicas.

https://aws.amazon.com/q/developer/

Ela tende a ser melhor ao trabalhar com aws-sdk.

### Free tier (Sempre Gratuito)

- Sugestões de código: Incluso
- Chat: 50 interações por mês
- Scan de vulnerabilidades e qualidade de código: 50 por mês

## Amazon Polly

O Amazon Polly é um serviço de conversão de texto em fala (Text-to-Speech, TTS) da AWS, que transforma texto escrito em falas naturais de uma maneira customizável e em vários idiomas.

https://aws.amazon.com/polly/getting-started/?nc=sn&loc=5

### Síntese de voz

Existem vários tipos de Engines de voz, mas vamos focar na Neural.

### Speech marks

Permite sincronizar a fala com a exibição de texto em aplicativos multimídia. Retorna um mapa que relaciona cada palavra falada com o instante de tempo em que ela é pronunciada.

### Free tier (12 Meses Gratuitos)

- 5 milhões de caracteres por mês

## Mão na massa!

### O plano

- Configurar o IAM
- Fazer o deploy do Frontend no Amplify
- Fazer o deploy do backend no Lambda
- Automação via Github Actions
- Utilizar o Cloud watch para ver logs
