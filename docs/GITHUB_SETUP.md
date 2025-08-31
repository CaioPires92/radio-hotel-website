# Configuração do GitHub para Radio Hotel

## 📋 Instruções para Deploy

O projeto está pronto para deploy, mas precisa ser conectado ao GitHub. Siga os passos abaixo:

### 1. Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com)
2. Clique em "New repository" ou "+" > "New repository"
3. Configure o repositório:
   - **Repository name**: `radio-hotel-website`
   - **Description**: `Website oficial do Radio Hotel - Serra Negra, SP`
   - **Visibility**: Public (para GitHub Pages gratuito)
   - **NÃO** marque "Add a README file" (já temos um)
   - **NÃO** marque "Add .gitignore" (já temos um)
   - **NÃO** marque "Choose a license" (já temos um)

### 2. Conectar Repositório Local

Após criar o repositório no GitHub, execute os comandos:

```bash
# Adicionar o repositório remoto (já configurado para CaioPires92)
git remote add origin https://github.com/CaioPires92/radio-hotel-website.git

# Renomear a branch principal para 'main' (padrão do GitHub)
git branch -M main

# Fazer o primeiro push
git push -u origin main
```

### 3. Configurar GitHub Pages

1. No repositório do GitHub, vá em **Settings** > **Pages**
2. Em **Source**, selecione "GitHub Actions"
3. O workflow já está configurado em `.github/workflows/deploy.yml`
4. O site será automaticamente deployado a cada push na branch `main`

### 4. Acessar o Site

Após o deploy, o site estará disponível em:
```
https://CaioPires92.github.io/radio-hotel-website
```

## 🔧 Comandos Úteis

```bash
# Verificar status do repositório
git status

# Fazer commit de alterações
git add .
git commit -m "feat: sua mensagem aqui"
git push origin main

# Verificar repositórios remotos
git remote -v

# Build local para teste
npm run build

# Executar testes
npm run test
npm run test:e2e
```

## 📊 Monitoramento

Após o deploy, você pode:

1. **Verificar o build**: Na aba "Actions" do GitHub
2. **Acessar o site**: No link do GitHub Pages
3. **Monitorar analytics**: Configurar Google Analytics com seu ID
4. **Testar performance**: Usar Lighthouse no navegador

## 🚀 Próximos Passos

1. **Configurar domínio personalizado** (opcional):
   - Adicionar arquivo `CNAME` com seu domínio
   - Configurar DNS do domínio

2. **Configurar Analytics**:
   - Criar conta no Google Analytics
   - Adicionar tracking ID nas variáveis de ambiente

3. **Configurar WhatsApp Business**:
   - Atualizar número do WhatsApp no código
   - Testar integração de reservas

4. **Personalizar conteúdo**:
   - Adicionar fotos reais do hotel
   - Atualizar textos e informações
   - Configurar eventos e acomodações

## ❓ Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/radio-hotel-website.git
```

### Erro: "failed to push"
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Build falha no GitHub Actions
- Verificar se todas as dependências estão no `package.json`
- Verificar se não há erros de TypeScript
- Verificar logs na aba "Actions"

---

**✅ Projeto Completo e Pronto para Deploy!**

O Radio Hotel website está totalmente funcional com:
- ✅ Design premium e responsivo
- ✅ Performance otimizada
- ✅ SEO completo
- ✅ Acessibilidade WCAG 2.1 AA
- ✅ Testes automatizados
- ✅ CI/CD configurado
- ✅ Documentação completa