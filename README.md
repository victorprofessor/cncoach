# CnCoach

Treinador de corrida por zonas de frequência cardíaca, com GPS, voz e planos de treino.

O app é feito em HTML/CSS/JS (arquivo único em `www/index.html`) e empacotado com [Capacitor](https://capacitorjs.com) para publicação na App Store (iOS) e no Google Play (Android).

## Estrutura

```
www/            → o app web (index.html + Leaflet local em vendor/)
android/        → projeto nativo Android (abrir no Android Studio)
ios/            → projeto nativo iOS (abrir no Xcode, requer Mac)
capacitor.config.json
```

App ID: `com.victorprofessor.cncoach`

## Pré-requisitos

- Node.js 18+ e npm
- **Android:** Android Studio (com SDK)
- **iOS:** Mac com Xcode e conta do Apple Developer Program

## Fluxo de trabalho

Depois de editar `www/index.html`, sincronize os projetos nativos:

```bash
npm install        # só na primeira vez
npx cap sync       # copia www/ para android/ e ios/
```

### Rodar/testar no Android

```bash
npx cap open android
```

No Android Studio: escolha um emulador ou aparelho e clique em Run.

### Rodar/testar no iOS

```bash
npx cap open ios
```

No Xcode: selecione seu time de assinatura em *Signing & Capabilities* e rode num simulador ou iPhone.

## Publicar

### Google Play

1. No Android Studio: **Build → Generate Signed Bundle (AAB)**. Crie e guarde bem a keystore (perder a keystore = não conseguir mais atualizar o app).
2. No [Play Console](https://play.google.com/console): crie o app, preencha a ficha da loja (descrição, capturas de tela, ícone 512×512), a declaração de segurança de dados e a política de privacidade, e envie o `.aab` numa faixa de teste ou produção.

### App Store

1. No Xcode: **Product → Archive** e envie pelo Organizer para o App Store Connect.
2. No [App Store Connect](https://appstoreconnect.apple.com): crie o app, preencha a ficha (descrição, capturas de tela, política de privacidade, ficha de privacidade de dados) e envie para revisão.

### Ícones e splash screens

Coloque `icon.png` (1024×1024) e `splash.png` (2732×2732) numa pasta `assets/` na raiz e rode:

```bash
npm install -D @capacitor/assets
npx capacitor-assets generate
```

## Permissões já configuradas

- **Android** (`android/app/src/main/AndroidManifest.xml`): localização fina/aproximada para o GPS dos treinos.
- **iOS** (`ios/App/App/Info.plist`): `NSLocationWhenInUseUsageDescription` com o texto exibido ao usuário.
