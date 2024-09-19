# workshop-nextjs-amplify-ai - Lance projetos FullStack mais rápido e turbine seu portfólio com AWS Amplify + Next.js + AI

## Amazon Web Services (AWS)

A AWS é uma provedora de serviços de infraestrutura em nuvem que disponibiliza soluções que vão desde computação até inteligência artificial e machine learning.

## Free Tier

Possibilidade de experimentar serviços gratuitamente, dadas certas condições e restrições.

https://aws.amazon.com/free/

### Tipos de ofertas

- Testes Gratuitos: Acesso gratuito, por tempo limitado, a serviços específicos.
- 12 Meses Gratuitos: Acesso gratuito a diversos serviços por 12 meses a partir da data de inscrição na AWS.
- Sempre Gratuito: Acesso gratuito a determinados serviços sem limite de tempo, desde que o uso permaneça dentro dos limites estabelecidos.

### Cuidado!

Fique atento aos limites definidos no free tier. Se ultrapassar, será cobrado. Utilize o [AWS Pricing Calculator](https://calculator.aws.amazon.com/) para estimar os custos e os [Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html) para monitorar os gastos.

### Dicas

- Utilize um cartão virtual temporário.
- Caso algo seja cobrado fora do esperado, é possível pedir [isenção no suporte](https://patelsandeep88.medium.com/requesting-wave-off-aws-bill-in-free-trial-3aeb465cb5b7).

### AWS Identity and Access Management (IAM)

O AWS Identity and Access Management (IAM) é um serviço da AWS que permite gerenciar, de forma segura, o acesso aos recursos da AWS.

#### Dicas

- Crie usuários com as permissões mínimas necessárias.

## AWS Amplify

Plataforma (PaaS) para simplificar a criação e implantação de aplicativos full-stack, web e mobile.

Oferece serviços de hosting, autenticação, APIs e armazenamento de dados.

Abstrai a complexidade de configurar e gerenciar infraestrutura, como escalabilidade, disponibilidade, segurança e monitoramento.

Considerado “Firebase” da AWS, mas, cá entre nós, eu prefiro o Firebase do Google.

### Free tier (12 Meses Gratuitos)

- Build e Deploy: 1.000 minutos de build por mês
- Armazenamento de dados: 5 GB armazenados por mês
- Transferência de dados de saída: 15 GB oferecidos por mês

## Amazon Q Developer

O Amazon Q Developer é uma versão específica do assistente de IA generativa da AWS, voltada para desenvolvedores, que permite receber sugestões de código, documentação e respostas a perguntas técnicas.

https://aws.amazon.com/q/developer/

Tende a ser melhor ao trabalhar com AWS SDK.

### Free tier (Sempre Gratuito)

- Sugestões de código: Inclusas
- Chat: 50 interações por mês
- Scan de vulnerabilidades e qualidade de código: 50 por mês

## Amazon Polly

O Amazon Polly é um serviço de conversão de texto em fala (Text-to-Speech, TTS) da AWS que transforma texto escrito em falas naturais de maneira customizável e em vários idiomas.

https://aws.amazon.com/polly/getting-started/?nc=sn&loc=5

### Síntese de voz

Existem vários tipos de engines de voz, mas vamos focar na neural.

### Speech marks

Permite sincronizar a fala com a exibição de texto em aplicativos multimídia. Retorna um mapa que relaciona cada palavra falada ao instante em que ela é pronunciada.

### Free tier (12 Meses Gratuitos)

- 5 milhões de caracteres por mês

## Mão na massa!

### O Plano

- Por que Next.js?
- Resumo do Projeto
- Integrar com o AWS Polly
- Configurar o IAM
- Configurar e fazer o deploy no Amplify
- Testar
- Amazon Q

### Combinados

- Este workshop será gravado.
- O código está no GitHub.
- Portanto, não é necessário acompanhar o que estou fazendo; isso pode atrapalhar.
- Você pode interromper a qualquer momento para tirar dúvidas.

### Conta AWS

É bem fácil de fazer; você só precisa de um cartão de crédito.

Se tiver dúvidas, [tem este vídeo no YouTube](https://www.youtube.com/watch?v=UKrYlHzcAjY) que explica bem.

### Por que Next.js?

No [último workshop](https://github.com/hofstede-matheus/workshop-amplify-lambda), utilizei React (SPA) e Node.js (API REST), fazendo o deploy no Amplify e na AWS Lambda, respectivamente. Vale a pena também abordar o Amplify com Next.js (SSR).

Como para integrar com o AWS Polly precisamos conectar através de uma Service Account, o Next.js é uma boa escolha, pois podemos fazer a chamada no lado do servidor.

Quis me desafiar e aprender mais sobre Next.js, pois é uma tecnologia que está em alta e da qual eu não tenho tanto domínio, acabando por trabalhar mais no backend no dia a dia.

### Resumo do projeto

#### Página Inicial

Coisa simples: um textarea e um botão para enviar o texto.

Ao enviar o texto, duas requisições são feitas:

- Uma para a API do Next.js, que chama a camada de serviço para sintetizar o texto em fala.
- Outra para a API do Next.js, que chama a camada de serviço para obter as marcas de fala.

Assim que todas as requisições são concluídas, o áudio é reproduzido e o texto é destacado conforme a fala.

#### Componente `TextAreaWithHighlightedWords`

Componente que recebe o texto e as speech marks e destaca as palavras conforme a fala.

Fiz uma pequena gambiarra para destacar a palavra, onde utilizo uma API do browser para selecionar o texto em uma determinada range.

#### Rotas da API

Utilizo a funcionalidade de [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) para criar APIs internas no Next.js.

- `POST /api/aws-polly/synthesize` - Sintetiza o texto em fala e retorna um áudio
- `POST /api/aws-polly/speech-marks` - Obtém as speech marks do texto

#### Camada de serviço

Aqui é onde a mágica acontece: A camada de serviço é responsável por se comunicar com o AWS Polly e retornar o áudio e as speech marks.

- `src/services/aws/polly/synthesize`
- `src/services/aws/polly/speech-marks`

### Integrar com o AWS Polly

Mão no código!

Em `src/services/aws/polly`, vou criar o arquivo `client.ts` para encapsular a lógica de comunicação com o AWS Polly.

```ts
import { PollyClient, VoiceId } from "@aws-sdk/client-polly";

export const client = new PollyClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.POLLY_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.POLLY_SECRET_ACCESS_KEY || "",
  },
});

export const voiceId: VoiceId = "Amy";
```

Vamos utilizar duas funcionalidades do AWS Polly: SynthesizeSpeechCommand e GetSpeechMarksCommand. Logo, podemos criar um serviço para cada uma: `synthesize/index.ts` e `speech-marks/index.ts`.

```ts
import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { client, voiceId } from "../client";

export async function synthesizeText(
  text: string
): Promise<ReadableStream | undefined> {
  const { AudioStream } = await client.send(
    new SynthesizeSpeechCommand({
      OutputFormat: "mp3",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
    })
  );

  return AudioStream?.transformToWebStream();
}
```

```ts
import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { client, voiceId } from "../client";

export async function getSpeechMarksFromText(text: string): Promise<string[]> {
  const response = await client.send(
    new SynthesizeSpeechCommand({
      OutputFormat: "json",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
      SpeechMarkTypes: ["word"],
    })
  );

  const stringStream = await response.AudioStream?.transformToString();
  const parsedResult = stringStream
    ?.split("\n")
    ?.filter((line) => line !== "")
    .map((line) => JSON.parse(line)) as string[];

  return parsedResult;
}
```

### Configurar o IAM

Vamos criar um usuário com as permissões mínimas necessárias para acessar o AWS Polly.

Uma Access Key é uma combinação de um Access Key ID e de um Secret Access Key, que são usados para se autenticar programaticamente na AWS.

Acesse o [IAM](https://console.aws.amazon.com/iamv2/home#/users) e clique em "Create user"

Preencha o nome do usuário e selecione "Attach policies directly"

Pesquise por "AmazonPollyFullAccess" e selecione como policy

Salve e acesse o usuário criado

Clique em "Security credentials" e crie um novo access key (Other)

Salve o Access Key ID e o Secret Access Key. Essas informações são sensíveis e não serão exibidas novamente.

Adicione as credenciais no arquivo `.env.local`

Já dá pra testar localmente, só rodar `npm run dev`

### Configurar e fazer o deploy Amplify

Acesse o [Amplify Console](https://console.aws.amazon.com/amplify/home) e clique em "Create new app"

Selecione o repositório do Github e autorize a conexão

O Next.js vai ser detectado automaticamente

O Next.js precisa de um arquivo `.env.production` para funcionar, então vamos fazer um pequeno ajuste no build, pois as variáveis de ambiente são só disponíveis na build.

https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html

Selecione "Edit YML file" e modifique o build para:

```yml
(...)
build:
      commands:
        - env | grep -e POLLY_ACCESS_KEY_ID -e POLLY_SECRET_ACCESS_KEY >> .env.production
        - npm run build
(...)
```

Em "Advanced settings", adicione as variáveis de ambiente `POLLY_ACCESS_KEY_ID` e `POLLY_SECRET` com os valores das credenciais do IAM

Clique em "Next" e "Save and deploy"

### Testar

Acesse a URL gerada pelo Amplify e teste o projeto

### Amazon Q

Cansei de programar. Vamos pedir ajuda à Amazon Q para implementar a funcionalidade de extrair texto de uma imagem.

Assim como o ChatGPT, ele tem um chat que podemos fazer perguntas técnicas. Além disso digitando `/dev` ele inicia o modo "Amazon Q Developer Agent", que faz alterações no código a partir de um prompt.

Vamos testar isso:

```
Given the structure that the project is following: Route Handlers for each functionality the app has, and a service folder with each service, e.g, speech-marks and synthesize, add a new Amazon Textract service to get text from images uploaded in a form inside the main page of the application. Create all route handlers, services and forms necessary for this.
```

Enquanto ele faz as alterações, vamos conversar sobre se a Inteligência Artificial vai roubar nossos empregos.

Criar uma service account com a permissão `AmazonTextractFullAccess`

### Chegando ao fim...

#### O que eu faria melhor?

- Cache das requisições

  - Tentei utilizar o cache do Next.js, mas ele não funciona com POST requests, nem com GET requests com query params
  - Servios de IA são caros, então fazer o cache de respostas idênticas é uma boa prática

- Arquitetura Event-Driven

  - O Polly possibilita salvar tasks no Amazon S3
  - Utilizar o Amazon EventBridge para disparar eventos quando alguma task é salva no S3
  - Publicar eventos no AWS AppSync para atualizar o front-end com o link para o áudio e as speech marks

#### Dúvidas?
